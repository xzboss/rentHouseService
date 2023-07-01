import bcrypt from 'bcryptjs'
const obj = {
	salt: bcrypt.genSaltSync(10),
	port: 8800,
	imgBaseUrl: 'http://127.0.0.1:8800/imgs/',
	logoUrl: 'http://942875315.hkfree.work/logo.png',
	dbUrl: 'mongodb+srv://xu:123@cluster0.il4ffra.mongodb.net/?retryWrites=true&w=majority',
	dbUser: 'root',
	dbPassword: 'admin123',
	dbAuthSource: 'admin',
	token_expire_at: 60 * 60 * 24 * 1,
	access_token_expire_at: 60 * 20 * 1 * 1,
	refresh_token_expire_at: 60 * 60 * 24 * 30,
	secretKey: 'xzboss'
}
export default obj
//const PORT = config.get<number>('port')