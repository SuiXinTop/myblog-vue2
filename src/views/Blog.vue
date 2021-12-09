<template>
  <div>
    <img class="background-img" src="../assets/images/1.jpg" alt />
    <TopBar />
    <div style="padding: 50px" />
    <div class="align-center">
      <el-card id="blog-card">
        <img
          class="blog-img"
          v-if="blog.blogImg"
          :src="blog.blogImg"
          alt
          preview
        />
        <p style="font-size: 24px" v-text="blog.blogTitle" />
        <el-tag v-for="(blogTag, index) in blog.blogTagList" :key="index">
          {{ blogTag.tag.tagName }}
        </el-tag>
        <p v-text="getFormatTime(blog.blogTime)" />
        <el-avatar shape="square" :src="blog.user.userImg" :size="100" />
        <p v-text="blog.user.userName" />
        <el-divider />
        <v-md-editor mode="preview" v-model="blog.blogBody" />
        <el-divider />
        <div style="text-align: center">
          <el-button disabled>
            <i class="el-icon-view">浏览量{{ blog.blogView }}</i>
          </el-button>
          <el-button>
            <i class="el-icon-goods">点赞{{ blog.blogLike }} </i>
          </el-button>
          <el-button>
            <i class="el-icon-star-on">收藏{{ blog.blogCollect }} </i>
          </el-button>
        </div>
      </el-card>
      <br />
      <el-card id="comment-card">
        <label>共{{ blog.blogComment }}条评论</label>
        <html-edit />
        <div v-for="(value, comIds) in commentList" :key="comIds">
          <el-avatar :src="value.user.userImg" :size="60" />
          <label v-text="value.comBody" />
          <el-divider />
        </div>
      </el-card>
    </div>
    <div style="padding: 50px" />
    <back-to-top />
  </div>
</template>

<script>
import TopBar from "@/components/Bar/bar";
import BackToTop from "@/components/BackToTop/backTop";
import { getBlog } from "@/assets/js/api/blog";
import { getCommentList } from "@/assets/js/api/comment";
import { dateDiff } from "@/assets/js/util/time";
import HtmlEdit from "@/components/HtmlEdit/HtmlEdit";

export default {
  name: "blog",
  components: {
    HtmlEdit,
    BackToTop,
    TopBar,
  },
  mounted() {
    if (this.$route.query.blogId) {
      this.getBlog();
      this.getCommentList();
    }
  },
  data() {
    return {
      page: { total: 0, currentPage: 1, pageSize: 10 },
      blog: {},
      comment: {
        blogId: this.$route.query.blogId,
        comOwner: 1,
        comBody: "",
      },
      commentList: [],
    };
  },
  methods: {
    // 获取博客信息及其用户
    getBlog() {
      getBlog(this.$route.query.blogId)
        .then((res) => {
          if (res.data.code === 200) {
            this.blog = res.data.data;
            return;
          }
          this.$notify.error(res.data.msg);
        })
        .catch((err) => {
          this.$notify.error(err.message);
        });
    },
    getCommentList() {
      getCommentList(this.$route.query.blogId)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.commentList = res.data.data.list;
            return;
          }
          this.$notify.error(res.data.msg);
        })
        .catch((err) => {
          this.$notify.error(err.message);
        });
    },
    // 处理当前页码变化
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 每页数量变化
    handleSizeChange(val) {
      this.pageSize = val;
    },
    getFormatTime(val) {
      return dateDiff(val);
    },
  },
};
</script>

<style lang="less" scoped>
.align-center {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.rowContain {
  display: flex;
  flex-direction: row;
  text-align: center;
}
.blog-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
#blog-card {
  width: 150vh;
}
#comment-card {
  width: 150vh;
}
</style>
