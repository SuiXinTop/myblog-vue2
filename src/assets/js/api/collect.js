import axios from "@/axios";
import { getUserId } from "@/assets/js/util/localStore";

const api = "/api/blog/collect/";

//显示收藏夹
export function getCollectByUserId(userId, pageNum) {
  return axios.request({
    url: api,
    method: "get",
    params: {
      userId: userId,
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}
//添加收藏
export function addCollect(blogId) {
  let data = { userId: getUserId(), blogId: blogId };
  return axios.request({
    url: api,
    method: "post",
    data: data,
  });
}

export function delCollect(blogId) {
  let data = { userId: getUserId(), blogId: blogId };
  return axios.request({
    url: api + "inBlog",
    method: "delete",
    data: data,
  });
}

export function deleteCollectList(collectIdList) {
  return axios.request({
    url: api + "inList",
    method: "delete",
    data: collectIdList,
  });
}

//是否收藏
export function hasCollect(blogId) {
  let data = { userId: getUserId(), blogId: blogId };
  return axios.request({
    url: api + "hasCollect",
    method: "post",
    data: data,
  });
}
