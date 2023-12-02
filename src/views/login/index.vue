<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/logo.svg" alt="" />
    </div>
    <div class="login_panel">
      <div class="login_panel_box">
        <div class="login_panel_img">
          <img src="../../assets/logo.svg" alt="" />
        </div>
        <div class="login_panel_text">全能</div>
        <div class="form_panel">
          <LoginForm ref="loginFormRef" :is-login="isLogin" />
        </div>
        <el-button type="primary" style="width: 100%" size="large" @click="handleLogin">{{
          isLogin ? '登录' : '注册'
        }}</el-button>
        <div class="loginOrRegister" @click="isLogin = !isLogin">
          {{ isLogin ? '注册' : '登录' }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './c-cpns/login-form.vue'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/stores/login/index'
const loginStore = useLoginStore()
const isLogin = ref<Boolean>(true)
const loginFormRef = ref<InstanceType<typeof LoginForm>>()
const handleLogin = () => {
  loginFormRef.value?.formRef?.validate(async (vaild) => {
    if (vaild) {
      const loginForm = loginFormRef.value?.loginForm
      if (isLogin.value) {
        loginStore.loginAction(loginForm)
      } else {
        console.log('注册')
      }
    } else {
      ElMessage.error('请检查表单')
    }
  })
}
</script>
<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .logo {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 4.6296rem;
      height: 4.6296rem;
    }
  }
  .login_panel {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login_panel_box {
      width: 7.4074rem;
      height: 9.2593rem;
      .login_panel_img {
        width: 100%;
        height: 1.8519rem;
        text-align: center;
        img {
          width: 1.1111rem;
          height: 1.8519rem;
        }
      }
      .login_panel_text {
        width: 100%;
        text-align: center;
        font-size: 0.5556rem;
        color: #999;
      }
      .form_panel {
        margin-top: 0.7407rem;
      }
      .loginOrRegister {
        margin-top: 0.0926rem;
        color: rgb(145, 181, 4);
        cursor: pointer;
      }
    }
  }
}
</style>
