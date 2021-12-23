import axios from "@/axios";

const api = "/api/blog/admin/blog/";

export function getBlogException(pageNum) {
  return axios.request({
    url: api + "exception",
    method: "get",
    params: {
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}

export function getBlogNormal(pageNum) {
  return axios.request({
    url: api + "normal",
    method: "get",
    params: {
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}

export function banBlog(blogIdList) {
  return axios.request({
    url: api,
    method: "delete",
    data: blogIdList,
  });
}

export function recoverBlog(blogIdList) {
  return axios.request({
    url: api,
    method: "put",
    data: blogIdList,
  });
}
