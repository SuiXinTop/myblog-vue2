<template>
  <div>
    <div>
      <el-container>
        <el-aside class="align-center aside-card">
          <div style="text-align: center">
            <el-image
              class="user-img"
              :src="user.userImg"
              :preview-src-list="[user.userImg]"
              lazy
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
            <p
              style="font-size: 24px; font-family: 黑体, serif; color: white"
              v-text="user.userName"
            />
          </div>

          <div class="row-contain">
            <el-button
              type="primary"
              style="
                width: 120px;
                background: rgba(255, 255, 255, 0.3);
                backdrop-filter: blur(4px);
                border: none;
              "
            >
              <i class="el-icon-plus" />关注
            </el-button>
            <el-button
              type="primary"
              style="
                width: 120px;
                background: rgba(255, 255, 255, 0.3);
                backdrop-filter: blur(4px);
                border: none;
              "
            >
              <i class="el-icon-message" />私信
            </el-button>
          </div>

          <el-divider />
          <el-menu class="menu-card" :router="true">
            <el-menu-item
              index="1"
              :route="'/zone/home?userId=' + this.$route.query.userId"
            >
              动态
            </el-menu-item>
            <el-menu-item
              index="2"
              :route="'/zone/blog?userId=' + this.$route.query.userId"
            >
              博客
            </el-menu-item>
            <el-menu-item
              index="3"
              :route="'/zone/collect?userId=' + this.$route.query.userId"
            >
              收藏
            </el-menu-item>
            <el-menu-item
              index="4"
              :route="'/zone/attend?userId=' + this.$route.query.userId"
            >
              关注
            </el-menu-item>
            <el-menu-item
              index="5"
              :route="'/zone/fans?userId=' + this.$route.query.userId"
            >
              粉丝
            </el-menu-item>
            <el-menu-item index="6" route="/"> 返回主页 </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main-card">
          <keep-alive> <router-view /></keep-alive>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getUserByUserId } from "@/assets/js/api/user";
import { isInteger } from "@/assets/js/util/valid";
export default {
  name: "Zone",
  mounted() {
    if (isInteger(this.$route.query.userId)) {
      this.getUserByUserId();
    } else {
      this.$router.push("/404");
    }
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUserByUserId() {
      getUserByUserId(this.$route.query.userId).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.user = restMsg.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex";
.aside-card {
  height: 99vh;
  overflow-x: hidden;
  min-width: 200px;
  border-radius: 8px;
  margin-top: 3px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: rgba(222, 97, 97, 0.8);
  background: -webkit-linear-gradient(
    to right,
    #2657eb,
    rgba(225, 67, 67, 0.78)
  );
  background: linear-gradient(to right, #2657eb, rgba(231, 55, 55, 0.76));
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);

  .user-img {
    width: 100px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
  }
  .menu-card {
    width: 100%;
    text-align: center;
    background: none;
    .el-menu-item {
      color: white;
      font-size: 20px;
      font-weight: bold;
    }
    .el-menu-item:hover {
      background: rgba(222, 97, 97, 0.8);
      transition: all 1s;
    }
    .el-menu-item:focus {
      background: rgba(97, 141, 222, 0.8);
      transition: all 1s;
    }
  }
}
.main-card {
  height: 100vh;
  min-width: 1000px;
  border-radius: 8px;
  border: none;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
}
</style>
