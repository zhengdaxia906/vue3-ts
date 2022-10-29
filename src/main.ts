import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './service/index'
import './assets/css/index.less'
import 'normalize.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
//注册el+图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(store)
app.mount('#app')
