<template>
  <transition name="offset" appear>
    <router-view />
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'isShow',
      'playList'
    ])
  }
  // watch: {
  //   $route (val) {
  //     console.log(val)
  //     if (val.name === 'playList') {
  //       this.isShow = true
  //     } else {
  //       this.isShow = false
  //     }
  //   },
  //   deep: true
  // }
}
</script>

<style lang="scss" scoped>
// .playlistPlaza{
//   margin-top: 80px;
// }
.offset-enter-active,
.offset-leave-active {
  transition: all 0.4s;
}
.offset-enter, .offset-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(100%);
  opacity: 0;
}
</style>
