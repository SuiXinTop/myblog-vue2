<template>
  <div>
    <div v-if="historyList.length === 0">
      <el-empty
        style="background: white; background-size: cover"
        :image-size="200"
      />
    </div>
    <div v-else>
      <el-card>
        <el-timeline>
          <el-timeline-item
            v-for="(history, index) in historyList"
            :key="index"
            type="primary"
            size="large"
            icon="el-icon-more"
            :timestamp="dateDiff(history.comTime)"
            placement="top"
          >
            <el-card v-if="history.blog" shadow="hover">
              <el-image
                class="blog-img"
                :src="history.blog.blogImg"
                :preview-src-list="[history.blog.blogImg]"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
              <el-button
                style="float: right"
                type="success"
                @click="toBlog(history.blogId)"
                icon="el-icon-search"
              >
                前往博客
              </el-button>
              <label class="blog-title" v-text="history.blog.blogTitle" />
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
import { getHistory } from "@/assets/js/api/history";

export default {
  name: "ZoneHistory",
  mounted() {
    this.getHistory();
  },
  data() {
    return {
      page: { pageNum: 1, total: 0 },
      historyList: [],
    };
  },
  methods: {
    getHistory() {
      getHistory(this.$route.query.userId, this.page.pageNum, 1).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.historyList = restMsg.data.list;
          this.page.total = restMsg.data.total;
        }
      });
    },
    handlePageNumChange() {
      this.getHistory();
    },
    //格式化时间
    dateDiff(val) {
      return dateDiff(val);
    },
    toBlog(blogId) {
      this.$router.push({ path: "/blog", query: { blogId: blogId } });
    },
  },
};
</script>

<style lang="less" scoped>
.blog-img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.68), 0 0 3px rgba(255, 255, 255, 0.6);
}

.blog-img :hover {
  transition: all 1s ease-in-out;
  transform: scale(1.5);
}

.blog-title {
  font-size: 20px;
  display: -webkit-box;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
