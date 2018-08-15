import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
  },
  getters: {
    isMob() {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    },
    loginStatus: state => state.token,
  },
  mutations: {
    // 获取 token: 此处获取到token的数据
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {

  },
});
