<template>
  <div class="LyForm">
    <!-- 头插槽 -->
    <div class="header">
      <slot name="header" />
    </div>
    <!-- 表单主体 -->
    <el-form label-width="100px" :model="modelValue">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
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
                  :model-value="modelValue[`${item.field}`]"
                  @input="handleChange($event, item.field)"
                ></el-input>
              </template>
              <!-- 选择框 -->
              <!-- {{ 'zxf' }}
              {{ modelValue[departmentId] }} -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                  ></el-option>
                </el-select>
              </template>
              <!-- 日期 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleChange($event, item.field)"
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
// import type { FormInstance, FormRules } from 'element-plus'
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
    const handleChange = (value: any, field: string) => {
      console.log('handleChange')
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      handleChange
    }
  }
})
</script>
<style scoped lang="less"></style>
