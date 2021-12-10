<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <div style="height: 550px; overflow-y: auto">
          <div v-for="(channel, ck) in channelList" :key="ck">
            <el-button @click="setChannel(channel.channelId)">
              <div style="display: flex; align-items: center">
                <img class="avater" :src="channel.toUserMap.userImg" alt />
                {{ channel.toUserMap.userName }}
              </div>
            </el-button>
            <br />
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div ref="content" style="height: 70vh; overflow-y: auto">
          <div v-for="(i, index) in list" :key="index">
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
          </div>
        </div>
      </el-col>
    </el-row>
    <el-divider />
    <div>
      <html-edit ref="htmlEdit" v-model="msg" />
      <br />
      <div style="text-align: right">
        <el-button v-on:click="sendMessage">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import HtmlEdit from "@/components/HtmlEdit/HtmlEdit";
import { chatUrl, getChannelList } from "@/assets/js/api/chat";
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
      channelId: 1,
      lockForConnect: false,
      msg: "",
    };
  },
  methods: {
    getChannelList() {
      let userId = getUserId();
      getChannelList(userId)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.$notify.success(res.data.msg);
            this.channelList = res.data.data;
            return;
          }
          this.$notify.error(res.data.msg);
        })
        .catch((err) => {
          this.$notify.error(err.message);
        });
    },
    setChannel(i) {
      this.channelId = i;
      this.connect();
    },
    connect() {
      if (this.lockForConnect) {
        return;
      }
      this.websocket = new WebSocket(chatUrl + this.channelId);
      this.init();
    },
    init() {
      this.websocket.onerror = this.setOnError;
      this.websocket.onopen = this.setOnOpen;
      this.websocket.onmessage = this.setOnMessage;
      this.websocket.onclose = this.setOnClose;
      window.onbeforeunload = this.setOnBeforeUnload;
      this.lockForConnect = true;
    },
    setOnError() {
      this.$message.info("WebSocket连接发生错误");
    },
    setOnOpen() {
      this.$message.info("WebSocket连接成功");
    },
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
      this.$message.error("WebSocket连接关闭");
      this.lockForConnect = false;
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
