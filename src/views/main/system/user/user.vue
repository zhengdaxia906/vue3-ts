<template>
  <div class="user">
    <el-card>
      <!-- 上层表单 -->
      <ly-form v-bind="searchFormConfig" v-model="formData" ref="lyFormEl">
        <template v-slot:header>
          <h2>头部插槽</h2>
        </template>
        <template v-slot:footer>
          <div class="formHandle">
            <el-button type="primary" @click="reset">重置</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </template>
      </ly-form>
    </el-card>
    <el-card>
      <!-- 下层表格 -->
      <div class="content">
        <ly-table :listData="userList" v-bind="tableConfig">
          <!-- 对状态参数做处理 -->
          <template v-slot:status="{ row }">
            <el-button :type="row.enable ? 'success' : 'danger'">
              {{ row.enable ? '启用' : '禁用' }}</el-button
            >
          </template>
        </ly-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { nextTick } from '@vue/runtime-core'
import LyForm from '@/components/form'
import LyTable from '@/components/table'
import { searchFormConfig } from './config/search.config'
export default defineComponent({
  name: 'user',
  components: {
    LyForm,
    LyTable
  },
  setup() {
    let formData = ref({
      id: '',
      name: '',
      password: '',
      realname: '',
      cellphone: '',
      enable: '',
      createAt: ''
    })
    const lyFormEl = ref<any | HTMLElement>(null)
    const submit = () => {
      const valid = lyFormEl.value.checkForm()
      if (valid) {
        // 通过校验
      }
    }
    // 表格相关
    const store = useStore()
    store.dispatch('system/getPageList', {
      pageUrl: 'users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    // console.log('userList', userList)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      },
      { label: '操作', minWidth: '120', slotName: 'handler' }
    ]
    const tableConfig = {
      showSelectColumn: true,
      showIndexColumn: true,
      propList: propList
    }

    return {
      formData, //表单值
      searchFormConfig, //配置项,
      userList,
      propList,
      tableConfig,
      lyFormEl,
      submit
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
