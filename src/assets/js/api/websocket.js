import axios from "@/axios";

const api = "/api/chat/";

export default {
  //获取历史聊天窗口
  getChannelList(userId) {
    return axios.request({
      url: api + "chat/channelList",
      method: "get",
      params: {
        userId: userId,
      },
    });
  },

  //创建聊天窗口
  createChannel(fromUser, toUser) {
    return axios.request({
      url: api + "chat/channel",
      method: "post",
      params: {
        fromUser: fromUser,
        toUser: toUser,
      },
    });
  },

  //群聊获取在线用户
  getUserList() {
    return axios.request({
      url: api + "group/userList",
      method: "get",
    });
  },
};
