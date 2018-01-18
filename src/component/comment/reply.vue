<template lang="pug">
  z-view.reply(:class="{show: true, block: builded}" @clickSelf="close")
    z-view.content
      canvas.triangle(ref='triangle' width="12" height="6"
        @click="close")
      z-textarea.textarea(placeholder="输入你的留言内容，建议精简内容，以便获得更多查看" :maxlength="120" initialValue="" :autofocus="true" @updateValue="updateValue"
        textColor="#333")
      z-view.explain
        z-view.img-mark
        z-text.remind 上传零件实物图片奖励10个专家积分
      z-view.uploads
        z-img.img(v-for="(img, index) of imgs" :key="index"
          :src="img.url")
        z-button.upload(v-if="imgs.length < 4" @click="fileUpload.click()")
        input.file-upload(ref="fileUpload" type="file" @change="fileChange")
      z-view.ctrls
        z-button.cancel(@click="close") 取消
        z-button.submit(@click="submit") 提交留言
</template>

<script>
import u from "../../u";

export default {
  components: {},
  props: ["show", "info"],
  data() {
    return {
      imgs: [],
      fileUpload: null, // 图片上传的 input
      builded: false, // 构建完成
      commentConent: '', // 评论内容
    };
  },
  mounted() {
    this.buildTriangle();
    this.fileUpload = this.$refs.fileUpload;
    // setTimeout(this.close, 100);
    this.builded = true;
    // setTimeout(() => {
    //   this.builded = true;
    // }, 500);
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
      this.commentConent = value
    },
    submit() {
      let info = this.info
      let formData = new FormData()
      formData.append("pid", info.pid);
      formData.append("auth", info.auth);
      formData.append("brandCode", info.brandCode);
      formData.append("headname", info.headname);
      formData.append("text", this.commentConent);
      for (let i = 0, j = this.imgs.length; i < j; i ++) {
        let file = this.imgs[i].file
        formData.append("filename", file);
      }

      u.axiosForm("/ugc/parts/reply/leave_comments", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        if(!res) return

        this.$emit('callback')
        this.$emit('update')
        this.$emit('close')
      })
    },
    fileChange() {
      let file = this.fileUpload.files[0];
      let url = URL.createObjectURL(file);
      this.imgs.push({ url, file });
    }
  }
};
</script>

<style scoped lang="less">
@pWidth: 390px;
@pHeight: 426px;
@d8Color: #d8d8d8;
@d8line: 1px solid @d8Color;
@pColor: #4990e2;

.reply {
  position: absolute;
  // top: @pHeight;
  bottom: 0;
  // padding-top: 40px;
  // width: @pWidth;
  width: 100%;
  // height: @pHeight - 40px;
  // transition: transform 0.3s ease;
  opacity: 0;

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
      display: flex;
      align-items: center;
      width: 100%;
      padding-left: 20px;
      margin: 10px 0;

      .img-mark {
        width: 20px;
        height: 20px;
        background: url(../../../static/img/spirit.png) 0 -278px ~"/" 40px auto
          no-repeat;
      }

      .remind {
        font-size: 12px;
        color: #999;
      }
    }

    .uploads {
      display: flex;
      width: 100%;
      height: 80px;
      padding: 0 10px;
      box-sizing: border-box;

      .img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }

      @width: 80px;
      @height: @width;

      .upload {
        position: relative;
        width: @width;
        height: @height;
        border: @d8line;
        border-radius: 0;
        cursor: pointer;

        &:before {
          content: "";
          position: absolute;
          left: 30px;
          top: 39px;
          width: 20px;
          border-top: @d8line;
        }

        &:after {
          content: "";
          position: absolute;
          left: 39px;
          top: 30px;
          height: 20px;
          border-left: @d8line;
        }
      }

      .file-upload {
        display: none;
      }
    }

    .ctrls {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 48px;
      margin-top: 36px;

      .cancel,
      .submit {
        width: 140px;
        height: 40px;
        border-radius: 4px;
        color: white;
        margin: 0 10px;
      }

      .cancel {
        background: @d8Color;
      }

      .submit {
        background: @pColor;
      }
    }
  }
}

.show {
  // transform: translateY(-@pHeight + 40px);
}

.block {
  opacity: 1;
}
</style>
