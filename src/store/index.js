import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default {
  namespaced: true,
  state: {
    newsinfo: [],
    newsitem: []
  },
  mutations: {
    getnews(state, para) {
      Vue.prototype.call('/getnews', {}, (rs) => {
        console.log(rs)
        state.newsinfo = rs;
      })
    },
    setNewsItem(state, para) {
      state.newsitem = para
    }
  }
}
