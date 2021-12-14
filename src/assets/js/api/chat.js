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

//获取离线消息
export function getOfflineMsg(channelId) {
  return axios.request({
    url: api + "chat/offLineMsg",
    method: "get",
    params: {
      channelId: channelId,
    },
  });
}

//删除离线消息
export function delOfflineMsg(channelId) {
  return axios.request({
    url: api + "chat/offLineMsg",
    method: "delete",
    params: {
      channelId: channelId,
    },
  });
}

//更新持久化消息状态
export function updateOffLineMsg(channelId) {
  return axios.request({
    url: api + "chat/offLineMsg",
    method: "put",
    params: {
      channelId: channelId,
    },
  });
}

//更新聊天频道时间
export function updateLastTime(channelId) {
  return axios.request({
    url: api + "chat/lastTime",
    method: "put",
    params: {
      channelId: channelId,
    },
  });
}

export function getHistoryMsg(channelId, pageNum) {
  return axios.request({
    url: api + "chat/msgList",
    method: "get",
    params: {
      channelId: channelId,
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}

export function getGroupHistoryMsg(pageNum) {
  return axios.request({
    url: api + "group/historyMsg",
    method: "get",
    params: {
      pageNum: pageNum,
      pageSize: 10,
    },
  });
}
