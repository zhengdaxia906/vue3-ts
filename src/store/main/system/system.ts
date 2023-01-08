import { Module } from 'vuex'
import { rootStateType } from '@/store/type'
import { ISystemState } from './type'
import { getPageListData } from '@/service/main/system/index'
//Module接口接收泛型<S,R>   S:当前模块state类型,R:根模块state类型
const systemModule: Module<ISystemState, rootStateType> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, payload) {
      state.userList = payload
    },
    changeUserCount(state, payload) {
      state.userCount = payload
    }
  },
  actions: {
    async getPageList(ctx, { pageUrl, queryInfo }) {
      const { data } = await getPageListData(pageUrl, queryInfo)
      const { list, totalCount } = data
      ctx.commit('changeUserList', list)
      ctx.commit('changeUserCount', totalCount)
    }
  }
}
export default systemModule
