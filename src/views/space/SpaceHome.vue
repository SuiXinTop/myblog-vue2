<template>
  <div>
    <div class="align-center">
      <div class="row-contain" style="width: 100%">
        <el-card class="data-display" :body-style="{ padding: 0 }">
          {{ userDetailData.blogCount }}
          <div class="data-text">博客</div>
        </el-card>
        <el-card class="data-display" :body-style="{ padding: 0 }">
          {{ userDetailData.collectCount }}
          <div class="data-text">收藏</div>
        </el-card>
        <el-card class="data-display" :body-style="{ padding: 0 }">
          {{ userDetailData.attendCount }}
          <div class="data-text">关注</div>
        </el-card>
        <el-card class="data-display" :body-style="{ padding: 0 }">
          {{ userDetailData.fansCount }}
          <div class="data-text">粉丝</div>
        </el-card>
      </div>
    </div>
    <div class="align-center">
      <el-card class="data-body">
        <el-row>
          <el-col :span="8">
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
          </el-col>
          <el-col :span="16">
            <div>
              <p class="user-name" v-text="user.userName" />
              <p class="user-name" v-text="user.role.roleName" />
              上次登录时间：{{ dateDiff(user.loginTime) }} <br />
              上次登录IP：{{ user.loginIp }} <br />
              注册时间：{{ dateDiff(user.registerTime) }}
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailCount } from "@/assets/js/api/dataDisplay";
import { getUserByUserId } from "@/assets/js/api/user";
import { getUserId } from "@/assets/js/util/localStore";
import { dateDiff } from "@/assets/js/util/time";

export default {
  name: "SpaceHome",
  mounted() {
    this.getUserDetailCount();
    this.getUserByUserId();
  },
  data() {
    return {
      user: {},
      userDetailData: {
        blogCount: 0,
        collectCount: 0,
        attendCount: 0,
        fansCount: 0,
      },
    };
  },
  methods: {
    getUserByUserId() {
      getUserByUserId(getUserId()).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.user = restMsg.data;
        }
      });
    },
    //获取用户数据
    getUserDetailCount() {
      getUserDetailCount(getUserId()).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.userDetailData = restMsg.data;
        }
      });
    },
    dateDiff(val) {
      return dateDiff(val);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex";
.data-display {
  width: 24%;
  margin: 1%;
  height: 160px;
  opacity: 0.9;
  color: white;
  border: none;
  font-size: 46px;
  text-align: center;
  background: rgba(222, 97, 97, 0.8);
  background: -webkit-linear-gradient(
    to right,
    #2657eb,
    rgba(225, 67, 67, 0.78)
  );
  background: linear-gradient(to right, #2657eb, rgba(231, 55, 55, 0.76));
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
}
.data-text {
  margin: 5% auto;
  color: white;
}
.data-body {
  width: 100%;
  height: 400px;
  .user-img {
    float: left;
    width: auto;
    height: 360px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
  }
  .user-name {
    font-size: 30px;
    font-family: "微软雅黑 Light", serif;
  }
}
</style>
