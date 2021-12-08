import axios from "@/axios";

const api = "/api/file/file/";

export function upload(formData) {
  return axios.request({
    url: api + "all",
    method: "post",
    data: formData,
  });
}
