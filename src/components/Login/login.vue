<template>
  <div>
    <el-card class="login">
      <router-link to="/" style="float: left; color: white">首页</router-link>
      <label class="title">用户登录</label>
      <br />
      <br />
      <el-form
        v-show="loginShow"
        ref="formLogin"
        class="form"
        :model="formLogin"
        :rules="rulesLogin"
      >
        <el-form-item prop="userEmail">
          <el-input
            type="text"
            v-model="formLogin.userEmail"
            placeholder="邮箱"
          >
            <template slot="prepend">
              <i class="el-icon-user icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input
            type="text"
            placeholder="密码"
            v-model="formLogin.userPassword"
            show-password
          >
            <template slot="prepend">
              <i class="el-icon-lock icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input type="text" v-model="formLogin.code" placeholder="验证码">
            <template slot="append" class="code">
              <div @click="refreshCode" v-text="randomCode" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="text-align: left">
          <el-switch
            style="display: block"
            v-model="remember"
            active-text="记住密码"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" @click="login">
            登录
          </el-button>
          <label @click="loginShow = !loginShow" style="float: left">
            切换登陆方式
          </label>
          <router-link style="float: right" to="/register">注册</router-link>
        </el-form-item>
      </el-form>
      <el-form
        v-show="!loginShow"
        ref="formEmail"
        class="form"
        :model="formEmail"
        :rules="rulesEmail"
      >
        <el-form-item prop="email">
          <el-input type="text" v-model="formEmail.email" placeholder="邮箱">
            <template slot="prepend">
              <i class="el-icon-setting icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            type="text"
            v-model="formEmail.code"
            style="width: 70%"
            placeholder="验证码"
          >
          </el-input>
          <el-button
            style="width: 30%"
            type="primary"
            icon="el-icon-search"
            @click="sendEmail"
            :disabled="hasSend"
          >
            发送
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" @click="emailLogin">
            登录
          </el-button>
          <label @click="loginShow = !loginShow" style="float: left">
            切换登陆方式
          </label>
          <router-link style="float: right" to="/register">注册</router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { emailLogin, login, verifyEmail } from "@/assets/js/api/auth";
import { setAll } from "@/assets/js/util/localStore";
import { randomCode } from "@/assets/js/util/random";

export default {
  name: "login",
  mounted() {},
  data() {
    return {
      formLogin: {
        userEmail: localStorage.getItem("id"),
        userPassword: localStorage.getItem("userPassword"),
        code: "",
      },
      rulesLogin: {
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
          // {
          //   pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,15}$/,
          //   message: "长度在 8 到 16 同时包含英文与数字的字符串",
          //   trigger: "blur",
          // },
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
      formEmail: {
        email: "",
        code: "",
      },
      rulesEmail: {
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
      remember: true,
      randomCode: randomCode(),
      loginShow: true,
    };
  },
  methods: {
    //账号密码登录
    login() {
      this.$refs.formLogin.validate(async (valid) => {
        if (!valid) {
          this.$notify.error("输入格式错误！");
          return;
        }
        if (this.formLogin.code !== this.randomCode) {
          this.$notify.error("验证码错误！");
          return;
        }
        login(this.formLogin).then((res) => {
          let restMsg = res.data;
          if (restMsg.code === 200) {
            this.$notify.success(restMsg.msg);
            let data = restMsg.data;
            setAll(data.token, data.userVo);
            if (this.remember) {
              localStorage.setItem("id", this.formLogin.userEmail);
              localStorage.setItem("userPassword", this.formLogin.userPassword);
            } else {
              localStorage.removeItem("id");
              localStorage.removeItem("userPassword");
            }
            this.$router.push("/");
            //强制刷新
            location.reload();
          }
        });
      });
    },
    //邮箱验证码登陆
    emailLogin() {
      this.emailValid();
      if (this.formEmail.code.length !== 4) {
        this.$notify.warning("验证码为4位");
        return;
      }
      emailLogin(this.formEmail).then((res) => {
        if (res.data.code === 200) {
          this.$notify.success(res.data.msg);
          let data = res.data.data;
          setAll(data.token, data.userVo);
          this.$router.push("/");
          location.reload();
        }
      });
    },
    //发送验证邮件
    sendEmail() {
      this.emailValid();
      verifyEmail(this.formEmail.email).then(() => {
        this.$notify.success("发送成功");
        this.hasSend = true;
      });
    },
    emailValid() {
      this.$refs.formEmail.validate(async (valid) => {
        if (!valid) {
          this.$notify.error("输入格式错误！");
          return false;
        }
      });
    },
    //刷新验证码
    refreshCode() {
      this.randomCode = randomCode();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 500px;
  height: auto;
  text-align: center;
  border: none;
  background: rgba(249, 250, 252, 0.62);
  backdrop-filter: blur(4px);
}

.title {
  font-size: 30px;
}

.form {
  margin: 0 30px 0 30px;

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
