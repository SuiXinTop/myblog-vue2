<template>
  <div>
    <el-button @click="display = !display">切换方式</el-button>
    <email v-show="display" />
    <login v-show="!display" />
  </div>
</template>

<script>
import Login from "@/components/Login/login";
import Email from "@/components/Login/email";
export default {
  name: "index",
  components: { Login, Email },
  mounted() {
    this.$store.commit("user/setUser");
    this.user = this.$store.getters["user/getUser"];
  },
  data() {
    return {
      display: true,
      user: this.$store.getters["user/getUser"],
    };
  },
};
</script>

<style scoped></style>
