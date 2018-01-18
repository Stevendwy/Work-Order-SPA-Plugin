export default {
  props: {
    afterEnter: Boolean
  },
  data() {
    return {
      renderContent: false // 是否渲染内容用来优化性能
    };
  },
  watch: {
    afterEnter(hasEnter) {
      if (hasEnter) this.build()
    }
  },
  mounted() {
    // if(this.afterEnter === undefined) this.build() // 上线版本，根路径为评论，不用判断
    this.build()
  },
  methods: {
    build() {
      this.renderContent = true;
    }
  }
}