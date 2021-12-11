<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="修改用户信息"><user-info /></el-tab-pane>
      <el-tab-pane label="修改用户头像"><user-img /></el-tab-pane>
      <el-tab-pane label="修改用户邮箱"><user-security /></el-tab-pane>
      <el-tab-pane label="修改用户密码"><user-password /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserInfo from "@/components/User/UserInfo";
import UserImg from "@/components/User/UserImg";
import UserSecurity from "@/components/User/UserSecurity";
import UserPassword from "@/components/User/UserPassword";
export default {
  name: "UserEdit",
  components: { UserPassword, UserSecurity, UserImg, UserInfo },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
