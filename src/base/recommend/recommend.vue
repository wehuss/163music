<template>
  <div class="recommend">
    <span class="desc">{{desc}}</span>
    <div class="more">
      <h2 class="title">{{title}}</h2>
      <router-link class="more-btn" to="/playList/plaza" :tag="'button'">查看更多</router-link>
      <!-- <button class="more-btn" v-else>播放全部</button> -->
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    desc: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'playList'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";

.recommend {
  margin: 30px 0;
  .desc {
    font-size: 30px;
    // color: 40px;
    color: #cccccc;
  }
  .more {
    display: flex;
    .title {
      font-size: $font-a;
      margin-top: 12px;
      flex: 8.3;
    }
    .more-btn{
      flex: 1.7;
      height: 60px;
      font-size: 24px;
      background: #ffffff;
      border: 2px solid #cccccc;
      border-radius: 24px;
    }
  }
}
</style>
