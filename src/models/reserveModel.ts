import { Document, Schema, Types, model } from 'mongoose'


import config from '../config'

const { logoUrl } = config

const ObjectId = Types.ObjectId
// 模板接口
export interface ReserveDocument extends Document {
	userId?: string
	listingId?: string
	startDate?: Date
	endDate?: Date
	totalPrice?: number
	createdAt?: Date
}

// 模板校验规则
const reserveSchema = new Schema(
	{
		userId: ObjectId,
		listingId: ObjectId,
		startDate: { type: Date, require: true },
		endDate: { type: Date, require: true },
		totalPrice: { type: Number, require: true },
		createdAt: { type: Number, default: Date.now() }
	},
	{
		timestamps: true,
	}
)

// 创建模板 执行之后会自动在mongodb中创建相应的模板
const reserveModel = model<ReserveDocument>('Reserve', reserveSchema)

export default reserveModel