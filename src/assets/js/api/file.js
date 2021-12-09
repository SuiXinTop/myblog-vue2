import axios from "@/axios";

const api = "/api/file/file/";

//file,type(blog,blogImg,chat)
export function upload(formData) {
  return axios.request({
    url: api + "all",
    method: "post",
    data: formData,
  });
}
//file,userId
export function uploadUserImg(formData) {
  return axios.request({
    url: api + "userImg",
    method: "post",
    data: formData,
  });
}
