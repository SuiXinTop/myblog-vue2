<template>
  <div id="search">
    <top-bar />
    <p class="clock" v-text="time" />
    <!-- 搜索框 -->
    <section class="searchBox">
      <div class="inputBox">
        <input
          type="text"
          placeholder="Search"
          id="searchInput"
          v-model="queryString"
          @keyup.enter="search"
        />
        <el-button
          icon="el-icon-search"
          type="text"
          style="color: white"
          @click="search"
        />
      </div>
    </section>
    <div class="align-center">
      <el-card
        v-if="this.queryResultShow"
        :header="'共搜索到' + page.total + '结果'"
        style="
          width: 150vh;
          border-radius: 8px;
          border: none;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(3px) brightness(110%);
        "
      >
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
      <el-card
        v-if="this.queryResultShow"
        style="width: 150vh; text-align: center"
      >
        <el-pagination
          layout="prev, pager, next"
          :current-page="page.pageNum"
          :page-size="15"
          :total="page.total"
        />
      </el-card>
      <div style="margin-bottom: 10vh" />
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/Bar/bar";
import { getBlogListByParam } from "@/assets/js/api/search";
import { dateDiff } from "@/assets/js/util/time";
import { modal } from "@/assets/js/util/modal";
import { hideLoading, showLoading } from "@/axios/loading";

export default {
  name: "Search",
  components: { TopBar },
  mounted() {
    this.time = setInterval(() => {
      this.getTime();
    }, 3000);
  },
  watch: {
    queryString: function () {
      if (this.queryString.length === 0) {
        this.queryResultShow = false;
      }
    },
  },
  data() {
    return {
      time: "",
      queryString: "", // 查询字符串
      queryTime: { start: null, end: null },
      queryResultShow: false,
      page: { pageNum: 1, total: 0 },
      blogList: [],
    };
  },
  methods: {
    search() {
      if (this.queryString === "") {
        modal.notifyWarning("请输入搜索条件");
        return;
      }
      this.getBlogListByParam();
    },
    getBlogListByParam() {
      showLoading();
      getBlogListByParam(this.queryString, this.page.pageNum)
        .then((res) => {
          let restMsg = res.data;
          if (restMsg.code === 200) {
            this.blogList = restMsg.data.list;
            this.page.total = restMsg.data.total;
            this.queryResultShow = true;
          }
          hideLoading();
        })
        .catch(() => {
          hideLoading();
        });
    },
    handlePageNumChange() {
      this.getBlogListByTagId();
    },
    toBlog(blogId) {
      this.$router.push({ path: "/blog", query: { blogId: blogId } });
    },
    dateDiff(val) {
      return dateDiff(val);
    },
    toZone(userId) {
      this.$router.push({ path: "/zone", query: { userId: userId } });
    },
    getTime: function () {
      let time = new Date();
      let hour = time.getHours();
      let minutes = time.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      this.time = hour + "：" + minutes;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/flex";
@import "../assets/css/blog";
/* 中间搜索框 */
.searchBox {
  width: 60vw;
  min-width: 400px;
  height: 10vh;
  margin: 5vh auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.inputBox {
  width: 80%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  padding: 0 15px;
  border-radius: 10px;
}

.inputBox > input {
  background: none;
  border: none;
  outline: none;
  padding: 0 10px 0 0;
  flex: 1;
  height: 44px;
  color: #242323;
  font-size: 16px;
}

.clock {
  text-align: center;
  font-size: 10vh;
  color: white;
  font-family: 微软雅黑, serif;
}
</style>
