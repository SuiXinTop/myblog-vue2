import axios from "@/axios";
import { getUserId } from "@/assets/js/util/localStore";

const api = "/api/blog/user/";

export function register(userRegister) {
  return axios.request({
    url: api + "register",
    method: "post",
    data: userRegister,
  });
}

export function updateInfo(user) {
  return axios.request({
    url: api + "info",
    method: "put",
    data: user,
  });
}

export function updateEmail(email, code) {
  let userSecurity = {
    userId: getUserId(),
    email: email,
    code: code,
  };
  return axios.request({
    url: api + "security",
    method: "put",
    data: userSecurity,
  });
}

export function updatePassword(password) {
  let data = {
    userId: getUserId(),
    userPassword: password,
  };
  return axios.request({
    url: api + "info",
    method: "put",
    data: data,
  });
}

export function getUserByUserId(userId) {
  return axios.request({
    url: api + "userId/" + userId,
    method: "get",
  });
}

export function getUserByUserName(userName) {
  return axios.request({
    url: api + "userId/" + userName,
    method: "get",
  });
}

export function deleteUser(userId) {
  return axios.request({
    url: api,
    method: "delete",
    params: {
      userId: userId,
    },
  });
}
