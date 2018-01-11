import Vue from 'vue'
import router from './route/router'
import App from './App.vue'
import { zRootPage, zPage, zView, zList, zItem, zText, zButton, zImg } from "koala-ui";
Vue.component('zRootPage', zRootPage)
Vue.component('zPage', zPage)
Vue.component('zView', zView)
Vue.component('zList', zList)
Vue.component('zItem', zItem)
Vue.component('zText', zText)
Vue.component('zButton', zButton)
Vue.component('zImg', zImg)
Vue.prototype.$headerBackground = "#4990e2";

new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
})
