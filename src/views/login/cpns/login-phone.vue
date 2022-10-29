<template>
  <div class="loginPhone">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })

    return {
      phone
    }
  }
})
</script>

<style scoped>
.loginPhone {
  margin: 20px 0 0 0;
}
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
  width: 100%;
}
</style>
