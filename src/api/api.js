import axios from './http'

// api文档地址： https://binaryify.github.io/NeteaseCloudMusicApi/

export default {
  // 获取轮播图
  getBanner (params) {
    return axios.post('/banner', params).then(res => res.data)
  },
  // 获取热门歌单
  getHotPlayList (params) {
    return axios
      .post('/top/playlist/highquality', params)
      .then(res => res.data)
  },
  // 歌手分类列表
  getSingerList (params) {
    return axios
      .get(
        `/artist/list?cat=${params.cat}&limit=${params.limit}&initial=${params.initial}`
      )
      .then(res => res.data)
  },
  // 歌手的音乐
  getSinger (params) {
    return axios.get('/artists', { params }).then(res => res.data)
  },
  login (params) {
    return axios
      .post('/login/cellphone', params)
      .then(res => res.data)
      .catch(res => console.log(res))
  },
  getIslogin () {
    return axios
      .get('/login/status')
      .then(res => res.data)
      .catch(res => res)
  },
  logout () {
    return axios.get('/logout')
  },
  getUserInfo (params) {
    return axios
      .post('/user/detail', params)
      .then(res => res.data)
      .catch(res => res)
  },
  getRecommendSongs (params) {
    return axios.post('/recommend/songs').then(res => res.data)
  },
  getRecommendPlayList (params) {
    return axios.post('/recommend/resource').then(res => res.data)
  },
  getPlayList (params) {
    return axios.get('/top/playlist', {params}).then(res => res.data)
  },
  getPlayListDetail (params) {
    return axios.get('/playlist/detail', {params}).then(res => res.data)
  },
  getRank (params) {
    return axios.get('/top/list', {params}).then(res => res.data)
  },
  getToplist () {
    return axios.get('/toplist').then(res => res.data)
  },
  getVideoClass (params) {
    return axios.get('/video/group', {params})
  },
  getAllMv (params) {
    return axios.get('/mv/all', {params}).then(res => res.data)
  },
  getMvUrl (params) {
    return axios.get('/video/url', {params}).then(res => res.data)
  },
  getAllVideo (params) {
    return axios.get('/related/allvideo', {params}).then(res => res.data)
  },
  // getComment (params) {
  //   return axios.get('/comment/hot', {params}).then(res => res.data)
  // }
  getComment (params) {
    // let id = params.id
    return axios.get(`/comment/${params.type}`, {params}).then(res => res.data)
  },
  getMusicUrl (params) {
    return axios.get('/song/url', {params}).then(res => res.data)
  },
  getSongDetail (params) {
    return axios.get('/song/detail', {params}).then(res => res.data)
  },
  getUserPlaylist (params) {
    return axios.get('/user/playlist', {params})
  }
}
