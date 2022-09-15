import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
// 1.下载包 yarn add vuex-persistedstate@3.2.1
// 2.引入import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
  // 3.使用
  plugins: [
    createPersistedState({
      // 存储名
      key: 'HEIMA-TOUTIAO',
      // 修改存储地方
      // storage: window.Cookie,
      // 设置存储的内容
      reducer({ tokenObj, myChannels, histories }) {
        return { tokenObj, myChannels, histories }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, tokenData) {
      state.tokenObj = tokenData
    },
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },
    // 定义数组用来 传入新的处理后的数组
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  }
})
