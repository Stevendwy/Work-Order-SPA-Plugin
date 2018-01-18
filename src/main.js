import Vue from 'vue'
import Vuex from 'vuex'
import router from './route/router'
import store from './store'
import App from './App.vue'
import { zRootPage, zPage, zView, zList, zItem, zText, zButton, zImg, zTextarea } from "koala-ui";
Vue.component('zRootPage', zRootPage)
Vue.component('zPage', zPage)
Vue.component('zView', zView)
Vue.component('zList', zList)
Vue.component('zItem', zItem)
Vue.component('zText', zText)
Vue.component('zButton', zButton)
Vue.component('zImg', zImg)
Vue.component('zTextarea', zTextarea)
Vue.prototype.$headerBackground = "#4990e2";

window.VM = new Vue({
  el: '#vue',
  store,
  router,
  template: '<App :appShow="show" />',
  data: {
    show: true
  },
  components: { App },
  mounted() {
    // this.aTopics()
  },
  methods: {
    ...Vuex.mapActions(['aTopics'])
  }
})
