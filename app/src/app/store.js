import { createStore } from "vuex";
import jwtDecode from "jwt-decode";

const getT = localStorage.getItem("vuetoken");

// Initialize the state object with the values from the decoded token if it exists
const initialState = {
  token: getT || "",
  isLogged: Boolean(getT),
  sub: getT ? jwtDecode(getT).sub : "",
  username: getT ? jwtDecode(getT).username : "",
  email: getT ? jwtDecode(getT).email : "",
};

export default createStore({
  state: { ...initialState },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    removeToken(state) {
      state.token = "";
      state.isLogged = false;
      state.sub = "";
      state.username = "";
      state.email = "";
    },
  },

  actions: {
    saveToken({ commit }, token) {
      commit("setToken", token);
      const userDetails = jwtDecode(token);
      localStorage.setItem("vuetoken", token);
      commit("setUserDetails", userDetails);
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
    getSub: (state) => {
      return state.sub;
    },
    getUsername: (state) => {
      return state.username;
    },
    getEmail: (state) => {
      return state.email;
    },
  },
});
