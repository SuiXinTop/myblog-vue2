<template>
  <div>
    <img class="background-img" src="../assets/images/1.jpg" alt="" />
    <top-bar />
    <header style="text-align: center">
      <img
        src="../assets/images/1.jpg"
        style="object-fit: cover; height: 500px; width: 100%; z-index: -1"
        alt
      />

      <div style="height: 400px; margin-top: -400px">
        <br />
        <p
          style="font-size: 40px; font-weight: bold; color: #0cbe0c"
          v-text="title"
        />
        <p style="font-size: 30px; color: #454c59">
          {{ content1 }}
          <br />
          {{ content2 }}
        </p>
      </div>
    </header>
    <div class="align-center">
      <div class="row-contain" style="margin-top: -80px">
        <el-button class="top-button card-type" @click="toSearch">
          搜索
        </el-button>
        <el-button class="top-button card-type" @click="toAnnounce">
          公告
        </el-button>
        <el-button class="top-button card-type" @click="toAbout">
          关于
        </el-button>
      </div>
    </div>
    <div class="align-center">
      <div class="row-contain">
        <el-tabs type="border-card" class="blog-card">
          <el-tab-pane label="最新"><home-blog-new /></el-tab-pane>
          <el-tab-pane label="最热"><home-blog-hot /></el-tab-pane>
        </el-tabs>
        <home-tag />
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/Bar/bar";
import { content1, content2, title } from "@/assets/static/content";
import { routerPath } from "@/assets/js/util/path";
import HomeBlogNew from "@/components/Home/HomeBlogNew";
import HomeTag from "@/components/Home/HomeTag";
import HomeBlogHot from "@/components/Home/HomeBlogHot";

export default {
  name: "Home",
  components: {
    HomeBlogHot,
    HomeTag,
    HomeBlogNew,
    TopBar,
  },
  created() {},
  data() {
    return {
      title,
      content1,
      content2,
    };
  },
  methods: {
    toSearch() {
      this.$router.push(routerPath.search);
    },
    toAnnounce() {
      this.$router.push(routerPath.announce);
    },
    toAbout() {
      this.$router.push(routerPath.about);
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  background-image: url("../assets/images/1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.align-center {
  align-items: center;
  display: flex;
  flex-direction: column;

  .top-button {
    text-align: center;
    font-size: 30px;
    height: 100px;
    width: 250px;
    margin: 20px;
  }

  .card-type {
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
  }
}

.row-contain {
  display: flex;
  flex-direction: row;
  margin: 60px;
}

.blog-card {
  width: 120vh;
  backdrop-filter: blur(4px);
  background: rgba(250, 249, 249, 0.62);
  margin: 5px;
}
</style>
