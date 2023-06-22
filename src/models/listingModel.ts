import { Document, Schema, Types, model } from 'mongoose'


import config from '../config'

const { logoUrl } = config

const ObjectId = Types.ObjectId
// 模板接口
export interface ListingDocument extends Document {
	title?: string
	description?: string
	imageSrc?: string
	category?: string
	roomCount?: number
	bathRoomCount?: number
	guestCount?: number
	latlng?: number[]
	userId?: string
	price?: number
	reservations?: string[]
	validRange?: Date[]
	locationValue: string
}

// 模板校验规则
const listingSchema = new Schema(
	{
		title: String,
		description: String,
		imageSrc: { type: String, default: logoUrl },
		createdAt: { type: Date, default: Date.now() },
		updatedAt: { type: Date, default: Date.now() },
		category: { type: String, default: '沙滩' },
		roomCount: { type: Number, default: 1 },
		bathRoomCount: { type: Number, default: 1 },
		guestCount: { type: Number, default: 1 },
		latlng: { type: [Number], default: [20, 20] },
		userId: ObjectId,
		price: Number,
		reservations: [ObjectId],
		validRange: [{ type: Date, default: Date.now() }, { type: Date, require: true }],
		locationValue: String,
	},
	{
		timestamps: true,
	}
)

// 创建模板 执行之后会自动在mongodb中创建相应的模板
const listingModel = model<ListingDocument>('Listings', listingSchema)

export default listingModel