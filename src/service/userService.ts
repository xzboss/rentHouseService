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
const { secretKey, token_expire_at } = config
export default {
	login: async (email: any, password: any) => {
		const userDetail = await userDao.find({ email })
		if (!userDetail.length) return resData(401, '用户不存在')
		//验证密码
		const valid = await bcrypt.compare(password, userDetail[0].hashPassword)
		if (!valid) return resData(401, '密码错误')
		//生成签证
		const token = jwt.sign({
			email: userDetail[0].email,
			hashPassword: userDetail[0].hashPassword
		},
			secretKey,
			{ expiresIn: token_expire_at })
		return token
	},
	increment: async (email: string, password: string) => {
		const ed = await userDao.find({ email })
		if (ed.length) return ALREADYEXISTS
		//加密
		const hashPassword = await bcrypt.hash(password, config.salt)
		return await userDao.increment({ email, hashPassword } as any)
	},
	update: async (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options?: QueryOptions) => {

	},
	remove: async (query: FilterQuery<UserDocument>) => {

	}
}