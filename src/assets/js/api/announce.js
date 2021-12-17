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
    url: api + "top",
    method: "get",
    params: {
      pageNum: pageNum,
      pageSize: 10,
      isAsc: isAsc || 1,
    },
  });
}
