import axios from "@/axios";

const api = "/api/blog/search/";

export function getBlogListByTagId(tagId, pageNum) {
  return axios.request({
    url: api + "blog/" + tagId,
    method: "get",
    params: {
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}

export function getBlogListByParam(param, pageNum, start, end) {
  return axios.request({
    url: api + "param",
    method: "get",
    params: {
      param: param,
      pageNum: pageNum,
      pageSize: 10,
      isAsc: 0,
      start: start,
      end: end,
    },
  });
}
