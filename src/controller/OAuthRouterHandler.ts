import querystring from 'querystring'
import axios from 'axios'
import listingService from '../service/listingService'
import userService from '../service/userService'
import config from '../config'
import { CODE } from '../constants'
let i = 0

export default {
	getAccessToken: async (req: any, res: any) => {
		const { code, state } = req.query
		//防止csrf
		if (state !== config.OAuth.github.state || !code) {
			return
		}

		console.log(code, state)
		try {
			const resp = await axios({
				method: 'POST',
				url: config.OAuth.github.getOAuthTokenUrl,
				data: {
					client_id: config.OAuth.github.client_id,
					client_secret: config.OAuthSecret,
					code
				},
			})
			//去github拿数据
			const { access_token } = querystring.parse(resp.data)
			console.log(access_token, '@@@@@@@@@accessToken');
			const userDetailResp = await axios({
				method: 'GET',
				url: config.OAuth.github.resource_url,
				headers: {
					'Authorization': `Bearer ${access_token}`
				}
			})
			console.log(userDetailResp, userDetailResp.status, "@@@@@@@userDetailResp")
			//login 为用户名
			const { data: { login } } = userDetailResp
			await userService.increment(login, login, login)
			//不管添加成功(之前无用户)与否(之前有用户) 生成token
			const loginResp = await userService.login(login, login)
			if (loginResp) {
				res.redirect(`${config.OAuth.client_home}?token=${loginResp.token}`)
			}


		} catch (error: any) {
			return console.log(error.message, '@@@@-err')
		}
	}
}