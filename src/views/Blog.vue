<template>
  <div>
    <img class="background-img" src="../assets/images/1.jpg" alt />
    <TopBar />
    <div style="padding: 50px" />
    <div class="align-center">
      <el-card id="blog-card">
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
        <p style="font-size: 24px" v-text="blog.blogTitle" />
        <el-tag v-for="(blogTag, index) in blog.blogTagList" :key="index">
          {{ blogTag.tag.tagName }}
        </el-tag>
        <p v-text="getFormatTime(blog.blogTime)" />

        <div id="user-info">
          <img class="user-img" :src="blog.user.userImg" preview="" alt="" />
          <label
            style="font-size: 24px; font-weight: bold"
            v-text="blog.user.userName"
          />
        </div>
        <el-divider />
        <v-md-editor mode="preview" v-model="blog.blogBody" />
        <el-divider />
        <div id="blog-command">
          <el-tooltip placement="top" effect="light" content="浏览量">
            <el-button>
              <i class="el-icon-view">{{ blog.blogView }}</i>
            </el-button>
          </el-tooltip>
          <el-tooltip placement="top" effect="light" content="点赞">
            <el-button @click="like" v-show="hasLike">
              <i class="el-icon-star-on">{{ blog.blogLike }} </i>
            </el-button>
          </el-tooltip>
          <el-tooltip placement="top" effect="light" content="收藏">
            <el-button @click="collect" v-show="hasCollect">
              <i class="el-icon-star-on">{{ blog.blogCollect }} </i>
            </el-button>
          </el-tooltip>
        </div>
      </el-card>
      <br />
      <el-card id="comment-card">
        <p>共{{ page.total }}条评论</p>
        <html-edit
          ref="htmlEdit"
          :editor-option="editorOption"
          v-model.trim="comment.comBody"
        />
        <div style="text-align: right">
          <el-button @click="saveComment">发布评论</el-button>
        </div>
        <div v-for="(value, comIds) in commentList" :key="comIds">
          <el-divider />
          <div style="display: flex; align-items: center">
            <el-avatar shape="square" :src="value.owner.userImg" :size="60" />
            <div>
              <label v-text="getFormatTime(value.comTime)" />
              <br />
              <label style="font-size: 20px" v-text="value.owner.userName" />
            </div>
          </div>
          <p v-html="value.comBody" />
        </div>
        <el-divider />
        <div style="text-align: center">
          <el-pagination
            layout="prev, pager, next"
            :hide-on-single-page="true"
            :current-page.sync="page.currentPage"
            @current-change="handleCurrentChange"
            :page-size="10"
            :total="page.total"
          >
          </el-pagination>
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
import { getCommentList, saveComment } from "@/assets/js/api/comment";
import { dateDiff } from "@/assets/js/util/time";
import HtmlEdit from "@/components/HtmlEdit/HtmlEdit";
import { getUserId } from "@/assets/js/util/localStore";
import { CommentOption } from "@/assets/js/util/var";

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
      editorOption: CommentOption,
      hasCollect: true,
      hasLike: true,
      page: { total: 0, currentPage: 1 },
      blog: {},
      comment: {
        blogId: this.$route.query.blogId,
        comOwner: getUserId(),
        comBody: "",
      },
      commentList: [],
    };
  },
  methods: {
    like() {
      this.toLogin();
      this.hasLike = !this.hasLike;
    },
    collect() {
      this.toLogin();
      this.hasCollect = !this.hasCollect;
    },
    //发布评论
    saveComment() {
      this.toLogin();
      saveComment(this.comment)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.$notify.success(res.data.msg);
            this.$refs.htmlEdit.value = "";
            this.getCommentList();
            return;
          }
          this.$notify.error(res.data.msg);
        })
        .catch((err) => {
          this.$notify.error(err.message);
        });
    },
    // 获取博客信息及其用户
    getBlog() {
      getBlog(this.$route.query.blogId)
        .then((res) => {
          console.log(res);
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
      getCommentList(this.$route.query.blogId, this.page.currentPage)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.commentList = res.data.data.list;
            this.page.total = res.data.data.total;
            return;
          }
          this.$notify.error(res.data.msg);
        })
        .catch((err) => {
          this.$notify.error(err.message);
        });
    },
    // 处理当前页码变化
    handleCurrentChange() {
      this.getCommentList();
    },
    // 每页数量变化
    getFormatTime(val) {
      return dateDiff(val);
    },
    toLogin() {
      if (!this.comment.comOwner) {
        this.$notify.warning("前往登录");
        this.$router.push("/login");
      }
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

#user-info {
  width: 50px;
  display: flex;
  align-items: center;
  .user-img {
    height: 60px;
    width: 60px;
    object-fit: cover;
    border-radius: 6px;
  }
}

#blog-card {
  width: 130vh;
}
#comment-card {
  width: 130vh;
}

#blog-command {
  text-align: center;
}
</style>
