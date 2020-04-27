<template>
  <div class="comment">
    <BHeader :title="title" :bgc="'#fff'" v-if="showHeader"></BHeader>
    <div class="content" :style="{ 'margin-top': showHeader ? '10vh' : '50vh' }">
      <Content
        v-for="(item, index) in comments"
        :key="index"
        :title="item.name"
        :comments="item.data"
      ></Content>
    </div>
  </div>
</template>

<script>
import BHeader from '../back-header/back-header'
import Content from '../comment-content/comment-content'
import { mapGetters } from 'vuex'

export default {
  props: {
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      title: '评论',
      comments: [
        {
          name: '精彩评论',
          data: null
        },
        {
          name: '最新评论',
          data: null
        }
      ]
    }
  },
  components: {
    BHeader,
    Content
  },
  computed: {
    ...mapGetters(['commentId'])
  },
  methods: {
    _getComment () {
      if (!this.commentId) {
        this.$router.push({ path: '/find' })
      }
      this.api.getComment(this.commentId).then(res => {
        console.log(res)
        this.title = `评论${res.total}`
        this.comments[1].data = res.comments
        if (res.hotComments.length > 0) {
          this.comments[0].data = res.hotComments
        }
      })
    }
  },
  created () {
    console.log(this.commentId)
    this._getComment()
  }
}
</script>

<style lang="scss" scoped>
.comment {
  // margin:0 24px;
  // margin-top: 120px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  z-index: 7777;
  overflow: scroll;
  .content {
    margin: 0 24px;
  }
}
</style>
