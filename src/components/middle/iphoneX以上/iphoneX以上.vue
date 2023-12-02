<template>
  <div class="nyTop">
    <div class="iphoneX">
      <div class="left">
        {{ time }}
        <img v-if="location" src="./Icon/location.jpg" alt="" />
      </div>
      <div class="right">
        <div class="signal">
          <i class="fill1"></i>
          <i class="fill2" :style="{ opacity: signalActive && signalActive < 2 ? 0.2 : 1 }"></i>
          <i class="fill3" :style="{ opacity: signalActive && signalActive < 3 ? 0.2 : 1 }"></i>
          <i class="fill4" :style="{ opacity: signalActive && signalActive < 4 ? 0.2 : 1 }"></i>
        </div>
        <div class="signalText" v-if="!wifiConfig">4G</div>
        <img class="wifi" v-if="wifiConfig" src="./Icon/wifi.png" alt="" />
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
import type { IProps } from '../iphone13以上/type'
defineProps<IProps>()
</script>
<style scoped lang="less">
.iphoneX {
  background-color: #fff;
  height: 0.3889rem;
  padding-top: 0.2593rem;
  padding-bottom: 0.2222rem;
  padding-right: 0.2963rem;
  padding-left: 0.3981rem;
  z-index: 9999;
  color: #000;
  line-height: 0.4444rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    font-weight: 700;
    font-size: 0.2407rem;
    letter-spacing: 0.0185rem;
    display: flex;
    align-items: center;
    img {
      width: 13px;
      height: 13px;
      margin-left: 2px;
    }
  }
  .right {
    display: flex;
    align-items: center;
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
    .signalText {
      vertical-align: top;
      font-size: 0.2222rem;
      font-weight: 450;
      font-family: FonfamilyIphoneG;
      margin-right: 0.0556rem;
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
    .wifi {
      width: 0.3333rem;
      height: 0.3333rem;
      margin-right: 0.0556rem;
    }
  }
}
</style>
