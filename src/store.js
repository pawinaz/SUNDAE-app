import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import enurl from "@/api/environment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import VueCookies from 'vue-cookies';

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    status: "",
    token: "",
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, user) {
      state.status = "success";
      state.token = user.token;
    },
    auth_error(state) {
      state.status = "error";
    },
    Logout(state) {
      state.status = "";
      state.token = "";
    },
  },
  actions: {
    LoginUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: `${enurl.apiUrl}Login/Login`,
          data: user,
          method: "POST",
        })
          .then((response) => {
            if (response.data.status == 0) {
              const token = response.data.data.token;
              localStorage.setItem("Token", token);
              localStorage.setItem("isLoggedIn", true);
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + token;

              const datetime = new Date();
              datetime.setTime(datetime.getTime() + 7 * 24 * 60 * 60 * 1000);
              let expires = "expires=" + datetime.toUTCString();
              document.cookie =
                "isLoggedIn" + "=" + true + ";" + expires + ";path=/";
              document.cookie =
                "Token" + "=" + token + ";" + expires + ";path=/";
              document.cookie =
                "Username" +
                "=" +
                response.data.data.username +
                ";" +
                expires +
                ";path=/";
              commit("auth_success", user);
              resolve(response);
            } else {
              if (response.data.message == "User นี้กำลังใช้งานอยู่ในระบบ !") {
                commit("auth_error");
                reject(response);
              } else {
                commit("auth_error");
                reject(response);
              }
            }
          })
          .catch((err) => {
            commit("auth_error");
            reject(err);
            Swal.fire("Error!", err.message);
          });
      });
    },

    CheckToken({ commit }, token) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: `${enurl.apiUrl}Login/CheckToken`,
          data: token,
          method: "POST",
        })
          .then((response) => {
            if (response.data.status == 0) {
              const token = response.data.data.token;
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + token;
              commit("auth_success", token);
              resolve(response);
            } else {
              if (response.data.message == "Token หมดอายุ") {
                localStorage.removeItem("Token");
                reject(response);
              } else {
                commit("auth_error");
                reject(response.data.message);
              }
            }
          })
          .catch((err) => {
            commit("auth_error");
            reject(err);
          });
      });
    },

    Logout({ commit }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        commit("Logout");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        // this.$cookies.remove("Token");
        // this.$cookies.remove("isLoggedIn");
        // this.$cookies.remove("Username");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
});
