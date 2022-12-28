<template>
  <div class="LyForm">
    <el-form label-width="100px">
      <el-row>
        <template v-for="item in formItem" :key="(item, label)">
          <el-col :span="8">
            <el-form-item :label="item.label" :rules="item.rules">
              <!-- 输入框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="ítem.type === 'password'"
                ></el-input>
              </template>
              <!-- 选择框 -->
              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" style="width: 100%">
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ options.title }}
                  </el-option>
                </el-select>
              </template>
              <!-- 日期 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker v-bind="item.otherOptions" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'
import { IFormItem } from '../types'
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
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })
    watch(formData, (newValue) => {
      emit('update:modelValue', newValue), { deep: true }
    })
    return {
      formData
    }
  }
})
</script>
<style scoped lang="less"></style>
