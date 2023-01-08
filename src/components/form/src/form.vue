<template>
  <div class="LyForm">
    <!-- 头插槽 -->
    <div class="header">
      <slot name="header" />
    </div>
    <!-- 表单主体 -->
    <el-form label-width="100px" ref="formEl" :model="formData">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :prop="item.field"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- 输入框 -->
              <template v-if="['input', 'password'].includes(item.type)">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type == 'password'"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <!-- 选择框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <!-- 日期 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 尾插槽 -->
    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, PropType, watch } from 'vue'
import { IFormItem } from '../types'
import type { FormInstance, FormRules } from 'element-plus'
export default defineComponent({
  name: 'LyForm',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = reactive({ ...props.modelValue })
    watch(formData, (newValue) => {
      emit('update:modelValue', newValue), { deep: true }
    })
    // 表单的校验方法
    const formEl = ref<FormInstance>()
    const checkForm = () => {
      formEl.value?.validate((valid) => {
        return valid
      })
    }
    return {
      formData,
      formEl,
      checkForm
    }
  }
})
</script>
<style scoped lang="less"></style>
