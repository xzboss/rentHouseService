import { QueryOptions, FilterQuery, UpdateQuery } from 'mongoose'
import ListingModel, { ListingDocument } from '../models/listingModel'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { listingDao } from '../utils/crudProvider'
export default {
	findAll: async () => {
		return listingDao.find({})
	},
	find: async (query: Record<string, any>) => {
		//console.log(query)
		const { dateRange, bathRoomCount, roomCount, guestCount } = query
		delete query.dateRange
		const data = await listingDao.find(
			{
				...query,
				validRange: { "$lte": dateRange[0], "$gte": dateRange[1] },
				bathRoomCount: { "$gte": bathRoomCount },
				roomCount: { "$gte": roomCount },
				guestCount: { "$gte": guestCount }
			})
		return data
	},
	increment: async (input: ListingDocument) => {
		return await listingDao.increment(input)
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
	remove: async (query: FilterQuery<ListingDocument>) => {
		return await listingDao.remove(query)
	}
}