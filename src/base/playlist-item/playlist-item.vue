<template>
  <div class="play-list">
    <div :class="{ 'list-wrapper': true, wrap: wrap }" :ref="'listWrapper'">
      <div
        class="list-item"
        v-for="(item, index) in playLists"
        :key="index"
        @click="toList(item.id)"
      >
        <div class="bgImg">
          <img v-lazy="item.bgImg" width="100%" height="auto" />
          <span class="playNum">
            <svg
              t="1583650026873"
              class="play-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1150"
            >
              <path
                d="M780.8 475.733333L285.866667 168.533333c-27.733333-17.066667-64 4.266667-64 36.266667v614.4c0 32 36.266667 53.333333 64 36.266667l492.8-307.2c29.866667-14.933333 29.866667-57.6 2.133333-72.533334z"
                p-id="1151"
                fill="#515151"
              ></path></svg
            >{{ item.playNum }} W
          </span>
          <span class="tags" v-if="item.tags">{{ item.tags }}</span>
        </div>
        <h2 class="name">{{ item.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Playlist } from '../../assets/js/song'
import { mapMutations } from 'vuex'
import { Lazyload } from 'vant'

Vue.use(Lazyload)

export default {
  props: {
    playList: {
      type: Array,
      default: () => []
    },
    wrap: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    playLists () {
      const list = []
      // 坑壁网易云，数据格式不一样
      this.playList.forEach(item => {
        let song = new Playlist(
          item.name,
          item.playCount ? item.playCount : item.playcount,
          item.coverImgUrl ? item.coverImgUrl : item.picUrl,
          item.tags ? item.tags : [],
          item.id
        )
        // let song = item.coverImgUrl ? item.coverImgUrl : item.picUrl
        list.push(song)
      })
      return list
    }
  },
  watch: {
    playList (val) {
      if (!this.wrap) {
        const itemWidth = window.innerWidth * 0.3
        console.log(itemWidth)
        // 动态设置父元素宽度，让子元素不会塌陷
        this.$refs.listWrapper.style.width = itemWidth * val.length + 'px'
        // console.dir(this.$refs.listWrapper)
      }
    }
  },
  methods: {
    toList (id) {
      console.log(id)
      this.$router.push({ path: `/playList/${id}` })
      this.setPlayList(id)
    },
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST'
    })
  }
}
</script>

<style lang="scss" scoped>
.play-list {
  font-size: 16px;
  width: 100%;
  overflow: scroll;
  scrollbar-width: 0;
  .wrap {
    flex-wrap: wrap;
    justify-content: space-around !important;
  }
  .list-wrapper {
    display: flex;
    justify-content: space-between;
    .list-item {
      width: 210px;
      margin-top: 16px;
      .bgImg {
        width: 100%;
        position: relative;
        .playNum,
        .tags {
          position: absolute;
          background: #cccccc;
          padding: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          opacity: 0.7;
          border-radius: 16px;
          color: #333333;
          max-width: 90%;
          line-height: 100%;
        }
        .playNum {
          top: 0.06rem;
          right: 0.08rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .play-icon {
            width: 20px;
            height: 20px;
          }
        }

        .tags {
          bottom: 0.12rem;
          left: 0.06rem;
        }
        img {
          border-radius: 5px;
        }
      }
      .name {
        font-size: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        line-height: 30px;
      }
    }
  }
}
</style>
