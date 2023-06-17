
import userService from '../service/userService'
import { CODE } from '../constants'
import { resData } from '../utils'
const { SUCCESS, UNAUTHENTICATED, FORBIDDEN } = CODE
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
		res.send(resData(UNAUTHENTICATED, 'token验证失败'))
	},
	increment: async (req: any, res: any) => {
		const { name, email, password } = req.body
		res.send(await userService.increment(name, email, password))
	},
	update: async (req: any, res: any) => {
	},
	remove: async (req: any, res: any) => {
	}
}