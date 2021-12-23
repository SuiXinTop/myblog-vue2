<template>
  <div>
    <div v-if="collectList.length === 0">
      <el-empty
        style="background: white; background-size: cover"
        :image-size="200"
      />
    </div>
    <div v-else>
      <el-card
        class="blog-card"
        v-for="(collect, index) in collectList"
        :key="index"
      >
        <el-link
          :underline="false"
          class="blog-title"
          @click="toBlog(collect.blogId)"
          v-text="collect.blog.blogTitle"
        />
        <el-row :gutter="10">
          <el-col :span="8">
            <el-image
              class="blog-img"
              v-if="collect.blog.blogImg"
              :src="collect.blog.blogImg"
              :preview-src-list="[collect.blog.blogImg]"
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
              @click="toBlog(collect.blogId)"
              v-text="collect.blog.blogBody"
            />
            <p>
              <el-tag
                effect="dark"
                style="margin-right: 5px"
                v-for="(blogTag, index2) in collect.blog.blogTagList"
                :key="index2"
              >
                <a v-text="blogTag.tag.tagName" />
              </el-tag>
            </p>
            <i class="el-icon-view">
              <label v-text="collect.blog.blogView" />
            </i>
            <i class="el-icon-star-on">
              <label v-text="collect.blog.blogLike" />
            </i>
            <i class="el-icon-star-on">
              <label v-text="collect.blog.blogCollect" />
            </i>
            <i class="el-icon-s-comment">
              <label v-text="collect.blog.blogComment" />
            </i>
            <el-divider direction="vertical" />
            <label v-text="dateDiff(collect.blog.blogTime)" />
            <br />
            <router-link
              :to="'/zone?userId=' + collect.blog.user.userId"
              style="color: black"
            >
              <i class="el-icon-user">
                <label class="user-name" v-text="collect.blog.user.userName" />
              </i>
            </router-link>
            <p>收藏于{{ dateDiff(collect.collectTime) }}</p>
          </el-col>
        </el-row>
      </el-card>
      <div>
        <el-card class="pagination">
          <el-pagination
            layout="prev, pager, next"
            :current-page.sync="page.pageNum"
            @current-change="handlePageNumChange"
            :page-size="10"
            :total="page.total"
          />
        </el-card>
      </div>
      <div style="margin-bottom: 10vh" />
      <back-top />
    </div>
  </div>
</template>

<script>
import { dateDiff } from "@/assets/js/util/time";
import { getCollectByUserId } from "@/assets/js/api/collect";
import BackTop from "@/components/BackToTop/backTop";

export default {
  name: "ZoneCollect",
  components: { BackTop },
  mounted() {
    this.getCollectByUserId();
  },
  data() {
    return {
      page: { pageNum: 1, total: 0 },
      collectList: [],
    };
  },
  methods: {
    getCollectByUserId() {
      getCollectByUserId(this.$route.query.userId, this.page.pageNum).then(
        (res) => {
          let restMsg = res.data;
          if (restMsg.code === 200) {
            this.collectList = restMsg.data.list;
            this.page.total = restMsg.data.total;
          }
        }
      );
    },
    handlePageNumChange() {
      this.getCollectByUserId();
    },
    toBlog(blogId) {
      this.$router.push({ path: "/blog", query: { blogId: blogId } });
    },
    dateDiff(val) {
      return dateDiff(val);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/blog";

.blog-card {
  float: left;
  width: 78vh;
  min-height: 260px;
  margin-right: 1vh;
  margin-bottom: 1vh;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(3px) brightness(110%);
}
.pagination {
  text-align: center;
  width: 156vh;
  border-radius: 8px;
}
</style>
