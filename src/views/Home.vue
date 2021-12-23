<template>
  <div>
    <top-bar />
    <div class="align-center">
      <div id="logo-content">
        <p
          style="font-size: 8vh; font-weight: bold; color: #0cbe0c"
          v-text="title"
        />
        <p style="font-size: 4vh; color: white">
          {{ content1 }}
          <br />
          {{ content2 }}
        </p>
      </div>
    </div>
    <div style="margin: 20vh" />

    <div class="align-center">
      <div class="row-contain">
        <el-tabs type="border-card" class="blog-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-news" /> 最新</span>
            <home-blog-new />
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-hot-water" /> 最热</span>
            <home-blog-hot />
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-alarm-clock" /> 所有</span>
          </el-tab-pane>
        </el-tabs>
        <home-side />
      </div>
    </div>
    <div style="margin-bottom: 10vh" />
    <back-top />
  </div>
</template>
<script>
import TopBar from "@/components/Bar/bar";
import { content1, content2, title } from "@/assets/static/content";
import HomeBlogNew from "@/components/Home/HomeBlogNew";
import HomeSide from "@/components/Home/HomeSide";
import HomeBlogHot from "@/components/Home/HomeBlogHot";
import BackTop from "@/components/BackToTop/backTop";

export default {
  name: "Home",
  components: {
    BackTop,
    HomeBlogHot,
    HomeSide,
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
      this.$router.push("/search");
    },
    toAnnounce() {
      this.$router.push("/announce");
    },
    toAbout() {
      this.$router.push("/about");
    },
  },
};
</script>
<style lang="less" scoped>
@import "../assets/css/flex";
#logo-img {
  object-fit: cover;
  height: 60vh;
  width: 100%;
  z-index: -1;
}

#logo-content {
  text-align: center;
  height: 50vh;
  width: 100%;
  border-radius: 10px;
  backdrop-filter: blur(4px);
  padding-top: 15vh;
  padding-bottom: 15vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
  background: rgba(222, 97, 97, 0.8);
  background: -webkit-linear-gradient(
    to right,
    #2657eb,
    rgba(225, 67, 67, 0.78)
  );
  background: linear-gradient(to right, #2657eb, rgba(231, 55, 55, 0.76));
}

.top-button {
  text-align: center;
  font-size: 5vh;
  height: 10vh;
  width: 30vh;
  margin: 5vh;
  border-radius: 5px;
  background: rgba(255, 255, 255);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
}

.top-button :hover {
  color: #12b212;
}

.blog-card {
  width: 120vh;
  margin-right: 2vh;
  border: none;
  border-radius: 6px;
  backdrop-filter: blur(3px) brightness(110%);
  background: rgba(255, 255, 255, 0.7);
}
</style>
