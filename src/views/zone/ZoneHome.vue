<template>
  <div>
    <div v-for="(blog, index) in blogList" :key="index">
      <el-card :body-style="{ padding: 0 }" class="blog-card" shadow="hover">
        <el-image
          class="blog-img"
          :src="blog.blogImg"
          :preview-src-list="[blog.blogImg]"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
        <div style="margin-left: 5px; margin-right: 5px">
          <br />
          <router-link
            :to="'/blog?blogId=' + blog.blogId"
            class="blog-title"
            v-text="blog.blogTitle"
          />
          <label style="font-size: 14px" v-text="getDateDiff(blog.blogTime)" />
          <el-divider direction="vertical" />

          <el-tooltip placement="top" effect="light" content="浏览量">
            <i class="el-icon-view">{{ blog.blogView }}</i>
          </el-tooltip>
          <el-tooltip placement="top" effect="light" content="点赞">
            <i class="el-icon-star-on">{{ blog.blogLike }} </i>
          </el-tooltip>
          <el-tooltip placement="top" effect="light" content="收藏">
            <i class="el-icon-star-on">{{ blog.blogCollect }} </i>
          </el-tooltip>
          <el-divider direction="vertical" />
          <el-popover placement="top" trigger="hover">
            <vue-qrcode
              value="https://www.baidu.com"
              :options="{ size: 150 }"
            />
            <el-button type="text" slot="reference" style="color: #2c3e50">
              <i class="el-icon-share">分享</i>
            </el-button>
          </el-popover>
        </div>
      </el-card>
    </div>
    <el-card style="width: 100%; text-align: center">
      <el-pagination
        layout="prev, pager, next"
        :current-page="page.pageNum"
        :page-size="15"
        :total="page.total"
      />
    </el-card>
  </div>
</template>

<script>
import VueQrcode from "@xkeshi/vue-qrcode";
import { getBlogListByUserId } from "@/assets/js/api/blog";
import { dateDiff } from "@/assets/js/util/time";

export default {
  name: "ZoneHome",
  components: {
    VueQrcode,
  },
  mounted() {
    if (!this.$route.query.userId) {
      this.$router.push("/404");
    } else {
      this.getUserByUserId();
    }
  },
  data() {
    return {
      page: {
        pageNum: 1,
        total: 0,
      },
      blogList: [],
    };
  },
  methods: {
    getUserByUserId() {
      getBlogListByUserId(this.$route.query.userId, 1).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.blogList = restMsg.data.list;
          this.page.total = restMsg.data.total;
        }
      });
    },
    getDateDiff(val) {
      return dateDiff(val);
    },
  },
};
</script>

<style lang="less" scoped>
.blog-card {
  width: 30%;
  margin: 1.5%;
  height: 410px;
  border-radius: 6px;
  float: left;
  border: none;
}
.blog-img {
  width: auto;
  height: 300px;
  object-fit: cover;
}
.blog-img :hover {
  transition: all 1s ease-in-out;
  transform: scale(1.5);
}

.blog-title {
  font-size: 18px;
  display: -webkit-box;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
