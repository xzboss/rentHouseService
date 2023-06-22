import express from 'express'


import listingHandler from '../controller/listingRouterHandler'
import userHandler from '../controller/userRouterHandler'
import reserveHandler from '../controller/reserveRouterHandler'
import { CODE } from '../constants'

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
router.get('/verifyToken', userHandler.verifyToken)
router.post('/updateUser', userHandler.update)
router.get('/getMyListings', userHandler.getMyListings)
router.get('/getTrip', userHandler.getTrips)
router.get('/getFavorites', userHandler.getFavorites)
router.get('/getReservations', userHandler.getReservations)


//account


//reservation
router.post('/incrementReservation', reserveHandler.increment)
router.get('/getReservedRanges', reserveHandler.getReservedRanges)


export default router