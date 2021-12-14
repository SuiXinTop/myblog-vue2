<template>
  <div
    ref="card"
    style="height: 84vh; overflow-y: auto"
    @scroll="handleUpToBottom"
  >
    <div v-for="(msgGroup, index) in msgList" :key="index">
      <div v-for="(msg, index2) in msgGroup" :key="index2">
        <div class="user-info">
          <img class="avater" :src="msg.user.userImg" alt />
          <div>
            <label v-text="msg.user.userName" />
            <br />
            <label v-text="msg.msgTime" />
          </div>
        </div>
        <p class="msg-content" v-html="msg.msgContent" />
        <el-divider />
      </div>
    </div>
  </div>
</template>

<script>
import { getGroupHistoryMsg } from "@/assets/js/api/chat";

export default {
  name: "GroupHistoryMsg",
  mounted() {
    this.getHistoryMsg(this.pageNum++);
  },
  data() {
    return {
      pageNum: 1,
      msgList: [],
    };
  },
  methods: {
    //下滑至底部，加载
    handleUpToBottom() {
      let e = this.$refs.card;
      if (e.scrollTop + e.offsetHeight > e.scrollHeight - 1) {
        this.getHistoryMsg(this.pageNum++);
      }
    },
    getHistoryMsg(pageNum) {
      getGroupHistoryMsg(pageNum).then((res) => {
        let restMsg = res.data;
        console.log(restMsg);
        if (restMsg.code === 200) {
          this.msgList.push(restMsg.data.list);
          return;
        }
        this.$notify.warning(restMsg.msg);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.msg-content img {
  width: 50vh;
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
