<template>
  <div>
    <top-bar />
    <div v-if="blogList.length === 0">
      <el-empty
        style="background: white; background-size: cover"
        :image-size="200"
      />
    </div>
    <div v-else class="align-center">
      <el-card class="search-card">
        <div v-for="(blog, index) in blogList" :key="index">
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
              <a
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
                  <a v-text="blogTag.tag.tagName" />
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
              <br />
              <!--跳转个人空间-->
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
      </el-card>
      <br />
      <el-card class="pagination-card">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="page.pageNum"
          @current-change="handlePageNumChange"
          :page-size="10"
          :total="page.total"
        />
      </el-card>
      <div style="margin-bottom: 10vh" />
      <back-top />
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/Bar/bar";
import { isInteger } from "@/assets/js/util/valid";
import { getBlogListByTagId } from "@/assets/js/api/search";
import { dateDiff } from "@/assets/js/util/time";
import BackTop from "@/components/BackToTop/backTop";
export default {
  name: "TagSearch",
  components: { BackTop, TopBar },
  mounted() {
    if (isInteger(this.$route.query.tagId)) {
      this.getBlogListByTagId();
    } else {
      this.$router.push("/404");
    }
  },
  data() {
    return {
      page: { pageNum: 1, total: 0 },
      blogList: [],
    };
  },
  methods: {
    getBlogListByTagId() {
      getBlogListByTagId(this.$route.query.tagId, this.page.pageNum).then(
        (res) => {
          let restMsg = res.data;
          if (restMsg.code === 200) {
            this.blogList = restMsg.data.list;
            this.page.total = restMsg.data.total;
          }
        }
      );
    },
    handlePageNumChange() {
      this.getBlogListByTagId();
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
@import "../assets/css/flex";
@import "../assets/css/blog";

.search-card {
  width: 140vh;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(3px) brightness(110%);
}
.pagination-card {
  text-align: center;
  width: 140vh;
  border-radius: 8px;
}
</style>
