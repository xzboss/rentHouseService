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
	OAuth: { // 第三方登录服务器信息
		github: {
			url: 'https://gihub.com/login/oauth/authorize',
			client_id: '2fd366289e12b712a229', // 
			redirect_uri: 'http://localhost:8800/OAuth',
			state: 'xzboss' // TODO
		},
		google: {}
	}
}
export default obj
//const PORT = config.get<number>('port')