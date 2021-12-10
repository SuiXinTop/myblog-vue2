import axios from "@/axios";

const api = "/api/blog/comment";

export function getCommentList(blogId, pageNum) {
  return axios.request({
    url: api + "/blogId",
    method: "get",
    params: {
      blogId: blogId,
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}

export function saveComment(comment) {
  return axios.request({
    url: api,
    method: "post",
    data: comment,
  });
}
