<!--  -->
<template>
  <div class="page-content">
    <ly-table
      :listData="dataList"
      :listCount="listCount"
      v-bind="tableConfig"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleAddClick"
        >
          新建用户
        </el-button>
      </template>
      <!-- 对状态参数做处理 -->
      <template v-slot:status="{ row }">
        <el-button :type="row.enable ? 'success' : 'danger'">
          {{ row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            icon="Edit"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            icon="Delete"
            size="mini"
            type="text"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 动态生成特殊类型插槽 配合特殊页面使用 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        v-slot:[item.slotName]="{ row }"
      >
        <slot :name="item.slotName" :row="row"></slot>
      </template>
    </ly-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import lyTable from '@/components/table'
import { usePermission } from '@/hooks/usePermission'
export default defineComponent({
  name: '',
  components: {
    lyTable
  },
  props: {
    tableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['handleEditClick', 'handleAddClick'],
  setup(props, { emit }) {
    const store = useStore()
    // 获取当前页面的操作权限
    const options = ['create', 'update', 'delete', 'query']
    interface MyObject {
      [key: string]: string
    }
    const isOptions: MyObject = {}
    options.forEach((item) => {
      const _item = 'is' + item.slice(0, 1).toUpperCase() + item.slice(1)
      isOptions[_item as keyof typeof isOptions] = usePermission(
        props.pageName,
        item
      )
    })
    // const isCreate = usePermission(props.pageName, 'create')
    // const isUpdate = usePermission(props.pageName, 'update')
    // const isDelete = usePermission(props.pageName, 'delete')
    // const isQuery = usePermission(props.pageName, 'query')
    // 页面信息
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 请求数据       EP:额外参数
    const getPageData = (EP: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...EP
        }
      })
    }
    getPageData()

    //从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const listCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    console.log(dataList)

    // 动态生成特殊类型插槽  常见插槽之外的
    const commonSlots = ['status', 'createAt', 'updateAt', 'handler']
    const otherPropSlots = props.tableConfig?.propList.filter(
      (item: any) => !commonSlots.includes(item.slotName) && 'slotName' in item
    )
    // 表格业务 增删改
    const handleEditClick = (item: any) => {
      console.log(item)

      emit('handleEditClick', item)
    }
    const handleAddClick = () => {
      emit('handleAddClick')
    }
    const hanldeDeleteClick = (item: any) => {
      console.log(item)
    }
    return {
      getPageData,
      dataList,
      listCount,
      otherPropSlots,
      ...isOptions,
      handleEditClick,
      handleAddClick,
      hanldeDeleteClick
    }
  }
})
</script>
<style scoped lang="less">
.page-content {
  border-top: 20px solid #f5f5f5;
}
</style>
