<template>
  <div class="user">
    <h2>user</h2>
    <LyForm :formItems="formItems" v-model="formData" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LyForm, { LyFormConfig } from '@/components/form'
export default defineComponent({
  name: 'user',
  component: {
    LyForm
  },
  setup() {
    // const formConfig: LyFormConfig = {
    //   fromItems: [
    //     {
    //       label: '用户名',
    //       placeholder: '请输入用户名'
    //     },
    //     {
    //       label: '密码',
    //       placeholder: '请输入密码'
    //     },
    //     {
    //       label: '喜欢的运动',
    //       placeholder: '请输入喜欢的运动'
    //     },
    //     {
    //       label: '创建时间',
    //       placeholder: '请选择创建时间的范围'
    //     }
    //   ]
    // }
    return {
      // formConfig
    }
  }
})
</script>

<style scoped></style>
