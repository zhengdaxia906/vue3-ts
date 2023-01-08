import request from '@/service/index'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
