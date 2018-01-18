<template lang="pug">
  z-page.comment(:noHeader="true")
    z-view.title
      z-text 专家留言区
      z-button(@click="close") 关闭
    template(v-if="renderContent")
      z-view.list-empty(v-if="comments.length < 1")
        z-img.img(src="/static/img/p_world.png")
        z-text.text 对数据有疑问？
        z-text.text 想寻求专业人士解答？
        z-text.text 或者 想提供零件实物图片？
        z-text.text 这是一块新大陆，现在属于你，赶快留言吧！
        //- z-button.other(@click="otherClick") 看看其他留言>
      z-list.list(v-else)
        p-item(v-for="(item, index) in comments" :key="index"
          :item="item")
      z-view.reply-button
        z-button.button(@click="replyShow = true") 我要留言
      p-reply(v-if="replyShow" @close="replyShow = false" @update="aComments" :pid="currentPid")
</template>

<script>
import pItem from "./item.vue";
import pReply from "./reply.vue";
import mixin from "../../mixin/mixin";
import u from "../../u";

export default {
  components: {
    pItem,
    pReply
  },
  mixins: [mixin],
  data() {
    return {
      comments: [],
      replyShow: false, // 回复框是否显示出来
      currentPid: '' // 当前请求的 pid
    };
  },
  mounted() {
    window.commentPluginShowWithParams = this.aComments
  },
  methods: {
    otherClick() {
      this.$router.go(-1);
    },
    aComments(payload) {
      if(payload) this.currentPid = payload.pid

      this.configGlobal()
      this.comments = []

      u.axiosPost("/ugc/parts/reply/comments/list", { pid: this.currentPid })
        .then(res => {
          if(!res) return

          this.comments = res.data
        })
    },
    configGlobal() {
      // 请求才配置，否则第一次就配置获取不到对象
      if(window.VM) window.VM.show = true
      // 配置全局对接 api
      if(!window.closeCommentPlugin) window.closeCommentPlugin = () => window.VM.show = false
    },
    close(){
      window.VM.show = false
    }
  }
};
</script>

<style scoped lang="less">
.comment {
  position: relative;
  overflow: hidden;

  @pColor: #4990e2;

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

  .list-empty {
    .list;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .img {
      width: 80px;
      height: 80px;
      margin-bottom: 25px;
    }

    .text {
      font-size: 14px;
      color: #d8d8d8;
    }

    .other {
      width: 110px;
      height: 32px;
      color: @pColor;
      border: 1px solid @pColor;
      border-radius: 4px;
      margin-top: 10px;
    }
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
