<template>
  <div>
    <img class="background-img" src="../assets/images/1.jpg" alt="" />
    <top-bar />
    <header style="text-align: center">
      <!--      <el-image-->
      <!--        :src="url"-->
      <!--        :key="url"-->
      <!--        fit="cover"-->
      <!--        style="height: 500px; width: 100%; z-index: -1"-->
      <!--      />-->
      <img
        :src="url"
        style="object-fit: cover; height: 500px; width: 100%; z-index: -1"
        alt
      />
      <div style="height: 400px; margin-top: -400px">
        <br />
        <p
          style="font-size: 40px; font-weight: bold; color: #0cbe0c"
          v-text="title"
        />
        <p style="font-size: 24px; color: #454c59">
          {{ content1 }}
          <br />
          {{ content2 }}
        </p>
        <el-button
          v-if="true"
          style="
            background: #0cbe0c;
            color: white;
            width: 180px;
            height: 70px;
            font-size: 24px;
            border: 0;
          "
        >
          注册登录
        </el-button>
      </div>
    </header>
    <div class="alignCenter">
      <div class="rowContain" style="margin-top: -80px">
        <el-card class="top-button card-type">博客</el-card>
        <el-card class="top-button card-type">用户</el-card>
        <el-card class="top-button card-type">提问</el-card>
      </div>
    </div>
    <div class="alignCenter">
      <div class="rowContain">
        <div class="browse">
          <el-card
            class="item"
            v-for="i in 10"
            :key="i"
            header="1111"
            shadow="hover"
          >
            sadasdasdad + {{ i }}
          </el-card>
        </div>
        <el-card style="width: 40vh; height: 100vh" />
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/Bar/bar";
import { content1, content2, title } from "@/assets/static/content";

export default {
  name: "Home",
  components: {
    TopBar,
  },
  created() {
    this.url = "http://118.31.15.127:9000/blog/%E5%8A%A8%E6%BC%AB%20(3).png";
  },
  data() {
    return {
      title: title,
      content1: content1,
      content2: content2,
      url: "",
    };
  },
};
</script>
<style lang="less">
.home {
  background-image: url("../assets/images/1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.alignCenter {
  align-items: center;
  display: flex;
  flex-direction: column;

  .browse {
    margin: 0 10px 0 10px;
    width: 1000px;
    text-align: left;

    .item {
      min-height: 200px;
      margin: 5px 0 5px 0;
    }
  }
  .side {
    margin: 0 10px 0 10px;
    width: 300px;
    height: 800px;
    background-color: white;
  }

  .block2 {
    height: 500px;
    width: 400px;
    margin: 10px;
  }

  .top-button {
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

.rowContain {
  display: flex;
  flex-direction: row;
  text-align: center;
  margin: 60px;
}
</style>
