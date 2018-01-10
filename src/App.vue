<template lang="pug">
  #app {{content}}
</template>

<script>
export default {
  data() {
    return {
      content: "Hello Vue"
    };
  }
};
</script>


<style lang='less'>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
}
</style>
