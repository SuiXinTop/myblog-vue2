<template>
  <div>
    <el-container>
      <el-header style="background-color: #409eff">
        <router-link to="/space" style="color: white; font-size: 24px"
          >用户管理中心
        </router-link>
        <div style="float: right; margin: 5px auto">
          <el-dropdown v-if="true">
            <i>
              <el-avatar
                :size="50"
                shape="square"
                fit="cover"
                :src="imgPath"
                @error="pathError"
              />
            </i>
            <template>
              <el-dropdown-menu style="width: fit-content">
                <router-link to="/">
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
        </div>
      </el-header>
      <el-container>
        <el-scrollbar>
          <el-aside style="width: 30vh">
            <el-menu style="height: 100vh" default-active="1">
              <router-link to="/space">
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
                    <el-menu-item index="2-1"> 发布博客 </el-menu-item>
                  </router-link>
                  <el-menu-item index="2-2">编辑博客</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <router-link to="/space/post">
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
        </el-scrollbar>
        <el-container>
          <el-main>
            <keep-alive> <router-view /></keep-alive>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "space",
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: white;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: white;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: white;
  color: #333;
  line-height: 160px;
}
</style>
