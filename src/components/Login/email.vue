<template>
  <transition appear enter-active-class="animate__animated animate__zoomIn">
    <el-card class="login">
      <el-form ref="form" class="form" :model="form" :rules="rules">
        <el-form-item>
          <span id="title">用户登录</span>
        </el-form-item>
        <el-form-item prop="userEmail">
          <el-input type="text" v-model="form.email" placeholder="邮箱">
            <template slot="prepend">
              <i class="el-icon-user icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            type="text"
            v-model="form.code"
            style="width: 70%"
            placeholder="验证码"
          >
          </el-input>
          <el-button style="width: 30%" @click="sendEmail" :disabled="hasSend">
            发送验证码
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" @click="login">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </transition>
</template>

<script>
import { emailLogin, verifyEmail } from "@/assets/js/api/auth";

export default {
  name: "email",
  data() {
    return {
      form: {
        email: "",
        code: "",
      },
      rules: {
        email: [
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
      },
      hasSend: false,
    };
  },
  methods: {
    login() {
      this.valid();
      if (this.form.code.length !== 4) {
        this.$message.warning("验证码为4位");
        return false;
      }
      emailLogin(this.form)
        .then((res) => {
          console.log(res);
          this.$message.success(res.data.msg);
          localStorage.setItem("token", res.data.data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendEmail() {
      this.valid();
      let data = { email: this.form.email, code: "1111" };

      verifyEmail(data)
        .then((res) => {
          console.log(res);
          this.$message.success("发送成功");
          this.hasSend = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    valid() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          this.$message.error("输入格式错误！");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background: rgba(249, 250, 252, 0.62);
  backdrop-filter: blur(4px);
  width: 500px;
  height: 400px;
  text-align: center;
}

.form {
  margin: 0 30px 0 30px;

  #title {
    font-size: 30px;
  }

  .icon {
    font-size: 20px;
    color: black;
  }
}

.code {
  width: 100px;
  height: 40px;
  border-radius: 20px;
}

.login-button {
  font-size: 20px;
  font-family: 微软雅黑, serif;
  width: 320px;
  border-radius: 10px;
}
</style>
