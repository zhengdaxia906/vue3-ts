<template>
  <div class="LyForm">
    <el-form label-width="100px">
      <el-row>
        <template v-for="item in formItem" :key="(item, label)">
          <el-col :span="8">
            <el-form-item :label="item.label">
              <!-- 输入框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="ítem.type === 'password'"
                ></el-input>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../types'
export default defineComponent({
  name: 'LyForm',
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>
<style scoped lang="less"></style>
