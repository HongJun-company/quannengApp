<template>
  <div class="phone_config">
    <div class="phone_model">
      <el-row :gutter="20">
        <template v-for="phoneItem in phoneModel" :key="phoneItem">
          <el-col :span="6" @click="phoneItemClick(phoneItem)">
            <el-button class="btn" size="small" type="primary" plain>{{ phoneItem }}</el-button>
          </el-col>
        </template>
      </el-row>
    </div>
    <div class="phone_photo">
      <el-button size="large" type="success">保存高清</el-button>
      <el-button size="large" type="success" @click="savePhoto">保存图片</el-button>
      <el-button size="large" type="success" @click="copyPhoto">复制图片</el-button>
    </div>
    <div class="configPhoneTime">
      <el-row :gutter="20">
        <el-col :span="5"><span style="font-size: 0.2593rem">手机时间</span></el-col>
        <el-col :span="10"
          ><el-input v-model="configForm.time" class="input" placeholder="请输入时间" />
        </el-col>
        <el-col :span="3"><el-button size="small" @click="dateNow">取时</el-button></el-col>
        <el-col :span="5"><el-button size="small">全部随机</el-button></el-col>
      </el-row>
    </div>
    <div class="configPhoneWifi">
      <el-row :gutter="20">
        <el-col :span="4"><span style="font-size: 0.2593rem">WIFI</span></el-col>
        <el-col :span="3"><el-switch v-model="configForm.wifiConfig" /></el-col>
        <el-col :span="12">
          <el-row :gutter="20">
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
          </el-row>
        </el-col>
        <el-col :span="4"><el-button size="small">随机</el-button></el-col>
      </el-row>
    </div>
    <div class="configPhoneSignal">
      <el-row :gutter="20">
        <el-col :span="4"><span style="font-size: 0.2593rem">信号格</span></el-col>
        <el-col :span="3"><el-switch v-model="signalSwitch" disabled /></el-col>
        <el-col :span="12">
          <el-row :gutter="20">
            <el-col :span="6" v-for="index in 4" :key="index">
              <el-button @click="signalClick(index)" class="btn" type="primary" plain>
                {{ index }}格
              </el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4"><el-button size="small">随机</el-button></el-col>
      </el-row>
    </div>
    <div class="electricityConfig">
      <el-row :gutter="20">
        <el-col :span="3"><span style="font-size: 0.2593rem">电量</span></el-col>
        <el-col :span="10">
          <el-slider v-model="electricity" class="silder" size="small" input-size="small" />
        </el-col>
        <el-col :span="6">
          <el-input-number
            v-model="electricity"
            class="inputNumber"
            size="small"
            :min="1"
            :max="100"
          />
        </el-col>
        <el-col :span="5"><el-button size="small">随机</el-button></el-col>
      </el-row>
    </div>
    <div class="electricityNumber" v-if="isIphone7">
      <el-row :gutter="20">
        <el-col :span="5"><span style="font-size: 0.2593rem">电量数字</span></el-col>
        <el-col :span="14">
          <el-row :gutter="20">
            <el-col :span="6" v-for="bItem in battery" :key="bItem">
              <el-button size="small" @click="batteryClick(bItem)">{{ bItem }}</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5"><el-button size="small">随机</el-button></el-col>
      </el-row>
    </div>
    <div class="server" v-if="isIphone7">
      <el-row :gutter="20">
        <el-col :span="3"><span style="font-size: 0.2593rem">网商</span></el-col>
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8" v-for="item in signal" :key="item" @click="signalChange(item)">
              <el-button size="small">{{ item }}</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5"><el-button size="small">随机</el-button></el-col>
      </el-row>
    </div>
    <div class="otherConfig">
      <el-row :gutter="20">
        <el-col :span="19">
          <el-row :gutter="20">
            <el-col
              :span="8"
              v-for="(item, index) in other"
              :key="item.name"
              @click="otherClick(index)"
            >
              <span>{{ item.name }}</span>
              <el-switch v-model="item.value" size="small" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5"><el-button class="btn" size="small">随机</el-button></el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import bus from '@/plugins/mitt'
import { timestampToTime } from '@/utils/getDateNow'
const emit = defineEmits([
  'phoneItemClick',
  'formDataChange',
  'signalChange',
  'batteryClick',
  'otherClick',
  'electricityChange',
  'signalClick'
])
const signal = ['中国移动', '中国电信', '中国联通']
const battery = ['显示', '隐藏']
const other = ref([
  { name: '充电', value: false },
  { name: '静音', value: false },
  { name: '位置', value: true }
])
const electricity = ref(40)
const phoneModel = ref([
  'Iphone13以上',
  'Iphone7',
  // 'oppo-1',
  // 'oppo-2',
  // 'vivo-1',
  // '华为-1',
  // '华为-2',
  // '小米-1',
  // '小米-2',
  // '红米-1',
  // '红米-2',
  // '魅族-1',
  'IphoneX以上'
  // 'vivo-2'
])
const signalSwitch = true
const isIphone7 = ref<boolean>(false)
const configForm = reactive({
  time: '',
  wifiConfig: true
})
const phoneItemClick = (phoneItem: string) => {
  emit('phoneItemClick', phoneItem)
  if (phoneItem === 'Iphone7') {
    isIphone7.value = true
  } else {
    isIphone7.value = false
  }
}
const savePhoto = () => {
  bus.emit('bankCome')
}
const copyPhoto = () => {
  bus.emit('copyPhoto')
}
const dateNow = () => {
  configForm.time = timestampToTime(new Date().getTime())
}
const batteryClick = (bItem: string) => {
  const flag = bItem === '显示' ? true : false
  emit('batteryClick', flag)
}
const signalClick = (index: number) => {
  emit('signalClick', index)
}
const otherClick = (index: number) => {
  emit('otherClick', other.value[index])
}
watch(
  () => configForm,
  () => {
    emit('formDataChange', configForm)
  },
  { deep: true }
)
watch(
  () => electricity.value,
  () => {
    emit('electricityChange', electricity.value)
  }
)

function signalChange(item: string) {
  emit('signalChange', item)
}
</script>
<style scoped lang="less">
.phone_config {
  width: 7rem;
  height: 100%;
  overflow: hidden;
  .phone_model {
    box-sizing: border-box;
    padding-right: 10px;
    .btn {
      width: 1.5926rem;
      height: 0.463rem;
      margin-top: 0.0926rem;
    }
  }
  .phone_photo {
    width: 100%;
    height: 0.7407rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.3704rem;
  }
  .configPhoneTime {
    width: 100%;
    height: 0.9259rem;
    line-height: 0.9259rem;
    margin-top: 0.0926rem;
  }
  .configPhoneWifi {
    width: 100%;
    height: 0.9259rem;
    line-height: 0.9259rem;
    margin-top: 0.0926rem;
    .btn {
      width: 0.7407rem;
      height: 0.4259rem;
    }
  }
  .configPhoneSignal {
    width: 100%;
    height: 0.9259rem;
    line-height: 0.9259rem;
    margin-top: 0.0926rem;
    .btn {
      width: 0.7407rem;
      height: 0.4259rem;
    }
  }
  .electricityConfig {
    width: 100%;
    height: 0.9259rem;
    line-height: 0.9259rem;
    margin-top: 0.0926rem;
    .silder {
      margin-top: 0.2315rem;
    }
    .inputNumber {
      width: 1.6667rem;
      height: 0.3704rem;
    }
  }
  .electricityNumber {
    width: 100%;
    height: 0.9259rem;
    line-height: 0.9259rem;
    margin-top: 0.0926rem;
    .btn {
      width: 0.7407rem;
      height: 0.4259rem;
    }
  }
  .server {
    width: 100%;
    height: 0.9259rem;
    line-height: 0.9259rem;
    margin-top: 0.0926rem;
    .btn {
      width: 0.7407rem;
      height: 0.4259rem;
    }
  }
  .otherConfig {
    height: 1.0741rem;
    background-color: rgb(247, 247, 247);
    .btn {
      margin-top: 0.2778rem;
    }
  }
}
</style>
