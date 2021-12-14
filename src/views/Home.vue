<template>
  <div>
    <img class="background-img" src="../assets/images/1.jpg" alt="" />
    <top-bar />
    <header>
      <img id="logo-img" src="../assets/images/1.jpg" style="" alt />
      <div id="logo-content">
        <p
          style="font-size: 6vh; font-weight: bold; color: #0cbe0c"
          v-text="title"
        />
        <p style="font-size: 4vh; color: #454c59">
          {{ content1 }}
          <br />
          {{ content2 }}
        </p>
      </div>
    </header>
    <div class="align-center">
      <div class="row-contain" style="margin-top: -20vh">
        <el-button class="top-button" @click="toSearch"> 搜索 </el-button>
        <el-button class="top-button" @click="toAnnounce"> 公告 </el-button>
        <el-button class="top-button" @click="toAbout"> 关于 </el-button>
      </div>
    </div>
    <div style="margin: 40vh">
      <div>
        <el-carousel height="60vh" style="border-radius: 8px">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-image
              src="http://118.31.15.127:9000/blog/chat/2868d1af6813b756a19c30cf0ec61086-e59310b8-cc52-461d-b0cc-55d3bfc634de.png"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="align-center">
      <div class="row-contain">
        <el-tabs type="border-card" class="blog-card">
          <el-tab-pane label="最新"><home-blog-new /></el-tab-pane>
          <el-tab-pane label="最热"><home-blog-hot /></el-tab-pane>
          <el-tab-pane label="推荐"></el-tab-pane>
        </el-tabs>
        <home-tag />
      </div>
    </div>
    <back-top />
  </div>
</template>
<script>
import TopBar from "@/components/Bar/bar";
import { content1, content2, title } from "@/assets/static/content";
import { routerPath } from "@/assets/js/util/path";
import HomeBlogNew from "@/components/Home/HomeBlogNew";
import HomeTag from "@/components/Home/HomeTag";
import HomeBlogHot from "@/components/Home/HomeBlogHot";
import BackTop from "@/components/BackToTop/backTop";

export default {
  name: "Home",
  components: {
    BackTop,
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

#logo-img {
  object-fit: cover;
  height: 60vh;
  width: 100%;
  z-index: -1;
}

#logo-content {
  text-align: center;
  height: 50vh;
  margin-top: -50vh;
}

.align-center {
  display: flex;
  flex-direction: column;
  align-items: center;

  .top-button {
    text-align: center;
    font-size: 5vh;
    height: 15vh;
    width: 35vh;
    margin: 5vh;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.42);
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
  }
}

.row-contain {
  display: flex;
  flex-direction: row;
}

.blog-card {
  width: 120vh;
  backdrop-filter: blur(4px);
  background: rgba(250, 249, 249, 0.62);
  margin: 2vh;
}
</style>
