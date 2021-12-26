<template>
  <div class="zone">
    <el-container>
      <el-aside class="align-center aside-card" style="width: 260px">
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
          <p class="user-name" v-text="user.userName" />
        </div>

        <div class="row-contain">
          <el-button
            v-if="!hasAttend"
            type="primary"
            @click="addAttend"
            class="user-button"
          >
            <i class="el-icon-plus" />关注
          </el-button>
          <el-button
            v-if="hasAttend"
            type="primary"
            @click="deleteAttend"
            class="user-button"
          >
            <i class="el-icon-success" />已关注
          </el-button>
          <el-button
            type="primary"
            style="
              width: 100px;
              background: rgba(255, 255, 255, 0.3);
              backdrop-filter: blur(4px);
              border: none;
            "
            @click="toChat"
            :disabled="
              user.userId == this.$store.getters['user/getUser'].userId
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
            博客({{ userDetailData.blogCount }})
          </el-menu-item>
          <el-menu-item
            index="3"
            :route="'/zone/collect?userId=' + this.$route.query.userId"
          >
            收藏({{ userDetailData.collectCount }})
          </el-menu-item>
          <el-menu-item
            index="4"
            :route="'/zone/attend?userId=' + this.$route.query.userId"
          >
            关注({{ userDetailData.attendCount }})
          </el-menu-item>
          <el-menu-item
            index="5"
            :route="'/zone/fans?userId=' + this.$route.query.userId"
          >
            粉丝({{ userDetailData.fansCount }})
          </el-menu-item>
          <el-menu-item
            index="6"
            v-if="user.userId == this.$store.getters['user/getUser'].userId"
            :route="'/zone/comment?userId=' + this.$route.query.userId"
          >
            评论历史
          </el-menu-item>
          <el-menu-item
            index="7"
            v-if="user.userId == this.$store.getters['user/getUser'].userId"
            :route="'/zone/history?userId=' + this.$route.query.userId"
          >
            浏览历史
          </el-menu-item>
          <el-menu-item index="8" route="/"> 返回主页</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-card">
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getUserByUserId } from "@/assets/js/api/user";
import { isInteger } from "@/assets/js/util/valid";
import { addAttend, deleteAttend, hasAttend } from "@/assets/js/api/friend";
import { modal } from "@/assets/js/util/modal";
import { createChannel } from "@/assets/js/api/chat";
import { getUserId } from "@/assets/js/util/localStore";
import { getUserDetailCount } from "@/assets/js/api/dataDisplay";

export default {
  name: "Zone",
  mounted() {
    if (isInteger(this.$route.query.userId)) {
      this.getUserByUserId();
      this.getUserDetailCount();
    } else {
      this.$router.push("/404");
    }
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
      hasAttend: false,
    };
  },
  methods: {
    //关注
    addAttend() {
      if (!getUserId()) {
        return;
      }
      addAttend(this.user.userId).then(() => {
        modal.notifySuccess("关注成功");
        this.hasAttend = true;
      });
    },
    //取消关注
    deleteAttend() {
      if (!getUserId()) {
        return;
      }
      deleteAttend(this.user.userId).then(() => {
        modal.notifySuccess("已取消关注");
        this.hasAttend = false;
      });
    },
    //是否关注
    checkHasAttend() {
      if (!getUserId()) {
        return;
      }
      hasAttend(this.user.userId).then((res) => {
        this.hasAttend = res.data;
      });
    },
    //私聊
    toChat() {
      if (!getUserId()) {
        return;
      }
      createChannel(this.user.userId).then((res) => {
        if (res.data.code === 200) {
          this.$router.push("/space/chat");
        }
      });
    },
    //获取信息
    getUserByUserId() {
      getUserByUserId(this.$route.query.userId).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.user = restMsg.data;
          this.checkHasAttend();
        }
      });
    },
    //获取用户数据
    getUserDetailCount() {
      getUserDetailCount(this.$route.query.userId).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.userDetailData = restMsg.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/flex";

.zone {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
}

.aside-card {
  overflow-x: hidden;
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

  .user-name {
    font-size: 24px;
    color: white;
  }

  .user-button {
    width: 100px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(4px);
    border: none;
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
      transition: all 1s ease-in-out;
    }

    .el-menu-item:focus {
      background: rgba(97, 141, 222, 0.8);
      transition: all 1s ease-in-out;
    }
  }
}

.main-card {
  height: 100vh;
  min-width: 1000px;
  overflow-y: auto;
}
</style>
