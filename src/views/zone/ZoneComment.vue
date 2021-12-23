<template>
  <div>
    <div v-if="commentList.length === 0">
      <el-empty
        style="background: white; background-size: cover"
        :image-size="200"
      />
    </div>
    <div v-else>
      <el-card>
        <el-timeline>
          <el-timeline-item
            v-for="(comment, index) in commentList"
            :key="index"
            type="primary"
            size="large"
            icon="el-icon-more"
            :timestamp="dateDiff(comment.comTime)"
            placement="top"
          >
            <el-card shadow="hover">
              <el-button
                style="float: right"
                type="success"
                @click="toBlog(comment.blogId)"
                icon="el-icon-search"
              >
                前往博客
              </el-button>
              <label v-html="comment.comBody" />
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
      <br />
      <el-card style="width: 100%; text-align: center" shadow="hover">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="page.pageNum"
          :page-size="10"
          :total="page.total"
          @current-change="handlePageNumChange"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import { dateDiff } from "@/assets/js/util/time";
import { getCommentByUserId } from "@/assets/js/api/comment";

export default {
  name: "ZoneComment",
  mounted() {
    this.getCommentListByUserId();
  },
  data() {
    return {
      page: { pageNum: 1, total: 0 },
      commentList: [],
    };
  },
  methods: {
    getCommentListByUserId() {
      getCommentByUserId(this.$route.query.userId, this.page.pageNum).then(
        (res) => {
          let restMsg = res.data;
          if (restMsg.code === 200) {
            this.commentList = restMsg.data.list;
            this.page.total = restMsg.data.total;
          }
        }
      );
    },
    handlePageNumChange() {
      this.getCommentListByUserId();
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
@import "../../assets/css/flex";
</style>
