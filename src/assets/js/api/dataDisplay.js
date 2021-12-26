import axios from "@/axios";

const api = "/api/blog/display/";

export function getUserDetailCount(userId) {
  return axios.request({
    url: api + "user",
    method: "get",
    params: {
      userId: userId,
    },
  });
}

export function getAdminDetailCount() {
  return axios.request({
    url: api + "admin",
    method: "get",
  });
}
