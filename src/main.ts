import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import './assets/css/index.less'
import 'normalize.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
//注册el+图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store)
setupStore() //注意这里顺序。每次刷新先加载获取的路由表再生成路由
app.use(router)
app.mount('#app')
