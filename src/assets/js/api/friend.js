import axios from "@/axios";
import { getUserId } from "@/assets/js/util/localStore";

const api = "/api/blog/attend/";

export function getAttendList(userId, pageNum) {
  return axios.request({
    url: api + "attendList",
    method: "get",
    params: {
      fansUserId: userId,
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}

export function getFansList(userId, pageNum) {
  return axios.request({
    url: api + "fansList",
    method: "get",
    params: {
      attendUserId: userId,
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}

export function hasAttend(attendUserId) {
  let data = {
    attendUserId: attendUserId,
    fansUserId: getUserId(),
  };
  return axios.request({
    url: api + "hasAttend",
    method: "post",
    data: data,
  });
}

export function addAttend(attendUserId) {
  let data = {
    attendUserId: attendUserId,
    fansUserId: getUserId(),
  };
  return axios.request({
    url: api,
    method: "post",
    data: data,
  });
}

export function deleteAttend(attendUserId) {
  let data = {
    attendUserId: attendUserId,
    fansUserId: getUserId(),
  };
  return axios.request({
    url: api + "one",
    method: "delete",
    data: data,
  });
}

export function deleteAttendList(attendIdList) {
  return axios.request({
    url: api + "list",
    method: "delete",
    data: attendIdList,
  });
}
