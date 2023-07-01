
import mongoose, { Types } from 'mongoose'
import config from '../config'
const { dbUrl } = config
let db: any
async function dbConnect() {
	mongoose.connect(dbUrl)
	db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', function () {
		console.log('connect mongodb ok')
	})
}
export async function dbDisconnect() {
	db.close()
}
export default dbConnect