<template>
  <transition name="full">
    <div class="music-player-full">
      <div
        class="bgimg"
        :style="{ backgroundImage: `url(${songDetail.al.picUrl})` }"
        :ref="'bgImg'"
      ></div>
      <div class="bg-filter"></div>
      <header>
        <svg
          t="1586418331415"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2894"
          @click="$emit('setFull')"
        >
          <path
            d="M916.3 466.3H218.1l288.4-288.4c17.8-17.8 17.8-46.9 0-64.7-17.8-17.8-46.9-17.8-64.7 0L75.3 479.7c-17.8 17.8-17.8 46.9 0 64.7l366.5 366.5c17.8 17.8 46.9 17.8 64.7 0 17.8-17.8 17.8-46.9 0-64.7L218.1 557.7h698.2c25.2 0 45.7-20.6 45.7-45.7 0-25.2-20.6-45.7-45.7-45.7z"
            fill=""
            p-id="2895"
          ></path>
        </svg>
        <div class="title">
          <h2>{{ songDetail.name }}</h2>
          <p class="ar">
            <i v-for="(item, index) in songDetail.ar" :key="index">{{
              item.name
            }}</i>
          </p>
        </div>
      </header>
      <div class="music-img">
        <div
          class="disc"
          :style="{ animationPlayState: play ? 'running' : 'paused' }"
        >
          <img :src="songDetail.al.picUrl" class="picUrl" />
        </div>
        <div
          class="needle"
          :style="{ transform: play ? '' : 'rotate(-30deg)' }"
        ></div>
      </div>
      <div class="play-progress-wrapper">
        <div class="time">
          <p>{{ playProressMin }}</p>
        </div>
        <div
          class="play-porgress"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
          @click="setTime"
          :ref="'play'"
        >
          <div
            class="play-proress-tag"
            :style="{ width: playLength + '%' }"
          ></div>
        </div>
        <div class="time">{{ songLengthMin }}</div>
      </div>
      <div class="operation">
        <svg
          t="1586570385015"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1300"
          @click="$emit('toComment')"
        >
          <path
            d="M511.3 978.6c-62.8 0-123.8-12.3-181.1-36.6-55.4-23.4-105.2-57-147.9-99.7S106 749.8 82.5 694.4C58.3 637 46 576 46 513.2c0-62.8 12.3-123.8 36.6-181.1 23.4-55.4 57-105.2 99.7-147.9s92.5-76.3 147.9-99.7c57.4-24.3 118.3-36.6 181.1-36.6s123.8 12.3 181.1 36.6c55.4 23.4 105.2 57 147.9 99.7s76.3 92.5 99.7 147.9c24.3 57.4 36.6 118.3 36.6 181.1S964.3 637 940 694.3c-23.4 55.4-57 105.2-99.7 147.9s-92.5 76.3-147.9 99.7c-57.3 24.4-118.3 36.7-181.1 36.7z m0-894.1C275 84.5 82.7 276.8 82.7 513.2c0 236.4 192.3 428.7 428.7 428.7 236.4 0 428.7-192.3 428.7-428.7C940 276.8 747.7 84.5 511.3 84.5z"
            fill=""
            p-id="1301"
          ></path>
          <path
            d="M610.1 319.8H290.5c-10.1 0-18.4-8.2-18.4-18.4s8.2-18.4 18.4-18.4h319.6c10.1 0 18.4 8.2 18.4 18.4s-8.3 18.4-18.4 18.4zM724.8 319.8h-39.7c-10.1 0-18.4-8.2-18.4-18.4s8.2-18.4 18.4-18.4h39.7c10.1 0 18.4 8.2 18.4 18.4s-8.3 18.4-18.4 18.4zM732.1 531.6H290.5c-10.1 0-18.4-8.2-18.4-18.4s8.2-18.4 18.4-18.4h441.6c10.1 0 18.4 8.2 18.4 18.4s-8.2 18.4-18.4 18.4zM732.1 743.3H290.5c-10.1 0-18.4-8.2-18.4-18.4s8.2-18.4 18.4-18.4h441.6c10.1 0 18.4 8.2 18.4 18.4s-8.2 18.4-18.4 18.4z"
            fill=""
            p-id="1302"
          ></path>
        </svg>
        <svg
          t="1586569685394"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="853"
          @click="$emit('prevSong')"
        >
          <path
            d="M602.7 796.2c-6.1 0-12.2-2.3-16.9-7l-259-259c-9.3-9.3-9.3-24.5 0-33.8l256.9-256.9c9.3-9.3 24.5-9.3 33.8 0 9.3 9.3 9.3 24.5 0 33.8l-240 240 242.1 242.1c9.3 9.3 9.3 24.5 0 33.8-4.6 4.7-10.7 7-16.9 7z"
            fill=""
            p-id="854"
          ></path>
          <path
            d="M511.3 977.8c-62.6 0-123.3-12.3-180.4-36.4-55.2-23.3-104.8-56.8-147.3-99.3-42.6-42.6-76-92.1-99.3-147.3-24.2-57.2-36.4-117.9-36.4-180.4S60.2 391.1 84.3 334c23.3-55.2 56.8-104.8 99.3-147.3 42.6-42.6 92.1-76 147.3-99.3C388.1 63.2 448.8 51 511.3 51c62.6 0 123.3 12.3 180.4 36.4 55.2 23.3 104.8 56.8 147.3 99.3 42.6 42.6 76 92.1 99.3 147.3 24.2 57.2 36.4 117.9 36.4 180.4s-12.3 123.3-36.4 180.4C915 750 881.6 799.5 839.1 842.1c-42.6 42.6-92.1 76-147.3 99.3-57.2 24.2-117.9 36.4-180.5 36.4z m0-890.4c-235.4 0-426.9 191.5-426.9 426.9 0 235.4 191.5 426.9 426.9 426.9s426.9-191.5 426.9-426.9c0.1-235.4-191.5-426.9-426.9-426.9z"
            fill=""
            p-id="855"
          ></path>
        </svg>
        <svg
          t="1586569873716"
          class="icon play"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1714"
          v-show="play"
          @click="$emit('musicPlay')"
        >
          <path
            d="M512 1024C228.266667 1024 0 795.733333 0 512S228.266667 0 512 0s512 228.266667 512 512-228.266667 512-512 512z m0-42.666667c260.266667 0 469.333333-209.066667 469.333333-469.333333S772.266667 42.666667 512 42.666667 42.666667 251.733333 42.666667 512s209.066667 469.333333 469.333333 469.333333z m-106.666667-682.666666c12.8 0 21.333333 8.533333 21.333334 21.333333v384c0 12.8-8.533333 21.333333-21.333334 21.333333s-21.333333-8.533333-21.333333-21.333333V320c0-12.8 8.533333-21.333333 21.333333-21.333333z m213.333334 0c12.8 0 21.333333 8.533333 21.333333 21.333333v384c0 12.8-8.533333 21.333333-21.333333 21.333333s-21.333333-8.533333-21.333334-21.333333V320c0-12.8 8.533333-21.333333 21.333334-21.333333z"
            p-id="1715"
          ></path>
        </svg>
        <svg
          t="1586569838664"
          class="icon play"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1575"
          v-show="!play"
          @click="$emit('musicPlay')"
        >
          <path
            d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
            p-id="1576"
          ></path>
          <path
            d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
            p-id="1577"
          ></path>
        </svg>
        <svg
          t="1586569700470"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1002"
          @click="$emit('nextSong')"
        >
          <path
            d="M419.9 796.2c6.1 0 12.2-2.3 16.9-7l259-259c9.3-9.3 9.3-24.5 0-33.8L439 239.5c-9.3-9.3-24.5-9.3-33.8 0-9.3 9.3-9.3 24.5 0 33.8l240 240L403 755.4c-9.3 9.3-9.3 24.5 0 33.8 4.7 4.7 10.8 7 16.9 7z"
            fill=""
            p-id="1003"
          ></path>
          <path
            d="M330.9 941.4c-55.2-23.3-104.8-56.8-147.3-99.3-42.6-42.6-76-92.1-99.3-147.3-24.2-57.2-36.4-117.9-36.4-180.4S60.2 391.1 84.3 334c23.3-55.2 56.8-104.8 99.3-147.3 42.6-42.6 92.1-76 147.3-99.3C388.1 63.2 448.8 51 511.3 51c62.6 0 123.3 12.3 180.4 36.4 55.2 23.3 104.8 56.8 147.3 99.3 42.6 42.6 76 92.1 99.3 147.3 24.2 57.2 36.4 117.9 36.4 180.4s-12.3 123.3-36.4 180.4C915 750 881.6 799.5 839.1 842.1c-42.6 42.6-92.1 76-147.3 99.3-57.2 24.2-117.9 36.4-180.4 36.4-62.6 0-123.3-12.2-180.5-36.4z m-246.5-427c0 235.4 191.5 426.9 426.9 426.9s426.9-191.5 426.9-426.9c0-235.4-191.5-426.9-426.9-426.9S84.4 278.9 84.4 514.4z"
            fill=""
            p-id="1004"
          ></path>
        </svg>
        <svg
          t="1586570351664"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1151"
        >
          <path
            d="M511.3 767.9c-4.1 0-8.2-1.4-11.6-4.1-2.4-2-60.4-49.3-119.3-112.2-81.3-86.7-122.5-158.2-122.5-212.4 0-84.6 66.9-153.4 149.2-153.4 23.5 0 46.9 5.8 67.7 16.7 13.4 7 25.8 16.2 36.6 27.1 10.8-10.9 23.2-20.1 36.6-27.1 20.8-10.9 44.2-16.7 67.7-16.7 82.3 0 149.2 68.8 149.2 153.4 0 54.2-41.2 125.6-122.5 212.4-58.9 62.9-116.9 110.2-119.3 112.2-3.6 2.8-7.7 4.1-11.8 4.1zM407.1 322.6c-62 0-112.5 52.3-112.5 116.6 0 43.9 38.8 108.5 112.3 186.9 42 44.9 84.5 82.4 104.4 99.4 19.9-17 62.4-54.5 104.4-99.4C689.2 547.8 728 483.2 728 439.3c0-64.3-50.4-116.6-112.5-116.6-35.4 0-68 16.8-89.4 46.1-3.5 4.7-9 7.5-14.8 7.5-5.9 0-11.4-2.8-14.8-7.5-21.4-29.4-54-46.2-89.4-46.2z"
            fill=""
            p-id="1152"
          ></path>
          <path
            d="M511.3 977.9c-62.9 0-123.9-12.3-181.3-36.6-55.5-23.5-105.3-57-148-99.8-42.8-42.8-76.3-92.6-99.8-148-24.3-57.4-36.6-118.4-36.6-181.3s12.3-123.9 36.6-181.3c23.5-55.5 57-105.3 99.8-148 42.8-42.8 92.6-76.3 148-99.8 57.4-24.3 118.4-36.6 181.3-36.6 62.9 0 123.9 12.3 181.3 36.6 55.5 23.5 105.3 57 148 99.8 42.8 42.8 76.3 92.6 99.8 148 24.3 57.4 36.6 118.4 36.6 181.3s-12.3 123.9-36.6 181.3c-23.5 55.5-57 105.3-99.8 148-42.8 42.8-92.6 76.3-148 99.8-57.4 24.3-118.4 36.6-181.3 36.6z m0-894.6c-236.5 0-429 192.4-429 429 0 236.5 192.4 429 429 429 236.5 0 429-192.4 429-429s-192.4-429-429-429z"
            fill=""
            p-id="1153"
          ></path>
        </svg>
      </div>
      <!-- <p @click="$emit('prevSong')">上一首</p>
      <p @click="$emit('musicPlay')">暂停</p>
      <p @click="$emit('nextSong')">下一首</p> -->
    </div>
  </transition>
</template>

<script>
// import BHeader from '../back-header/back-header'

export default {
  data: function () {
    return {
      touchS: 0,
      touchE: 0,
      time: null,
      touchStartTime: 0
    }
  },
  components: {
    // BHeader
  },
  props: {
    songDetail: {
      type: Object,
      default: () => {}
    },
    play: {
      type: Boolean,
      default: false
    },
    playProress: {
      type: Number,
      default: 0
    },
    songLength: {
      type: Number,
      default: 0
    }
  },
  computed: {
    playProressMin () {
      // eslint-disable-next-line no-unused-vars
      return this.secondToMin(this.playProress)
    },
    songLengthMin () {
      return this.secondToMin(this.songLength)
    },
    playLength () {
      return (this.playProress / this.songLength) * 100
    },
    width () {
      return this.$refs.play.clientWidth
    }
  },
  methods: {
    secondToMin (time) {
      let min = Math.floor(time / 60)
      let s = Math.floor(time % 60)
      return `${min}:${s}`
    },
    touchStart (e) {
      // console.log(e.changedTouches[0])
      // console.dir(this.$refs.play)
      this.touchS = e.changedTouches[0].clientX
      this.touchStartTime = this.playProress
    },
    touchMove (e) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        // 获取滑动距离
        let touchLength = e.changedTouches[0].clientX - this.touchS
        // 计算歌曲增加/减少的秒数
        let songPlayLength =
          this.songLength * (touchLength / this.width) + this.touchStartTime
        // console.log(e.changedTouches[0].clientX - this.touchS)
        // console.log(songPlayLength)
        this.$emit('setPlayProress', songPlayLength)
      }, 5)
    },
    touchEnd (e) {
      // let width = this.$refs.play.clientWidth
      // console.log(e.changedTouches[0])
      // console.log(e.changedTouches[0].clientX - this.touchS)
      // console.log(touchLength / width)
      // // this.playLength = this.playLength + (touchLength / width * 100)
      // console.log((this.songLength * touchLength) / width)
      // let touchLength = e.changedTouches[0].clientX - this.touchS
      // let songPlayLength =
      //   this.songLength * (touchLength / this.width) + this.playProress
      // console.log(songPlayLength)
      // this.$emit('setPlayProress', songPlayLength)
    },
    setTime (e) {
      console.log(e)
      let songPlayLength = this.songLength * (e.offsetX / this.width)
      console.log(songPlayLength)
      this.$emit('setPlayProress', songPlayLength)
    }
  }
  // mounted () {
  //   window.addEventListener('popstate', e => {
  //     this.$emit('setFull')
  //   })
  // }
}
</script>

<style lang="scss" scoped>
.music-player-full {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1002;
  background: #ffffff;
  header {
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    .icon {
      width: 50px;
      height: 50px;
      margin: 0 24px;
    }
    h2 {
      font-size: 36px;
      font-weight: 200;
      margin-bottom: 4px;
    }
    .ar {
      font-size: 30px;
      font-weight: 100;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 70vw;
    }
  }
  .bgimg {
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // background: url("https://p1.music.126.net/76Hpk_9ot2h2dozv5JbbYA==/109951164737016168.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    z-index: -1;
    filter: blur(30px);
  }
  .bg-filter {
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    z-index: -1;
    background: #cecece;
    opacity: 0.3;
  }
  .music-img {
    width: 100%;
    height: 64vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .disc {
      position: relative;
      width: 66vw;
      height: 66vw;
      background: url("../../assets/image/disc.png");
      background-size: cover;
      background-position: center;
      animation: spin 20s linear infinite;
      .picUrl {
        position: absolute;
        width: 62%;
        height: 62%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }
    }
    .needle {
      background: url("../../assets/image/needle-ip6.png");
      background-size: contain;
      background-position:50% center;
      background-repeat: no-repeat;
      width: 200px;
      height: 400px;
      position: absolute;
      right: 150px;
      top: 50px;
      transition: all 0.5s;
      transform-origin: top left;
    }
    // .disc::after {
    //   content: "";
    //   position: absolute;
    //   width: 100%;
    //   height: 100%;
    //   top: 50%;
    //   left: 50%;
    //   transform: translate(-50%, -50%);
    // }
  }
  .play-progress-wrapper {
    display: flex;
    font-size: 30px;
    justify-content: space-around;
    align-items: center;
    .time {
      width: 10vw;
      text-align: center;
    }
    .play-porgress {
      width: 70vw;
      height: 1vh;
      background-color: #cecece;
      border-radius: 2vw;
      margin: 0 1vw;
      .play-proress-tag {
        height: 100%;
        // width: 50%;
        background: #d43c33;
        border-radius: 2vw;
        position: relative;
        display: flex;
        justify-items: center;
      }
      .play-proress-tag::after {
        content: "";
        position: absolute;
        right: -3px;
        transform: translate(0, -0.5vh);
        width: 2vh;
        height: 2vh;
        border-radius: 100%;
        background: #ffffff;
      }
    }
  }
  .operation {
    width: 100%;
    // height: 26vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 4vh;
    .icon {
      width: 10vw;
      height: 10vw;
    }
    .play {
      width: 14vw;
      height: 14vw;
    }
  }
}
.full-enter-active,
.full-leave-active {
  transition: all 0.5s;
}
.full-enter, .full-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(0, 100%);
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
