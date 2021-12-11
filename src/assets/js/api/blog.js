import axios from "@/axios";

const api = "/api/blog/blog";

// 获取博客信息
export function getBlog(blogId) {
  return axios.request({
    url: api,
    method: "get",
    params: {
      blogId: blogId,
    },
  });
}

//获取暂存的博客信息
export function getBlogTemp(userId) {
  return axios.request({
    url: api + "/temp",
    method: "get",
    params: {
      userId: userId,
    },
  });
}

//发布博客
export function saveBlog(blog) {
  return axios.request({
    url: api,
    method: "post",
    data: blog,
  });
}

//暂存博客
export function saveBlogTemp(blog) {
  return axios.request({
    url: api + "/temp",
    method: "post",
    data: blog,
  });
}
export function updateBlog(blog) {
  return axios.request({
    url: api,
    method: "put",
    data: blog,
  });
}

export function deleteBlog(blogIdList) {
  return axios.request({
    url: api,
    method: "delete",
    data: blogIdList,
  });
}

export function getBlogListByUserId(userId, pageNum) {
  return axios.request({
    url: api + "/blogList",
    method: "get",
    params: {
      userId: userId,
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}

export function getBlogNew() {
  return axios.request({
    url: api + "/new",
    method: "get",
  });
}

export function getBlogHot() {
  return axios.request({
    url: api + "/hot",
    method: "get",
  });
}
