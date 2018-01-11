<template lang="pug">
  z-view.reply(:class="{show: show}" @clickSelf="close")
    z-view.content
      canvas.triangle(ref='triangle' width="12" height="6"
        @click="close")
      z-textarea.textarea(placeholder="输入你的留言内容，建议精简内容，以便获得更多查看" :maxlength="140" initialValue="" :autofocus="true" @updateValue="updateValue")
      z-view.explain
        z-img.img(:src="'#'")
        z-text.remind 上传零件实物图片奖励10个专家积分
</template>

<script>
export default {
  props: ["show"],
  mounted() {
    this.buildTriangle();
  },
  methods: {
    buildTriangle() {
      let ctx = this.$refs.triangle.getContext("2d");
      ctx.moveTo(0, 0);
      ctx.lineTo(6, 6);
      ctx.lineTo(12, 0);
      ctx.strokeStyle = "#d8d8d8";
      ctx.stroke();
    },
    close() {
      this.$emit("close");
    },
    updateValue(value) {
      console.log(value)
    }
  }
};
</script>

<style scoped lang="less">
@pWidth: 390px;
@pHeight: 426px;
.reply {
  position: absolute;
  top: @pHeight;
  padding-top: 40px;
  width: @pWidth;
  height: @pHeight - 40px;
  transition: transform 0.3s ease;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: @pWidth;
    height: @pHeight - 80px;
    background: white;
    box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.24);

    .triangle {
      margin: 7px 0;
      cursor: pointer;
    }

    .textarea {
      width: 370px;
      height: 120px;
      border: 1px solid #d8d8d8;
      border-radius: 4px;
    }

    .explain {
      width: 100%;
      padding-left: 10px;
      margin: 10px 0 13px 0;

      .img {
        
      }

      .remind {
        font-size: 12px;
        color: #999;
      }
    }
  }
}

.show {
  transform: translateY(-@pHeight + 40px);
}
</style>
