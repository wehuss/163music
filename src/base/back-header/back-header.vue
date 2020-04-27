<template>
  <header :style="{background : bgc}">
    <div class="back" @click="$router.go(-1)">
      <svg
        t="1584500183380"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3316"
      >
        <path
          d="M725.333333 1024c-4.266667 0-10.666667-2.133333-14.933333-6.4L232.533333 512 710.4 6.4c8.533333-8.533333 21.333333-8.533333 27.733333 0 8.533333 8.533333 8.533333 21.333333 0 29.866667L290.133333 512l450.133334 475.733333c8.533333 8.533333 8.533333 21.333333 0 29.866667-4.266667 4.266667-10.666667 6.4-14.933334 6.4z"
          fill="#666767"
          p-id="3317"
        ></path>
      </svg>
    </div>
    <h2 class="title">{{title}}</h2>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    bgc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    display: flex;
    justify-content: flex-start;
    padding-top: 14px;
    font-size: 38px;
    line-height: 7vh;
    align-content: center;
    z-index: 998;
    width: 100%;
    // height: 7vh;
    .back {
      width: 50px;
      // height: 50px;
      margin: 0 24px;
      // transform: translate(0,10px);
      .icon {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      color: black;
      font-weight: 100;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
  }
</style>
