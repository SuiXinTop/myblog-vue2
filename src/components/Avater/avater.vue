<template>
  <div>
    <el-dropdown v-if="true">
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
          <div @click="dialogVisible = true">
            <el-dropdown-item>
              <i class="el-icon-zoom-out" />退出登录
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!--    退出登录-->
    <el-dialog
      class="popout-box"
      title="提示"
      v-if="dialogVisible"
      width="600px"
      destroy-on-close
    >
      <el-image
        :src="imgPath"
        @error="pathError"
        :key="imgPath"
        fit="cover"
        lazy
        style="width: 100px; height: 100px; border-radius: 50%"
      />
      <p style="font-size: 30px">是否登出账号</p>
      <footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
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
      imgPath:
        "http://118.31.15.127:9000/blog/userImg/b69553a8d65fdff41165c69f4f784752.jpg",
    };
  },
  methods: {
    pathError() {
      this.imgPath =
        "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png";
    },
  },
};
</script>

<style scoped></style>
