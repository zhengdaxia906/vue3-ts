import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'

export interface rootStateType {
  name: string
  age: number
  entireDepartment: Array
  entireRole: Array
  entireMenu: Array
}
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = rootStateType & IRootWithModule
