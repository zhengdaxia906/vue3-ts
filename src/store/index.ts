import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { rootStateType, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'

import { getPageListData } from '@/service/main/system/index'

const store = createStore<rootStateType>({
  state: () => {
    return {
      name: 'zxf',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, payload) {
      state.entireDepartment = payload
    },
    changeEntireRole(state, payload) {
      state.entireRole = payload
    },
    changeEntireMenu(state, payload) {
      state.entireMenu = payload
    }
  },
  getters: {},
  actions: {
    // 1.请求部门和角色数据
    async InitialDataAction(ctx) {
      const department = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const role = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const menu = await getPageListData('/menu/list', {
        offset: 0,
        size: 1000
      })
      ctx.commit('changeEntireDepartment', department.data.list)
      ctx.commit('changeEntireRole', role.data.list)
      ctx.commit('changeEntireMenu', menu.data.list)
    }
  },
  modules: { login, system }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

//方便vuex搭配ts  适配不支持 模块属性
export function userStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
