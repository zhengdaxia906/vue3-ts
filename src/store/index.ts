import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { rootStateType, IStoreType } from './type'
import login from './login/login'

const store = createStore<rootStateType>({
  state: () => {
    return {
      name: 'zxf',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: { login }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

//方便vuex搭配ts  适配不支持 模块属性
export function userStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
