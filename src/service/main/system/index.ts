import request from '@/service/index'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
// 删除数据
export function deletePageData(url: string) {
  return request.delete<IDataType>({
    url: url //  '/users/id'
  })
}
// 新建数据
export function createPageData(url: string, params: any) {
  return request.post<IDataType>({
    url: url, //  '/users'
    data: params
  })
}
// 编辑数据
export function editPageData(url: string, params: any) {
  return request.patch<IDataType>({
    url: url, //  '/users'
    data: params
  })
}
