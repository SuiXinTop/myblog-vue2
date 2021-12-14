<template>
  <div>
    <el-aside style="width: 30vh; background: white; overflow-y: auto">
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
            <span>博客</span>
          </template>
          <el-menu-item-group>
            <router-link to="/space/post">
              <el-menu-item index="2-1">
                <span>发布博客</span>
              </el-menu-item>
            </router-link>
            <router-link to="/space/edit">
              <el-menu-item index="2-2">
                <span>管理博客</span>
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-comment" />
            <span>评论</span>
          </template>
          <el-menu-item-group>
            <router-link to="/space">
              <el-menu-item index="3-1">
                <span>评论历史</span>
              </el-menu-item>
            </router-link>
            <router-link to="/space">
              <el-menu-item index="3-2">
                <span>评论历史</span>
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-user" />
            <span>用户</span>
          </template>
          <el-menu-item-group>
            <router-link to="/space/user">
              <el-menu-item index="4-1"> 个人信息</el-menu-item>
            </router-link>
            <router-link to="/space/chat">
              <el-menu-item index="4-2">私信</el-menu-item>
            </router-link>
            <router-link to="/space/group">
              <el-menu-item index="4-3">群聊</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-pear" />
            <span>好友</span>
          </template>
          <el-menu-item-group>
            <router-link to="/space/user">
              <el-menu-item index="5-1"> 关注</el-menu-item>
            </router-link>
            <router-link to="/space/user">
              <el-menu-item index="5-2"> 粉丝</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="6">
          <i class="el-icon-s-data" />
          <span slot="title">数据</span>
        </el-menu-item>

        <el-menu-item index="7">
          <i class="el-icon-setting" />
          <span slot="title">设置</span>
        </el-menu-item>

        <router-link to="/">
          <el-menu-item index="8">
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
