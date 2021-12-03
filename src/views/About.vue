<template>
  <div class="about">
    <VueEmoji
      class="comment-container"
      ref="emoji"
      @input="onInput"
      :value="myText"
      width="100vh"
    />
    <img
      src="../assets/images/1.jpg"
      preview="0"
      preview-text="描述文字"
      alt=""
    />
    <img
      src="../assets/images/1.jpg"
      preview="0"
      preview-text="描述文字"
      alt=""
    />
    <img
      src="../assets/images/1.jpg"
      preview="0"
      preview-text="描述文字"
      alt=""
    />
    <img
      src="../assets/images/1.jpg"
      preview="0"
      preview-text="描述文字"
      alt=""
    />
    <img
      src="../assets/images/1.jpg"
      preview="0"
      preview-text="描述文字"
      alt=""
    />
  </div>
</template>
<script>
import VueEmoji from "emoji-vue";

export default {
  name: "about",
  components: {
    VueEmoji,
  },
  data() {
    return {
      myText: "",
    };
  },
  methods: {
    onInput(event) {
      //事件。数据包含文本区域的值e
      event.data;
    },
    clearTextarea() {
      this.$refs.emoji.clear();
    },
  },
};
</script>
<style lang="less" scoped>
.comment-container {
  border: 0;
}
</style>
