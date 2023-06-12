//操作数据库
import { QueryOptions, FilterQuery, UpdateQuery } from 'mongoose'
//import { db } from '../utils/dbConnect'
import ListingModel, { ListingDocument } from '../models/listingModel'
const model = ListingModel
export default {
	find: async (query: FilterQuery<ListingDocument>, projection?: any, options?: QueryOptions) => {
		return await model.find(query, projection, options)
	},
	update: async (query: FilterQuery<ListingDocument>, update: UpdateQuery<ListingDocument>, options?: QueryOptions) => {
		return await model.updateOne(query, update, options)
	},
	increment: async (input: ListingDocument) => {
		return await model.create(input)
	},
	remove: async (query: FilterQuery<ListingDocument>) => {
		model.deleteOne(query).then(res => {
			return res
		}).catch((err: any) => console.log(err))
	}
}
