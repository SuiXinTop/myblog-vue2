<template>
  <div>
    <el-card>
      <div ref="content" style="height: 300px; overflow-y: auto">
        <div v-for="i in list" :key="i">
          <p v-html="i" />
        </div>
      </div>
      <div>
        <label>userId:<el-input v-model="userId" /> </label>
        <label>Msg:<el-input v-model="msg" /></label>
      </div>
      <el-button @click="connect()">连接</el-button>
      <el-button @click="send()">提交</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "chat",
  mounted() {
    this.$nextTick(() => {
      this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
    });
  },
  data() {
    return {
      websocket: null,
      list: [
        "聊天室",
        "哇哇哇哇哇撒大苏打哇哇哇哇哇撒大苏1打",
        "哇哇哇哇哇撒大苏打2",
        "哇哇哇哇哇撒大苏打3",
        "哇哇哇哇哇撒大苏打21",
        "哇哇哇哇哇撒大苏打211",
        "哇哇哇哇哇撒大苏打212",
        "哇哇哇哇哇撒大苏打213",
      ],
      msg: "",
      userId: 1,
      data: "",
    };
  },
  methods: {
    connect() {
      if (this.websocket !== null) {
        this.$message.warning("请勿宠物链接");
        return false;
      }
      this.websocket = new WebSocket(
        "ws://localhost:8004/group/" + this.userId
      );
      this.init();
    },
    init() {
      //连接错误
      this.websocket.onerror = this.setErrorMessage;

      // //连接成功
      this.websocket.onopen = this.setOnopenMessage;

      //收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage;

      //连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage;

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload;
    },
    setErrorMessage() {
      this.data =
        "WebSocket连接发生错误" + "   状态码：" + this.websocket.readyState;
    },
    setOnopenMessage() {
      this.data =
        "WebSocket连接成功" + "   状态码：" + this.websocket.readyState;
    },
    setOnmessageMessage(event) {
      this.data = "服务端返回：" + event.data;
      this.list.push(event.data);
      this.$nextTick(() => {
        this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
      });
    },
    setOncloseMessage() {
      this.data =
        "WebSocket连接关闭" + "   状态码：" + this.websocket.readyState;
    },
    onbeforeunload() {
      this.closeWebSocket();
    },

    //websocket发送消息
    send() {
      this.websocket.send(this.msg);
      this.msg = "";
    },
    closeWebSocket() {
      this.websocket.close();
    },
  },
};
</script>

<style lang="less" scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
