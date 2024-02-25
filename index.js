"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const obj = {
    salt: bcryptjs_1.default.genSaltSync(10),
    port: 5000,
    imgBaseUrl: 'http://115.159.222.245:5000/imgs/',
    logoUrl: 'http://942875315.hkfree.work/logo.png',
    dbUrl: 'mongodb+srv://xu:123@cluster0.il4ffra.mongodb.net/?retryWrites=true&w=majority',
    dbUser: 'root',
    dbPassword: 'admin123',
    dbAuthSource: 'admin',
    token_expire_at: 60 * 60 * 24 * 1,
    access_token_expire_at: 60 * 20 * 1 * 1,
    refresh_token_expire_at: 60 * 60 * 24 * 30,
    secretKey: 'xzboss',
    OAuthSecret: 'c2a55e0161d074de1564445f0c410b747f198a2e',
    OAuth: {
        client_home: 'http://115.159.222.245/all',
        github: {
            //文档：https://docs.github.com/zh/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity
            url: 'https://github.com/login/oauth/authorize',
            getOAuthTokenUrl: 'https://github.com/login/oauth/access_token',
            resource_url: 'https://api.github.com/user',
            client_id: '2fd366289e12b712a229',
            redirect_uri: 'http://115.159.222.245:5000/api/OAuth',
            state: 'xzboss', // TODO
        },
        google: {}
    }
};
exports.default = obj;
//const PORT = config.get<number>('port')
//# sourceMappingURL=index.js.map