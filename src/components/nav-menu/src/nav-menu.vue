<!--  -->
<template>
  <div class="nav-menu">
    <div class="logo">
      <span class="img">
        <el-icon :size="20"><ChromeFilled /></el-icon>
      </span>
      <span v-if="!isCollapse" class="title">Vue3+Ts</span>
    </div>
    <el-menu
      :default-active="currentMenu"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="#001529"
      text-color="#b7bdc3"
      router
    >
      <!-- 二级菜单 -->
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.url + ''">
            <template v-slot:title>
              <component
                :is="item.icon.slice(7)"
                style="width: 15px; height: 15px; margin-right: 10px"
              />
              <span>{{ item.name }}</span>
            </template>
            <!-- 子标题 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.url" @click="handleMenu(subItem)">
                <i v-if="subItem.icon" :class="item.icon"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item>
            <i v-if="item.icon" :class="item.icon"></i>
          </el-menu-item>
        </template>
        <!-- <div>{{ item.id }}</div> -->
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { matchCurrentMenu } from '@/utils/mapMenus'
export default defineComponent({
  name: '',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    const route = useRoute()
    const currentPath = route.path
    // 匹配菜单选中项、
    // console.log(userMenus.value, currentPath)

    const menu = matchCurrentMenu(userMenus.value, currentPath)
    // console.log(menu)

    const currentMenu = ref(menu.id + '')
    // 菜单点击
    const handleMenu = (item: any) => {
      console.log('点击菜单')
    }
    return {
      userMenus,
      currentMenu,
      handleMenu
    }
  }
})
</script>
<style scoped lang="less">
.nav-menu {
  // color: #fff;
  font-weight: 600;
  .logo {
    color: #fff;
    display: flex;
    height: 28px;
    line-height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      padding: 0 15px 0 8px;
      line-height: 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
    // background: #001529;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    width: 200px;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
      // justify-content: center !important;
    }
  }
  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }
  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
</style>
