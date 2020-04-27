<template>
  <div class="video-class">
    <Item
      v-for="(item, index) in videos"
      :key="index"
      :mvData="item"
    ></Item>
  </div>
</template>

<script>
import Item from '../video-item/video-item'
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)
export default {
  props: {
    tagId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      videos: []
    }
  },
  methods: {
    _getVideoClass () {
      this.api
        .getVideoClass({
          id: this.tagId
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            res.data.datas.forEach(item => {
              this.videos.push(item.data)
            })
          }
          // this.videos = res.datas
        }).catch(res => Toast.fail('需要登陆'))
    }
  },
  created () {
    this._getVideoClass()
  },
  components: {
    Item
  }
}
</script>

<style lang="scss" scoped>
.video-class {
  background: black;
}
</style>
