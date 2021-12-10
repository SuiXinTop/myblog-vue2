<template>
  <div>
    <el-steps :space="200" :active="active" finish-status="success">
      <el-step title="已完成"></el-step>
      <el-step title="进行中"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
  name: "UserSecurity",
  data() {
    return {
      active: 1,
    };
  },
  methods: {
    next() {
      this.active++;
    },
  },
};
</script>

<style scoped></style>
