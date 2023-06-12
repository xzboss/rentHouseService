import express from 'express'


import listingHandler from '../controller/listingRouterHandler'
import userHandler from '../controller/userRouterHandler'


const router = express.Router()

router.get('/test', async (req, res) => {
	res.send('ok')
})
//listings
router.get('/getAllListing', listingHandler.findAll)
router.get('/findListing', listingHandler.find)
router.post('/incrementListing', listingHandler.increment)
router.put('/updateListing', listingHandler.update)
router.delete('/removeListing', listingHandler.remove)


//user
router.post('/incrementUser', userHandler.increment)
router.post('/login', userHandler.login)



//account


//reservation
export default router