<template>
  <div class="main">
    <div class="mainPanel">
      <el-container>
        <el-header class="header"><Breadcrumb /></el-header>
        <el-container>
          <el-main class="mainRouter">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from '@/components/Breadcrumb/index.vue'
</script>
<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  background: url('../../assets/R-C.jpg') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .mainPanel {
    width: 80%;
    height: 100%;
    background-color: #fff;
    border-radius: 0.0926rem;

    .el-container {
      height: 100%;
      .header {
        height: 0.7407rem;
        line-height: 0.7407rem;
        position: absolute;
      }
      .mainRouter {
        height: 100%;
        box-sizing: border-box;
        padding-top: 0.7407rem;
      }
    }
  }
}
</style>
