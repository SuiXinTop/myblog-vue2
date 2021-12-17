import axios from "@/axios";
import { getUserId } from "@/assets/js/util/localStore";

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
      pageSize: 15,
    },
  });
}

export function getBlogNew() {
  return axios.request({
    url: api + "/new",
    method: "get",
  });
}

export function getBlogNewByUserId(userId) {
  return axios.request({
    url: api + "/new/" + userId,
    method: "get",
  });
}

export function getBlogHot() {
  return axios.request({
    url: api + "/hot",
    method: "get",
  });
}

//添加浏览量，浏览记录
export function addView(blogId) {
  let data = {
    blogId: blogId,
    userId: getUserId(),
  };
  return axios.request({
    url: api + "/view",
    method: "post",
    data: data,
  });
}

//点赞
export function addLike(blogId) {
  return axios.request({
    url: api + "/like",
    method: "post",
    params: {
      blogId: blogId,
    },
  });
}
