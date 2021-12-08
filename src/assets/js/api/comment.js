import axios from "@/axios";

const api = "/api/blog/comment";

export function getCommentList(blogId) {
  return axios.request({
    url: api + "/blogId",
    method: "get",
    params: {
      blogId: blogId,
      pageNum: 1,
      pageSize: 10,
    },
  });
}
