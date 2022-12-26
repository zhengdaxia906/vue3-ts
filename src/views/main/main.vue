<template>
  <div class="main">
    <el-container class="content">
      <!-- 左侧导航菜单 -->
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <nav-menu :isCollapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <!-- 头部导航 -->
        <el-header>
          <NavHeader @foldChange="handkeFoldChange" />
        </el-header>
        <!-- 内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
export default defineComponent({
  name: '',
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handkeFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      handkeFoldChange
    }
  }
})
</script>
<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.content {
  height: 100%;
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}
.el-header {
  height: 48px !important;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
  height: calc(100%-48px);
}
</style>
