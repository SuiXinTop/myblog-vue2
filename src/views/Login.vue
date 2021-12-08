<template>
  <div class="align-center"><index /></div>
</template>

<script>
import index from "@/components/Login/index";
export default {
  name: "Login",
  components: {
    index,
  },
};
</script>

<style lang="less" scoped>
.align-center {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
