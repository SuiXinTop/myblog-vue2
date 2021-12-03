<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div style="height: 550px; overflow-y: auto">
          <div v-for="i in 2" :key="i">
            <el-card>
              <el-button @click="connect(i)">{{ i }}</el-button>
            </el-card>
            <br />
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div ref="content" style="height: 500px; overflow-y: auto">
            <el-card v-for="(i, index) in list" :key="index">
              <img
                :src="i.user.userImg"
                style="object-fit: cover; width: 50px; height: 50px"
                alt=""
              />
              <label>{{ i.user.userName }}</label>
              <br />
              <br />
              <label>{{ i.msgContent }}</label>
            </el-card>
          </div>
          <el-divider />
          <div>
            <label
              >Msg:
              <el-input v-model="msg" v-on:enter="sendMessage" />
            </label>
          </div>
          <el-button v-on:click="sendMessage()">提交</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "chat",
  mounted() {
    this.scrollContent();
  },
  data() {
    return {
      websocket: null,
      list: [],
      msg: "",
    };
  },
  methods: {
    connect(i) {
      if (this.websocket) {
        this.closeWebSocket();
        return;
      }
      this.websocket = new WebSocket("ws://localhost:8004/chat/" + i);
      this.init();
    },
    init() {
      //连接错误
      this.websocket.onerror = this.setOnError;

      // //连接成功
      this.websocket.onopen = this.setOnOpen;

      //收到消息的回调
      this.websocket.onmessage = this.setOnMessage;

      //连接关闭的回调
      this.websocket.onclose = this.setOnClose;

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.setOnBeforeUnload;
    },
    setOnError() {
      this.$message.info(
        "WebSocket连接发生错误" + "   状态码：" + this.websocket.readyState
      );
    },
    setOnOpen() {
      this.$message.info(
        "WebSocket连接成功" + "   状态码：" + this.websocket.readyState
      );
    },
    setOnMessage(event) {
      const data = JSON.parse(event.data);
      console.log(data.user.userImg);
      this.list.push({
        msgContent: data.msgContent,
        msgTime: data.msgTime,
        user: data.user,
      });
      // this.list.push();

      this.scrollContent();
    },
    setOnClose() {
      this.$message.info(
        "WebSocket连接关闭" + "   状态码：" + this.websocket.readyState
      );
      this.closeWebSocket();
    },
    setOnBeforeUnload() {
      this.closeWebSocket();
    },

    //websocket发送消息
    sendMessage() {
      if (this.msg === "") {
        return false;
      }
      this.websocket.send(this.msg);
      this.list.push({
        msgContent: this.msg,
        msgTime: new Date(),
        user: {},
      });
      this.msg = "";
      this.scrollContent();
    },
    closeWebSocket() {
      this.websocket.close();
    },
    scrollContent() {
      this.$nextTick(() => {
        let el = this.$refs["content"];
        el.scrollTop = el.scrollHeight;
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
