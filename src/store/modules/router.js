const state = {
  router: {
    path: "",
    name: "",
  },
};
const getters = {
  getRouter: (state) => {
    return state.router;
  },
};
const mutations = {
  setRouter: (state) => {
    state.router.path = this.$route.path;
    state.router.name = this.$route.name;
  },
};
const actions = {
  asyncSetRouter: (context) => {
    context.commit("setRouter");
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
