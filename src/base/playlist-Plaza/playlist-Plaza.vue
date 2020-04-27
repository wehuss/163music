<template>
  <div class="content">
    <div class="test"></div>
    <backHeader :title="'歌单广场'" :bgc="'#ffffff'"></backHeader>
    <van-tabs swipeable sticky lazy-render>
      <van-tab v-for="(item, index) in ClassName" :key="index" :title="item">
        <playListClass :listClass="item"></playListClass>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs } from 'vant'
import playListClass from 'base/playlistClass/playlistClass'
import backHeader from 'base/back-header/back-header'

Vue.use(Tab)
Vue.use(Tabs)
export default {
  data () {
    return {
      ClassName: ['华语', '日语', '欧美', '流行', '说唱', 'ACG', '游戏']
    }
  },
  components: {
    playListClass,
    backHeader
  }
}
</script>

<style lang="scss" scoped>
.content{
  .test{
    height: 120px;
  }
}
</style>
