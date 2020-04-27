<template>
  <div class="video-item" @click="toPlayer">
    <div class="content">
      <img :src="mvData.coverUrl" class="video-coverurl" />
      <h2 class="title">{{ mvData.title }}</h2>
      <div class="creator">
        <div class="desc">
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
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  props: {
    // id: {
    //   type: String,
    //   default: () => ''
    // },
    // videoImg: {
    //   type: String,
    //   default: () => ''
    // },
    // creatorImg: {
    //   type: String,
    //   default: () => ''
    // },
    // creator: {
    //   type: String,
    //   default: () => ''
    // },
    // title: {
    //   type: String,
    //   default: () => ''
    // },
    // playTime: {
    //   type: Number,
    //   default: () => ''
    // }
    mvData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapMutations({
      setMv: 'SET_MV'
    }),
    toPlayer () {
      console.log(123)
      this.setMv(this.mvData)
      this.$router.push({name: 'player'})
    }
  }
}
</script>

<style lang="scss" scoped>
.video-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: #ffffff;
  border-bottom: 2vh solid #cecece;
  .content {
    width: 90vw;
    margin: 2vh;
    .video-coverurl {
      width: 100%;
      height: auto;
      border-radius: 20px;
    }
    .title {
      font-size: 32px;
      font-weight: 100;
      margin: 14px 0;
    }
    .creator {
      display: flex;
      border-top: 1px solid #cecece;
      padding-top: 1vh;
      justify-content: flex-start;
      .desc {
        display: flex;
        flex: 8;
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
        flex: 2;
        align-items: center;
        justify-content: flex-end;
        font-size: 30px;
        .icon {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
