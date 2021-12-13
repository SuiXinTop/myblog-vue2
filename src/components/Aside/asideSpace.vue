<template>
  <div>
    <el-aside style="width: 30vh; overflow-y: auto">
      <el-menu style="height: 92vh" default-active="1">
        <router-link to="/space">
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-s-home" />
              <span>首页</span>
            </template>
          </el-menu-item>
        </router-link>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-management" />
            <span>管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">用户</template>
            <router-link to="/space/userInfo">
              <el-menu-item index="2-1"> 个人信息</el-menu-item>
            </router-link>
            <router-link to="/space/chat">
              <el-menu-item index="2-2">私信</el-menu-item>
            </router-link>
            <router-link to="/space/group">
              <el-menu-item index="2-3">群聊</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">博客</template>
            <router-link to="/space/post">
              <el-menu-item index="2-4">
                <span>发布博客</span>
              </el-menu-item>
            </router-link>
            <router-link to="/space/edit">
              <el-menu-item index="2-5">
                <span>管理博客</span>
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">评论</template>
            <router-link to="/space">
              <el-menu-item index="2-6">
                <span>评论历史</span>
              </el-menu-item>
            </router-link>
            <router-link to="/space">
              <el-menu-item index="2-6">
                <span>评论历史</span>
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="3">
          <i class="el-icon-s-data"></i>
          <span slot="title">数据</span>
        </el-menu-item>

        <el-menu-item index="4">
          <i class="el-icon-setting" />
          <span slot="title">设置</span>
        </el-menu-item>

        <router-link to="/">
          <el-menu-item index="5">
            <i class="el-icon-s-home" />
            <span slot="title">返回主页</span>
          </el-menu-item>
        </router-link>
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
