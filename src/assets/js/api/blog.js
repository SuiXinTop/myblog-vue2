import axios from "@/axios";
// 获取博客信息及其用户
export function getBlogByBlogId(params) {
  return axios.get("/api/blog/selectWeiByBlogId", {
    params: params,
  });
}

// 获取博客评论信息及其用户
export function getCommentByBlogId(params) {
  return axios.get("/api/comment/selectByBlogId", {
    params: params,
  });
}
