<template>
  <div class="login_form">
    <el-form :model="loginForm" ref="formRef" :rules="rules" label-width="70px" size="large">
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account" placeholder="请输入账号" prefix-icon="User" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          prefix-icon="Key"
        />
      </el-form-item>

      <el-form-item label="邀请码" prop="checkCode" v-if="!isLogin">
        <el-input v-model="loginForm.password" placeholder="请输入邀请码" prefix-icon="Link" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import type { ILoginForm } from '../type/type'
interface IProps {
  isLogin: Boolean
}
defineProps<IProps>()

const loginForm = reactive<ILoginForm>({
  account: '',
  password: '',
  checkCode: ''
})
const formRef = ref<FormInstance>()
const rules = reactive<FormRules<ILoginForm>>({
  account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  checkCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
})

defineExpose({ formRef, loginForm })
</script>
<style scoped lang="less"></style>
