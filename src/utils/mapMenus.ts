//根据登录用户 生成对应的路由表

import { RouteRecordRaw } from 'vue-router'
export function mapMenusToRoutes(userMenus: any): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [] //最终路由表

  // 1.先加载所有路由
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/) //true false 表示是否继续递归向下查找文件夹
  console.log('routeFiles', routeFiles.keys()) //  形式： ./product/category/category.ts
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  console.log(allRoutes)

  // 2.后根据  后台返回的路由菜单 获取需要加载 的路由表
  const _recurseGetRoute = (menus: any[]) => {
    console.log(menus)

    for (const menu of menus) {
      if (menu.type == 2) {
        const route = allRoutes.find((route) => route.path == menu.url)
        if (route) routes.push(route) //递归完成路由表
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}
