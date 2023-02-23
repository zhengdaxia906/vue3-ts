<template>
  <div class="login">
    <login-tab></login-tab>
    <p>LALAL</p>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import loginTab from './cpns/login-tab.vue'
export default defineComponent({
  components: {
    loginTab
  },
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/img/login_bg.jpg') no-repeat;
  background-size: 100% 100%;
}
</style>
