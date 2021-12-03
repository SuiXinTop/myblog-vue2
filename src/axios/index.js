import axios from "axios";
import router from "@/router";
import "@/axios/loading";
// import { hideLoading, showLoading } from "@/axios/loading";

axios.defaults.timeout = 10000;
axios.interceptors.request.use(
  (config) => {
    // showLoading();
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.common["authorization"] = token;
    }
    return config;
  },
  (error) => {
    // hideLoading();
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    // hideLoading();
    return response;
  },
  (error) => {
    // hideLoading();
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          // this.$store.commit('del_token')
          router
            .replace({
              path: "/login",
            })
            .then();
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default axios;
