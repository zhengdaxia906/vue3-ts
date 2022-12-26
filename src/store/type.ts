import { ILoginState } from './login/type'

export interface rootStateType {
  name: string
  age: number
}
export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = rootStateType & IRootWithModule
