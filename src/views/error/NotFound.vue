<template>
  <div class="align-center">
    <img src="../../assets/images/404.png" alt="" />
    <h1>抱歉您访问的页面出错了</h1>
    <h2>您可能输错了网址，或该网页已删除或不存在</h2>
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
  name: "notFound",
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
