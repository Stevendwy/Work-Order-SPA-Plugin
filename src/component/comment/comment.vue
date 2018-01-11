<template lang="pug">
  z-page.comment(:noHeader="true")
    z-view.title
      z-text 专家留言区
    z-list.list
      p-item(v-for="(item, index) in comments" :key="index"
        :item="item")
    z-view.reply-button
      z-button.button(@click="replyShow = true") 我要留言
    p-reply(:show="replyShow" @close="replyShow = false")
</template>

<script>
import pItem from "./item.vue";
import pReply from "./reply.vue";

export default {
  components: {
    pItem,
    pReply
  },
  data() {
    return {
      comments: [1, 2, 3, 4, 5, 6, 7, 8],
      replyShow: true // 回复框是否显示出来
    };
  }
};
</script>

<style scoped lang="less">
.comment {
  position: relative;
  overflow: hidden;

  .title {
    width: 100%;
    line-height: 40px;
    padding-left: 10px;
    background: #4990e2;
    color: white;
    font-size: 14px;
  }

  .list {
    width: 100%;
    height: e("calc(100% - 88px)");
  }

  .reply-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    background: white;
    box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.24);

    .button {
      width: 320px;
      height: 40px;
      border-radius: 4px;
      background: #4990e2;
      color: white;
    }
  }
}
</style>
