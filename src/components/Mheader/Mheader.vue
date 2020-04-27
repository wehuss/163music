<template>
  <div class="fixed">
    <nav class="nav-wrapper">
      <div class="nav-left">
        <svg
          @click="show"
          t="1584082305723"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4034"
          width="24"
          height="24"
        >
          <path
            d="M904 160H120a8 8 0 0 0-8 8v64c0 4.416 3.584 8 8 8h784a8 8 0 0 0 8-8v-64a8 8 0 0 0-8-8z m0 624H120a8 8 0 0 0-8 8v64c0 4.384 3.584 8 8 8h784a8 8 0 0 0 8-8v-64a8 8 0 0 0-8-8z m0-312H120a8 8 0 0 0-8 8v64c0 4.384 3.584 8 8 8h784a8 8 0 0 0 8-8v-64a8 8 0 0 0-8-8z"
            p-id="4035"
          ></path>
        </svg>
      </div>
      <div class="nav-center">
        <router-link
          v-for="(item, index) in link"
          :key="index"
          :to="item.path"
          :tag="'span'"
          class="nav-c"
          >{{ item.name }}</router-link
        >
      </div>
      <router-link class="nav-right" :tag="'span'" :to="'search'">
        <svg
          t="1584084241946"
          class="search"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5498"
          width="24"
          height="24"
        >
          <path
            d="M863.38 825.09L714.17 675.88c48.01-57.12 74.18-128.58 74.18-204.08 0-84.89-33.06-164.7-93.08-224.72C635.24 187.05 555.44 154 470.55 154c-84.89 0-164.7 33.06-224.72 93.08s-93.08 139.83-93.08 224.72 33.06 164.7 93.08 224.72 139.83 93.08 224.72 93.08c76.22 0 148.33-26.67 205.72-75.56l149.08 149.08a26.805 26.805 0 0 0 19.01 7.88c6.88 0 13.76-2.63 19.01-7.88a26.805 26.805 0 0 0 7.88-19.01c0-6.89-2.62-13.77-7.87-19.02zM206.53 471.8c0-145.58 118.44-264.02 264.02-264.02 145.58 0 264.02 118.44 264.02 264.02S616.13 735.82 470.55 735.82c-145.58 0-264.02-118.44-264.02-264.02z"
            fill="#333333"
            p-id="5499"
          ></path>
        </svg>
      </router-link>
      <!-- 用户中心弹出层 -->
      <van-popup
        v-model="isShow"
        position="left"
        :style="{ height: '100%', width: '70%' }"
      >
        <user></user>
      </van-popup>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue'
import { Popup } from 'vant'
import user from '../user/user'

Vue.use(Popup)

export default {
  data () {
    return {
      link: [
        { name: '我的', path: '/my' },
        { name: '发现', path: '/find' },
        { name: '关于', path: '/about' },
        { name: '视频', path: '/video' }
      ],
      isShow: false
    }
  },
  methods: {
    show () {
      this.isShow = !this.isShow
    }
  },
  components: {
    user
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";
.fixed {
  position: fixed;
  top: 0;
  width: 100%;
  background: #ffffff;
  z-index: 999;
  .nav-wrapper {
    height: 7vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $fc-c;
    .nav-left,
    .nav-right {
      flex: 1.5;
      display: flex;
      justify-content: center;
    }
    .nav-center {
      flex: 7;
      font-size: $font-m;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .router-link-active {
        font-size: $font-a;
        font-weight: bold;
        color: #000;
      }
    }
  }
}
</style>
