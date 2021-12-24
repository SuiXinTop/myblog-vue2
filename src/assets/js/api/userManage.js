import axios from "@/axios";

const api = "/api/blog/admin/user/";

export function getUserException(pageNum) {
  return axios.request({
    url: api + "exception",
    method: "get",
    params: {
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}

export function getUserNormal(pageNum) {
  return axios.request({
    url: api + "normal",
    method: "get",
    params: {
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}

export function banUser(userIdList) {
  return axios.request({
    url: api,
    method: "delete",
    data: userIdList,
  });
}

export function recoverUser(userIdList) {
  return axios.request({
    url: api + "/recover",
    method: "put",
    data: userIdList,
  });
}
