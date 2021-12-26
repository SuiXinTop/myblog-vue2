<template>
  <div>
    <top-bar />
    <div v-if="!blog">
      <el-empty
        style="background: white; background-size: cover"
        :image-size="200"
      />
    </div>
    <div class="align-center" v-else>
      <div class="row-contain">
        <div class="left-side">
          <el-card id="blog-card">
            <div>
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
              <el-tag
                effect="dark"
                style="margin-right: 5px"
                v-for="(blogTag, index) in blog.blogTagList"
                :key="index"
              >
                {{ blogTag.tag.tagName }}
              </el-tag>
              <div style="float: right">
                <label v-text="getFormatTime(blog.blogTime)" />
                <el-divider direction="vertical" />
                <el-tooltip placement="top" effect="light" content="浏览量">
                  <el-button type="text" style="color: #2c3e50">
                    <i class="el-icon-view">{{ blog.blogView }}</i>
                  </el-button>
                </el-tooltip>
                <el-tooltip placement="top" effect="light" content="评论">
                  <el-button type="text" style="color: #2c3e50">
                    <i class="el-icon-s-comment">{{ blog.blogComment }}</i>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  placement="top"
                  effect="light"
                  content="点赞"
                  v-if="!hasLike"
                >
                  <el-button type="text" @click="like">
                    <i class="el-icon-success">{{ blog.blogLike }} </i>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  placement="top"
                  effect="light"
                  content="取消点赞"
                  v-if="hasLike"
                >
                  <el-button type="text" @click="delLike">
                    <i class="el-icon-error">{{ blog.blogLike }} </i>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  placement="top"
                  effect="light"
                  content="收藏"
                  v-if="!hasCollect"
                >
                  <el-button type="text" @click="collect">
                    <i class="el-icon-star-off">{{ blog.blogCollect }} </i>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  placement="top"
                  effect="light"
                  content="取消收藏"
                  v-if="hasCollect"
                >
                  <el-button type="text" @click="delCollect">
                    <i class="el-icon-star-on">{{ blog.blogCollect }} </i>
                  </el-button>
                </el-tooltip>
                <el-divider direction="vertical" />
                <el-popover placement="top" trigger="hover">
                  <vue-qrcode
                    value="https://www.baidu.com"
                    :options="{ size: 150 }"
                  />
                  <el-button
                    type="text"
                    slot="reference"
                    style="color: #2c3e50"
                  >
                    <i class="el-icon-share">分享</i>
                  </el-button>
                </el-popover>
              </div>
            </div>
            <el-divider />
            <v-md-editor mode="preview" v-model="blog.blogBody" />
            <el-divider />
          </el-card>
          <br />
          <el-card id="comment-card" :header="'共' + page.total + '条评论'">
            <html-edit
              ref="htmlEdit"
              :editor-option="editorOption"
              v-model.trim="comment.comBody"
              @keyup.ctrl.enter.native="saveComment"
            />
            <div v-for="(value, comIds) in commentList" :key="comIds">
              <el-divider />
              <div style="display: flex; align-items: center">
                <el-avatar
                  shape="square"
                  :src="value.owner.userImg"
                  :size="60"
                />
                <label style="font-size: 24px" v-text="value.owner.userName" />
              </div>
              <label
                style="display: block; float: right"
                v-text="getFormatTime(value.comTime)"
              />
              <label class="comment-body" v-html="value.comBody" />
            </div>
            <el-divider />
            <div style="text-align: center">
              <el-pagination
                layout="prev, pager, next"
                :hide-on-single-page="true"
                :current-page.sync="page.pageNum"
                @current-change="handlePageNumChange"
                :page-size="10"
                :total="page.total"
              />
            </div>
          </el-card>
        </div>
        <div class="right-side">
          <el-card id="user-card" header="作者">
            <div class="align-center">
              <router-link :to="'/zone?userId=' + blog.user.userId">
                <img class="user-img" :src="blog.user.userImg" alt="" />
              </router-link>
              <p
                style="font-size: 24px; font-weight: bold"
                v-text="blog.user.userName"
              />
              <div class="row-contain">
                <el-button
                  v-if="!hasAttend"
                  type="primary"
                  @click="addAttend"
                  style="width: 15vh"
                >
                  <i class="el-icon-plus" />关注
                </el-button>
                <el-button
                  v-if="hasAttend"
                  type="primary"
                  @click="deleteAttend"
                  style="width: 15vh"
                >
                  <i class="el-icon-success" />已关注
                </el-button>
                <el-button
                  type="primary"
                  @click="toChat"
                  style="width: 15vh"
                  :disabled="
                    blog.userId == this.$store.getters['user/getUser'].userId
                  "
                >
                  <i class="el-icon-message" />私信
                </el-button>
              </div>
            </div>
          </el-card>
          <el-card id="other-card" header="最近博客">
            <div v-for="(blogNew, index) in blogNewList" :key="index">
              <el-button
                type="text"
                v-text="blogNew.blogTitle"
                @click="toBlog(blogNew.blogId)"
              />
              <br />
              <label v-text="getFormatTime(blogNew.blogTime)" />
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div style="padding: 10vh" />
  </div>
</template>

<script>
import VueQrcode from "@xkeshi/vue-qrcode";
import TopBar from "@/components/Bar/bar";
import {
  addLike,
  addView,
  getBlog,
  getBlogNewByUserId,
} from "@/assets/js/api/blog";
import { getCommentByBlogId, saveComment } from "@/assets/js/api/comment";
import { dateDiff } from "@/assets/js/util/time";
import HtmlEdit from "@/components/HtmlEdit/HtmlEdit";
import { getUserId } from "@/assets/js/util/localStore";
import { CommentOption } from "@/assets/js/util/model";
import { modal } from "@/assets/js/util/modal";
import { isInteger } from "@/assets/js/util/valid";
import { addCollect, delCollect, hasCollect } from "@/assets/js/api/collect";
import { addAttend, deleteAttend, hasAttend } from "@/assets/js/api/friend";
import { createChannel } from "@/assets/js/api/chat";

export default {
  name: "blog",
  components: {
    TopBar,
    HtmlEdit,
    VueQrcode,
  },
  //监听参数变化
  watch: {
    $route: function () {
      location.reload();
    },
  },
  mounted() {
    if (isInteger(this.$route.query.blogId)) {
      this.getBlog();
      this.getCommentList();
      if (getUserId()) {
        this.checkHasCollect();
      }
    } else {
      this.$router.push("/404");
    }
  },
  data() {
    return {
      editorOption: CommentOption,
      hasAttend: false,
      hasCollect: false,
      hasLike: false,
      page: { total: 0, pageNum: 1 },
      //博客信息
      blog: {},
      //评论form
      comment: {
        blogId: this.$route.query.blogId,
        comOwner: getUserId(),
        comBody: "",
      },
      //评论列表
      commentList: [],
      //最近发布列表
      blogNewList: [],
    };
  },
  methods: {
    addAttend() {
      if (!getUserId()) {
        return;
      }
      addAttend(this.blog.userId).then(() => {
        modal.notifySuccess("关注成功");
        this.hasAttend = true;
      });
    },
    deleteAttend() {
      if (!getUserId()) {
        return;
      }
      deleteAttend(this.blog.userId).then(() => {
        modal.notifySuccess("已取消关注");
        this.hasAttend = false;
      });
    },
    checkHasAttend() {
      if (!getUserId()) {
        return;
      }
      hasAttend(this.blog.userId).then((res) => {
        this.hasAttend = res.data;
      });
    },
    like() {
      if (!getUserId()) {
        return;
      }
      addLike(this.$route.query.blogId).then(() => {
        this.hasLike = true;
        this.blog.blogLike++;
        modal.notifySuccess("已点赞");
      });
    },
    delLike() {
      if (!getUserId()) {
        return;
      }
      this.hasLike = false;
      this.blog.blogLike--;
      modal.notifySuccess("已取消点赞");
    },
    checkHasCollect() {
      if (!getUserId()) {
        return;
      }
      hasCollect(this.$route.query.blogId).then((res) => {
        this.hasCollect = res.data;
      });
    },
    collect() {
      if (!getUserId()) {
        return;
      }
      addCollect(this.$route.query.blogId).then(() => {
        this.hasCollect = true;
        this.blog.blogCollect++;
        modal.notifySuccess("已收藏");
      });
    },
    delCollect() {
      if (!getUserId()) {
        return;
      }
      delCollect(this.$route.query.blogId).then(() => {
        this.hasCollect = false;
        this.blog.blogCollect--;
        modal.notifySuccess("已取消收藏");
      });
    },
    //发布评论
    saveComment() {
      if (!getUserId()) {
        return;
      }
      saveComment(this.comment).then((res) => {
        if (res.data.code === 200) {
          modal.notifySuccess(res.data.msg);
          this.$refs.htmlEdit.value = "";
          this.getCommentList();
          this.blog.blogComment++;
        }
      });
    },
    // 获取博客信息及其用户
    getBlog() {
      getBlog(this.$route.query.blogId).then((res) => {
        if (res.data.code === 200) {
          this.blog = res.data.data;
          this.getBlogNewByUserId();
          this.checkHasAttend();
          addView(this.$route.query.blogId);
        }
      });
    },
    //获取评论列表
    getCommentList() {
      getCommentByBlogId(this.$route.query.blogId, this.page.pageNum).then(
        (res) => {
          if (res.data.code === 200) {
            this.commentList = res.data.data.list;
            this.page.total = res.data.data.total;
          }
        }
      );
    },
    //获取该用户最近更新
    getBlogNewByUserId() {
      getBlogNewByUserId(this.blog.userId).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.blogNewList = restMsg.data;
        }
      });
    },
    //处理翻页
    handlePageNumChange() {
      this.getCommentList();
    },
    //格式化时间
    getFormatTime(val) {
      return dateDiff(val);
    },
    //跳转博客
    toBlog(blogId) {
      this.$router.push({ path: "/blog", query: { blogId: blogId } });
    },
    toChat() {
      if (!getUserId()) {
        return;
      }
      createChannel(this.blog.userId).then((res) => {
        if (res.data.code === 200) {
          this.$router.push("/space/chat");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/flex";

.left-side {
  .blog-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  #blog-card {
    width: 120vh;
  }
  #comment-card {
    width: 120vh;
  }
  .comment-body {
    overflow-x: auto;
    overflow-wrap: break-word;
  }
}

.right-side {
  margin-left: 2vh;
  #user-card {
    width: 40vh;
    .user-img {
      width: 10vh;
      height: auto;
      border-radius: 8px;
      object-fit: cover;
    }
  }
  #other-card {
    width: 40vh;
    min-height: 80vh;
    margin-top: 2vh;
  }
}
</style>
