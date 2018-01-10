<template lang="pug">
  z-page.comment(:noHeader="true")
    .title
      z-text 专家留言区
    z-list
      p-item(v-for="(item, index) in comments" :key="index"
        :item="item")
</template>

<script>
import pItem from "./item.vue";

export default {
  components: {
    pItem
  },
  data() {
    return {
      comments: [1, 2, 3]
    };
  }
};
</script>

<style scoped lang="less">
.title {
  width: 100%;
  line-height: 40px;
  padding-left: 10px;
  background: #4990e2;
  color: white;
  font-size: 14px;
}
</style>
