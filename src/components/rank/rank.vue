<template>
  <div class="rank">
    <backHeader :title="'排行'" :bgc="'#fff'"></backHeader>
    <div class="wrapper">
      <item :playList="ranks"></item>
    </div>
  </div>
</template>

<script>
import backHeader from 'base/back-header/back-header'
import item from 'base/playlist-item/playlist-item'
export default {
  data () {
    return {
      //   rankType: [0, 1, 2, 3, 23, 33]
      ranks: []
    }
  },
  mounted () {
    //   this.api.getRank()
    // this.rankType.forEach(item => {
    //   this.api.getRank({idx: item}).then(res => console.log(res))
    // })
    this.api.getToplist().then(res => {
      this.ranks = res.list.slice(0, 24)
    })
  },
  components: {
    backHeader,
    item
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
    margin: 90px 12px;
}
</style>
