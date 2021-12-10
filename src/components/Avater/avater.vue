<template>
  <div>
    <el-dropdown>
      <i>
        <el-avatar
          :size="size"
          shape="square"
          fit="cover"
          :src="imgPath"
          @error="pathError"
        />
      </i>
      <template>
        <el-dropdown-menu style="width: fit-content">
          <router-link to="/space/home">
            <el-dropdown-item>
              <i class="el-icon-user"></i>个人中心
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              <i class="el-icon-setting"></i>设定
            </el-dropdown-item>
          </router-link>
          <div @click="logout">
            <el-dropdown-item>
              <i class="el-icon-zoom-out" />退出登录
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserImg } from "@/assets/js/util/localStore";

export default {
  name: "avater",
  props: {
    size: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      dialogVisible: false,
      imgPath: getUserImg(),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    pathError() {
      this.imgPath =
        "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png";
    },
  },
};
</script>

<style scoped></style>
