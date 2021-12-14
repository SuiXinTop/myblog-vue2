<template>
  <div
    ref="card"
    style="height: 84vh; overflow-y: auto"
    @scroll="handleUpToBottom"
  >
    <div v-for="(msgAll, index) in msgList" :key="index">
      <div v-for="(msg, index2) in msgAll" :key="index2">
        <el-divider />
        <div v-if="msg.channelId === channelId">
          <label style="margin-right: 5px">自己</label>
          <label v-text="msg.msgTime" />
          <label class="msg-content" v-html="msg.msgContent" />
        </div>
        <div v-else>
          <label style="margin-right: 5px">对方</label>
          <label v-text="msg.msgTime" />
          <label class="msg-content" v-html="msg.msgContent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryMsg } from "@/assets/js/api/chat";

export default {
  name: "HistoryMsg",
  props: ["channelId"],
  mounted() {
    this.getHistoryMsg(this.channelId, this.pageNum++);
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
        this.getHistoryMsg(this.channelId, this.pageNum++);
      }
    },
    getHistoryMsg(channelId, pageNum) {
      getHistoryMsg(channelId, pageNum)
        .then((res) => {
          let restMsg = res.data;
          console.log(restMsg);
          if (restMsg.code === 200) {
            this.msgList.push(restMsg.data.list);
            console.log(this.msgList);
            return;
          }
          this.$notify.warning(restMsg.msg);
        })
        .catch();
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
