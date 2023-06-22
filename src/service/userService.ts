import { QueryOptions, FilterQuery, UpdateQuery } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserModel, { UserDocument } from '../models/userModel'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { userDao } from '../utils/crudProvider'
import config from '../config'
import { ALREADYEXISTS } from '../constants'
import { resData } from '../utils'
import { CODE } from '../constants'
const { secretKey, token_expire_at } = config
export default {
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
	},
	getFavorites: async (query: any) => {
	},
	getReservations: async (query: any) => {
	},
	getMyListings: async (query: any) => {
	},
	remove: async (query: FilterQuery<UserDocument>) => {

	}
}