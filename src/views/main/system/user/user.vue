<template>
  <div class="user">
    <el-card>
      <!-- 上层表单 -->
      <page-search
        :searchFormConfig="searchFormConfig"
        @reset="handleResetClick"
        @queryClick="handleQueryClick"
      />
      <!-- 下层表格 -->
      <page-content
        ref="pageContentRef"
        :tableConfig="tableConfig"
        pageName="users"
        @handleEditClick="handleEditClick"
        @handleAddClick="handleAddClick"
      />
      <!-- 弹出框 -->
      <page-modal
        ref="pageModalRef"
        :modalConfig="modalConfigRef"
        pageName="users"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
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
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // const pageModalRef = ref<InstanceType<typeof PageModal>>()
    // console.log(pageModalRef.value)

    //  在第一次设计双向绑定v-model=formDate的时候，之所以用ref 是因为 ref是将值包裹成对象再去代理。
    // 若用的是reactive,当子组件update响应更新值的时候，本组件相当于作了一步:formData = newValue,
    // 此时的formData存储的就不是当初reactive代理返回的，响应性连接丢失，需要搭配toRefs使用过于麻烦
    // 改为用ref 模板上会自动解包  则相当于:formData.value = newValue，此时的formData是一直处于响应连接状态
    // let formData = ref({
    //   id: '',
    //   name: '',
    //   password: '',
    //   realname: '',
    //   cellphone: '',
    //   enable: '',
    //   createAt: ''
    // })
    // 更新为:在user父组件同时利用对应hooks充当通信桥梁
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // pageModal相关hook逻辑
    const addCb = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCb = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    // 加载部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const department = modalConfig.formItems.find((item) => {
        return item.field === 'departmentId'
      })
      department!.options = store.state.entireDepartment.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      const role = modalConfig.formItems.find((item) => {
        return item.field === 'roleId'
      })
      role!.options = store.state.entireRole.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })
    console.log(modalConfigRef)
    // //????? 调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleAddClick, handleEditClick] =
      usePageModal(addCb, editCb)
    const res = usePageModal(addCb, editCb)
    console.log(
      [...res] == [pageModalRef, defaultInfo, handleAddClick, handleEditClick]
    )
    // console.log(res)
    return {
      searchFormConfig, //配置项,
      tableConfig,
      modalConfigRef,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      handleAddClick,
      handleEditClick,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less">
.formHandle {
  text-align: right;
  padding: 0 40px;
}
</style>
