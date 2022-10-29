import request from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'
enum loginApi {
  accountLoginUrl = '/login'
}
export function accountLoginRequest(data: IAccount) {
  return request.post<IDataType<ILoginResult>>({
    url: loginApi.accountLoginUrl,
    data
  })
}
