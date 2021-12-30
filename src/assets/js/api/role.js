import axios from "@/axios";

const api = "/api/blog/role/";

export function getRoleList() {
  return axios.request({
    url: api + "all",
    method: "get",
  });
}
