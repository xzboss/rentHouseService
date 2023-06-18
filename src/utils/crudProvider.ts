import { Model, QueryOptions, FilterQuery, UpdateQuery } from 'mongoose'
import listingModel, { ListingDocument } from '../models/listingModel'
import userModel, { UserDocument } from '../models/userModel'
import accountModel, { AccountDocument } from '../models/accountModel'
import reserveModel, { ReserveDocument } from '../models/reserveModel'

class CRUDProvider<T> {
	private model: Model<any>
	constructor(model: Model<any>) {
		this.model = model
	}
	//查
	async find(query: FilterQuery<T>, projection?: any, options?: QueryOptions): Promise<any> {
		try {
			return await this.model.find(query, projection, options)
		} catch (error) {
			return error
		}
	}
	//查
	async findOne(query: FilterQuery<T>, projection?: any, options?: QueryOptions): Promise<any> {
		try {
			return await this.model.findOne(query, projection, options)
		} catch (error) {
			return error
		}
	}
	//加
	async increment(input: T) {
		try {
			return await this.model.create(input)
		} catch (error) {
			return error
		}
	}
	//更新
	async update(query: FilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions) {
		try {
			return await this.model.updateOne(query, update, options)
		} catch (error) {
			return error
		}
	}
	//更新
	async updateOne(query: FilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions) {
		try {
			return await this.model.updateOne(query, update, options)
		} catch (error) {
			return error
		}
	}
	//删除
	async remove(query: FilterQuery<T>) {
		try {
			return await this.model.deleteOne(query)
		} catch (error) {
			return error
		}
	}
}
export const listingDao = new CRUDProvider<ListingDocument>(listingModel)
export const userDao = new CRUDProvider<UserDocument>(userModel)
export const accountDao = new CRUDProvider<AccountDocument>(accountModel)
export const reserveDao = new CRUDProvider<ReserveDocument>(reserveModel)