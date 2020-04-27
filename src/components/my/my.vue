<template>
  <div class="my">
    <router-link to="login" :tag="'div'" v-if="!isLogin">去登陆</router-link>
    <div class="user-info" v-else>
      <div class="bg-img">
        <img :src="userInfo.backgroundUrl" width="100%" height="100%" />
      </div>
      <div class="user">
        <div class="avatar">
          <img :src="userInfo.avatarUrl" width="100%" height="100%" />
        </div>
        <p class="name">{{ userInfo.nickname }}</p>
      </div>
      <div class="playlist">
        <recommend  :title="'收藏的歌单'">
          <playList :playList="playList"></playList>
        </recommend>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import playList from 'base/playlist-item/playlist-item'
import recommend from 'base/recommend/recommend'
import { mapGetters, mapMutations } from 'vuex'
import { Notify } from 'vant'

Vue.use(Notify)

export default {
  data () {
    return {
      playList: []
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'userInfo'])
  },
  methods: {
    ...mapMutations({
      setLogin: 'SET_ISLOGIN',
      setUserInfo: 'SET_USER_INFO'
    }),
    _getUserInfo () {
      this.api.getIslogin().then(res => {
        if (res.code === 200) {
          this.setLogin(true)
          this.api.getUserInfo({ uid: res.profile.userId }).then(res => {
            let userInfo = res.profile
            userInfo.level = res.level
            userInfo.listenSongs = res.listenSongs
            this.setUserInfo(userInfo)
          })
          this.api
            .getUserPlaylist({
              uid: res.profile.userId
            })
            .then(res => {
              this.playList = res.data.playlist
            })
        } else {
          Notify({ type: 'danger', message: '未登录，部分功能无法使用' })
        }
      })
    }
  },
  created () {
    this._getUserInfo()
  },
  components: {
    playList,
    recommend
  }
}
</script>

<style lang="scss" scoped>
.my {
  font-size: 40px;
  margin-top: 7vh;
  .user-info {
    .bg-img {
      height: 24vh;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user {
      display: flex;
      justify-content: space-between;
      margin: 0 16vw;
      .avatar {
        width: 20vw;
        img {
          border-radius: 50%;
          border: 0.3vw solid red;
          transform: translate(0, -50%);
        }
      }
      .name {
        margin-top: 2vw;
      }
    }
    .playlist{
        margin: 0 2vw;
    }
  }
}
</style>
