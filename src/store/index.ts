import { createStore } from 'vuex'
import { rootStateType } from './type'
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
export default store
