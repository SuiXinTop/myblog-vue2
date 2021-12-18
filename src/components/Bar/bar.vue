<template>
  <div>
    <div id="topBar">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-button id="logo" type="text" @click="toMain()">
            SegmentFault
          </el-button>
        </el-col>
        <el-col :span="10" style="line-height: 80px">
          <router-link class="link" to="search"> 搜索 </router-link>
          <el-divider direction="vertical" />
          <router-link class="link" to="announce"> 公告 </router-link>
          <el-divider direction="vertical" />
          <router-link class="link" to="/about"> 关于 </router-link>
        </el-col>
        <el-col :span="6" style="text-align: right; line-height: 80px">
          <div v-if="hasLogin()">
            <el-button @click="toLogin" class="login-button">
              注册登录
            </el-button>
          </div>
          <div v-else>
            <avater :size="60" style="margin: 10px auto" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin: 100px" />
  </div>
</template>

<script>
import avater from "@/components/Avater/avater";
import { getToken } from "@/assets/js/util/localStore";
export default {
  name: "topBar",
  components: {
    avater,
  },
  data() {
    return {};
  },
  methods: {
    hasLogin() {
      return !(getToken() !== null || "");
    },
    toLogin() {
      this.$router.push("/login");
    },
    toMain() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less" scoped>
#topBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  line-height: 100px;
  height: 80px;
  text-align: center;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  border-bottom: 2px solid rgba(175, 246, 114, 0.5);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4), 0 0 6px rgba(255, 255, 255, 0.6);
}

#logo {
  font-size: 40px;
  font-weight: bold;
  color: #12b212;
}

.link {
  font-size: 24px;
  font-family: "幼圆", "JetBrains Mono", sans-serif;
  color: #646464;
}

.link :hover {
  color: #12b212;
}

.login-button {
  background: rgb(107, 204, 107);
  color: white;
  width: 120px;
  height: 50px;
  font-size: 20px;
  border: 0;
}

.login-button:hover {
  background: rgba(19, 178, 19, 1);
  color: white;
  transition: all 1s;
}
</style>
