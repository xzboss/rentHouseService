import { QueryOptions, FilterQuery, UpdateQuery } from 'mongoose'
import ReserveModel, { ReserveDocument } from '../models/reserveModel'
import dayjs from 'dayjs'
import { reserveDao, listingDao, userDao } from '../utils/crudProvider'
import { resData, DateIsBetween, DateIsOverlap } from '../utils'
import { CODE } from '../constants'

export default {
	findAll: async () => {

	},
	getReservedRanges: async (query: Record<string, any>) => {
		const res = await reserveDao.find(query)
		let data: any = []
		for (const item of res ?? []) {
			data.push([item.startDate, item.endDate])
		}
		return resData(CODE.SUCCESS, 'success', data)
	},
	findByUserId: async (query: Record<string, any>) => {
		return await reserveDao.find(query)
	},
	increment: async (input: ReserveDocument) => {
		const { userId, listingId, startDate, endDate } = input
		const listing = await listingDao.findOne({ _id: listingId })
		const { validRange } = listing
		const allReserve = await reserveDao.find({ userId, listingId })
		//判断预定区间是否合法
		const isValid = DateIsBetween(startDate!, endDate!, validRange[0], validRange[1])
		if (!isValid) return resData(CODE.UNAUTHENTICATED, '区间不合法')
		//isReserved
		for (const item of allReserve) {
			const { startDate: reservedStart, endDate: reservedEnd } = item
			const isReserved = DateIsOverlap(startDate!, endDate!, reservedStart, reservedEnd)
			if (isReserved) return resData(CODE.UNAUTHENTICATED, '已被预定')
		}
		const reservation = await reserveDao.increment(input)
		await listingDao.updateOne({ _id: listingId }, { "$push": { reservations: reservation._id } })
		//前端已做，对于用户本人信息的更新都交由前端单独处理
		//await userDao.updateOne({ _id: userId }, { "$push": { reservations: reservation._id } })
		return resData(CODE.SUCCESS, '预定成功', reservation)

	},
	update: async (query: FilterQuery<ReserveDocument>, update: UpdateQuery<ReserveDocument>, options?: QueryOptions) => {

	},
	removeById: async (auth: any, { listingId, reservationId, reserveBy }: any) => {
		//判断当前用户是取消自己预定别人的房源，还是取消别人预定自己的房源
		if (auth._id !== reserveBy) {
			//取消别人预定自己的房源
			await userDao.updateOne({ _id: reserveBy }, { '$pull': { reservations: reservationId } })
		}
		await listingDao.updateOne({ _id: listingId }, { '$pull': { reservations: reservationId } })
		const res = await reserveDao.remove({ _id: reservationId }) as any
		if (res.deletedCount) return resData(CODE.SUCCESS, 'success remove', res)
		return resData(CODE.NOT_FOUND, 'NOT_FOUND', res)
	}
}