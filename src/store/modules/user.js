const state = {
  user: {
    userId: localStorage.getItem("userId"),
    userName: localStorage.getItem("userName"),
    userImg: localStorage.getItem("userImg"),
  },
};
const getters = {
  getUser: (state) => {
    return state.user;
  },
};
const mutations = {
  setUser(data) {
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("userImg", data.userImg);
  },
  logout(state) {
    state.user = {};
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userImg");
  },
};
const actions = {
  asyncSetUser: (data) => {
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("userImg", data.userImg);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
