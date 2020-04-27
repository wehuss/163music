<template>
  <div class="muisc-player-mini">
    <div class="play">
      <div class="song" @click="$emit('setFull')">
        <img :src="songDetail.al.picUrl" class="picUrl" />
        <div class="song-name">{{ songDetail.name }}</div>
      </div>
      <svg
        t="1586569873716"
        class="icon"
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
        class="icon"
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songDetail: {
      type: Object,
      default: () => {}
    },
    play: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.muisc-player-mini {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 8vh;
  background: #ffffff;
  z-index: 1000;
  border-top: .2vw solid #cecece;
  border-radius: 3vw 3vw 0 ;
  .play {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 20px;
    .song {
      display: flex;
      align-items: center;
      justify-content: space-around;
      img {
        width: 5vh;
        height: 5vh;
        border-radius: 50%;
      }
      .song-name {
        width: 70vw;
        font-size: 32px;
        font-weight: 100;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 2vw;
      }
    }
    .icon {
      width: 8vw;
      height: 8vw;
    }
  }
}
</style>
