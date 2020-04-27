export class Playlist {
  constructor (name, playNum, bgImg, tags, id) {
    this.name = name
    this.playNum = setPlayNum(playNum)
    this.bgImg = bgImg
    this.tags = setTags(tags)
    this.id = id
  }
}

export class Song {
  constructor (name, id, ar) {
    this.name = name
    this.id = id
    this.ar = setArs(ar)
  }
}

function setTags (data) {
  let tags = ''
  data.forEach(item => {
    tags += '/' + item
  })
  return tags.slice(1)
}

function setArs (data) {
  let tags = ''
  data.forEach(item => {
    tags += '/' + item.name
  })
  return tags.slice(1)
}

function setPlayNum (data) {
  let playNum = data / 10000
  return playNum.toFixed(1)
}
