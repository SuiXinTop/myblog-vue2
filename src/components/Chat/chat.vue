<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div style="height: 550px; overflow-y: auto">
          <div v-for="i in 2" :key="i">
            <el-card>
              <el-button @click="setChannel(i)">{{ i }}</el-button>
            </el-card>
            <br />
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div ref="content" style="height: 500px; overflow-y: auto">
            <div v-for="(i, index) in list" :key="index">
              <div>
                <el-card
                  class="msg-card"
                  v-if="i.user.userName === userName"
                  shadow="hover"
                >
                  <label> {{ i.msgTime }}</label>
                  <div>
                    <img class="avater" :src="i.user.userImg" alt />
                    <label> {{ i.user.userName }}</label>
                  </div>
                  <label class="inline-text">{{ i.msgContent }}</label>
                </el-card>
                <el-card
                  class="msg-card"
                  v-else
                  style="text-align: right"
                  shadow="hover"
                >
                  <label> {{ i.user.userName }} {{ i.msgTime }}</label>
                  <div>
                    <label> {{ i.user.userName }}</label>
                    <img class="avater" :src="i.user.userImg" alt />
                  </div>
                  <label class="inline-text">{{ i.msgContent }}</label>
                </el-card>
              </div>
            </div>
          </div>
          <el-divider />
          <div>
            <label
              >Msg:
              <el-input type="textarea" v-model="msg"></el-input>
            </label>
            <div style="text-align: right">
              <el-button v-on:click="sendMessage()">提交</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/date";

export default {
  name: "chat",
  components: {},
  mounted() {},
  data() {
    return {
      websocket: null,
      list: [],
      channelId: 1,
      lockForConnect: false,
      msg: "",
    };
  },
  methods: {
    setChannel(i) {
      this.channelId = i;
      this.connect();
    },
    connect() {
      if (this.lockForConnect) {
        return;
      }
      this.websocket = new WebSocket(
        "ws://localhost:8004/chat/" + this.channelId
      );
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
    reconnect() {
      this.closeWebSocket();
      this.lockForConnect = false;
      this.connect();
    },
    setOnError() {
      this.$message.info("WebSocket连接发生错误");
      // this.reconnect();
      // this.$message.info("WebSocket正在重连!!!");
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
      // this.reconnect();
      // this.$message.info("WebSocket正在重连!!!");
    },
    setOnBeforeUnload() {
      this.closeWebSocket();
    },
    sendMessage() {
      if (this.msg === "") {
        return false;
      }
      this.websocket.send(this.msg);
      this.list.push({
        msgContent: this.msg,
        msgTime: formatDate(),
        user: this.$store.getters["user/getUser"],
      });
      this.msg = "";
      this.scrollToBottom();
    },
    closeWebSocket() {
      this.websocket.close();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        let el = this.$refs["content"];
        el.scrollTop = el.scrollHeight;
      });
    },
  },
};
</script>

<style lang="less" scoped>
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
</style>
