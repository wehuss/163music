<template>
  <transition name="offset" appear>
    <div class="play-list" @scroll.self="scroll" :ref="'playList'">
      <div class="loading" v-if="loading">
        <van-loading size="54" color="#c20c0c" />
      </div>
      <div class="top-bg" :style="{ opacity: opacity }"></div>
      <backHeader :title="title" :ref="'bHeader'"></backHeader>
      <div class="creator">
        <img :src="playList.coverImgUrl" class="bgImg" />
        <div class="bg-filter"></div>
        <div class="playlist-content">
          <div class="desc">
            <div class="desc-img">
              <img :src="playList.coverImgUrl" />
            </div>
            <div class="creator-desc">
              <h2 class="title">{{ playList.name }}</h2>
              <div class="user">
                <img :src="creator.avatarUrl" class="user-avatar" />
                <span class="user-name">{{ creator.nickname }}</span>
              </div>
              <p class="description" @click="show = !show">
                {{ playList.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="more">
        <div
          class="menu-item"
          v-for="(item, index) in menuLink"
          :key="index"
          @click="toComment"
        >
          <div class="menu-icon">
            <img :src="item.imgUrl" width="80%" height="80%" />
          </div>
          <p class="menu-name">{{ item.name }}</p>
        </div>
      </div>
      <div class="songs-wrapper" :ref="'songs'">
        <div :class="{ 'play-all': true, 'fixed-top': isTop }">
          <svg
            t="1585814967257"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2293"
            width="30"
            height="30"
            @click="_setSonglist()"
          >
            <path
              d="M510.7 962.4c-60.7 0-119.5-11.9-175-35.3-53.5-22.6-101.6-55-142.9-96.3-41.3-41.3-73.7-89.3-96.3-142.9-23.4-55.4-35.3-114.3-35.3-175s11.9-119.5 35.3-175c22.6-53.5 55-101.6 96.3-142.9 41.3-41.3 89.3-73.7 142.9-96.3 55.4-23.4 114.3-35.3 175-35.3s119.5 11.9 175 35.3c53.5 22.6 101.6 55 142.9 96.3 41.3 41.3 73.7 89.3 96.3 142.9 23.4 55.4 35.3 114.3 35.3 175s-11.9 119.5-35.3 175c-22.6 53.5-55 101.6-96.3 142.9-41.3 41.3-89.3 73.7-142.9 96.3-55.5 23.4-114.3 35.3-175 35.3z m0-854.9c-223.5 0-405.4 181.9-405.4 405.4s181.9 405.4 405.4 405.4 405.4-181.9 405.4-405.4-181.9-405.4-405.4-405.4z"
              fill="#231815"
              p-id="2294"
            ></path>
            <path
              d="M404.9 336.3v352.6l305.4-176.3z"
              fill="#231815"
              p-id="2295"
            ></path>
          </svg>
          <p>播放全部({{ tracks.length }}首)</p>
        </div>
        <div class="songs" :style="{ marginBottom: playing?'8vh' : '' }">
          <div
            class="song"
            v-for="(item, index) in songs"
            :key="index"
            @click="_setSonglist(index)"
          >
            <div class="index">{{ index + 1 }}</div>
            <div class="song-desc">
              <h2 class="song-name">{{ item.name }}</h2>
              <p class="ar">{{ item.ar }}</p>
            </div>
          </div>
        </div>
      </div>
      <van-popup
        v-model="show"
        round
        position="bottom"
        :style="{ height: '30%' }"
      >
        <p class="popup-desc" style="margin-bottom : 8vh">
          {{ playList.description }}
        </p>
      </van-popup>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import backHeader from '../back-header/back-header'
import Vue from 'vue'
import { Loading, Popup } from 'vant'
import { Song } from '../../assets/js/song'

Vue.use(Popup)

Vue.use(Loading)

export default {
  data () {
    return {
      title: '歌单',
      playList: {},
      creator: {},
      tracks: [],
      show: false,
      loading: true,
      menuLink: [
        {
          path: '/comment',
          name: '评论',
          imgUrl: require('../../assets/image/comment.png')
        },
        {
          path: '/comment',
          name: '下载',
          imgUrl: require('../../assets/image/download.png')
        },
        {
          path: '/comment',
          name: '分享',
          imgUrl: require('../../assets/image/share.png')
        },
        {
          path: '/comment',
          name: '多选',
          imgUrl: require('../../assets/image/select.png')
        }
      ],
      playAllTop: 0,
      isTop: false,
      opacity: 0
    }
  },
  methods: {
    ...mapMutations({
      // setShow: 'SET_PLAYLIST',
      setComment: 'SET_COMMENT_ID'
    }),
    ...mapActions(['setSonglist']),
    _getPlayListDetail () {
      this.api.getPlayListDetail({ id: this.$route.params.id }).then(res => {
        console.log(res)
        this.playList = res.playlist
        this.creator = res.playlist.creator
        this.tracks = res.playlist.tracks
        this.loading = false
        // this.$refs.creator.style.background = `url(${res.coverImgUrl})`
        // console.log(this.$refs.creator)
      })
    },
    scroll () {
      // console.log(this.$refs.playAll)
      let top = this.$refs.playList.scrollTop >= this.playAllTop
      // if (top >= this.playAllTop) {
      //   this.isTop = true
      // } else {
      //   this.isTop = false
      // }
      this.isTop = top
      this.title = !top ? '歌单' : this.playList.name
      // console.log(this.$refs.playList.scrollTop / this.playAllTop)
      this.opacity = this.$refs.playList.scrollTop / this.playAllTop - 0.1
    },
    toComment () {
      this.setComment({
        id: this.playList.id,
        type: 'playlist'
      })
      this.$router.push({ path: '/comment' })
    },
    _setSonglist (index = 0) {
      // console.log(songs)
      this.setSonglist({
        data: this.songs,
        playIndex: index
      })
    }
  },
  created () {
    // this.api.getPlayListDetail({id: this.$route.params.id}).then(res => console.log(res))
    // this.setShow(false)
    this._getPlayListDetail()
  },
  updated () {
    // console.dir(this.$refs.bHeader.$el.clientHeight)
    this.playAllTop =
      this.$refs.songs.offsetTop - this.$refs.bHeader.$el.clientHeight
  },
  // destroyed () {
  //   this.setShow(true)
  // },
  components: {
    backHeader
  },
  computed: {
    songs () {
      const songArr = []
      console.log(this.tracks)
      if (this.tracks) {
        this.tracks.forEach(item => {
          let obj = new Song(item.name, item.id, item.ar)
          songArr.push(obj)
        })
      }
      return songArr
    },
    ...mapGetters(['playing'])
  }
}
</script>

<style lang="scss" scoped>
.play-list {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #ffffff;
  color: #eeeeee;
  overflow: scroll;
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: #ffffff;
  }
  .creator {
    position: relative;
    height: 22vh;
    width: 100%;
    margin-top: 90px;
    .bgImg {
      width: 100%;
      filter: blur(20px);
      position: absolute;
      top: -20%;
    }
    .bg-filter {
      width: 100%;
      height: 100vh;
      background: #cecece;
      opacity: 0.5;
      position: absolute;
      top: -40%;
    }
    .playlist-content {
      position: absolute;
      top: 2vh;
      width: 100%;
      .desc {
        height: 20vh;
        display: flex;
        align-items: flex-start;
        .desc-img {
          width: 32vw;
          margin-left: 4vw;
          img {
            border-radius: 20px;
            width: 100%;
            height: 32vw;
          }
        }
        .creator-desc {
          width: 56vw;
          margin: 0 4vw;
          display: flex;
          align-content: space-between;
          flex-wrap: wrap;
          height: 32vw;
          .title {
            font-size: 40px;
          }
          .user {
            line-height: 4vh;
            display: flex;
            align-content: center;
            font-size: 30px;
            width: 100%;
            .user-avatar {
              height: 4vh;
              border-radius: 50%;
              margin-right: 10px;
            }
            // .user-name {
            //   line-height: 4.5vh;
            //   font-size: 30px;
            // }
          }
          .description {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 30px;
          }
        }
      }
    }
  }
  .popup-desc {
    color: #000;
    font-size: 34px;
    padding: 10px;
  }
  .more {
    display: flex;
    justify-content: space-around;
    position: relative;
    // z-index: 9999;
    .menu-item {
      .menu-icon {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .menu-name {
        text-align: center;
        margin-top: 8px;
        font-size: 26px;
        color: #000;
      }
    }
  }
  .songs-wrapper {
    position: relative;
    background: #ffffff;
    margin-top: 5vh;
    border-radius: 50px;
    height: 100vh;
    .play-all {
      height: 7vh;
      display: flex;
      align-items: center;
      .icon {
        // margin: 0 5vw;
        flex: 2;
      }
      p {
        font-size: 30px;
        color: #000;
        flex: 8;
      }
    }
    .fixed-top {
      position: fixed;
      top: 7vh;
      width: 100%;
      background-color: #ffffff;
    }
    .songs {
      .song {
        display: flex;
        height: 10vh;
        align-items: center;
        color: #000;
        .index {
          flex: 2;
          text-align: center;
          font-size: 40px;
          color: #e2e2e2;
        }
        .song-desc {
          flex: 8;
          max-width: 80vw;
          .song-name {
            font-size: 42px;
            margin-bottom: 8px;
            font-weight: 120;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 5vh;
          }
          .ar {
            font-size: 32px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            line-height: 4vh;
            // overflow-x: hidden;
          }
        }
      }
    }
  }
  .top-bg {
    position: fixed;
    height: 8vh;
    background: #ffffff;
    width: 100%;
    z-index: 998;
  }
}
.offset-enter-active,
.offset-leave-active {
  transition: all 0.4s;
}
.offset-enter, .offset-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(100%);
}
</style>
