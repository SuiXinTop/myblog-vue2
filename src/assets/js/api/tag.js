import axios from "@/axios";

const api = "/api/blog/tag";

export function getTagList() {
  return axios.request({
    url: api,
    method: "get",
    params: {
      pageNum: 1,
      pageSize: 10,
    },
  });
}
