<!--  -->
<template>
  <div class="wrap">
    <h3>后台管理系统<span> &nbsp;</span></h3>
    <div class="tabpane">
      <el-tabs type="border-card" :stretch="true" v-model="currentTab">
        <el-tab-pane name="account">
          <template v-slot:label>
            <span class="label">
              <ElIcon :size="15" color="hotpink">
                <UserFilled />
              </ElIcon>
              账号登录</span
            >
          </template>
          <loginAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template v-slot:label>
            <span class="label">
              <ElIcon :size="15" color="hotpink">
                <Iphone />
              </ElIcon>
              手机登录</span
            >
          </template>
          <loginPhone />
        </el-tab-pane>
      </el-tabs>
      <div class="option">
        <el-checkbox label="记住密码" name="type" v-model="isSavePwd" />
        <el-link type="primary">忘记密码</el-link>
      </div>
      <div class="btn-wrap">
        <el-button type="primary" class="login-btn" @click="loginHandler"
          >立即登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
// interface DataProps {}
export default defineComponent({
  name: '',
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    const currentTab = ref<string>('account')

    const isSavePwd = ref(true)
    type loginAccountType = InstanceType<typeof loginAccount> //loginAccount组件实例类型
    const accountRef = ref<loginAccountType>()
    // console.log(accountRef)

    const loginHandler = () => {
      if (currentTab.value == 'account') {
        // console.log(accountRef)
        accountRef.value?.login(isSavePwd.value)
      } else {
        // 手机登录
      }
    }
    return {
      currentTab,
      isSavePwd,
      accountRef,
      loginHandler
    }
  }
})
</script>
<style scoped lang="less">
.wrap {
  width: 320px;
  padding: 20px;
  background: hsla(0, 0%, 100%, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tabpane {
  width: 320px;
  //   margin-bottom: 150px;

  .label {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn-wrap {
    margin: 0 auto;
    .login-btn {
      width: 100%;
      margin-top: 10px;
    }
  }
}

h3 {
  position: relative;
  float: left;
  color: hotpink;
  font-family: 'Inconsolata', Consolas, monospace;
  font-size: 36px;
  //   margin: 100px;
}
h3 span {
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  width: 100%;
  border-left: 0.1em solid transparent;
  -webkit-animation: typing 3s steps(16) forwards, cursor 1s infinite;
  animation: typing 3s steps(16) forwards, cursor 1s infinite;
}
/* Animation */
@-webkit-keyframes typing {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
@-webkit-keyframes cursor {
  50% {
    border-color: white;
  }
}
@keyframes typing {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
@keyframes cursor {
  50% {
    border-color: white;
  }
}
</style>
