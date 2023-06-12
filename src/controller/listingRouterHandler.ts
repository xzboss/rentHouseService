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
		res.send(await listingService.increment(body))
	},
	update: async (req: any, res: any) => {
		res.send(await listingService.update(req.query, req.body))
	},
	remove: async (req: any, res: any) => {
		res.send(await listingService.remove(req.query))
	}
}