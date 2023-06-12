import express from 'express'
import initMiddleware from './middleware'
import dbConnect from './utils/dbConnect'
import config from './config'
const { port } = config
const app = express()
// 挂载中间件
initMiddleware(app)
app.listen(port, () => {
	dbConnect()
})