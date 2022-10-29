import { Module } from 'vuex'
import localCache from '@/utils/cache'
import { stateType } from './type'
import { rootStateType } from '../type'
import { accountLoginRequest } from '@/service/login/login'
import { IAccount } from '@/service/login/type'

const loginMudule: Module<stateType, rootStateType> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token
    }
  },
  getters: {},
  actions: {
    async accountLoginAction(ctx, payload: IAccount) {
      //   console.log('执行 登录action', payload)
      const res = await accountLoginRequest(payload)
      const { id, token } = res.data
      ctx.commit('setToken', token)
      localCache.setCache('token', token)
    }
  }
}

export default loginMudule
