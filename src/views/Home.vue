<template>
  <div>
    <img class="background-img" src="../assets/images/1.jpg" alt="" />
    <top-bar />
    <header style="text-align: center">
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
          <div v-for="(blog, index) in blogList" :key="index">
            <el-card class="item" shadow="hover">
              <el-row style="line-height: 30px">
                <label
                  class="blog-title"
                  @click="toBlog(blog.blogId)"
                  v-text="blog.blogTitle"
                ></label>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <img class="blog-img" :src="blog.blogImg" preview alt />
                </el-col>
                <el-col :span="16">
                  <label
                    class="blog-body"
                    @click="toBlog(blog.blogId)"
                    v-text="blog.blogBody"
                  />
                  <el-tag
                    v-for="(blogTag, index2) in blog.blogTagList"
                    :key="index2"
                  >
                    {{ blogTag.tag.tagName }}
                  </el-tag>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="4">
                  <i class="el-icon-user" />
                  <label v-text="blog.user.userName" />
                </el-col>
                <el-col :span="20"> </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/Bar/bar";
import { content1, content2, title } from "@/assets/static/content";
import { getBlogNew } from "@/assets/js/api/blog";

export default {
  name: "Home",
  components: {
    TopBar,
  },
  created() {
    this.url = "http://118.31.15.127:9000/blog/%E5%8A%A8%E6%BC%AB%20(3).png";
  },
  mounted() {
    this.getBlogNew();
  },
  data() {
    return {
      title: title,
      content1: content1,
      content2: content2,
      url: "",
      blogList: [],
    };
  },
  methods: {
    getBlogNew() {
      getBlogNew().then((res) => {
        console.log(res.data);
        this.blogList = res.data.data;
      });
    },
    toBlog(blogId) {
      this.$router.push({ path: "/blog", query: { blogId: blogId } });
    },
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
    width: 1000px;
    text-align: left;
    .item {
      backdrop-filter: blur(4px);
      background: rgba(250, 249, 249, 0.62);
      margin: 5px auto;
      .el-row {
        margin-bottom: 5px;
      }
    }
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

.blog-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.blog-body {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.blog-title {
  font-size: 20px;
  display: -webkit-box;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
