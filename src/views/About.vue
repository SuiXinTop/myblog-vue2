<template>
  <div
    class="about"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <img class="background-img" src="../assets/images/1.jpg" alt />
    <div v-html="myText"></div>
    <html-edit ref="edit" style="width: 100vh; height: 50vh" v-model="myText" />
  </div>
</template>
<script>
import HtmlEdit from "@/components/HtmlEdit/HtmlEdit";

export default {
  name: "about",
  components: {
    HtmlEdit,
  },
  mounted() {},
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
