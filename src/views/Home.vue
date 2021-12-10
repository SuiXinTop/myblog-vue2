<template>
  <div>
    <img class="background-img" src="../assets/images/1.jpg" alt="" />
    <top-bar />
    <header style="text-align: center">
      <img
        src="../assets/images/2.jpg"
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
    <div class="alignCenter">
      <div class="rowContain" style="margin-top: -80px">
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
    <div class="alignCenter">
      <div class="rowContain">
        <el-card class="browse" shadow="hover">
          <div
            style="margin: 10px"
            v-for="(blog, index) in blogList"
            :key="index"
          >
            <p
              class="blog-title"
              @click="toBlog(blog.blogId)"
              v-text="blog.blogTitle"
            ></p>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-image
                  class="blog-img"
                  v-if="blog.blogImg"
                  :src="blog.blogImg"
                  :preview-src-list="[blog.blogImg]"
                  fit="cover"
                  alt
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
              </el-col>
              <el-col :span="16">
                <label
                  class="blog-body"
                  @click="toBlog(blog.blogId)"
                  v-text="blog.blogBody"
                />
                <br />
                <i class="el-icon-view"><label v-text="blog.blogView" /></i>
                <i class="el-icon-star-on"><label v-text="blog.blogLike" /></i>
                <i class="el-icon-star-on">
                  <label v-text="blog.blogCollect" />
                </i>
                <i class="el-icon-s-comment">
                  <label v-text="blog.blogComment" />
                </i>
                <el-divider direction="vertical" />
                <label v-text="dateDiff(blog.blogTime)" />
                <div
                  v-for="(blogTag, index2) in blog.blogTagList"
                  :key="index2"
                >
                  <el-tag>
                    {{ blogTag.tag.tagName }}
                  </el-tag>
                </div>
                <p>
                  <i class="el-icon-user" />
                  <label class="user-name" v-text="blog.user.userName" />
                </p>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/Bar/bar";
import { content1, content2, title } from "@/assets/static/content";
import { getBlogNew } from "@/assets/js/api/blog";
import { dateDiff } from "@/assets/js/util/time";
import { getUserImg } from "@/assets/js/util/localStore";

export default {
  name: "Home",
  components: {
    TopBar,
  },
  created() {
    this.url = getUserImg();
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
    dateDiff(val) {
      return dateDiff(val);
    },
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
    text-align: left;
    width: 150vh;
    backdrop-filter: blur(4px);
    background: rgba(250, 249, 249, 0.62);
    margin: 5px auto;
    .el-row {
      margin-bottom: 5px;
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

.user-name {
  font-weight: bold;
  font-size: 18px;
}

.blog-img {
  width: 100%;
  height: auto;
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
  line-height: 40px;
  font-family: 幼圆, serif;
  font-weight: bold;
  display: -webkit-box;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
