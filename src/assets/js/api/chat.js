import axios from "@/axios";

const api = "/api/chat/";

export const chatUrl = "ws://localhost:8083/chat/";
export const groupUrl = "ws://localhost:8083/group/";

//获取历史聊天窗口
export function getChannelList(userId) {
  return axios.request({
    url: api + "chat/channelList",
    method: "get",
    params: {
      userId: userId,
    },
  });
}

//创建聊天窗口
export function createChannel(fromUser, toUser) {
  return axios.request({
    url: api + "chat/channel",
    method: "post",
    params: {
      fromUser: fromUser,
      toUser: toUser,
    },
  });
}

//群聊获取在线用户
export function getUserList() {
  return axios.request({
    url: api + "group/userList",
    method: "get",
  });
}

export function getOfflineMsg(channelId) {
  return axios.request({
    url: api + "chat/offLineMsg",
    method: "get",
    params: {
      channelId: channelId,
    },
  });
}

export function delOfflineMsg(channelId) {
  return axios.request({
    url: api + "chat/offLineMsg",
    method: "delete",
    params: {
      channelId: channelId,
    },
  });
}

export function updateOffLineMsg(channelId) {
  return axios.request({
    url: api + "chat/offLineMsg",
    method: "put",
    params: {
      channelId: channelId,
    },
  });
}

export function updateLastTime(channelId) {
  return axios.request({
    url: api + "chat/lastTime",
    method: "put",
    params: {
      channelId: channelId,
    },
  });
}
