<template lang="pug">
  z-item.item(@click="fold=!fold")
    z-view.top(:class="{overflow: fold}")
      z-text 这个后视镜价格不对！谁知道价格？着急啊，哪位大神知道的快点告诉我，跪求
    z-view.imgs(v-show="!fold")
      z-img.img(v-for="(img, index) of imgs" :key="index"
        :src="fold ? '#' : img")
    z-view.bottom
      z-text 日期
      z-view
        z-button(@click="clickGood"
          :class="{marked: haveGood}") 赞 {{good}}
        z-button(@click="clickRubbish"
          :class="{marked: haveRubbish}") 踩 {{rubbish}}
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
  min-height: 60px;

  @d8Color: #d8d8d8;
  @mainColor: #4990e2;

  .top,
  .bottom {
    width: 100%;
  }

  .top {
    font-size: 14px;
    color: #333;
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
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: @d8Color;

    .marked {
      color: @mainColor;
    }
  }
}
</style>
