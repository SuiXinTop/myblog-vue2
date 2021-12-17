<template>
  <div class="align-center">
    <div class="margin-top" />
    <el-card class="form-card">
      <el-form ref="form" :model="user" label-width="80px"> </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      user: {},
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex";
.margin-top {
  margin-top: 20vh;
}
.form-card {
  width: 80vh;
  height: 60vh;
  border: none;
  background: rgba(255, 255, 255, 0.61);
  backdrop-filter: blur(4px);
}
</style>
