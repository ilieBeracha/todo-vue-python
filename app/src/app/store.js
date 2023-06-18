import { createStore } from "vuex";
import jwtDecode from "jwt-decode";

const getT = localStorage.getItem("vuetoken");

export default createStore({
  state: {
    token: "",
    isLogged: Boolean(getT),
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    removeToken(state) {
      state.token = "";
      state.isLogged = false;
    },
  },

  actions: {
    saveToken({ commit }, token) {
      commit("setToken", token);
      const userDetails = jwtDecode(token);
      console.log(userDetails)
      localStorage.setItem("vuetoken", token);
    },
    logout({ commit }) {
      commit("removeToken");
      localStorage.removeItem("vuetoken");
      location.reload();
    },
  },
  getters: {
    getToken: (state) => {
      return state.token;
    },
    getIsLogged: (state) => {
      return state.isLogged;
    },
  },
});
