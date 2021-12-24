<template>
  <div class="align-center">
    <img src="../../assets/images/404.png" alt="" />
    <h1>抱歉您访问的页面需要特殊权限</h1>
    <h2>您的账号权限不足，无法访问该页面</h2>
    <div>
      <router-link to="/">
        <el-button type="primary" round>主页</el-button>
      </router-link>

      <el-button style="margin-left: 1vh" type="success" @click="back" round>
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoRole",
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex";

.align-center {
  background: rgb(255, 255, 255);
  height: 100vh;
  img {
    width: 100vh;
    height: auto;
  }
  .el-button {
    width: 200px;
    font-size: 30px;
  }
}
</style>
