import mongoose, { now } from "mongoose"
const ObjectId = mongoose.Types.ObjectId
//用户信息
const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	emailVerified: Date,
	image: String,
	hashedPassword: String,
	createdAt: { type: Date, default: now() },
	updatedAt: Date,
	favoriteIds: [ObjectId],
	accounts: [String],
	listings: [String],
	reservations: [String]
})
//用户账户信息
const accountSchema = new mongoose.Schema({
	userId: ObjectId,
	type: String,
	provider: String,
	providerAccountId: String,
	refresh_token: String,
	expires_at: Number,
	token_type: String,
	scope: String,
	id_token: String,
	session_state: String
})
//房屋信息
const listingSchema = new mongoose.Schema({
	title: String,
	description: String,
	imageSrc: String,
	createdAt: Date,
	category: String,
	roomCount: Number,
	bathroomCount: Number,
	guestCount: Number,
	locationValue: ObjectId,
	userId: ObjectId,
	price: Number,
})
//预留
const reserveSchema = new mongoose.Schema({
	userId: ObjectId,
	listingId: ObjectId,
	startDate: Date,
	endDate: Date,
	totalPrice: Number,
	createdAt: { type: Date, default: now() }
})