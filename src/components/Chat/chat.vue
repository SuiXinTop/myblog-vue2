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
                  v-if="i.user.userName === 'suixin'"
                  shadow="hover"
                >
                  <label> {{ i.msgTime }}</label>
                  <div>
                    <img class="avater" :src="i.user.userImg" alt />
                    <label> {{ i.user.userName }}</label>
                  </div>
                  <label v-html="i.msgContent" />
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
                  <label v-html="i.msgContent" />
                </el-card>
              </div>
            </div>
          </div>
          <el-divider />
          <div>
            <quill-editor
              ref="QuillEditor"
              :options="editorOption"
              v-model="msg"
            />
            <el-upload
              action="#"
              style="display: none"
              accept="image/jpeg,image/png,image/jpg"
              :before-upload="onBeforeUploadImage"
              :http-request="UploadImage"
            >
              <el-button id="upload-chat" size="small" type="primary"
                >点击上传
              </el-button>
            </el-upload>
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
import { upload } from "@/assets/js/api/file";

export const editorOption = {
  theme: "snow",
  placeholder: "请在这里输入",
  modules: {
    toolbar: {
      container: [["link", "image"]],
      handlers: {
        image: function (value) {
          if (value) {
            document.getElementById("upload-chat").click();
          } else {
            this.quill.format("image", false);
          }
        },
      },
    },
  },
};

export default {
  name: "chat",
  data() {
    return {
      editorOption,
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
      if (this.msg === "" || !this.websocket) {
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
    onBeforeUploadImage(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt1M = file.size / 1024 / 1024 < 5;
      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 5MB!");
      }
      return isIMAGE && isLt1M;
    },
    UploadImage(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("type", "chat");
      upload(formData)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.$notify.success(res.data.msg);
            this.handleSuccess(res.data.data);
            return;
          }
          this.$notify.error(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error("上传失败");
        });
    },
    handleSuccess(url) {
      // 获取富文本组件实例
      let quill = this.$refs.QuillEditor.quill;
      // 如果上传成功
      if (url) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, "image", url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        // 提示信息，需引入Message
        this.$notify.error("图片插入失败");
      }
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
