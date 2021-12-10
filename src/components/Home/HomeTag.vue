<template>
  <div>
    <el-card class="tag-card" shadow="hover"> </el-card>
    <el-card class="tag-card" shadow="hover"> </el-card>
    <el-card class="tag-card" shadow="hover"> </el-card>
  </div>
</template>

<script>
export default {
  name: "HomeTag",
};
</script>

<style lang="less" scoped>
.tag-card {
  text-align: left;
  width: 50vh;
  height: 50vh;
  backdrop-filter: blur(4px);
  background: rgba(250, 249, 249, 0.62);
  margin: 5px;
}
</style>
