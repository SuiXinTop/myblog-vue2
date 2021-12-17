<template>
  <div class="align-center">
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
@import "../assets/css/flex";

.margin-top {
  margin-top: 20vh;
}
</style>
