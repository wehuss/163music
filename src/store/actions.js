import * as types from './mutations-types'

export default {
  setSonglist ({ commit, state }, songList) {
    commit(types.SET_PLAYING)
    // if (state.playIndex !== songList.playIndex) { commit(types.SET_PLAY_INDEX, songList.playIndex) }
    commit(types.SET_PLAY_INDEX, songList.playIndex)
    if (state.songList !== songList.data) {
      commit(types.SET_SONGLIST, songList.data)
      commit(types.SET_FULL, true)
    }
  }
}
