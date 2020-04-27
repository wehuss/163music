<template>
  <div class="music-player" v-show="songList.length > 0">
    <audio
      :src="url"
      autoplay
      :ref="'music'"
      @ended="nextSong"
      @play="playStart"
      @timeupdate="playing"
    ></audio>
    <MusicPlayerFull
      :songDetail="songDetail"
      :play="play"
      :playProress="playProress"
      :songLength="songLength"
      @musicPlay="musicPlay"
      @setFull="_setFull"
      @nextSong="nextSong"
      @prevSong="prevSong"
      @toComment="toComment"
      @setPlayProress="setPlayProress"
      v-show="full"
    ></MusicPlayerFull>
    <MusicPlayerMini
      @setFull="_setFull"
      @musicPlay="musicPlay"
      :songDetail="songDetail"
      :play="play"
    ></MusicPlayerMini>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MusicPlayerMini from 'base/music-player-mini/music-player-mini'
import MusicPlayerFull from 'base/music-player-full/music-player-full'

export default {
  data () {
    return {
      url: null,
      songDetail: {},
      play: true,
      songLength: 0,
      playProress: 0
    }
  },
  methods: {
    ...mapMutations({
      setIndex: 'SET_PLAY_INDEX',
      setFull: 'SET_FULL',
      setComment: 'SET_COMMENT_ID'
    }),
    _getMusicUrl () {
      this.api.getMusicUrl({ id: this.id }).then(res => {
        // console.log(res)
        this.url = res.data[0].url
        this.$refs.music.play()
      }).catch(res => {
        alert('加载失败')
      })
    },
    _getSongDetail () {
      this.api.getSongDetail({ ids: this.id }).then(res => {
        console.log(res)
        this.songDetail = res.songs[0]
        console.dir(this.$refs.music)
      })
    },
    musicPlay () {
      this.play = !this.play
      this.play ? this.$refs.music.play() : this.$refs.music.pause()
      this.songLength = this.$refs.music.duration
    },
    _setFull () {
      this.setFull(!this.full)
    },
    nextSong () {
      if (this.songList.length - 1 === this.playIndex) {
        this.setIndex(0)
      } else {
        this.setIndex(this.playIndex + 1)
      }
    },
    prevSong () {
      if (this.playIndex === 0) {
        this.setIndex(this.songList.length - 1)
      } else {
        this.setIndex(this.playIndex - 1)
      }
    },
    playStart () {
      console.dir('开始播放')
      this.$refs.music.play()
      this.songLength = this.$refs.music.duration
      this.play = true
    },
    playing (e) {
      // console.log(this.$refs.music.currentTime)
      this.playProress = this.$refs.music.currentTime
    },
    toComment () {
      this.setComment({
        id: this.id,
        type: 'music'
      })
      this.$router.push({ path: '/comment' })
    },
    setPlayProress (val) {
      if (val >= this.songLength) {
        this.$refs.music.currentTime = this.songLength
      } else if (val <= 0) {
        this.$refs.music.currentTime = 0
      } else {
        this.$refs.music.currentTime = val
      }
    },
    test () {
      alert(123)
    }
  },
  mounted () {
    // this._getMusicUrl()
    // console.dir(this.$refs.music)
  },
  computed: {
    ...mapGetters(['songList', 'playIndex', 'full']),
    id () {
      return this.songList[this.playIndex].id
    },
    musicLoadPlay () {
      return null
    }
  },
  watch: {
    songList () {
      //   console.log(val)
      this.url = ''
      this._getMusicUrl()
      this._getSongDetail()
    },
    playIndex () {
      this.url = ''
      this._getMusicUrl()
      this._getSongDetail()
    }
  },
  components: {
    MusicPlayerMini,
    MusicPlayerFull
  }
}
</script>

<style lang="scss" scoped></style>
