import bcrypt from 'bcryptjs'
const obj = {
	salt: bcrypt.genSaltSync(10),
	port: 8800,
	imgBaseUrl: 'http://127.0.0.1:8800/imgs/',
	logoUrl: 'http://942875315.hkfree.work/logo.png',
	dbUrl: 'mongodb://127.0.0.1:27017/rentHouse',
	dbUser: 'root',
	dbPassword: 'admin123',
	dbAuthSource: 'admin',
	token_expire_at: 60 * 60 * 24 * 1,
	access_token_expire_at: 60 * 20 * 1 * 1,
	refresh_token_expire_at: 60 * 60 * 24 * 30,
	secretKey: 'xzboss',
	OAuthSecret: 'c2a55e0161d074de1564445f0c410b747f198a2e',
	OAuth: { // 第三方登录服务器信息
		client_home: 'http://localhost:8000/all',
		github: {
			//文档：https://docs.github.com/zh/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity
			url: 'https://github.com/login/oauth/authorize', // 第三方登录页面
			getOAuthTokenUrl: 'https://github.com/login/oauth/access_token', // 获取第三方token post
			resource_url: 'https://api.github.com/user', // 第三方资源
			client_id: '2fd366289e12b712a229', // 
			redirect_uri: 'http://localhost:8800/api/OAuth',
			state: 'xzboss', // TODO
		},
		google: {}
	}
}
export default obj
//const PORT = config.get<number>('port')