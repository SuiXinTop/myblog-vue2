import axios from "@/axios";

const api = "/api/auth/auth/";

export default {
  //邮箱密码登录
  login(data) {
    return axios.request({
      url: api + "login",
      method: "post",
      data: data,
    });
  },

  //邮箱验证码登录
  emailLogin(data) {
    return axios.request({
      url: api + "email",
      method: "post",
      data: data,
    });
  },

  //发送验证邮件
  verifyEmail(data) {
    return axios.request({
      url: api + "verifyEmail",
      method: "post",
      data: data,
    });
  },

  //发送注册邮件
  registerMail(data) {
    return axios.request({
      url: api + "registerMail",
      method: "post",
      data: data,
    });
  },

  //账号登出
  logout() {
    return axios.request({
      url: api + "logout",
      method: "delete",
    });
  },
};
