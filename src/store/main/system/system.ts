import { Module } from 'vuex'
import { rootStateType } from '@/store/type'
import { ISystemState } from './type'
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/service/main/system/index'
//Module接口接收泛型<S,R>   S:当前模块state类型,R:根模块state类型
const systemModule: Module<ISystemState, rootStateType> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, payload) {
      state.usersList = payload
    },
    changeUsersCount(state, payload) {
      state.usersCount = payload
    },
    changeRoleList(state, payload) {
      state.roleList = payload
    },
    changeRoleCount(state, payload) {
      state.roleCount = payload
    },
    changeGoodsList(state, payload) {
      state.goodsList = payload
    },
    changeGoodsCount(state, payload) {
      state.goodsCount = payload
    },
    changeMenuList(state, payload) {
      state.menuList = payload
    },
    changeMenuCount(state, payload) {
      state.menuCount = payload
    }
  },
  getters: {
    pageListData(state) {
      // return (pageName: string) => {
      //   return (state as any)[`${pageName}List`]
      // }

      return (pageNmae: string) => {
        switch (pageNmae) {
          case 'users':
            return state.usersList
            break
          case 'role':
            return state.roleList
            break
          case 'goods':
            return state.goodsList
            break
          case 'menu':
            return state.menuList
            break
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 获取数据列表逻辑
    async getPageListAction(ctx, { pageName, queryInfo }) {
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
        case 'goods':
          pageUrl = '/goods/list'
          break
        case 'menu':
          pageUrl = '/menu/list'
          break
      }

      const { data } = await getPageListData(pageUrl, queryInfo)
      const { list, totalCount } = data
      // 存储对应页面的数据
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      ctx.commit(`change${changePageName}List`, list)
      ctx.commit(`change${changePageName}Count`, totalCount)
    },
    // 删除数据逻辑
    async deletePageDataAction(ctx, payload) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deletePageData(pageUrl)
      ctx.dispatch('getPageListAction')
    },

    // 新建逻辑
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 编辑逻辑
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
export default systemModule
