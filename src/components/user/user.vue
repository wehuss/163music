<template>
  <div class="user">
    <router-link class="login" :tag="'span'" :to="'/login'" v-if="!isLogin"
      >登录</router-link
    >
    <div class="user-centent" v-else>
      <div class="bgImg">
        <img :src="userInfo.backgroundUrl" width="100%" height="200px" />
      </div>
      <div class="user-info">
        <div class="user-avatar">
          <img :src="userInfo.avatarUrl" width="100%" height="auto" />
        </div>
        <div class="user-name">
          <p>{{ userInfo.nickname }}</p>
          <span>LV {{ userInfo.level }}</span>
        </div>
        <div class="follows">
          <span>关注 : {{ userInfo.follows }}</span>
          <span>粉丝 : {{ userInfo.followeds }}</span>
          <svg
            t="1584344384034"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5842"
            width="20"
            height="20"
            v-if="userInfo.gender === 1"
          >
            <path
              d="M895.547 98.133H585.503c-16.679 0-30.125 13.447-30.125 30.126s13.446 30.125 30.125 30.125H823.79L680.663 301.51c-63.871-54.303-144.162-84.04-228.978-84.04-94.513 0-183.467 36.719-250.311 103.693C134.4 388.137 97.68 476.962 97.68 571.474S134.4 754.813 201.374 821.787s155.798 103.693 250.31 103.693 183.338-36.72 250.312-103.693c66.844-66.974 103.693-155.798 103.693-250.311 0-84.17-29.091-163.685-82.618-227.297l142.351-142.352v236.477c0 16.679 13.447 30.125 30.125 30.125s30.126-13.446 30.126-30.125V128.259c0-16.68-13.576-30.126-30.126-30.126zM451.685 865.228c-162.004 0-293.754-131.75-293.754-293.753S289.681 277.72 451.685 277.72c79.903 0 152.307 32.065 205.188 83.911 0.905 1.164 1.81 2.328 2.844 3.233 1.035 1.034 2.198 1.939 3.103 2.715 50.942 52.88 82.49 124.767 82.49 203.895 0.128 162.004-131.75 293.753-293.625 293.753z m0 0"
              p-id="5843"
              fill="#8a8a8a"
            ></path>
          </svg>
          <svg
            t="1584344530823"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6686"
            width="20"
            height="20"
            v-else
          >
            <path
              d="M826.569697 197.042424C759.59596 130.19798 670.771717 93.349495 576.258586 93.349495s-183.466667 36.719192-250.311111 103.692929C259.10303 263.886869 222.254545 352.711111 222.254545 447.353535c0 84.428283 29.349495 164.331313 83.264647 228.072728L245.010101 735.935354l-101.624242-101.624243c-11.248485-11.248485-29.99596-10.860606-41.761617 0.905051-11.765657 11.765657-12.153535 30.513131-0.90505 41.761616L202.343434 778.60202l-91.668687 91.79798c-11.765657 11.765657-11.765657 30.90101 0 42.537374 11.765657 11.765657 30.90101 11.765657 42.537374 0L245.139394 821.010101l101.624242 101.624242c11.248485 11.248485 29.99596 10.860606 41.761617-0.90505 11.765657-11.765657 12.153535-30.513131 0.90505-41.761616L287.806061 778.343434l60.509091-60.509091c63.741414 53.915152 143.644444 83.264646 228.072727 83.264647 94.513131 0 183.337374-36.719192 250.311111-103.692929s103.692929-155.79798 103.692929-250.311112c-0.129293-94.513131-36.848485-183.337374-103.822222-250.052525zM576.258586 740.977778C414.383838 740.977778 282.634343 609.228283 282.634343 447.353535c0-162.00404 131.749495-293.753535 293.753536-293.753535S870.012121 285.349495 870.012121 447.353535c0 161.874747-131.749495 293.624242-293.753535 293.624243z m0 0"
              fill="#bfbfbf"
              p-id="6687"
            ></path>
          </svg>
        </div>
        <div class="user-signature" @click="toast">
          <p
            class="signature"
            v-text="
              userInfo.signature === ''
                ? '没有设置签名哟~~~'
                : userInfo.signature
            "
          ></p>
          <p>已经在网易云音乐听了{{ userInfo.listenSongs }}首歌</p>
        </div>
        <p @click="logout">退出登录</p>
        <p>(需要一段时间才能完全退出，期间部分功能可以使用)</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Popup, Toast } from 'vant'
import { mapGetters, mapMutations } from 'vuex'

Vue.use(Toast)

Vue.use(Popup)
export default {
  computed: {
    ...mapGetters(['isLogin', 'userInfo'])
  },
  methods: {
    toast () {
      Toast(
        this.userInfo.signature === ''
          ? '没有设置签名哟~~~'
          : this.userInfo.signature
      )
    },
    ...mapMutations({
      setLogin: 'SET_ISLOGIN'
    }),
    logout () {
      this.api.logout().then(res => {
        if (res.code === 2000) {
          location.reload()
        }
      })
    }
  },
  mounted () {
    console.log(this.userInfo)
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/style.scss";

.user {
  position: relative;
  .login {
    background-color: $bgc;
    width: 240px;
    line-height: 120px;
    position: fixed;
    top: 50%;
    margin-left: 120px;
    transform: translate(-50%, -50%);
    border: 2px solid #cccccc;
    border-radius: 240px;
    color: #ffffff;
    display: flex;
    justify-content: center;
  }
  .user-centent {
    .out {
      position: fixed;
      bottom: 20px;
      font-size: 36px;
      margin-left: 30px;
      border: none;
      background: $bgc;
      color: #fff;
      border-radius: 30px;
    }
    .user-info {
      display: flex;
      justify-content: center;
      align-content: center;
      position: relative;
      font-size: 30px;
      flex-wrap: wrap;
      text-align: center;
      div {
        width: 100%;
      }
      .user-avatar {
        width: 140px;
        border-radius: 50%;
        transform: translate(0, -50%);
        position: absolute;
        top: 0;
        img {
          border-radius: 50%;
          border: 3px solid $bgc;
        }
      }
      .user-name {
        margin-top: 100px;
        display: flex;
        justify-content: center;
        p {
          color: #000000;
          font-size: 50px;
          max-width: 80%;
          @include no-wrap;
        }
        span {
          font-size: 30px;
          padding-left: 10px;
          padding-top: 9px;
          color: $bgc;
        }
      }
      .follows {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          padding-right: 20px;
        }
      }
      .user-signature {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .signature {
          max-width: 80%;
          @include no-wrap;
        }
      }
    }
  }
}
</style>
