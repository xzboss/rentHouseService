import { QueryOptions, FilterQuery, UpdateQuery } from 'mongoose'
import ListingModel, { ListingDocument } from '../models/listingModel'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { listingDao, reserveDao, userDao } from '../utils/crudProvider'
import { DateIsOverlap, resData } from '../utils'
import { CODE } from '../constants'

export default {
	findAll: async () => {
		return listingDao.find({})
	},
	find: async (query: Record<string, any>) => {
		try {
			const { dateRange, bathRoomCount, roomCount, guestCount } = query
			query.dateRange = undefined
			let data = await listingDao.find(
				{
					...query,
					bathRoomCount: { "$gte": bathRoomCount },
					roomCount: { "$gte": roomCount },
					guestCount: { "$gte": guestCount }
				})

			/* validRange: { "$lte": dateRange[0], "$gte": dateRange[1] }, */
			//限定符合日期的
			if (!dateRange) return resData(CODE.SUCCESS, 'ok', data)

			const reservations = await reserveDao.find({})
			const [start, end] = [dateRange[0], dateRange[1]]
			//判断数据库预定信息时间与需要预定有无重合
			function isOverlap(reservationId: string) {
				for (const i of reservations) {
					if (i['_id'] === reservationId) {
						return DateIsOverlap(start, end, i['startDate'], i['endDate'])
					}
				}
			}
			//筛选掉不匹配的
			data = data.filter((listing: ListingDocument) => {
				if (!listing.reservations?.length) return true
				for (const reservationId of listing.reservations!) {
					return isOverlap(reservationId)
				}
			})
			return resData(CODE.SUCCESS, 'ok', data)
		} catch (error) {
			return resData(CODE.INTERNAL_SERVER_ERROR, 'server err')
		}

	},
	increment: async (input: ListingDocument) => {
		//前端已做，对于用户本人信息的更新都交由前端单独处理
		//await userDao.updateOne({ _id: input.userId }, { listings: { '$push': input._id } })
		try {
			//发布房源，将起始时间调到凌晨,因为默认预定时间为下午2点开始，
			//防止2点之后发布的房源，顾客不能在2点之后预定发布当天房源
			if (input.validRange) {
				input.validRange[0] = dayjs(input.validRange[0]).hour(1).toDate()
			}
			const res = await listingDao.increment(input)
			return resData(CODE.SUCCESS, 'success', res)
		} catch (error) {
			return resData(CODE.INTERNAL_SERVER_ERROR, 'server err')
		}

	},
	update: async (query: FilterQuery<ListingDocument>, update: UpdateQuery<ListingDocument>, options?: QueryOptions) => {
		const length = (await listingDao.find(query)).length
		console.log(length)
		if (length) {
			return await listingDao.update(query, update, options)
		} else {
			return { des: '无此房信息' }
		}
	},
	removeById: async (_id: string) => {
		try {
			//删除房源应该删除与房源相关的预定信息和预定了此房源用户的预定信息和图片
			//但后续想做预定记录或者再次发布，就没先暂停此功能，只做了简单的删除
			const res = await listingDao.remove({ _id }) as any
			await reserveDao.remove({ listingId: _id })
			if (res.deletedCount) return resData(CODE.SUCCESS, 'success remove', res)
			return resData(CODE.NOT_FOUND, 'not found', res)
		} catch (error) {
			return resData(CODE.INTERNAL_SERVER_ERROR, 'server err')
		}

	}
}