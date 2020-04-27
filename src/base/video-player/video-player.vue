<template>
  <transition name="bottom" appear>
    <div class="mv-player">
      <div class="video">
        <Bheader :title="'mv'"></Bheader>
        <video :src="mvUrl" class="mv" autoplay controls poster></video>
        <div class="mv-desc">
          <h2 class="title">{{ mvData.title }}</h2>
          <p :class="{ desc: true, showDesc }" @click="showDesc = !showDesc">
            {{ mvData.description }}
          </p>
        </div>
        <div class="creator">
          <div class="creator-desc">
            <img :src="mvData.creator.avatarUrl" />
            <p>{{ mvData.creator.nickname }}</p>
          </div>
          <div class="playTime">
            <svg
              t="1585905454750"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2197"
            >
              <path
                d="M909.892465 331.781731c-21.798121-51.476314-52.909055-97.631021-92.514092-137.236058-39.605037-39.605037-85.862083-70.818309-137.236058-92.514092-53.21607-22.514491-109.809314-33.976414-168.142315-33.976414S397.176094 79.414751 343.857685 102.031581c-51.476314 21.798121-97.631021 52.909055-137.236058 92.514092s-70.818309 85.862083-92.514092 137.236058c-22.514491 53.21607-33.976414 109.809314-33.976414 168.142315s11.461923 114.823906 33.976414 168.142315c21.798121 51.476314 52.909055 97.631021 92.514092 137.236058 39.605037 39.605037 85.862083 70.818309 137.236058 92.514092 53.21607 22.514491 109.809314 33.976414 168.142315 33.976414s114.823906-11.461923 168.142315-33.976414c51.476314-21.798121 97.631021-52.909055 137.236058-92.514092 39.605037-39.605037 70.818309-85.862083 92.514092-137.236058 22.514491-53.21607 33.976414-109.809314 33.976414-168.142315S932.509294 385.10014 909.892465 331.781731zM512 886.763942c-213.273636 0-386.839896-173.56626-386.839896-386.839896s173.56626-386.839896 386.839896-386.839896 386.839896 173.56626 386.839896 386.839896S725.273636 886.763942 512 886.763942z"
                p-id="2198"
              ></path>
              <path
                d="M641.355986 496.239856 458.681591 367.804917c-8.391765-5.8333-19.649011 0.102339-19.649011 10.336198l0 256.869878c0 10.23386 11.257246 16.169498 19.649011 10.336198l182.776734-128.434939C648.622027 511.897661 648.519688 501.254447 641.355986 496.239856z"
                p-id="2199"
              ></path>
            </svg>
            {{ mvData.playTime }}
          </div>
        </div>
      </div>
      <div @click="$router.push({ path: '/comment' })">评论</div>
      <div class="comment-wrapper">
        <comments :showHeader="false"></comments>
      </div>
      <!-- <div class="about-mv">
        <videoItem v-for="(item,index) in aboutMv" :key="index" :mvData="item"></videoItem>
      </div> -->
    </div>
  </transition>
</template>

<script>
import Bheader from '../back-header/back-header'
import { mapGetters, mapMutations } from 'vuex'
import videoItem from '../video-item/video-item'
import comments from '../comment/comment'

export default {
  computed: {
    ...mapGetters({
      mvData: 'mv'
    })
  },
  data () {
    return {
      mvUrl: '',
      showDesc: true,
      aboutMv: []
    }
  },
  methods: {
    ...mapMutations({
      setComment: 'SET_COMMENT_ID'
    }),
    _getMvUrl () {
      this.api
        .getMvUrl({
          id: this.mvData.vid
        })
        .then(res => {
          // console.log(res)
          this.mvUrl = res.urls[0].url
        })
    }
  },
  components: {
    Bheader,
    videoItem,
    comments
  },
  created () {
    if (!this.mvData) {
      this.$router.push({ path: '/video' })
      return
    }
    // console.log(this.mvData)
    this.setComment({
      id: this.mvData.vid,
      type: 'video'
    })
    this._getMvUrl()
  }
}
</script>

<style lang="scss" scoped>
.mv-player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  z-index: 7777;
  .video {
    position: fixed;
    top: 0;
    z-index: 7778;
    width: 100%;
    background: #ffffff;
    height: 50vh;
    .mv {
      width: 100%;
      height: auto;
      max-height:30vh;
    }
    .mv-desc {
      margin: 20px;
      font-weight: 100;
      .title {
        font-size: 40px;
        margin-bottom: 20px;
      }
      .desc {
        font-size: 30px;
      }
      .showDesc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .creator {
      display: flex;
      border-top: 1px solid #cecece;
      padding-top: 1vh;
      justify-content: flex-start;
      width: 100%;
      .creator-desc {
        display: flex;
        flex: 7;
        margin: 0 6vw;
        img {
          width: 68px;
          height: 68px;
          border-radius: 50%;
        }
        p {
          margin-left: 10px;
          font-size: 30px;
          line-height: 68px;
        }
      }
      .playTime {
        display: flex;
        flex: 3;
        align-items: center;
        font-size: 30px;
        .icon {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  .about-mv {
    margin: 20px;
    overflow: scroll;
    height: 50vh;
  }
  .comment-wrapper {
    height: 50vh;
    overflow: scroll;
    margin-top: 20px;
  }
}
.bottom-enter-active,
.bottom-leave-active {
  transition: all 0.5s;
}
.bottom-enter, .bottom-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(0, 100%);
}
</style>
