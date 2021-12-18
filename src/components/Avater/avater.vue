<template>
  <div>
    <el-dropdown style="height: 60px">
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
        <el-dropdown-menu
          style="
            width: fit-content;
            background: rgba(255, 255, 255, 0.42);
            backdrop-filter: blur(4px);
            border: none;
          "
        >
          <router-link to="/space/chat">
            <el-dropdown-item>
              <i class="el-icon-message" />私信
            </el-dropdown-item>
          </router-link>
          <router-link to="/space/post">
            <el-dropdown-item>
              <i class="el-icon-open" />发博文
            </el-dropdown-item>
          </router-link>
          <router-link :to="'/zone?userId=' + userId">
            <el-dropdown-item>
              <i class="el-icon-user" />个人空间
            </el-dropdown-item>
          </router-link>
          <router-link to="/space/home">
            <el-dropdown-item>
              <i class="el-icon-setting" />管理中心
            </el-dropdown-item>
          </router-link>
          <div @click="dialogVisible = true">
            <el-dropdown-item>
              <i class="el-icon-zoom-out" />退出登录
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
    >
      <span>是否退出登陆</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserId, getUserImg } from "@/assets/js/util/localStore";

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
      userId: getUserId(),
      imgPath: getUserImg(),
      dialogVisible: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
      this.dialogVisible = false;
    },
    pathError() {
      this.imgPath =
        "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png";
    },
  },
};
</script>

<style scoped></style>
