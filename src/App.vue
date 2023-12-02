<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <RouterView />
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped lang="less">
.app {
  width: 100%;
  height: 100%;
}
</style>
