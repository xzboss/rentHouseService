import listingService from '../service/listingService'


export default {
	findAll: async (req: any, res: any) => {
		res.send(await listingService.findAll())
	},
	find: async (req: any, res: any) => {
		const { query } = req
		res.send(await listingService.find(query))
	},
	increment: async (req: any, res: any) => {
		const { body } = req
		body.userId = req.auth._id
		res.send(await listingService.increment(body))
	},
	update: async (req: any, res: any) => {
		res.send(await listingService.update(req.query, req.body))
	},
	removeById: async (req: any, res: any) => {
		res.send(await listingService.removeById(req.body.listingId))
	}
}