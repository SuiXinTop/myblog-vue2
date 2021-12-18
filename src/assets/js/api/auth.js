import axios from "@/axios";
import { randomCode } from "@/assets/js/util/random";

const api = "/api/auth/auth/";

//邮箱密码登录
export function login(data) {
  return axios.request({
    url: api + "login",
    method: "post",
    data: data,
  });
}

//邮箱验证码登录
export function emailLogin(data) {
  return axios.request({
    url: api + "email",
    method: "post",
    data: data,
  });
}

//发送验证邮件
export function verifyEmail(email) {
  let data = {
    email: email,
    code: randomCode(),
  };
  return axios.request({
    url: api + "verifyEmail",
    method: "post",
    data: data,
  });
}

export function verifyEmailCode(data) {
  return axios.request({
    url: api + "verifyEmail",
    method: "put",
    data: data,
  });
}

//发送注册邮件
export function registerMail(data) {
  return axios.request({
    url: api + "registerMail",
    method: "post",
    data: data,
  });
}

//账号登出
export function logout() {
  return axios.request({
    url: api + "logout",
    method: "delete",
  });
}
