<template>
  <div>
    <div style="margin: 10px" v-for="(blog, index) in blogList" :key="index">
      <el-link
        :underline="false"
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
          <label class="blog-body" v-text="blog.blogBody" />
          <p>
            <el-tag
              effect="dark"
              style="margin-right: 5px"
              v-for="(blogTag, index2) in blog.blogTagList"
              :key="index2"
            >
              <a v-text="blogTag.tag.tagName" />
            </el-tag>
          </p>
          <div>
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
            <el-button
              style="float: right"
              type="success"
              @click="toBlog(blog.blogId)"
              icon="el-icon-search"
              round
              >查看更多
            </el-button>
          </div>

          <el-button
            type="text"
            icon="el-icon-user"
            @click="toZone(blog.user.userId)"
          >
            {{ blog.user.userName }}
          </el-button>
        </el-col>
      </el-row>
      <el-divider />
    </div>
  </div>
</template>

<script>
import { getBlogNew } from "@/assets/js/api/blog";
import { dateDiff } from "@/assets/js/util/time";

export default {
  name: "HomeBlogNew",
  mounted() {
    this.getBlogNew();
  },
  data() {
    return {
      blogList: [],
    };
  },
  methods: {
    getBlogNew() {
      getBlogNew().then((res) => {
        if (res.data.code === 200) {
          this.blogList = res.data.data;
        }
      });
    },
    toBlog(blogId) {
      this.$router.push({ path: "/blog", query: { blogId: blogId } });
    },
    toZone(userId) {
      this.$router.push({ path: "/zone", query: { userId: userId } });
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
