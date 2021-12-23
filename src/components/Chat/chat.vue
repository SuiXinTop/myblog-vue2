<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="channel-list">
          <div style="text-align: center">聊天列表</div>
          <el-divider />
          <div v-for="(channel, index) in channelList" :key="index">
            <el-button
              style="width: 100%"
              @click="setChannel(channel.channelId)"
              round
            >
              <div style="display: flex; align-items: center">
                <img class="avater" :src="channel.toUserMap.userImg" alt />
                {{ channel.toUserMap.userName }}
              </div>
            </el-button>
            <br /><br />
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div ref="content" style="height: 60vh; overflow-y: auto">
          <div v-for="(i, index) in list" :key="index">
            <transition
              appear
              enter-active-class="animate__animated animate__bounceInLeft"
            >
              <el-card
                :body-style="{ padding: ' 10px 10px  0 10px' }"
                class="msg-card"
                shadow="hover"
              >
                <div class="user-info">
                  <img class="avater" :src="i.user.userImg" alt />
                  <div>
                    <label> {{ i.user.userName }}</label>
                    <br />
                    <label> {{ i.msgTime }}</label>
                  </div>
                </div>
                <p class="msg-content" v-html="i.msgContent" />
              </el-card>
            </transition>
          </div>
        </div>
        <el-divider />
        <div style="float: right">
          <el-button
            type="success"
            icon="el-icon-check"
            v-on:click="clickHistoryShow"
            round
          >
            查看历史纪录
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            v-on:click="sendMessage"
            round
          >
            发送消息
          </el-button>
        </div>
        <br />
        <br />
        <br />
        <html-edit
          ref="htmlEdit"
          v-model="msg"
          @keyup.ctrl.enter.native="sendMessage"
        />
      </el-col>
    </el-row>
    <el-dialog
      :fullscreen="true"
      :close-on-click-modal="false"
      :visible.sync="historyShow"
      :destroy-on-close="true"
      append-to-body
    >
      <history-msg :channel-id="channelId" />
    </el-dialog>
  </div>
</template>

<script>
import HtmlEdit from "@/components/HtmlEdit/HtmlEdit";
import {
  chatUrl,
  delOfflineMsg,
  getChannelList,
  getOfflineMsg,
  updateLastTime,
  updateOffLineMsg,
} from "@/assets/js/api/chat";
import { getUserId } from "@/assets/js/util/localStore";
import HistoryMsg from "@/components/Chat/chat/HistoryMsg";

export default {
  name: "chat",
  components: { HistoryMsg, HtmlEdit },
  mounted() {
    this.getChannelList();
  },
  data() {
    return {
      //开关历史窗口
      historyShow: false,
      //微博socket链接
      websocket: null,
      //消息list
      list: [],
      //聊天频道list
      channelList: [],
      //当前的聊天频道
      channelId: 0,
      //消息输入
      msg: "",
    };
  },
  methods: {
    //获取聊天列表
    getChannelList() {
      let userId = getUserId();
      getChannelList(userId).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.channelList = res.data.data;
          //若存在聊天频道，则系统选择第一个主动连接
          this.setChannel(this.channelList[0].channelId);
        }
      });
    },
    //跳转聊天频道
    setChannel(i) {
      //若未切换频道，则不执行
      if (this.channelId === i) {
        return;
      }
      this.channelId = i;
      this.connect();
    },
    //连接
    connect() {
      //若连接锁为true，则先断开连接，清空消息，释放锁
      if (this.websocket !== null) {
        this.websocket.close();
        this.list = [];
      }
      //连接服务器
      this.websocket = new WebSocket(chatUrl + this.channelId);
      this.init();
    },
    //初始化websocket
    init() {
      this.websocket.onerror = this.setOnError;
      this.websocket.onopen = this.setOnOpen;
      this.websocket.onmessage = this.setOnMessage;
      this.websocket.onclose = this.setOnClose;
      window.onbeforeunload = this.setOnBeforeUnload;
    },
    setOnError() {
      this.$notify.error("WebSocket连接发生错误");
    },
    //建立连接时，拉取离线消息
    setOnOpen() {
      //若有离线消息，则拉取
      getOfflineMsg(this.channelId).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.list = restMsg.data;
          delOfflineMsg(this.channelId);
          updateOffLineMsg(this.channelId);
          this.scrollToBottom();
        }
      });
    },
    //接受消息时，push入msgList
    setOnMessage(event) {
      const data = JSON.parse(event.data);
      this.list.push({
        msgContent: data.msgContent,
        msgTime: data.msgTime,
        user: data.user,
      });
      this.scrollToBottom();
    },
    setOnClose() {
      //连接断开时，发送更新时间请求
      updateLastTime(this.channelId);
    },
    //关闭窗口前，断开websocket连接
    setOnBeforeUnload() {
      this.closeWebSocket();
    },
    //断开websocket连接
    closeWebSocket() {
      this.websocket.close();
    },
    //发送消息
    sendMessage() {
      if (this.msg === "") {
        return false;
      }
      if (!this.websocket) {
        this.$notify.info("聊天频道未连接");
        return false;
      }
      this.websocket.send(this.msg);
      this.$refs.htmlEdit.value = "";
    },
    //聊天框下滑到bottom
    scrollToBottom() {
      this.$nextTick(() => {
        let el = this.$refs.content;
        el.scrollTop = el.scrollHeight;
      });
    },
    //现实聊天历史窗口
    clickHistoryShow() {
      this.historyShow = true;
    },
  },
};
</script>

<style lang="less">
.channel-list {
  height: 86vh;
  overflow-y: auto;
}

.msg-content {
  padding-left: 5px;
  padding-right: 5px;
  overflow-x: auto;
  overflow-wrap: break-word;
  border-radius: 4px;
  max-width: 60vh;
  color: white;
  background: rgba(30, 183, 246, 0.75);
  line-height: 20px;
}

.inline-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 50px;
}

.avater {
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 4px;
}

.msg-card {
  margin: 20px;
}

//渲染显示框图片大小
.msg-content img {
  width: 50vh;
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
.user-info {
  display: flex;
  align-items: center;
}

.flex {
  display: flex;
  flex-direction: column;
}
</style>
