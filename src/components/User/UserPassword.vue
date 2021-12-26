<template>
  <div class="align-center">
    <el-steps :active="active" style="width: 100vh">
      <el-step title="验证旧邮箱" icon="el-icon-edit"></el-step>
      <el-step title="修改密码" icon="el-icon-upload"></el-step>
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
          <el-button
            type="primary"
            style="width: 30%"
            @click="sendEmail"
            :disabled="!canSend"
          >
            发送
          </el-button>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button
            style="width: 100%"
            type="primary"
            @click="validEmail(oldEmail)"
          >
            验证邮箱
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="active === 2" id="update-info">
      <el-form style="width: 60vh">
        <el-form-item>
          <el-input
            v-model="updateInfo.password"
            placeholder="新密码"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="updateInfo.rePassword"
            placeholder="确认密码"
            show-password
          />
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button style="width: 100%" type="primary" @click="updatePassword">
            确认修改
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="active === 3" id="over">
      <el-result icon="success" title="成功提示" subTitle="密码已修改" />
    </div>
  </div>
</template>

<script>
import { getUserEmail } from "@/assets/js/util/localStore";
import { verifyEmail, verifyEmailCode } from "@/assets/js/api/auth";
import { modal } from "@/assets/js/util/modal";
import { updatePassword } from "@/assets/js/api/user";

export default {
  name: "UserPassword",
  data() {
    return {
      active: 1,
      canSend: true,
      oldEmail: {
        email: getUserEmail(),
        code: null,
      },
      updateInfo: {
        password: null,
        rePassword: null,
      },
    };
  },
  methods: {
    sendEmail() {
      verifyEmail(getUserEmail());
      modal.notifySuccess("发送成功");
      this.canSend = false;
    },
    validEmail(data) {
      verifyEmailCode(data).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.active++;
          modal.notifySuccess(restMsg.msg);
          return;
        }
        modal.notifyError(restMsg.msg);
      });
    },
    updatePassword() {
      if (this.updateInfo.rePassword !== this.updateInfo.password) {
        modal.notifyWarning("密码不一致");
        return;
      }
      updatePassword(this.updateInfo.password).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.active++;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.align-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
}
</style>
