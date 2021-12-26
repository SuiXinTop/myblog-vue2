import axios from "@/axios";

const api = "/api/blog/announcement/";

export function getTopAnnounce() {
  return axios.request({
    url: api + "top",
    method: "get",
  });
}

export function getAnnounce(pageNum, isAsc) {
  return axios.request({
    url: api,
    method: "get",
    params: {
      pageNum: pageNum,
      pageSize: 10,
      isAsc: isAsc,
    },
  });
}

export function saveAnnounce(data) {
  return axios.request({
    url: api,
    method: "post",
    data: data,
  });
}

export function topAnnounce(data) {
  return axios.request({
    url: api + "top",
    method: "put",
    data: data,
  });
}

export function deleteAnnounce(data) {
  return axios.request({
    url: api,
    method: "delete",
    data: data,
  });
}
