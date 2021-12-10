<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20">
        <div ref="content" style="height: 70vh; overflow-y: auto">
          <div v-for="(i, index) in msgList" :key="index">
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
      <el-col :span="4">
        <div style="height: 550px; overflow-y: auto"></div>
      </el-col>
    </el-row>
    <el-divider />
    <div>
      <html-edit
        ref="htmlEdit"
        @keydown.ctrl.enter.native="sendMessage"
        v-model="msg"
      />
      <br />
      <div style="text-align: right">
        <el-button v-on:click="clearMessage">清空窗口</el-button>
        <el-button v-on:click="sendMessage">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import HtmlEdit from "@/components/HtmlEdit/HtmlEdit";
import { getUserId } from "@/assets/js/util/localStore";
import { groupUrl } from "@/assets/js/api/chat";

export default {
  name: "group",
  components: { HtmlEdit },
  mounted() {
    this.connect();
  },
  data() {
    return {
      websocket: null,
      userList: [],
      msgList: [],
      lockForConnect: false,
      msg: "",
    };
  },
  methods: {
    connect() {
      if (this.lockForConnect) {
        return;
      }
      this.websocket = new WebSocket(groupUrl + getUserId());
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
      this.$notify.error("发生错误");
    },
    setOnOpen() {
      this.$notify.success("欢迎进入聊天室");
    },
    setOnMessage(event) {
      const data = JSON.parse(event.data);
      this.msgList.push({
        msgContent: data.msgContent,
        msgTime: data.msgTime,
        user: data.user,
      });
      this.scrollToBottom();
    },
    setOnClose() {
      this.$notify.success("离开聊天室");
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
        let el = this.$refs["content"];
        el.scrollTop = el.scrollHeight;
      });
    },
    clearMessage() {
      this.msgList = [];
    },
  },
};
</script>

<style lang="less">
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
</style>
