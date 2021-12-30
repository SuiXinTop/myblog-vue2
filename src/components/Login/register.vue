<template>
  <div class="align-center">
    <el-card class="align-center" style="width: 90vh; margin-top: 10vh">
      <div style="text-align: center">
        <router-link to="/" style="float: left; color: rgba(0, 0, 0, 0.74)">
          首页
        </router-link>
        <label class="title">注册</label>
      </div>
      <br />
      <el-steps :active="active">
        <el-step title="填写信息" icon="el-icon-upload"></el-step>
        <el-step title="完成" icon="el-icon-picture"></el-step>
      </el-steps>
      <br />
      <div v-if="active === 1">
        <el-form ref="form" class="form-card" :model="user" :rules="rules">
          <el-form-item prop="userName">
            <el-input v-model="user.userName" placeholder="昵称" />
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
              v-model="user.userPassword"
              placeholder="密码"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-input v-model="password" placeholder="确认密码" show-password />
          </el-form-item>
          <el-form-item prop="userEmail">
            <el-input v-model="user.userEmail" placeholder="邮箱" />
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              style="width: 70%"
              v-model="user.code"
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
            <el-button type="primary" @click="singUp" style="width: 100%">
              注册
            </el-button>
            <router-link style="float: right" to="/login">登录</router-link>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active === 2" id="over" class="align-center">
        <el-result icon="success" title="成功提示" subTitle="注册成功" />
        <router-link to="/login">
          <el-button type="success">前往登录</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import { registerMail } from "@/assets/js/api/auth";
import { modal } from "@/assets/js/util/modal";
import { randomCode } from "@/assets/js/util/random";
import { register } from "@/assets/js/api/user";
import { hideLoading, showLoading } from "@/axios/loading";

export default {
  name: "register",
  data() {
    return {
      active: 1,
      canSend: true,
      password: "",
      user: {
        userName: "",
        userPassword: "",
        userEmail: "",
        code: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur",
          },
          { min: 4, max: 20, message: "昵称长度为4-20" },
        ],
        userEmail: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
          {
            pattern: /^\w+@[a-zA-Z0-9]+((\.[a-z0-9A-Z]+)+)$/,
            message: "邮箱格式错误",
            trigger: "blur",
          },
        ],
        userPassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,15}$/,
            message: "长度在 8 到 16 同时包含英文与数字的字符串",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4",
          },
        ],
      },
    };
  },
  methods: {
    //注册
    singUp() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          this.$notify.error("输入格式错误！");
          return;
        }
        if (this.password !== this.user.userPassword) {
          this.$notify.error("密码不一致！");
          return;
        }
        showLoading();
        register(this.user)
          .then((res) => {
            let restMsg = res.data;
            if (restMsg.code === 200) {
              modal.notifySuccess(restMsg.msg);
              this.active++;
            }
            hideLoading();
          })
          .catch(() => {
            hideLoading();
          });
      });
    },
    //发送验证邮件
    sendEmail() {
      let email = {
        email: this.user.userEmail,
        code: randomCode(),
      };
      registerMail(email);
      modal.notifySuccess("发送成功");
      this.canSend = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex";
.margin-top {
  margin-top: 20vh;
}

.title {
  font-size: 34px;
}

.form-card {
  width: 70vh;
  height: 60vh;
  border: none;
  text-align: center;
  background: rgba(255, 255, 255, 0.61);
  backdrop-filter: blur(4px);
}
</style>
