
import userService from '../service/userService'
import { CODE } from '../constants'
const { SUCCESS, UNAUTHENTICATED, FORBIDDEN } = CODE
export default {
	login: async (req: any, res: any) => {
		const { email, password } = req.body
		const data = await userService.login(email, password)
		if (data) return res.status(SUCCESS).json({ data })
		res.status(UNAUTHENTICATED).send({ message: '用户名或密码错误' })
	},
	verifyToken: async (req: any, res: any) => {
		const { _id } = req.auth
		const userDetail = await userService.verifyToken(_id)
		res.status(SUCCESS).send(userDetail)
	},
	increment: async (req: any, res: any) => {
		const { email, password } = req.body
		res.send(await userService.increment(email, password))
	},
	update: async (req: any, res: any) => {
	},
	remove: async (req: any, res: any) => {
	}
}