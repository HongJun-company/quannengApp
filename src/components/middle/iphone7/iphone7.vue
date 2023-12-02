<template>
  <div class="nyTop">
    <div class="iphone7">
      <div class="signalBox">
        <div class="signalMobile">
          <i class="fill1"></i>
          <i class="fill2" :style="{ opacity: signalActive && signalActive < 2 ? 0.2 : 1 }"></i>
          <i class="fill3" :style="{ opacity: signalActive && signalActive < 3 ? 0.2 : 1 }"></i>
          <i class="fill4" :style="{ opacity: signalActive && signalActive < 4 ? 0.2 : 1 }"></i>
        </div>
        <div class="signal">{{ mobileSignal }}</div>
        <div v-if="!wifiConfig" class="signal">4G</div>
        <img v-if="wifiConfig" class="wifi" src="./Icon/WIFI.png" />
      </div>
      <div class="time">{{ time }}</div>
      <div class="batteryBox">
        <img v-if="location" src="./Icon/location.jpg" alt="" />
        <div class="text" v-if="batteryNumber">{{ electricity }}%</div>
        <div class="battery">
          <div class="left"></div>
          <div class="right"></div>
          <div
            class="middle"
            :style="{
              width: electricity + '%',
              background: charge
                ? 'rgb(33, 238, 65)'
                : electricity && electricity <= 20
                  ? 'red'
                  : '#000'
            }"
          ></div>
          <img v-if="charge" class="lightning" src="./Icon/lightning.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IProps } from '@/components/middle/iphone13以上/type/index'
defineProps<IProps>()
</script>
<style scoped lang="less">
.iphone7 {
  height: 0.3704rem;
  padding: 0.1481rem 0.1852rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;

  .batteryBox {
    display: flex;
    align-items: center;
    img {
      width: 13px;
      height: 13px;
    }
    .text {
      font-weight: 500;
      font-size: 0.2222rem;
      font-family: FonfamilyA02;
      box-sizing: border-box;
    }
    .battery {
      position: relative;
      width: 0.463rem;
      height: 0.2037rem;
      opacity: 1;
      .left {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 90.72%;
        height: 0.2037rem;
        opacity: 0.2;
        border: 0.0278rem solid #000;
        border-radius: 0.0741rem;
      }
      .right {
        position: absolute;
        left: 0.4954rem;
        top: 0.0833rem;
        width: 6.19%;
        height: 46.36%;
        opacity: 0.2;
        background: #000;
        border-top-right-radius: 0.037rem;
        border-bottom-right-radius: 0.037rem;
      }
      .middle {
        position: absolute;
        left: 0.037rem;
        top: 0.037rem;
        width: 49.48%;
        max-width: 0.3843rem;
        height: 79.64%;
        opacity: 0.9;
        background: #000;
        border-radius: 0.0556rem;
      }
      .lightning {
        position: absolute;
        width: 0.2222rem;
        height: 0.2222rem;
        top: 0;
        left: 0.0926rem;
        z-index: 9999;
      }
    }
  }
  .signalBox {
    display: flex;
    align-items: center;
    .signalMobile {
      position: relative;
      width: 0.3704rem;
      height: 0.2037rem;
      opacity: 1;
      .fill1 {
        position: absolute;
        left: 0px;
        top: 0.1106rem;
        width: 18.91%;
        height: 43.48%;
        border-radius: 0.037rem;
        opacity: 1;
        background: #000;
      }
      .fill2 {
        position: absolute;
        left: 0.085rem;
        top: 0.085rem;
        width: 18.91%;
        height: 56.52%;
        border-radius: 0.037rem;
        opacity: 1;
        background: #000;
      }
      .fill3 {
        position: absolute;
        left: 0.1698rem;
        top: 0.0426rem;
        width: 18.91%;
        height: 76.26%;
        border-radius: 0.037rem;
        opacity: 1;
        background: #000;
      }
      .fill4 {
        position: absolute;
        left: 0.2552rem;
        top: 0px;
        width: 18.91%;
        height: 100%;
        opacity: 0.2;
        border-radius: 0.037rem;
        background: #000;
      }
    }
    .signal {
      display: inline-block;
      margin-right: 0.0556rem;
      line-height: 0.2222rem;
      font-weight: 500;
      font-size: 0.2222rem;
    }
    .wifi {
      width: 0.2963rem;
      height: 0.2963rem;
    }
  }

  .fg {
    margin-left: 0.0556rem;
  }
  .time {
    font-weight: 600;
    font-size: 0.2222rem;
    letter-spacing: 0.0185rem;
    font-family: FonfamilyA02;
    box-sizing: border-box;
    padding-left: 0.1852rem;
  }
}
</style>
