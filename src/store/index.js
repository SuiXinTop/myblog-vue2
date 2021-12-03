import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    getCount(state) {
      return state.count;
    },
  },
  mutations: {
    addCount(state) {
      state.count = state.count + 5;
    },
    delCount(state) {
      state.count--;
    },
  },
  actions: {},
  modules: {
    user,
  },
});
