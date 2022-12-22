import { Module } from 'vuex'
import localCache from '@/utils/cache'
import router from '@/router'
import { stateType } from './type'
import { rootStateType } from '../type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusById
} from '@/service/login/login'
import { IAccount } from '@/service/login/type'

const loginMudule: Module<stateType, rootStateType> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload) {
      state.userMenus = payload
    }
  },
  getters: {},
  actions: {
    async accountLoginAction(ctx, payload: IAccount) {
      //   console.log('执行 登录action', payload)
      // 1.登录逻辑
      const res = await accountLoginRequest(payload)
      const { id, token } = res.data
      ctx.commit('setToken', token)
      localCache.setCache('token', token)
      //2.请求用户信息
      const { data: userInfo } = await requestUserInfoById(id)
      ctx.commit('changeUserInfo', userInfo)
      // 3.请求用户菜单
      const { data: userMenus } = await requestUserMenusById(id)
      localCache.setCache('userMenus', userMenus)
      ctx.commit('changeUserMenus', userMenus)
      // 登录成功后跳转
      router.push('/main')
    }
  }
}

export default loginMudule
