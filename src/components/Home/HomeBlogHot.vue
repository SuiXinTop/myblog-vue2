<template>
  <div v-if="blogList.length">
    <div style="margin: 10px" v-for="(blog, index) in blogList" :key="index">
      <p
        class="blog-title"
        @click="toBlog(blog.blogId)"
        v-text="blog.blogTitle"
      />
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
          <p>
            <el-tag
              style="background: white; margin-right: 5px"
              v-for="(blogTag, index2) in blog.blogTagList"
              :key="index2"
            >
              {{ blogTag.tag.tagName }}
            </el-tag>
          </p>

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

          <p>
            <i class="el-icon-user" />
            <label class="user-name" v-text="blog.user.userName" />
          </p>
        </el-col>
      </el-row>
      <el-divider />
    </div>
  </div>
</template>

<script>
import { getBlogHot } from "@/assets/js/api/blog";
import { routerPath } from "@/assets/js/util/path";
import { dateDiff } from "@/assets/js/util/time";

export default {
  name: "HomeBlogHot",
  mounted() {
    this.getBlogHot();
  },
  data() {
    return {
      blogList: [],
    };
  },
  methods: {
    getBlogHot() {
      getBlogHot().then((res) => {
        console.log(res.data);
        this.blogList = res.data.data;
      });
    },
    toBlog(blogId) {
      this.$router.push({ path: routerPath.blog, query: { blogId: blogId } });
    },
    dateDiff(val) {
      return dateDiff(val);
    },
  },
};
</script>

<style lang="less" scoped>
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
