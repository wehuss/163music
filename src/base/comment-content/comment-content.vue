<template>
  <div class="comment-content" v-if="comments">
    <h2 class="title">{{ title }}</h2>
    <div
      class="comment-wrapper"
      v-for="(comment, index) in comments"
      :key="index"
    >
      <div class="user">
        <img :src="comment.user.avatarUrl" />
        <p class="user-name">{{ comment.user.nickname }}</p>
      </div>
      <div class="comment">
        {{ comment.content }}
      </div>
      <div class="like">
        <svg
          t="1586237580622"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2197"
        >
          <path
            d="M300 415.136V936h477.916c25.815 0 41.979-5.525 51.808-14.617 6.238-6.125 9.602-13.574 10.735-20.38l0.438-2.633 92.314-402.165 0.176-0.712c5.816-23.53 1.843-43.53-10.447-59.143-9.517-11.702-32.017-21.182-59.61-21.182H546.349l72.213-130.586c7.856-14.206 15.912-31.605 23.947-53.053 10.618-28.344 20.148-61.09 28.115-98.645 0.036-0.32-0.053-0.518-0.461-1.612-1.324-3.544-4.218-8.523-9.47-15.814C644.654 97.161 623.467 88 594.813 88c-18.135 0-28.537 4.288-37.618 12.874-8.405 7.946-14.718 17.855-25.561 39.254l-5.634 11.118-5.344 5.732c-0.433 0.72-0.918 1.551-1.444 2.474-1.787 3.135-7.986 14.904-10.1 18.652l0.01 0.006c-25.204 43.028-36.934 62.463-52.366 85.841-21.447 32.49-42.12 59.384-64.482 82.682-28.251 29.434-58.872 52.508-92.273 68.503z m-88 24.668c-9.61 0.98-19.418 1.476-29.43 1.476H97.667c-6.617 0-8.667 2.052-8.667 8.768v477.696c0 6.207 2.054 8.256 8.667 8.256H212V439.804z m483.57-112.636h167.76c53.193 0 101.27 20.48 128.379 54.272 29.665 37.376 39.382 85.504 27.107 135.168l-91.552 398.848c-2.557 15.36-10.74 44.544-36.826 69.632-27.107 25.6-64.956 38.912-112.522 38.912H97.667C42.429 1024 1 982.528 1 927.744V450.048c0-55.296 41.429-96.768 96.667-96.768h84.903c121.729 0 184.64-107.008 250.618-219.648 1.535-2.56 12.787-25.6 19.947-33.28C471.037 65.024 504.282 0 594.811 0c55.239 0 101.782 20.992 135.027 60.928 17.39 23.552 34.268 52.224 27.108 89.088-7.304 34.634-15.547 64.206-23.833 89.152l-37.543 88z"
            p-id="2198"
          ></path>
        </svg>
        {{comment.likedCount}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    comments: {
      type: Array,
      default: () => null
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-content {
  margin-bottom: 30px;
  .title {
    font-size: 34px;
    font-weight: 100;
    margin: 20px 0;
  }
  .comment-wrapper {
      position: relative;
      margin-top: 10px;
    .user {
      display: flex;
      // justify-items: start;
      align-items: center;
      height: 4vh;
      img {
        width: 50px;
        height: auto;
        border-radius: 50%;
        margin-right: 10px;
      }
      .user-name {
        font-size: 30px;
      }
    }
    .comment {
      padding: 20px;
      padding-left: 0;
      margin-left: 60px;
      font-size: 28px;
      min-height: 50px;
      border-bottom: 1px solid #cecece;
    }
    .like{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 24px;
        display: flex;
        align-items: center;
        .icon{
            width: 30px;
            height: auto;
        }
    }
  }
}
</style>
