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
    if(this.afterEnter === undefined) this.build()
  },
  methods: {
    build() {
      this.renderContent = true;
    }
  }
}