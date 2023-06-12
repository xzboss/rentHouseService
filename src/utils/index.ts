/*  */
//创建返回数据
export const resData = (code: any, message: any, data:any = null) => {
	return {
		code,
		message,
		data
	}
}