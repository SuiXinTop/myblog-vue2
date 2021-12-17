<template>
  <transition appear enter-active-class="animate__animated animate__zoomIn">
    <register />
  </transition>
</template>

<script>
import Register from "@/components/Login/register";
export default {
  name: "RegisterPage",
  components: {
    Register,
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/flex";
</style>
