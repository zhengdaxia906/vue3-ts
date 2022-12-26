import request from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'
enum loginApi {
  accountLoginUrl = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' //  role/id/menu
}
export function accountLoginRequest(data: IAccount) {
  return request.post<IDataType<ILoginResult>>({
    url: loginApi.accountLoginUrl,
    data
  })
}
export function requestUserInfoById(id: number) {
  return request.get<IDataType>({
    url: loginApi.LoginUserInfo + id
  })
}
export function requestUserMenusById(id: number) {
  return request.get<IDataType>({
    url: loginApi.UserMenus + id + '/menu'
  })
}
