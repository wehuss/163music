import Vue from 'vue'
import Router from 'vue-router'
import find from '../components/find/find'
import Plaza from 'base/playlist-plaza/playlist-plaza'
import videoPlayer from 'base/video-player/video-player'
import comment from 'base/comment/comment'
import my from 'components/my/my'
import about from 'components/about/about'
import login from '../components/login/login'
import rank from '../components/rank/rank'
import video from '../components/video/video'
import playlistPlaza from '../components/playlistPlaza/playlistPlaza'
// import video from '../components/video/video'
const playlist = () => import('base/playlist/playlist')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'find'
      }
    },
    {
      path: '/find',
      name: 'find',
      component: find,
      meta: { showHeader: true }
    },
    {
      path: '/video',
      name: 'video',
      component: video,
      meta: { showHeader: true },
      children: [{ path: 'player', name: 'player', component: videoPlayer }]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/rank',
      name: 'name',
      component: rank
    },
    {
      path: '/comment',
      name: comment,
      component: comment
    },
    {
      path: '/playlist',
      name: 'playList',
      component: playlistPlaza,
      children: [
        {
          path: 'plaza',
          component: Plaza
        },
        {
          path: ':id',
          component: playlist
        }
      ]
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta: { showHeader: true }
    },
    {
      path: '/about',
      name: 'about',
      component: about,
      meta: { showHeader: true }
    }
  ]
})
