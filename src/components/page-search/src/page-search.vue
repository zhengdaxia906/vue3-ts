<!--  -->
<template>
  <div class="page-search">
    <ly-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="Refresh" @click="reset">重置</el-button>
          <el-button type="primary" icon="Search" @click="queryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </ly-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LyForm from '@/components/form'
export default defineComponent({
  name: '',
  components: {
    LyForm
  },
  emits: ['reset', 'queryClick'],
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? []
    // 初始化表单源数据
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 重置
    const reset = () => {
      formData.value = formOriginData
      emit('reset')
    }
    // 查询
    const queryClick = () => {
      emit('queryClick', formData.value)
    }
    return {
      formData,
      reset,
      queryClick
    }
  }
})
</script>
<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0 40px 30px 0;
  .el-button {
    text-align: center;
  }
}
</style>
