import request from '@/utils/request'
import { LoginFormData, LoginResponseData, UserInfoResponseData } from './type'
// 同一管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
// 登录
export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

// 获取用户信息
export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(API.USERINFO_URL)

// 登出
export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL)
