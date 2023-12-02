<template>
  <div class="ny">
    <Left
      @phone-item-click="phoneItemClick"
      @form-data-change="formDataChange"
      @signal-change="signalChange"
      @battery-click="batteryClick"
      @other-click="otherClick"
      @electricity-change="electricityChange"
      @signal-click="signalClick"
    />
    <div class="nyPhone" ref="poster">
      <component :is="componentPhone" v-bind="formData" />
      <template v-for="(value, key, index) of form" :key="key">
        <div
          class="item"
          :style="{
            fontSize: form[key].size + 'px',
            color: form[key].color
          }"
        >
          {{ form[key].value }}
        </div>
      </template>
      <div class="iphone13Bottom" v-if="phone === 'Iphone13以上' || phone === 'IphoneX以上'"></div>
    </div>
    <right :form="formDataNy" @form-change="formChange" />
  </div>
</template>
<script setup lang="ts">
import Left from '@/components/left/index.vue'
import right from '@/components/right/right.vue'
import bus from '@/plugins/mitt'
import { savePhoto, copyPhoto } from '@/utils/html2canvas'
import { reactive, shallowRef, ref, onMounted } from 'vue'
const poster = ref<HTMLDivElement>()
import { formDataNy } from './data/form'
let form = reactive<any>(formDataNy)

const formData = reactive({
  time: '10:48',
  wifiConfig: true,
  mobileSignal: '',
  batteryNumber: true,
  location: true,
  electricity: 40,
  signalActive: 3,
  charge: false
})
const componentPhone = shallowRef()
const phone = ref('Iphone13以上')
const formChange = (formData: any) => {
  Object.keys(form).forEach((item) => {
    form[item] = formData[item]
  })
}
const formDataChange = (formDataConfig: any) => {
  if (formDataConfig.time === '') {
    formDataConfig.time = '10:48'
  }
  formData.time = formDataConfig.time
  formData.wifiConfig = formDataConfig.wifiConfig
}
const batteryClick = (batteryNumberSwitch: boolean) => {
  formData.batteryNumber = batteryNumberSwitch
}
const electricityChange = (electricity: number) => {
  formData.electricity = electricity
}
const signalChange = (signal: string) => {
  formData.mobileSignal = signal
}
const signalClick = (signalActive: number) => {
  formData.signalActive = signalActive
}
const phoneItemClick = async (phoneItem: string) => {
  phone.value = phoneItem

  const component = await import(
    /* @vite-ignore */ `../../../components/middle/${phoneItem}/${phoneItem}.vue`
  )
  componentPhone.value = component.default
}

const otherClick = (item: { name: string; value: boolean }) => {
  if (item.name === '位置') {
    formData.location = item.value
  } else if (item.name === '充电') {
    formData.charge = item.value
  }
}

onMounted(async () => {
  phoneItemClick('Iphone13以上')
})

bus.on('bankCome', () => {
  savePhoto(poster.value)
})
bus.on('copyPhoto', () => {
  copyPhoto(poster.value)
})
bus.on('templateChange', (templateData: any) => {
  phoneItemClick(templateData.phone)
})
</script>
<style scoped lang="less">
.ny {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  .nyPhone {
    width: 6.5rem;
    height: 100%;
    box-shadow: rgba(90, 90, 90, 0.5) 0 0 0.3704rem;
    background-color: rgb(238, 238, 238);
    position: relative;
    .iphone13Bottom {
      width: 120px;
      height: 5px;
      border-radius: 10px;
      position: absolute;
      bottom: 0.0926rem;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #000000;
    }
  }
}
</style>
