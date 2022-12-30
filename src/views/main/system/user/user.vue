<template>
  <div class="user">
    <h2>user</h2>
    <ly-form v-bind="searchFormConfig" v-model="formData">
      <template v-slot:header>
        <h2>头部插槽</h2>
      </template>
    </ly-form>
    {{ formData }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import LyForm from '@/components/form'
import { searchFormConfig } from './config/search.config'
export default defineComponent({
  name: 'user',
  components: {
    LyForm
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
    return {
      formData, //表单值
      searchFormConfig //配置项
    }
  }
})
</script>

<style scoped></style>
