import { Express } from 'express'
import express from 'express'
import responseHeader from './responseHeader'
import router from '../router'
import path from 'path'
import { expressjwt } from 'express-jwt'
import config from '../config'
import { CODE } from '../constants'
import { resData } from '../utils'

const { secretKey } = config
function initMiddleware(app: Express) {
  app.use(express.json())
  app.use(responseHeader)
  app.use('/imgs', express.static(path.join(__dirname, '../../public/imgs')));
  app.use(
    expressjwt({
      secret: secretKey,
      algorithms: ["HS256"]
    }).unless({ path: [/login/, /incrementUser/, /getAllListing/, /findListing/, /findReservationsByListingId/] })
  )
  app.use('/api', router)
  app.use((err: any, req: any, res: any, next: any) => {
    if (err.name === 'UnauthorizedError') {
      res.send(resData(CODE.UNAUTHENTICATED, "Token验证失败"))
    }
    next()
  })
}

export default initMiddleware