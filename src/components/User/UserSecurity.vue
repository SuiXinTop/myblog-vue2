<template>
  <div class="align-center">
    <el-steps :active="active" style="width: 100vh">
      <el-step title="验证旧邮箱" icon="el-icon-edit"></el-step>
      <el-step title="填写新邮箱" icon="el-icon-upload"></el-step>
      <el-step title="完成" icon="el-icon-picture"></el-step>
    </el-steps>

    <div v-if="active === 1" id="old-email">
      <el-form style="width: 60vh">
        <el-form-item>
          <el-input v-model="oldEmail.email" disabled />
        </el-form-item>
        <el-form-item>
          <el-input
            style="width: 70%"
            v-model="oldEmail.code"
            placeholder="验证码"
          />
          <el-button type="primary" style="width: 30%"> 发送 </el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="validEmail">验证邮箱</el-button>
    </div>
    <div v-if="active === 2" id="new-email">
      <el-button type="primary" @click="updateEmail">修改邮箱</el-button>
    </div>
    <div v-if="active === 3" id="over">
      <el-result icon="success" title="成功提示" subTitle="邮箱已更换" />
    </div>
  </div>
</template>

<script>
import { getUserEmail } from "@/assets/js/util/localStore";

export default {
  name: "UserSecurity",
  data() {
    return {
      active: 1,
      oldEmail: {
        email: getUserEmail(),
        code: "",
      },
      newEmail: {
        email: "",
        code: "",
      },
    };
  },
  methods: {
    validEmail() {
      this.active++;
    },
    updateEmail() {
      this.active++;
    },
  },
};
</script>

<style lang="less" scoped>
.align-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#old-email {
}
#new-email {
}
#over {
}
</style>
