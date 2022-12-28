<template>
  <div class="nav-header">
    <el-icon class="fold" @click="handleFoldClick">
      <Fold v-if="isFold" />
      <Expand v-else />
    </el-icon>
    <div class="content">
      <LyBreadCrumb :breadcrumbs="breadcrumbs" />
      <!-- <div>面包屑</div> -->
      <!-- 用户信息下拉菜单 -->
      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span class="username">{{ '临远' }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import LyBreadCrumb, { IBreadcrumb } from '@/components/breadcrumb'
import { MapBreadcrumb } from '@/utils/mapMenus'
export default defineComponent({
  name: '',
  components: {
    LyBreadCrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    // 收缩开关
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    // 面包屑数据 [{name:,path:}]

    const breadcrumbs = computed(() => {
      const userMenus = useStore().state.login.userMenus
      const currentPath = useRoute().path
      return MapBreadcrumb(userMenus, currentPath)
    })
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>
<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  .fold {
    font-size: 30px;
  }
  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .el-dropdown-link {
      display: flex;
      align-items: center;
      color: blue;
      .username {
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}
</style>
