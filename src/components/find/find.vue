<template>
  <div class="find">
    <div class="loading" v-show="loading < (isLogin ? 4 : 2)">
      <h2>相信音樂的力量</h2>
      <p>加载中...</p>
    </div>
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#C20C0C">
        <van-swipe-item v-for="(item, index) in banners" :key="index">
          <img
            :src="item.imageUrl"
            width="100%"
            height="auto"
            class="swipe-img"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="menu">
      <router-link
        class="menu-item"
        v-for="(item, index) in menuLink"
        :key="index"
        :tag="'div'"
        :to="item.path"
      >
        <div class="menu-icon">
          <img :src="item.imgUrl" width="60%" height="60%" />
        </div>
        <p class="menu-name">{{ item.name }}</p>
      </router-link>
    </div>
    <recommend :desc="'热门歌单'" :title="'大家都在听'">
      <playList :playList="playLists" :wrap="!isLogin"></playList>
    </recommend>
    <div v-if="isLogin">
      <recommend :desc="'风格推荐'" :title="'是你喜欢的风格吗'" :type="'songs'">
        <songList :songs="songs.slice(0, 6)"></songList>
      </recommend>
      <recommend :desc="'为你精选'" :title="'为你定制的歌单'">
        <playList :playList="recommendPlayList" :wrap="false"></playList>
      </recommend>
      <!-- 其实都是一个数据哒 -->
      <recommend :desc="'热门歌曲'" :title="'现在最火热的歌曲'" :type="'songs'">
        <songList :songs="songs.slice(6, 12)"></songList>
      </recommend>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Notify } from 'vant'
import playList from 'base/playlist-item/playlist-item'
import songList from 'base/songlist/songlist'
import recommend from 'base/recommend/recommend'
import { mapMutations, mapGetters } from 'vuex'

Vue.use(Notify)
Vue.use(Swipe)
Vue.use(SwipeItem)
export default {
  data () {
    return {
      banners: [],
      playLists: [],
      recommendPlayList: [],
      songs: [],
      loading: 0,
      menuLink: [
        {
          path: '/playList/plaza',
          name: '歌单',
          imgUrl: require('../../assets/image/playList.png')
        },
        {
          path: '/rank',
          name: '排行',
          imgUrl: require('../../assets/image/rank.png')
        },
        {
          path: '/video',
          name: '视频',
          imgUrl: require('../../assets/image/video.png')
        },
        {
          path: '/about',
          name: '关于',
          imgUrl: require('../../assets/image/about.png')
        }
      ]
    }
  },
  methods: {
    _getBanner () {
      this.api.getBanner().then(res => {
        console.log(res)
        this.banners = res.banners
        this.loading++
      })
    },
    _getHotPlayList () {
      this.api
        .getHotPlayList({
          limit: this.isLogin ? 8 : 42
        })
        .then(res => {
          this.playLists = res.playlists
          this.loading++
        })
    },
    ...mapMutations({
      setLogin: 'SET_ISLOGIN',
      setUserInfo: 'SET_USER_INFO'
    }),
    // 由于vuex不能持久化储存，使用每次刷新的时候都判断是否登录
    _getUserInfo () {
      this.api.getIslogin().then(res => {
        if (res.code === 200) {
          this.setLogin(true)
          this.api.getUserInfo({ uid: res.profile.userId }).then(res => {
            let userInfo = res.profile
            userInfo.level = res.level
            userInfo.listenSongs = res.listenSongs
            console.log(userInfo)
            this.setUserInfo(userInfo)
          })
          this._getRecommendSongs()
          this._getRecommendPlayList()
        } else {
          Notify({ type: 'danger', message: '未登录，部分功能无法使用' })
        }
        this._getHotPlayList()
      })
    },
    _getRecommendSongs () {
      this.api.getRecommendSongs().then(res => {
        this.songs = res.recommend
        this.loading++
      })
    },
    _getRecommendPlayList () {
      this.api.getRecommendPlayList().then(res => {
        this.recommendPlayList = res.recommend
        this.loading++
      })
    }
  },
  mounted () {
    this._getBanner()
    // this.api.getUserInfo().then(res => console.log(res))
    this._getUserInfo()
  },
  components: {
    playList,
    recommend,
    songList
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/style.scss";
.find {
  margin: $m24;
  margin-top: 7vh;
  .loading {
    position: fixed;
    z-index: 7777;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: red;
    color: #ffffff;
    font-weight: 100;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: space-around;
    h2,
    p {
      animation: op 5s ease;
    }
    @keyframes op {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  .my-swipe {
    border-radius: 16px;
    margin: $mt;
    .van-swipe__indicator {
      width: 15px;
      height: 15px;
    }
    .swipe-img {
      border-radius: 16px;
    }
  }
  .menu {
    margin: $mt;
    display: flex;
    justify-content: space-around;
    .menu-item {
      .menu-icon {
        width: 110px;
        height: 110px;
        background: $bgc;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .menu-name {
        text-align: center;
        margin-top: 8px;
        font-size: 26px;
      }
    }
  }
}
</style>
