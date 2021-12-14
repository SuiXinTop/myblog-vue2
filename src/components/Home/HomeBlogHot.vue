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
            lazy
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
              effect="dark"
              style="margin-right: 5px"
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
@import "../../assets/css/blog";
</style>
