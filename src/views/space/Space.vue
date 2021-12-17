<template>
  <div>
    <el-container>
      <el-header>
        <label class="space-name">用户管理中心</label>
        <div class="avater">
          <avater />
        </div>
      </el-header>
      <el-container>
        <aside-space />
        <el-container>
          <el-main style="">
            <keep-alive>
              <router-view />
            </keep-alive>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import avater from "@/components/Avater/avater";
import asideSpace from "@/components/Aside/asideSpace";

export default {
  name: "space",
  components: {
    asideSpace,
    avater,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background: rgba(0, 201, 255, 0.9); /* fallback for old browsers */
  backdrop-filter: blur(2px);
  background: -webkit-linear-gradient(
    to left,
    rgba(146, 254, 157, 0.9),
    rgba(0, 201, 255, 0.9)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    rgba(146, 254, 157, 0.9),
    rgba(0, 201, 255, 0.9)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 8vh;
  line-height: 60px;

  .space-name {
    color: white;
    font-weight: bolder;
    font-size: 24px;
  }
}

.el-aside {
  background: white;
}

.el-main {
  min-width: 150vh;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
  overflow-y: auto;
  height: 92vh;
}

.avater {
  float: right;
  margin: 5px auto;
}
</style>
