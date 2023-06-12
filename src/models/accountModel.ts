import { Document, Schema, Types, model } from 'mongoose'


import config from '../config'

const { access_token_expire_at } = config

const ObjectId = Types.ObjectId
// 模板接口
export interface AccountDocument extends Document {
	userId?: string
	type: string
	provider?: string//第三方登录提供者
	providerAccountId?: string//第三方登录id
	refresh_token: string
	access_token?: string
	expire_at?: number
	token_type?: string
	scope?: string
	id_token?: string//第三方给的token
	session_state?: string
}

// 模板校验规则
const accountSchema = new Schema(
	{
		userId: { type: ObjectId, require: true },
		type: { type: String, default: 'user' },
		provider: { type: String, default: '' },
		providerAccountId: { type: String, default: '' },
		refresh_token: { type: String, require: true },
		access_token: { type: String, require: true },
		expire_at: { type: Number, default: access_token_expire_at },
		token_type: { type: String, default: 'Bearer' },
		scope: { type: String, default: '' },
		id_token: { type: String, default: '' },
		session_state: { type: String, default: '' }
	},
	{
		timestamps: true,
	}
)

// 创建模板 执行之后会自动在mongodb中创建相应的模板
const accountModel = model<AccountDocument>('Accounts', accountSchema)

export default accountModel