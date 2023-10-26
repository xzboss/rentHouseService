// constants/code.ts

export const resErr = {
  code: 400,
  message: 'error',
  data: null
}
export const resSuccess = {
  code: 200,
  message: 'success',
  data: null
}
export const FINDNOTHING = 'findNothing'
export const ALREADYEXISTS = 'alreadyExists'
export const CODE = {
  SUCCESS: 200,
  CREATED: 201,
  FOUND: 302,
  BAD_REQUEST: 400,
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
/*   
200 OK：表示请求成功，服务器已成功处理了请求并返回了响应数据。
201 Created：表示请求成功，服务器已成功创建了新的资源。
204 No Content：表示请求成功，服务器已成功处理了请求，但没有返回任何响应数据。
400 Bad Request：表示请求失败，客户端发送的请求有误，服务器无法处理。
401 Unauthorized：表示请求失败，客户端未提供有效的身份认证信息或认证信息无效。
403 Forbidden：表示请求失败，客户端没有访问资源的权限。
404 Not Found：表示请求失败，客户端请求的资源不存在。
405 Method Not Allowed：表示请求失败，客户端使用了不支持的 HTTP 方法。
500 Internal Server Error：表示请求失败，服务器在处理请求时发生了未知的错误。
 */