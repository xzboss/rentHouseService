import dayjs from 'dayjs'
import reserveService from '../service/reserveService'

export default {
	getReservedRanges: async (req: any, res: any) => {
		const { query } = req
		res.send(await reserveService.getReservedRanges(query))
	},
	increment: async (req: any, res: any) => {
		res.send(await reserveService.increment(req.body))
	},
	update: async (req: any, res: any) => {
	},
	remove: async (req: any, res: any) => {
	}
}