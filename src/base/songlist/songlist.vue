<template>
  <div class="songlist">
    <van-swipe class="songs-swipe" :show-indicators="false">
      <van-swipe-item v-for="(song, index) in songItem" :key="index">
        <div class="song-item" v-for="(item, itemKey) in song" :key="itemKey">
          <div class="song" @click="_setSonglist(index, itemKey)">
            <div class="song-img">
              <img :src="item.album.blurPicUrl" />
            </div>
            <div class="desc">
              <p class="title">{{ item.name }}</p>
              <span class="singer">{{ item.artists[0].name }}</span>
            </div>
            <div class="play">
              <svg
                t="1584350004958"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1907"
                width="30"
                height="30"
              >
                <path
                  d="M698.88 464.668444L451.868444 314.88a41.301333 41.301333 0 0 0-26.908444-10.24c-20.48 0-37.091556 15.36-40.96 34.588444v7.68c0 2.56 0 6.371556 1.308444 8.931556v305.948444a42.666667 42.666667 0 0 0 42.211556 42.211556 47.616 47.616 0 0 0 25.6-8.931556l248.32-151.04a43.52 43.52 0 0 0 26.908444-39.708444c-3.868444-17.92-14.108444-33.28-29.468444-39.651556zM513.308444 12.8A497.664 497.664 0 0 0 15.36 510.748444a497.664 497.664 0 0 0 497.948444 497.891556 497.664 497.664 0 0 0 497.891556-497.891556A497.664 497.664 0 0 0 513.308444 12.8z m0 913.92c-238.08 0-430.08-189.44-430.08-422.4S275.228444 81.92 513.308444 81.92s430.08 189.44 430.08 422.4-193.308444 422.4-430.08 422.4z"
                  p-id="1908"
                  fill="#d81e06"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'vant'
import { mapActions } from 'vuex'
import { Song } from '../../assets/js/song'

Vue.use(Swipe)
Vue.use(SwipeItem)
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    recommendSongs () {
      const songsArray = []
      this.songs.forEach(item => {
        let song = new Song(item.name, item.id, item.artists)
        songsArray.push(song)
      })
      return songsArray
    },
    songItem () {
      let item = []
      item[0] = this.songs.slice(0, 3)
      item[1] = this.songs.slice(3, 6)
      return item
    }
  },
  methods: {
    ...mapActions(['setSonglist']),
    _setSonglist (index, key) {
      if (index === 1) {
        key = key + 3
      }
      const songList = {
        data: this.recommendSongs,
        playIndex: key
      }
      this.setSonglist(songList)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";

.songlist {
  .songs-swipe {
    .van-swipe-item {
      .song-item {
        display: flex;
        align-content: center;
        .song {
          display: flex;
          height: 140px;
          align-items: center;
          width: 100%;
          .song-img {
            width: 120px;
            img {
              border-radius: 12%;
              width: 100%;
              min-height: 120px;
            }
          }
          .desc {
            margin-left: 20px;
            width: 60%;
            max-height: 140px;
            .title {
              @include no-wrap;
              font-size: 36px;
              line-height: 70px;
              // max-width: 70%;
            }
            .singer {
              font-size: 28px;
              max-width: 56vw;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 70px;
            }
          }
        }
        .play {
          margin-left: 60px;
        }
      }
    }
  }
}
</style>
