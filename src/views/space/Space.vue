<template>
  <div>
    <el-container>
      <el-header>
        <label class="space-name">管理中心</label>
        <div class="avater">
          <avater />
        </div>
      </el-header>
      <el-container>
        <el-aside
          style="
            width: 30vh;
            min-width: 220px;
            overflow-y: auto;
            backdrop-filter: blur(4px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68),
              0 0 6px rgba(255, 255, 255, 0.6);
          "
        >
          <el-menu style="height: 92vh" default-active="1">
            <router-link to="/space">
              <el-menu-item index="1">
                <template slot="title">
                  <i class="el-icon-s-home" />
                  <span>首页</span>
                </template>
              </el-menu-item>
            </router-link>

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
                <i class="el-icon-pear" />
                <span>好友</span>
              </template>
              <el-menu-item-group>
                <router-link to="/space/attend">
                  <el-menu-item index="3-1">
                    <span>管理关注</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/space/fans">
                  <el-menu-item index="3-2">
                    <span>管理粉丝</span>
                  </el-menu-item>
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
        <el-container>
          <el-main
            style="
              min-width: 150vh;
              background: rgba(255, 255, 255, 0.8);
              backdrop-filter: blur(4px);
              overflow-y: auto;
              height: 92vh;
            "
          >
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

export default {
  name: "space",
  components: {
    avater,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background: rgba(0, 201, 255, 0.9);
  backdrop-filter: blur(2px);
  background: -webkit-linear-gradient(
    to left,
    rgba(146, 254, 157, 0.9),
    rgba(0, 201, 255, 0.9)
  );
  background: linear-gradient(
    to left,
    rgba(146, 254, 157, 0.9),
    rgba(0, 201, 255, 0.9)
  );
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
.avater {
  float: right;
  margin: 5px auto;
}
</style>
