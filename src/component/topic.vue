<template lang="pug">
  .topic
    z-root-page.homepage(title='话题')
      z-list(:items="items" style="cursor: pointer;"
        @itemClick="itemClick")
      transition(:name="transitionName"
        @before-enter="beforeEnter"
        @after-enter="afterEnter")
          router-view(:afterEnter="hasEnter")
</template>

<script>
export default {
  data() {
    return {
      items: ['车架号', '车型', '零件号'],
      transitionName: "push",
      hasEnter: false
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (to.path === "/") this.transitionName = "pop";
      else if (from.path === "/") this.transitionName = "push";
      else this.transitionName = toDepth > fromDepth ? "push" : "pop";
    }
  },
  methods: {
    itemClick(item) {
      console.log(item);
      this.$router.push("/comment");
    },
    beforeEnter(el, done) {
      this.hasEnter = false;
    },
    afterEnter(el, done) {
      this.hasEnter = true;
    }
  }
};
</script>

<style scoped lang="less">
.topic {
  position: fixed;
  top: 8px;
  left: 8px;
  width: @pWidth;
  height: @pHeight;
  background: white;
  box-shadow: 0 1px 8px 0 rgba(0,0,0,0.24);
  overflow-x: hidden;
  overflow-y: scroll;

  @d8line: 1px solid #d8d8d8;
  @pWidth: 390px;
  @pHeight: 426px;

  .homepage {
    .content>.page {
      position: absolute;
      width: @pWidth;
      height: @pHeight;
    }

    .push-enter {
      transform: translateX(@pWidth);
      opacity: 0.8;
    }

    .push-enter-active {
      transition: all 0.3s ease;
    }

    .push-enter-to,
    .push-leave {
      transform: translateX(0);
      opacity: 1;
    }

    .push-leave-active {
      transition: all 0.3s ease;
    }

    .push-leave-to,
    .pop-enter {
      transform: translateX(-@pWidth / 2);
      opacity: 0.8;
    }

    .pop-enter-active {
      transition: all 0.3s ease;
    }

    .pop-enter-to,
    .pop-leave {
      transform: translateX(0);
      opacity: 1;
    }

    .pop-leave-active {
      transition: all 0.3s ease;
      z-index: 999;
    }

    .pop-leave-to {
      transform: translateX(@pWidth);
    }
  }
}
</style>
