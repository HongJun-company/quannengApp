<template>
  <div class="main_home">
    <div class="info">
      <h3>会员权限:{{ msgI }}</h3>
      <span>账号:{{ usernameI }}</span>
      <span>邀请码:{{ inviteCodeI }}</span>
      <span>验证卡密</span>
      <span>公告</span>
      <span>修改密码</span>
      <span>更新日志</span>
      <span @click="undoLogin">退出</span>
      <span>设置</span>
    </div>
    <div class="main_home_panel">
      <div class="menus">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          text-color="black"
          active-text-color="#fff"
          @select="menuItemActive"
        >
          <el-menu-item index="1">娱乐APP</el-menu-item>
          <el-menu-item index="2">娱乐APP</el-menu-item>
          <el-menu-item index="3">娱乐APP</el-menu-item>
          <el-menu-item index="4">娱乐APP</el-menu-item>
          <el-menu-item index="5">娱乐APP</el-menu-item>
          <el-menu-item index="6">娱乐APP</el-menu-item>
          <el-menu-item index="7">娱乐APP</el-menu-item>
          <el-menu-item index="8">娱乐APP</el-menu-item>
          <el-menu-item index="9">娱乐APP</el-menu-item>
        </el-menu>
      </div>
      <div class="bank_panel">
        <el-row :gutter="20">
          <template v-for="item in bankArrItem" :key="item.bankName">
            <el-col :span="4" @click="tabsAdds(item)">
              <div class="bank_item">
                <img src="@/assets/logo.svg" />
                <div class="bank_text">Vue3</div>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import bankArr from './data'
import { mapBankArr } from '@/utils/mapBankArr'
import bus from '@/plugins/mitt'
import router from '@/router'
import useMainStore from '@/stores/main'
import useLoginStore from '@/stores/login'
import { localCache } from '@/utils/cache'
const mainStore = useMainStore()
const { userId } = useLoginStore()
const msgI = ref()
const inviteCodeI = ref()
const usernameI = ref()
onMounted(async () => {
  await mainStore.getUserInfoAction(userId)
  await mainStore.getUserStatus(userId)
  msgI.value = mainStore.msg
  usernameI.value = mainStore.username
  inviteCodeI.value = mainStore.inviteCode
})
const bankArrItem = ref(bankArr)

const menuItemActive = (args: any) => {
  const arr = mapBankArr(bankArr, args)

  bankArrItem.value = arr
}

const tabsAdds = (itemData: any) => {
  bus.emit('tagsAdd', itemData)

  router.push({ path: itemData.route })
}

const undoLogin = () => {
  localCache.deleteCache('token')
  localCache.deleteCache('userId')
  localCache.deleteCache('tags')
  router.push('/login')
}
</script>
<style scoped lang="less">
.main_home {
  height: 100%;
  width: 100%;
  .info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    span {
      color: rgb(0, 170, 127);
      cursor: pointer;
      font-weight: 600;
      &:hover {
        color: black;
      }
    }
  }
  .main_home_panel {
    width: 90%;
    height: 11rem;
    border: 1px solid #efefef;
    margin-left: 4%;
    display: flex;
    .menus {
      width: 13%;
      height: 11rem;
      overflow: hidden;
      border-right: 1px solid #efefef;
    }
    .bank_panel {
      width: 17.7778rem;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
      .bank_item {
        height: 2.5926rem;
        margin-top: 0.3704rem;
        cursor: pointer;
        text-align: center;
        .bank_text {
          margin-top: 0.0926rem;
        }
        img {
          width: 1.1111rem;
          height: 1.1111rem;
          margin-top: 0.3704rem;
        }
        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }
  :deep(.el-menu-item.is-active) {
    background-color: rgb(0, 170, 255);
  }
  .el-menu {
    border: none;
  }
}
</style>
