
import userService from '../service/userService'
import { CODE } from '../constants'
import { resData } from '../utils'
import { BADFAMILY } from 'dns'
const { SUCCESS, UNAUTHENTICATED, FORBIDDEN, BAD_REQUEST } = CODE
export default {
	login: async (req: any, res: any) => {
		const { email, password } = req.body
		const data = await userService.login(email, password)
		if (data) return res.send(resData(SUCCESS, '登录成功', data))
		res.send(resData(UNAUTHENTICATED, '用户名或密码错误'))
	},
	verifyToken: async (req: any, res: any) => {
		const { _id } = req.auth
		const userDetail = await userService.verifyToken(_id)
		if (userDetail) return res.send(resData(SUCCESS, 'token验证成功', userDetail))
		res.send(resData(UNAUTHENTICATED, 'token验证失败:用户不存在'))
	},
	increment: async (req: any, res: any) => {
		const { name, email, password } = req.body
		res.send(await userService.increment(name, email, password))
	},
	update: async (req: any, res: any) => {
		const { body } = req
		const tip: any = await userService.update({ _id: body._id }, body)
		if (tip['acknowledged']) return res.send(resData(SUCCESS, '喜欢成功', tip))
		res.send(resData(BAD_REQUEST, '没有用户或没有房源', tip))
	},

	getTrips: async (req: any, res: any) => {
		const { query } = req
		res.send(await userService.getTrips(query))
	},
	getFavorites: async (req: any, res: any) => {
		const { query } = req
		res.send(await userService.getFavorites(query))
	},
	getReservations: async (req: any, res: any) => {
		const { query } = req
		res.send(await userService.getReservations(query))
	},
	getMyListings: async (req: any, res: any) => {
		const { query } = req
		res.send(await userService.getMyListings(query))
	},
	remove: async (req: any, res: any) => {
	}
}