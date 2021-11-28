const state = {
  user: {
    userId: "",
    userName: "",
  },
};
const getters = {
  getUser: (state) => {
    return state.user;
  },
};
const mutations = {
  setUser: (state, data) => {
    state.user = data;
  },
};
const actions = {
  asyncSetUser: (context, data) => {
    context.commit("setUser", data);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
