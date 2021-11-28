<template>
  <div>
    <el-aside style="width: 30vh; overflow-y: auto">
      <el-menu style="height: 92vh" default-active="1">
        <router-link to="/space/home">
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
        </router-link>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-management"></i>
            <span>管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">博客</template>
            <router-link to="/space/post">
              <el-menu-item index="2-1"> 发布博客 </el-menu-item>
            </router-link>
            <el-menu-item index="2-2">编辑博客</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">博客</template>
            <router-link to="/space/post">
              <el-menu-item index="2-3"> 发布博客 </el-menu-item>
            </router-link>
            <el-menu-item index="2-4">编辑博客</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <router-link to="/space/chat">
          <el-menu-item index="3">
            <i class="el-icon-s-data"></i>
            <span slot="title">数据</span>
          </el-menu-item>
        </router-link>

        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "asideSpace",
};
</script>

<style scoped></style>
