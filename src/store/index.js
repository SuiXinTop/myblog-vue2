import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";
import router from "@/store/modules/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {},
  mutations: {
    addCount(state) {
      state.count++;
    },
    delCount(state) {
      state.count--;
    },
  },
  actions: {
    addFunc({ context }) {
      context.commit("addCount");
    },
    delFunc(context) {
      context.commit("delCount");
    },
  },
  modules: {
    user,
    router,
  },
});
