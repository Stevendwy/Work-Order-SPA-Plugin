import Vue from 'vue'
import VueRouter from 'vue-router'
import Empty from '../component/empty.vue'
import Comment from '../component/comment.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {path: '/empty', alias: '/', component: Empty},
    {path: '/comment', component: Comment},
  ]
})