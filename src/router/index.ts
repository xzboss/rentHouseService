import express from 'express'
import path from 'path'
import multer from 'multer'

import listingHandler from '../controller/listingRouterHandler'
import userHandler from '../controller/userRouterHandler'
import reserveHandler from '../controller/reserveRouterHandler'
import { CODE } from '../constants'
import { resData } from '../utils'
import config from '../config'
const router = express.Router()
//上传到静态托管
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '/../../public/imgs'))//指定路径path.join(__dirname, '/../../public/imgs')
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		const filename = Date.now() + ext
		req.body.imageSrc = config.imgBaseUrl + filename
		cb(null, filename)//指定上传文件名
	}
})
const upload = multer({ storage })

router.use('/uploadImg', upload.any(), (req, res) => {
	/* if (req.files)  */
	res.send(resData(CODE.SUCCESS, '图片上传成功', req.body.imageSrc))
})
//listings
//router.post('/uploadImg', () => { })
router.get('/getAllListing', listingHandler.findAll)
router.get('/findListing', listingHandler.find)
router.post('/incrementListing', listingHandler.increment)
router.put('/updateListing', listingHandler.update)
router.delete('/removeListingById', listingHandler.removeById)


//user
router.get('/findUserById', userHandler.findOne)
router.post('/incrementUser', userHandler.increment)
router.post('/login', userHandler.login)
router.get('/verifyToken', userHandler.verifyToken)
router.post('/updateUser', userHandler.update)
router.get('/getMyListings', userHandler.getMyListings)
router.get('/getTrips', userHandler.getTrips)
router.get('/getFavorites', userHandler.getFavorites)
router.get('/getReservations', userHandler.getReservations)


//account


//reservation
router.post('/incrementReservation', reserveHandler.increment)
router.get('/getReservedRanges', reserveHandler.getReservedRanges)
router.delete('/removeReservationById', reserveHandler.removeById)

export default router