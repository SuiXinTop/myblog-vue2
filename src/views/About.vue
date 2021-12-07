<template>
  <div
    class="about"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <img class="background-img" src="../assets/images/1.jpg" alt />

    <!--    <VueEmoji-->
    <!--      class="comment-container"-->
    <!--      ref="emoji"-->
    <!--      @input="onInput"-->
    <!--      :value="myText"-->
    <!--      width="100vh"-->
    <!--    />-->
    <login-form />
  </div>
</template>
<script>
// import VueEmoji from "emoji-vue";
import LoginForm from "@/components/Login/index";

export default {
  name: "about",
  components: {
    LoginForm,
    // VueEmoji,
  },
  data() {
    return {
      myText: "",
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.comment-container {
  border: 0;
}
</style>
