<template>
  <transition appear enter-active-class="animate__animated animate__zoomIn">
    <el-card class="login">
      <el-form ref="form" class="form" :model="form" :rules="rules">
        <el-form-item>
          <span id="title">用户登录</span>
        </el-form-item>
        <el-form-item prop="userEmail">
          <el-input type="text" v-model="form.userEmail" placeholder="邮箱">
            <template slot="prepend">
              <i class="el-icon-user icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input
            type="text"
            placeholder="密码"
            v-model="form.userPassword"
            show-password
          >
            <template slot="prepend">
              <i class="el-icon-lock icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input type="text" v-model="form.code" placeholder="验证码">
            <template slot="append" class="code">
              <div @click="refreshCode"></div>
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
        </el-form-item>
      </el-form>
    </el-card>
  </transition>
</template>

<script>
import { login } from "@/assets/js/api/auth";
import { setAll } from "@/assets/js/util/localStore";

export default {
  name: "login",
  mounted() {},
  data() {
    return {
      form: {
        userEmail: "",
        userPassword: "",
        code: "1111",
      },
      rules: {
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

      remember: false,
      validCode: "1111",
    };
  },
  methods: {
    login() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          this.$notify.error("输入格式错误！");
          return;
        }
        if (this.form.code !== this.validCode) {
          this.$notify.error("验证码错误！");
          return;
        }
        login(this.form)
          .then((res) => {
            console.log(res.data);
            if (res.data.code === 200) {
              this.$notify.success(res.data.msg);
              let data = res.data.data;
              setAll(
                data.token,
                data.userVo.userId,
                data.userVo.userName,
                data.userVo.userImg,
                data.userVo.role.roleKey
              );
              return;
            }
            this.$notify.error(res.data.msg);
          })
          .catch((err) => {
            console.log(err);
            this.$notify.error("出现未知错误");
          });
      });
    },
    refreshCode() {},
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
