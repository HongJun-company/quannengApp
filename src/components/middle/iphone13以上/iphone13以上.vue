<template>
  <div class="nyTop">
    <div class="iphone13">
      <div class="left">
        <div class="time">{{ time }}</div>
        <div class="location" v-if="location">
          <img src="./Icon/location.jpg" alt="" />
        </div>
      </div>
      <div class="right" :style="{ flex: location ? '2.3' : '4' }">
        <div class="signal">
          <i class="fill1"></i>
          <i class="fill2" :style="{ opacity: signalActive && signalActive < 2 ? 0.2 : 1 }"></i>
          <i class="fill3" :style="{ opacity: signalActive && signalActive < 3 ? 0.2 : 1 }"></i>
          <i class="fill4" :style="{ opacity: signalActive && signalActive < 4 ? 0.2 : 1 }"></i>
        </div>
        <img class="wifi" v-if="wifiConfig" src="./Icon/WIFI.png" alt="" />

        <div class="battery">
          <img v-if="charge" class="lightning" src="./Icon/lightning.png" />
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
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IProps } from './type'

defineProps<IProps>()
</script>
<style scoped lang="less">
.iphone13 {
  height: 0.3889rem;
  padding: 0.1481rem 0.1852rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  .left {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .time {
      width: 8%;
      height: 0.3889rem;
      opacity: 1;
      font-family: SFProDisplay-Medium;
      font-size: 0.2593rem;
      font-weight: 500;
      line-height: 0.3889rem;
      letter-spacing: 0.0013rem;
      color: #000000;
    }
    .location {
      width: 14px;
      height: 14px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    flex: 2.3;
    display: flex;
    justify-content: flex-end;
    .signal {
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
    .wifi {
      width: 0.2222rem;
      height: 0.2222rem;
      margin: 0 0.037rem;
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
}
</style>
