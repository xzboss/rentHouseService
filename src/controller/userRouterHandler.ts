
import userService from '../service/userService'

import { resData } from '../utils'

export default {
	login: async (req: any, res: any) => {
		const { email, password } = req.body
		res.send(await userService.login(email, password))
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