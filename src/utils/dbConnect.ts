
import mongoose, { Types } from 'mongoose'

let db: any
async function dbConnect() {
	mongoose.connect("mongodb://127.0.0.1:27017/rentHouse")
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