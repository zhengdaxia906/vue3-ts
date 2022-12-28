import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/components/breadcrumb'
let firstMenu: any = null

//根据登录用户 生成对应的路由表
export function mapMenusToRoutes(userMenus: any): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [] //最终路由表

  // 1.先加载所有路由
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/) //true false 表示是否继续递归向下查找文件夹
  // console.log('routeFiles', routeFiles.keys()) //  形式： ./product/category/category.ts
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // 2.后根据  后台返回的路由菜单 获取需要加载 的路由表
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type == 2) {
        const route = allRoutes.find((route) => route.path == menu.url)
        if (route) routes.push(route) //递归完成路由表

        if (!firstMenu) firstMenu = menu //找出路由表中第一个菜单
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}

// 根据当前路由currentPath匹配导航菜单选中项   接受用户菜单和当前页面路由url
export function matchCurrentMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type == 2 && menu.url == currentPath) {
      return menu
    } else if (menu.type == 1) {
      const result = matchCurrentMenu(menu.children ?? [], currentPath)
      if (result) {
        //顺带为面包屑生成数据
        breadcrumbs?.push({ name: menu.name, path: menu.url }) // 一级菜单
        breadcrumbs?.push({ name: result.name, path: result.url }) //二级菜单
        return result
      }
    }
  }
}

// 面包屑数组
export function MapBreadcrumb(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  matchCurrentMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
export { firstMenu }
