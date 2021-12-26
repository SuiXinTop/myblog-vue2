import axios from "@/axios";

const api = "/api/blog/sysLog";

export function getLogList(pageNum, status, startTime, endTime) {
  return axios.request({
    url: api,
    method: "get",
    params: {
      pageNum: pageNum,
      pageSize: 10,
      status: status,
      startTime: startTime,
      endTime: endTime,
    },
  });
}
