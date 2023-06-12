import { Document, Schema, Types, model } from 'mongoose'


import config from '../config'

const { logoUrl } = config

const ObjectId = Types.ObjectId
// 模板接口
export interface UserDocument extends Document {
  name?: string
  email: string
  emailVerify?: Date
  image?: string
  hashPassword: string
  createdAt?: Date
  updateAt?: Date
  favoriteIds?: string[]
  listings?: string[]
  accounts?: string[]
  reservations?: string[]
}

// 模板校验规则
const userSchema = new Schema(
  {
    name: { type: String, default: 'user' },
    email: { type: String, require: true },
    emailVerify: { type: Date, default: Date.now() },
    image: { type: String, default: logoUrl },
    hashPassword: { type: String, require: true },
    createdAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() },
    favoriteIds: { type: [ObjectId], default: [] },
    listings: { type: [ObjectId], default: [] },
    accounts: { type: [ObjectId], default: [] },
    reservations: { type: [ObjectId], default: [] }
  },
  {
    timestamps: true,
  }
)

// 创建模板 执行之后会自动在mongodb中创建相应的模板
const userModel = model<UserDocument>('Users', userSchema)

export default userModel