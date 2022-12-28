import { Module } from 'vuex'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/mapMenus'
import router from '@/router'
import { ILoginState } from './type'
import { rootStateType } from '../type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusById
} from '@/service/login/login'
import { IAccount } from '@/service/login/type'

const loginMudule: Module<ILoginState, rootStateType> = {
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

      //处理菜单生成动态路由表routes并注册     放在这里加载路由也方便数据持久化 避免刷新问题
      const routes = mapMenusToRoutes(payload)
      routes.forEach((item) => {
        router.addRoute('main', item)
      })
    }
  },
  getters: {},
  actions: {
    // 登录
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
      localCache.setCache('userInfo', userInfo)
      // 3.请求用户菜单
      const { data: userMenus } = await requestUserMenusById(id)
      localCache.setCache('userMenus', userMenus)
      ctx.commit('changeUserMenus', userMenus)

      // 登录成功后跳转
      router.push('/main')
    },
    // 初始化vuex登录相关数据 ——  数据持久化
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('setToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginMudule
