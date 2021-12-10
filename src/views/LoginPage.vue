<template>
  <div class="align-center">
    <img class="background-img" src="../assets/images/1.jpg" alt="" />
    <div class="margin-top" />
    <transition appear enter-active-class="animate__animated animate__zoomIn">
      <login />
    </transition>
  </div>
</template>

<script>
import Login from "@/components/Login/login";
export default {
  name: "LoginPage",
  components: { Login },
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
