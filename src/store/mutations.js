import * as type from './mutations-types'

const mutations = {
  [type.SET_ISLOGIN] (state, value) {
    state.isLogin = value
  },
  [type.SET_USER_INFO] (state, data) {
    state.userInfo = data
  },
  [type.SET_ISSHOW] (state, data) {
    state.isShow = data
  },
  [type.SET_PLAYLIST] (state, data) {
    state.playList = data
  },
  [type.SET_MV] (state, data) {
    state.mv = data
  },
  [type.SET_COMMENT_ID] (state, data) {
    state.commentId = data
  },
  [type.SET_SONGLIST] (state, data) {
    state.songList = data
  },
  [type.SET_PLAY_INDEX] (state, data) {
    state.playIndex = data
  },
  [type.SET_FULL] (state, data) {
    state.full = data
    // if (data) {
    //   const app = document.querySelector('#app')
    //   console.dir(app)
    //   if (app.requestFullscreen) {
    //     app.requestFullscreen()
    //   } else if (app.webkitRequestFullScreen) {
    //     app.webkitRequestFullScreen()
    //   } else if (app.mozRequestFullScreen) {
    //     app.mozRequestFullScreen()
    //   } else {
    //     app.msRequestFullscreen()
    //   }
    // }
  },
  [type.SET_PLAYING] (state) {
    state.playing = true
  }
}

export default mutations
