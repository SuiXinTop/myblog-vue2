<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="channel-list">
          <div style="text-align: center">聊天列表</div>
          <el-divider />
          <div v-for="(channel, ck) in channelList" :key="ck">
            <el-button
              style="width: 100%"
              @click="setChannel(channel.channelId)"
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
              <el-card class="msg-card" shadow="hover">
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
        <div>
          <html-edit
            ref="htmlEdit"
            v-model="msg"
            @keyup.ctrl.enter.native="sendMessage"
          />
          <br />
          <div style="text-align: right">
            <el-button v-on:click="sendMessage">提交</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
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

export default {
  name: "chat",
  components: { HtmlEdit },
  mounted() {
    this.getChannelList();
  },
  data() {
    return {
      websocket: null,
      list: [],
      channelList: [],
      channelId: 0,
      lockForConnect: false,
      msg: "",
    };
  },
  methods: {
    //获取聊天列表
    getChannelList() {
      let userId = getUserId();
      getChannelList(userId)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.channelList = res.data.data;
            //若存在聊天频道，则系统选择第一个主动连接
            this.setChannel(this.channelList[0].channelId);
            return;
          }
          this.$notify.error(res.data.msg);
        })
        .catch((err) => {
          this.$notify.error(err.message);
        });
    },
    setChannel(i) {
      //若未切换频道，则不执行
      if (this.channelId === i) {
        return;
      }
      this.channelId = i;
      this.connect();
    },
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
    init() {
      this.websocket.onerror = this.setOnError;
      this.websocket.onopen = this.setOnOpen;
      this.websocket.onmessage = this.setOnMessage;
      this.websocket.onclose = this.setOnClose;
      window.onbeforeunload = this.setOnBeforeUnload;

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
    setOnError() {
      this.$notify.error("WebSocket连接发生错误");
    },
    setOnOpen() {},
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
      this.$notify.info("断开");
      //连接断开时，发送更新时间请求
      updateLastTime(this.channelId);
    },
    setOnBeforeUnload() {
      this.closeWebSocket();
    },
    sendMessage() {
      if (this.msg === "" || !this.websocket) {
        return false;
      }
      this.websocket.send(this.msg);
      this.$refs.htmlEdit.value = "";
    },
    closeWebSocket() {
      this.websocket.close();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        let el = this.$refs.content;
        el.scrollTop = el.scrollHeight;
      });
    },
  },
};
</script>

<style lang="less">
.channel-list {
  height: 86vh;
  overflow-y: auto;
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
