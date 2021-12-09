<template>
  <div class="align-center">
    <img class="background-img" src="../assets/images/1.jpg" alt="" />
    <div class="margin-top" />
    <email />
    <login />
  </div>
</template>

<script>
import Email from "@/components/Login/email.vue";
import Login from "@/components/Login/login.vue";
export default {
  name: "LoginPage",
  components: { Email, Login },
  mounted() {},
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.margin-top {
  margin-top: 20vh;
}
.align-center {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
