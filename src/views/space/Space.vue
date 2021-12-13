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
          <el-main style="min-width: 150vh">
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
  background-color: #409eff;
  height: 8vh;
  line-height: 60px;

  .space-name {
    color: white;
    font-size: 24px;
  }
}

.el-aside {
  background-color: white;
}

.el-main {
  background-color: white;
  overflow-y: auto;
  height: 92vh;
}

.avater {
  float: right;
  margin: 5px auto;
}
</style>
