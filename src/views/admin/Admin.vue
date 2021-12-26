<template>
  <div>
    <el-container>
      <el-header>
        <label class="space-name">博客社区后台</label>
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
            <router-link to="/admin">
              <el-menu-item index="1">
                <template slot="title">
                  <i class="el-icon-s-home" />
                  <span>首页</span>
                </template>
              </el-menu-item>
            </router-link>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-user" />
                <span>用户</span>
              </template>
              <el-menu-item-group>
                <router-link to="/admin/role">
                  <el-menu-item index="2-1"> 权限管理</el-menu-item>
                </router-link>
                <router-link to="/admin/banUser">
                  <el-menu-item index="2-2"> 封禁账户</el-menu-item>
                </router-link>
                <router-link to="/admin/recoverUser">
                  <el-menu-item index="2-3">恢复账户</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-management" />
                <span>博客</span>
              </template>
              <el-menu-item-group>
                <router-link to="/admin/banBlog">
                  <el-menu-item index="3-1">
                    <span>封禁博客</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/admin/recoverBlog">
                  <el-menu-item index="3-2">
                    <span>恢复博客</span>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-data-analysis" />
                <span>公告</span>
              </template>
              <el-menu-item-group>
                <router-link to="/admin/postAnnounce">
                  <el-menu-item index="4-1">
                    <span>新增公告</span>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
              <el-menu-item-group>
                <router-link to="/admin/editAnnounce">
                  <el-menu-item index="4-2">
                    <span>编辑公告</span>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-setting" />
                <span>系统</span>
              </template>
              <el-menu-item-group>
                <router-link to="/admin/log">
                  <el-menu-item index="5-1">
                    <span>系统日志</span>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <router-link to="/">
              <el-menu-item index="6">
                <i class="el-icon-s-home" />
                <span slot="title">返回主页</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main
            style="
              min-width: 140vh;
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
export default {
  name: "Admin",
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

.el-main {
  min-width: 150vh;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
  overflow-y: auto;
  height: 92vh;
}
</style>
