import axios from "@/axios";

const api = "/api/blog/history";

export function getHistory(userId, pageNum, isAsc) {
  return axios.request({
    url: api,
    method: "get",
    params: {
      userId: userId,
      pageNum: pageNum,
      pageSize: 10,
      isAsc: isAsc,
    },
  });
}
