/*  */
import dayjs from "dayjs"
import { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
//创建返回数据
export const resData = (code: any, message: any, data: any = null) => {
	return {
		code,
		message,
		data
	}
}

/**
 * 时间是否包含
 * @param s 开始
 * @param e 结束
 * @param sv 开始范围
 * @param ev 结束范围
 * @returns 是否包含
 */
export const DateIsBetween = (s: Date, e: Date, sv: Date, ev: Date) => {
	const [start, end, startValid, endValid] = [dayjs(s), dayjs(e), dayjs(sv), dayjs(ev)]
	return start.isBetween(startValid, endValid) && end.isBetween(startValid, endValid)
}
/**
 * 是否重叠
 * @param s 开始
 * @param e 结束
 * @param sv 开始范围
 * @param ev 结束范围
 * @returns 区间重叠
 */
export const DateIsOverlap = (s: Date, e: Date, sv: Date, ev: Date) => {
	const [start, end, startValid, endValid] = [dayjs(s), dayjs(e), dayjs(sv), dayjs(ev)]
	//起始时间只能在上一个退房时间两小时后才能预定
	return !(start.isAfter(endValid.add(2, 'h')) || end.isBefore(startValid.subtract(2, 'h')))
}