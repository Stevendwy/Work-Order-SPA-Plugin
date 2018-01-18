<template lang="pug">
  .topic(@click.self="close")
    z-root-page.homepage(title='话题')
      z-list(:items="topics" style="cursor: pointer;"
        @itemClick="itemClick")
      transition(:name="transitionName"
        @before-enter="beforeEnter"
        @after-enter="afterEnter")
        router-view(:afterEnter="hasEnter")
</template>

<script>
import u from "../u";
import Vuex from "vuex";

export default {
  data() {
    return {
      transitionName: "push",
      hasEnter: this.$route.path === "/" ? false : undefined
    };
  },
  computed: {
    ...Vuex.mapState(["topics"])
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (to.path === "/") {
        this.transitionName = "pop";
        this.aTopics();
      } else if (from.path === "/") this.transitionName = "push";
      else this.transitionName = toDepth > fromDepth ? "push" : "pop";
    }
  },
  methods: {
    ...Vuex.mapActions(["aTopics"]),
    itemClick(item) {
      this.$router.push("/comment");
    },
    beforeEnter(el, done) {
      this.hasEnter = false;
    },
    afterEnter(el, done) {
      this.hasEnter = true;
    },
    close() {
      window.closeCommentPlugin()
    }
  }
};
</script>

<style scoped lang="less">
.topic {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 999;

  @d8line: 1px solid #d8d8d8;
  @pWidth: 390px;
  @pHeight: 426px;

  .homepage {
    position: absolute;
    top: 130px;
    bottom: 0;
    left: 0;
    width: 37.8%;
    min-width: 390px;
    height: auto;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.24);
    background: white;

    .content > .page {
      position: absolute;
      width: 100%;
      height: 100%;
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
