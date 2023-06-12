import { QueryOptions, FilterQuery, UpdateQuery } from 'mongoose'
import ReserveModel, { ReserveDocument } from '../models/reserveModel'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { reserveDao } from '../utils/crudProvider'
export default {
	findAll: async () => {
	},
	find: async (query: Record<string, any>) => {
	},
	increment: async (input: ReserveDocument) => {
	},
	update: async (query: FilterQuery<ReserveDocument>, update: UpdateQuery<ReserveDocument>, options?: QueryOptions) => {

	},
	remove: async (query: FilterQuery<ReserveDocument>) => {
	}
}