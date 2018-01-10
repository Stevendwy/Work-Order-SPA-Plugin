<template lang="pug">
  z-page.comment(title="评论")
    z-list(:items="comments")
      p-item(v-for="(item, index) in comments" :key="index")
</template>

<script>
import pItem from './item.vue'
export default {
  components: {
    pItem
  },
  data() {
    return {
      comments: [1,2,3]
    }
  }
}
</script>

<style scoped lang="less">
.comment {

}
</style>
