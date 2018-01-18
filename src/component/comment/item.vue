<template lang="pug">
  z-item.item(@click="fold=!fold")
    z-view.user
      z-view.head
      z-text.name {{item.replier}}
      z-text.time {{item.create_time}}
    z-view.title
      z-text {{item.headname}}
    z-view.top(:class="{overflow: fold}")
      z-view.img-mark(v-if="hasImg")
      z-text {{item.text}}
    z-view.imgs(v-show="!fold")
      z-img.img(v-for="(img, index) of item.imgs" :key="index"
        :src="fold ? '#' : img")
    z-view.bottom
      z-button.rubbish(:class="{marked: haveRubbish}" @click="clickRubbish") {{rubbish}}
        template(slot="left")
          z-view.icon-rubbish(:class="{marked: haveRubbish}")
      z-button.good(:class="{marked: haveGood}" @click="clickGood") {{good}}
        template(slot="left")
          z-view.icon-good(:class="{marked: haveGood}")
</template>

<script>
import u from "../../u";

export default {
  props: ["item"],
  data() {
    return {
      fold: true, // 是否折叠，默认折叠
      haveGood: false,
      haveRubbish: false,
      good: 0,
      rubbish: 0,
      imgs: [
        "http://src.onlinedown.net/images/h_imges/wdj/2/logo/1a4951f5a526f78d0bb4a9555ef93609_256_256.png",
        "http://src.onlinedown.net/images/h_imges/wdj/2/logo/1a4951f5a526f78d0bb4a9555ef93609_256_256.png",
        "http://src.onlinedown.net/images/h_imges/wdj/2/logo/1a4951f5a526f78d0bb4a9555ef93609_256_256.png"
      ]
    };
  },
  computed: {
    hasImg() {
      return this.item.imgs.length > 0;
    }
  },
  mounted() {
    this.configData();
  },
  methods: {
    configData() {
      let status = this.item.comment_status;
      if (status === "up") this.haveGood = true;
      else if (status === "dw") this.haveRubbish = true;
      
      let item = this.item;
      this.good = item.like;
      this.rubbish = item.dislike;
    },
    clickGood() {
      let req = {
        reply_id: this.item.id,
        action: this.haveGood ? "cancel" : "submit"
      };

      u.axiosPost("ugc/parts/reply/thumbup", req).then(res => {
        if (!res) return;

        this.haveGood = !this.haveGood;
        if (this.haveGood) this.good++;
        else this.good--;
      });
    },
    clickRubbish() {
      let req = {
        reply_id: this.item.id,
        action: this.haveRubbish ? "cancel" : "submit"
      };

      u.axiosPost("ugc/parts/reply/thumbdw", req).then(res => {
        if (!res) return;

        this.haveRubbish = !this.haveRubbish;
        if (this.haveRubbish) this.rubbish++;
        else this.rubbish--;
      });
    }
  }
};
</script>

<style scoped lang="less">
.item {
  flex-direction: column;
  justify-content: space-between;
  min-height: 136px;

  @d8Color: #d8d8d8;
  @mainColor: #4990e2;

  .user,
  .title,
  .top,
  .bottom {
    width: 100%;
  }

  .user {
    display: flex;
    align-items: center;
    margin: 10px 0;
    font-size: 12px;

    .head {
      width: 32px;
      height: 32px;
      background: url(../../../static/img/spirit.png) 4px -574px ~"/" 32px auto
        no-repeat;
    }

    .name {
      margin-left: 7px;
      color: #333;
    }

    .time {
      margin-left: 10px;
      color: #999;
    }
  }

  .title {
    span {
      font-size: 12px;
      color: #333;
    }
  }

  .top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 10px 0;

    span {
      font-size: 14px;
      color: #333;
    }

    .img-mark {
      width: 20px;
      height: 20px;
      background: url(../../../static/img/spirit.png) 0 -278px ~"/" 40px auto
        no-repeat;
    }
  }

  .imgs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .img {
      width: 140px;
      height: 140px;
    }
  }

  .overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bottom {
    .good,
    .rubbish {
      padding: 0;

      span {
        font-size: 14px;
        color: #333;
      }
    }

    .rubbish {
      margin-right: 40px;
    }

    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url(/static/img/spirit.png) 4px -476px ~"/" 40px no-repeat;
    }

    .icon-good {
      .icon;

      &.marked {
        background-position-y: -516px;
      }
    }

    .icon-rubbish {
      .icon;
      background-position-y: -556px;
    }

    .icon-rubbish.marked {
      background-position-y: -596px;
    }

    .marked {
      color: @mainColor;
    }
  }
}
</style>
