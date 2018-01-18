<template lang="pug">
  Topic.commentPlugin(:class="{hidden: !appShow}")
</template>

<script>
import Topic from "./component/topic.vue";

export default {
  props: ["appShow"],
  components: {
    Topic
  },
  data() {
    return {};
  }
};
</script>

<style lang='less' scoped>
.commentPlugin {
  
}

.hidden {
  bottom: 1000px !important;
}

// html,
// body {
//   height: 100%;
// }

// body {
//   margin: 0;
// }
</style>
