import { QueryOptions, FilterQuery, UpdateQuery } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserModel, { UserDocument } from '../models/userModel'
import { listingDao, reserveDao, userDao } from '../utils/crudProvider'
import config from '../config'
import { resData } from '../utils'
import { CODE } from '../constants'
const { secretKey, token_expire_at } = config
export default {
	findOne: async (userId: string) => {
		const user = await userDao.findOne({ _id: userId })
		if (!user) return resData(CODE.NOT_FOUND, 'not found')
		user.hashPassword = undefined
		return resData(CODE.SUCCESS, 'success', user)
	},
	login: async (email: any, password: any) => {
		const userDetail = await userDao.findOne({ email })
		if (!userDetail) return false
		//验证密码
		const valid = await bcrypt.compare(password, userDetail.hashPassword)
		if (!valid) return false
		//生成签证
		const token = jwt.sign({
			_id: userDetail._id,
			email: userDetail.email
		},
			secretKey,
			{ expiresIn: token_expire_at })
		userDetail.hashPassword = undefined
		return { token, userDetail }
	},
	verifyToken: async (_id: any) => {
		const user = await userDao.findOne({ _id })
		if (user) user.hashPassword = undefined
		return user
	},
	increment: async (name: string, email: string, password: string) => {
		const ed = await userDao.find({ email })
		if (ed.length) return resData(CODE.CONFLICT, '你已经注册了')
		//加密
		const hashPassword = await bcrypt.hash(password, config.salt)
		const user = await userDao.increment({ name, email, hashPassword } as any)
		user.hashPassword = undefined
		return resData(CODE.SUCCESS, '成功注册', user)
	},
	update: async (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options?: QueryOptions) => {
		return await userDao.updateOne(query, update)
	},
	getTrips: async (query: any) => {
		const reservations = await reserveDao.find(query)
		if (!reservations.length) return resData(CODE.NOT_FOUND, 'empty')
		//get all listingId string
		const listingIds = [...new Set(reservations.map((item: any) => item.listingId.toString()))]
		let listings = await listingDao.find({ _id: { '$in': listingIds } })
		//get all listing+reservation obj
		listings = listings.map((listing: any) => {
			//先转为纯js对象
			const tmp = listing.toObject()
			tmp.reservationsValue = reservations.filter((item: any) => item.listingId.toString() === listing._id.toString())
			return tmp
		})
		return resData(CODE.SUCCESS, 'SUCCESS', listings)
	},
	getFavorites: async (query: any) => {
		const user = await userDao.findOne({ _id: query.userId })
		const { favoriteIds } = user.toObject()
		const listings = await listingDao.find({ _id: { '$in': favoriteIds } })
		if (!listings.length) return resData(CODE.NOT_FOUND, '没有收藏')
		return resData(CODE.SUCCESS, 'success', listings)
	},
	getReservations: async (query: any) => {
		const { userId } = query
		let listings = await listingDao.find({ userId })
		const tmpListings = await Promise.all(listings.map(async (listing: any) => {
			listing = listing.toObject()
			listing['reservationsValue'] = await reserveDao.find({ _id: { '$in': listing.reservations } })
			return listing
		}))
		return resData(CODE.SUCCESS, 'success', tmpListings)
	},
	getMyListings: async (query: any) => {
		const listings = await listingDao.find(query)
		if (!listings.length) return resData(CODE.NOT_FOUND, '没有房源')
		return resData(CODE.SUCCESS, 'MyListings', listings)
	},
	remove: async (query: FilterQuery<UserDocument>) => {

	}
}