import Vue from 'vue'
import Vuex from 'vuex'
import u from './u'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topics: [], // 文章列表
  },
  mutations: {
    updateTopics(state, payload) {
      state.topics = payload.topics
    }
  },
  actions: {
    aTopics({ commit }, payload) {
      return (
        u.axiosPost('/ugc/parts/reply/comments/list')
          .then(res => {
            if (!res) return

            let topics = res.data
            commit('updateTopics', { topics })
          })
      )
    }
  }
})