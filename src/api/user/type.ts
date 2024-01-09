/* 
ts参数类型
*/
// 登录需要参数
export interface LoginFormData {
  username?: string
  password?: string
}
// 登录响应数据

export interface ResponseData {
  code?: number
  message?: string
  ok?: boolean
}
interface LoginType {
  token: string
}
export interface LoginResponseData extends ResponseData {
  data?: LoginType
}
interface UserInfoType {
  routes: string[]
  buttons: string[]
  roles: string[]
  name: string
  avatar: string
}
export interface UserInfoResponseData extends ResponseData {
  data: UserInfoType
}
