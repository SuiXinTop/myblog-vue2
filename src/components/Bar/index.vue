<template>
  <div>
    <div id="topBar">
      <el-row :gutter="10">
        <el-col
          :xs="10"
          :sm="6"
          :md="6"
          :lg="6"
          :xl="6"
          style="margin-top: 10px"
        >
          <el-button id="logo" type="text" @click="toMain()">
            segmentFault
          </el-button>
        </el-col>
        <el-col
          :xs="0"
          :sm="6"
          :md="6"
          :lg="6"
          :xl="6"
          style="margin-top: 15px"
        >
          <el-button class="link" type="text" @click="toArticle"
            >博客
          </el-button>
          <el-divider direction="vertical" />
          <el-button class="link" type="text" @click="toArticle"
            >公告
          </el-button>
          <el-divider direction="vertical" />
          <el-button class="link" type="text">作者</el-button>
        </el-col>
        <el-col
          :xs="8"
          :sm="7"
          :md="7"
          :lg="8"
          :xl="8"
          style="text-align: right; margin-top: 20px"
        >
          <el-input type="search" v-model="param" placeholder="搜索关键字" />
        </el-col>
        <el-col
          :xs="6"
          :sm="5"
          :md="5"
          :lg="4"
          :xl="4"
          style="margin-top: 10px"
        >
          <div v-if="false">
            <el-button
              style="
                background: #13b213;
                color: white;
                width: 120px;
                height: 60px;
                font-size: 20px;
              "
            >
              注册登录
            </el-button>
          </div>
          <el-dropdown v-if="true">
            <i>
              <!--              <el-image-->
              <!--                :src="imgPath"-->
              <!--                @error="pathError"-->
              <!--                :key="imgPath"-->
              <!--                fit="cover"-->
              <!--                lazy-->
              <!--                style="width: 60px; height: 60px; border-radius: 50%"-->
              <!--              />-->
              <el-avatar
                :size="60"
                shape="square"
                fit="cover"
                :src="imgPath"
                @error="pathError"
              ></el-avatar>
            </i>
            <template>
              <el-dropdown-menu style="width: fit-content">
                <router-link to="/space">
                  <el-dropdown-item>
                    <i class="el-icon-user"></i>个人中心
                  </el-dropdown-item>
                </router-link>
                <router-link to="/space">
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
        </el-col>
      </el-row>
    </div>
    <!--    退出登录-->
    <div id="dialog">
      <el-dialog
        class="popout-box"
        title="提示"
        v-if="dialogVisible"
        v-model="dialogVisible"
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
        <template #footer>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "topBar",
  data() {
    return {
      param: "",
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
    toMain() {
      this.$router.push("/");
    },
    toArticle() {
      this.$router.push("/blog/1");
    },
  },
};
</script>

<style lang="less" scoped>
#topBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  height: 80px;
  text-align: center;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 2px solid rgba(176, 241, 120, 0.63);
  box-shadow: 0 6px 4px rgba(0, 0, 0, 0.4), 0 0 6px rgba(255, 255, 255, 0.6);
}

#logo {
  font-size: 30px;
  font-weight: bold;
  color: #12b212;
}

#dialog {
  text-align: center;
}

.link {
  font-size: 24px;
  color: #646464;
}

.link :hover {
  color: #12b212;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.popout-box {
  // 将dialog的class绑定close_com动画，0.7s表示动画时间为0.7秒
  animation: close_com 0.7s linear 1;
  -webkit-animation: close_com 0.7s linear 1;
}

@-webkit-keyframes close_com {
  100% {
    -webkit-transform: translate(40%, -42%) scale(0);
  }
}

@keyframes close_com {
  100% {
    transform: translate(40%, -42%) scale(0);
  }
}
</style>
