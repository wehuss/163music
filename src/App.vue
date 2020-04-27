<template>
  <div id="app">
    <mHeader v-if="showHeader"></mHeader>
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="footer" v-if="playing"></div>
    <MusicPlayer></MusicPlayer>
  </div>
</template>

<script>
import Vue from 'vue'
import { Notify } from 'vant'
import mHeader from './components/Mheader/Mheader'
import MusicPlayer from './components/music-player/music-player'
import { mapGetters } from 'vuex'

Vue.use(Notify)
export default {
  name: 'App',
  data () {
    return {
      full: false
    }
  },
  components: {
    mHeader,
    MusicPlayer
  },
  computed: {
    showHeader () {
      return this.$route.meta.showHeader
    },
    ...mapGetters(['playing'])
  }
}
</script>

<style>
@import url("./assets/styles/reset.scss");
@import url("./assets/styles/vant.css");
#app {
  /* overflow: scroll; */
  background: #ffffff;
  /* max-width: 100vw; */
}
.footer {
  width: 100%;
  height: 8vh;
}
</style>
