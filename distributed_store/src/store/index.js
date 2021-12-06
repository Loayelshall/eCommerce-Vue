import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: false,
    token: "",
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("token")) {
        state.isAuthenticated = true;
        state.token = localStorage.getItem("token");
      } else {
        state.isAuthenticated = false;
        state.token = "";
      }
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
  },
  actions: {},
  modules: {},
});
