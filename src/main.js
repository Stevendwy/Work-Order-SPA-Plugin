import Vue from 'vue'
import router from './route/router'
import App from './App.vue'
import { zRootPage, zPage, zList, zItem } from "koala-ui";
Vue.component('zRootPage', zRootPage)
Vue.component('zPage', zPage)
Vue.component('zList', zList)
Vue.component('zItem', zItem)
Vue.prototype.$headerBackground = "blue";

new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
})
