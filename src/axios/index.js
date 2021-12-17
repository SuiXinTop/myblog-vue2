import axios from "axios";
import router from "@/router";
import "@/axios/loading";
import { delAll, getToken } from "@/assets/js/util/localStore";
import { modal } from "@/assets/js/util/modal";
// import { hideLoading, showLoading } from "@/axios/loading";

axios.defaults.timeout = 10000;
axios.interceptors.request.use(
  (config) => {
    // showLoading();
    const token = getToken();
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
    if (response) {
      console.log(response.data);
      switch (response.data) {
        case 200:
          break;
        case 400:
          modal.notifyWarning(response.data.msg);
          break;
        case 401:
          delAll();
          router.replace("/login").then();
          //强制刷新
          location.reload();
          modal.notifyWarning(response.data.msg);
          break;
        case 403:
          modal.notifyWarning(response.data.msg);
          break;
        default:
          break;
      }
    }
    return response;
  },
  (error) => {
    // hideLoading();
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        case 401:
          router.replace("/").then();
          break;
        // 403 token过期
        case 403:
          modal.notifyWarning("登录过期");
          // 清除token
          delAll();
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          router.replace("/").then();
          break;
        // 404请求不存在
        case 404:
          modal.notifyError("请求不存在");
          break;
        case 500:
          modal.notifyError("服务离线");
          break;
        // 其他错误，直接抛出错误提示
        default:
          modal.notifyError("出现未知错误");
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default axios;
