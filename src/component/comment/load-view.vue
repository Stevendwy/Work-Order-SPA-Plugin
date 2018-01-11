<template lang="pug">
  z-button.load-view(@click="upload")
</template>

<script>
export default {
  methods: {
    upload() {
      console.log('upload')
    }
  }
};
</script>

<style scoped lang="less">
@width: 80px;
@height: @width;
@d8Color: #d8d8d8;
@d8line: 1px solid @d8Color;

.load-view {
  position: relative;
  width: @width;
  height: @height;
  border: @d8line;
  border-radius: 0;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    left: 30px;
    top: 39px;
    width: 20px;
    border-top: @d8line;
  }

  &:after {
    content: '';
    position: absolute;
    left: 39px;
    top: 30px;
    height: 20px;
    border-left: @d8line;
  }
}
</style>
