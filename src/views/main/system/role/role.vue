<template>
  <div class="role">
    <el-card>
      <!-- 上层表单 -->
      <page-search :searchFormConfig="searchFormConfig" />
      <!-- 下层表格 -->
      <page-content
        ref="pageContentRef"
        :tableConfig="tableConfig"
        pageName="role"
        @handleEditClick="handleEditClick"
        @handleAddClick="handleAddClick"
      />
      <!-- 弹出框 -->
      <page-modal
        ref="pageModalRef"
        :modalConfig="modalConfig"
        pageName="role"
        :defaultInfo="defaultInfo"
        :otherInfo="otherInfo"
      >
        <div class="menu-tree">
          <el-tree
            ref="ElTreeRef"
            :data="menus"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheckChange"
          >
          </el-tree>
        </div>
      </page-modal>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, nextTick } from 'vue'
// import { nextTick } from '@vue/runtime-core'
import { useStore } from 'vuex'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { tableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { ElTree } from 'element-plus'
import { getMenuLeafsKey } from '@/utils/mapMenus'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 为树结构绑定默认值
    const ElTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCb = (item: any) => {
      console.log(item)
      const leafsKey = getMenuLeafsKey(item.menuList)
      nextTick(() => {
        ElTreeRef.value?.setCheckedKeys(leafsKey, false)
      })
    }
    const [pageModalRef, defaultInfo, handleAddClick, handleEditClick] =
      usePageModal(undefined, editCb)
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      pageModalRef,
      defaultInfo,
      handleAddClick,
      handleEditClick,
      menus,
      searchFormConfig,
      tableConfig,
      modalConfig,
      handleCheckChange,
      otherInfo,
      ElTreeRef
    }
  }
})
</script>

<style scoped></style>
