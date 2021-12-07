import axios from "@/axios";

const api = "/api/blog/blog";

export default {
  // 获取博客信息及其用户
  getBlog(blogId) {
    return axios.request({
      url: api + "/blogId",
      method: "get",
      params: {
        blogId: blogId,
      },
    });
  },
};
