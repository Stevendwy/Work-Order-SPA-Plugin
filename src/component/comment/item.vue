<template lang="pug">
  z-item.item(@click="fold=!fold")
    z-view.user
      z-img.head(:src="'#'")
      z-text.name 名字
      z-text.time 日期
    z-view.title
      z-text 我是 title
    z-view.top(:class="{overflow: fold}")
      z-text 这个后视镜价格不对！谁知道价格？着急啊，哪位大神知道的快点告诉我，跪求
    z-view.imgs(v-show="!fold")
      z-img.img(v-for="(img, index) of imgs" :key="index"
        :src="fold ? '#' : img")
    z-view.bottom
      z-button(@click="clickGood") {{good}}
        template(slot="left")
          z-view.icon-good(:class="{marked: haveGood}")
      z-button(@click="clickRubbish") {{rubbish}}
        template(slot="left")
          z-view.icon-rubbish(:class="{marked: haveRubbish}")
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      fold: true, // 是否折叠，默认折叠
      haveGood: false,
      haveRubbish: false,
      good: 2,
      rubbish: 2,
      imgs: [
        'http://src.onlinedown.net/images/h_imges/wdj/2/logo/1a4951f5a526f78d0bb4a9555ef93609_256_256.png',
        'http://src.onlinedown.net/images/h_imges/wdj/2/logo/1a4951f5a526f78d0bb4a9555ef93609_256_256.png',
        'http://src.onlinedown.net/images/h_imges/wdj/2/logo/1a4951f5a526f78d0bb4a9555ef93609_256_256.png',
      ]
    }
  },
  methods: {
    clickGood() {
      this.haveGood = !this.haveGood
      if(this.haveGood) this.good ++
      else this.good --
    },
    clickRubbish() {
      this.haveRubbish = !this.haveRubbish
      if(this.haveRubbish) this.rubbish ++
      else this.rubbish --
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
    margin: 10px 0;
    font-size: 12px;

    .head {
      width: 32px;
      height: 32px;
    }

    .name {
      color: #333;
    }

    .time {
      color: #999;
    }
  }

  .title {
    font-size: 12px;
    color: #333;
  }

  .top {
    font-size: 14px;
    color: #333;
    margin: 10px 0;
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
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url(/static/img/spirit.png) 4px -470px ~'/' 40px no-repeat;
    }

    .icon-good {
      .icon;
    }

    .icon-rubbish {
      .icon;
      background-position-y: -510px
    }

    .marked {
      color: @mainColor;
    }
  }
}
</style>
