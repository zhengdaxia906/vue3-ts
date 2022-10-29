<!--  -->
<template>
  <div class="loginAccount">
    <el-form :model="form" label-width="60px" size="large" :ref="formRef">
      <el-form-item label="帐号">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'
export default defineComponent({
  name: '',
  setup() {
    const store = useStore()
    //表单数据
    const form = reactive({
      name: localCache.getCache('account') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    // 取出表单组件创建对应类型
    type ElFormType = InstanceType<typeof ElForm>
    const formRef = ref<ElFormType>()

    const login = (isSavePwd: boolean) => {
      // 1.保存密码相关
      if (isSavePwd) {
        localCache.setCache('account', form.name)
        localCache.setCache('password', form.password)
      } else {
        localCache.deleteCache('account')
        localCache.deleteCache('password')
      }
      // 2.请求登录
      console.log('login')
      store.dispatch('login/accountLoginAction', { ...form })
    }

    return {
      form,
      formRef,
      login
    }
  }
})
</script>
<style scoped lang="less">
.loginAccount {
  margin: 20px 0 0 0;
}
</style>
