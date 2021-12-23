import axios from "@/axios";

const api = "/api/blog/comment/";

//查询博客的评论
export function getCommentByBlogId(blogId, pageNum) {
  return axios.request({
    url: api + "blogId",
    method: "get",
    params: {
      blogId: blogId,
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}

//发布评论
export function saveComment(comment) {
  return axios.request({
    url: api,
    method: "post",
    data: comment,
  });
}

//查询用户的评论
export function getCommentByUserId(userId, pageNum) {
  return axios.request({
    url: api + "userId",
    method: "get",
    params: {
      userId: userId,
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}
