import express from 'express'
import initMiddleware from './middleware'
import dbConnect, { dbDisconnect } from './utils/dbConnect'
import config from './config'
const { port } = config
const app = express()
// 挂载中间件
initMiddleware(app)
const serve = app.listen(port, () => {
	dbConnect()
})
process.on('close', () => {
	dbDisconnect()
	serve.close()
	process.exit(0)
})