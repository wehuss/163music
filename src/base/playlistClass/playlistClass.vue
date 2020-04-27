<template>
  <div class="list-class">
    <van-loading size="54" color="#c20c0c" v-if="loading" />
    <item :playList="playList" v-else></item>
  </div>
</template>

<script>
import item from '../playlist-item/playlist-item'
import Vue from 'vue'
import { Loading } from 'vant'

Vue.use(Loading)
export default {
  props: {
    listClass: {
      type: String,
      default: ''
    }
  },
  components: {
    item
  },
  data () {
    return {
      playList: [],
      loading: true
    }
  },
  created () {
    this.api
      .getPlayList({
        cat: this.listClass,
        limit: 51
      })
      .then(res => {
        this.playList = res.playlists
        this.$nextTick(() => {
          this.loading = false
        })
      })
  }
}
</script>

<style lang="scss" scoped>
.list-class {
  margin: 20px;
  position: relative;
}
</style>
