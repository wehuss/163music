<template>
  <div class="video">
    <router-view></router-view>
    <van-tabs v-model="active" sticky animated id="tabs">
      <van-tab v-for="(item,index) in videoTags" :key="index" :title="item.name">
        <VideoClass :tagId="item.id"></VideoClass>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs } from 'vant'

import VideoClass from 'base/video-class/video-class'

Vue.use(Tab)
Vue.use(Tabs)

export default {

  data () {
    return {
      active: 0,
      videoTags: [
        {
          id: 1100,
          name: '音乐现场'
        },
        {
          id: 4107,
          name: '说唱'
        },
        {
          id: 4105,
          name: '摇滚'
        },
        {
          id: 4108,
          name: '冻鳗'
        },
        {
          id: 3102,
          name: '二刺螈'
        },
        {
          id: 57110,
          name: '饭拍现场'
        },
        {
          id: 9102,
          name: '演唱会'
        }
      ]
    }
  },
  components: {
    VideoClass
  }
}
</script>

<style scoped lang="scss">
// @import '~@/assets/styles/vant2.css'
.video{
    margin-top: 7vh;
}
</style>
