<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20">
        <div ref="content" class="content-card">
          <div v-for="(item, index) in msgList" :key="index">
            <transition
              appear
              enter-active-class="animate__animated animate__bounceInLeft"
            >
              <el-card class="msg-card" shadow="hover">
                <div class="user-info">
                  <img class="avater" :src="item.user.userImg" alt />
                  <div>
                    <label v-text="item.user.userName" />
                    <br />
                    <label v-text="item.msgTime" />
                  </div>
                </div>
                <p class="msg-content" v-html="item.msgContent" />
              </el-card>
            </transition>
          </div>
        </div>
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
      </el-col>
      <el-col :span="4">
        <div style="height: 86vh; overflow-y: auto">
          <div style="text-align: center">在线人员</div>
          <el-divider />
          <div
            style="width: 100%"
            v-for="(user, index) in userList"
            :key="index"
          >
            <transition
              appear
              enter-active-class="animate__animated animate__bounceInLeft"
            >
              <div style="display: flex; align-items: center">
                <img class="avater" :src="user.userImg" alt />
                {{ user.userName }}
              </div>
            </transition>
            <br />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HtmlEdit from "@/components/HtmlEdit/HtmlEdit";
import { getUserId } from "@/assets/js/util/localStore";
import { getUserList, groupUrl } from "@/assets/js/api/chat";

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
      this.getUserList();
    },
    setOnMessage(event) {
      const data = JSON.parse(event.data);
      this.msgList.push({
        msgContent: data.msgContent,
        msgTime: data.msgTime,
        user: data.user,
      });
      this.scrollToBottom();
      this.getUserList();
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
    getUserList() {
      getUserList()
        .then((res) => {
          console.log(res);
          let restMsg = res.data;
          if (restMsg.code === 200) {
            this.userList = restMsg.data;
          }
        })
        .catch();
    },
  },
};
</script>

<style lang="less">
.content-card {
  height: 60vh;
  overflow-y: auto;
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
</style>
