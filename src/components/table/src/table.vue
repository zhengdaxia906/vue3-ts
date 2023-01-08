<template>
  <div>
    <el-table :data="listData">
      <!-- 是否展示选中 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
      ></el-table-column>
      <!-- 是否展示序号 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem">
          <!-- el-table-column 提供的作用于插槽可用来访问该column接受的列数据  {row, column, $index}-->
          <template v-slot:default="{ row }">
            <!-- 利用定义的作用域插槽反向传递数据给父组件 -->
            <slot :name="propItem.slotName" :row="row">{{
              row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'table',
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {}
  }
})
</script>
<style scoped lang="less"></style>
