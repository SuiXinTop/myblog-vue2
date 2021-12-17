<template>
  <div>
    <TopBar />
    <div class="align-center">
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
              <el-tag v-for="(blogTag, index) in blog.blogTagList" :key="index">
                {{ blogTag.tag.tagName }}
              </el-tag>
              <div>
                <label v-text="getFormatTime(blog.blogTime)" />
                <el-divider direction="vertical" />
                <el-tooltip placement="top" effect="light" content="浏览量">
                  <el-button type="text" style="color: #2c3e50">
                    <i class="el-icon-view">{{ blog.blogView }}</i>
                  </el-button>
                </el-tooltip>
                <el-tooltip placement="top" effect="light" content="点赞">
                  <el-button type="text" @click="like" v-show="hasLike">
                    <i class="el-icon-star-on">{{ blog.blogLike }} </i>
                  </el-button>
                </el-tooltip>
                <el-tooltip placement="top" effect="light" content="收藏">
                  <el-button type="text" @click="collect" v-show="hasCollect">
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
                <div>
                  <label v-text="getFormatTime(value.comTime)" />
                  <br />
                  <label
                    style="font-size: 20px"
                    v-text="value.owner.userName"
                  />
                </div>
              </div>
              <div class="comment-body" v-html="value.comBody" />
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
                <el-button type="primary" style="width: 15vh">
                  <i class="el-icon-plus" />关注
                </el-button>
                <el-button type="primary" style="width: 15vh">
                  <i class="el-icon-message" />私信
                </el-button>
              </div>
            </div>
          </el-card>
          <el-card id="other-card" header="最近博客"> </el-card>
          <el-card id="tag-card" header="相关标签"> </el-card>
        </div>
      </div>
    </div>
    <div style="padding: 10vh" />
    <back-to-top />
  </div>
</template>

<script>
import VueQrcode from "@xkeshi/vue-qrcode";
import TopBar from "@/components/Bar/bar";
import BackToTop from "@/components/BackToTop/backTop";
import { getBlog } from "@/assets/js/api/blog";
import { getCommentList, saveComment } from "@/assets/js/api/comment";
import { dateDiff } from "@/assets/js/util/time";
import HtmlEdit from "@/components/HtmlEdit/HtmlEdit";
import { getUserId } from "@/assets/js/util/localStore";
import { CommentOption } from "@/assets/js/util/var";
import { modal } from "@/assets/js/util/modal";

export default {
  name: "blog",
  components: {
    HtmlEdit,
    BackToTop,
    TopBar,
    VueQrcode,
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
      page: { total: 0, pageNum: 1 },
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
      this.hasLike = !this.hasLike;
    },
    collect() {
      this.hasCollect = !this.hasCollect;
    },
    //发布评论
    saveComment() {
      saveComment(this.comment).then((res) => {
        if (res.data.code === 200) {
          modal.notifySuccess(res.data.msg);
          this.$refs.htmlEdit.value = "";
          this.getCommentList();
          return;
        }
        modal.notifyError(res.data.msg);
      });
    },
    // 获取博客信息及其用户
    getBlog() {
      getBlog(this.$route.query.blogId).then((res) => {
        if (res.data.code === 200) {
          this.blog = res.data.data;
          return;
        }
        modal.notifyError(res.data.msg);
      });
    },
    getCommentList() {
      getCommentList(this.$route.query.blogId, this.page.pageNum).then(
        (res) => {
          if (res.data.code === 200) {
            this.commentList = res.data.data.list;
            this.page.total = res.data.data.total;
          }
        }
      );
    },
    handlePageNumChange() {
      this.getCommentList();
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

.row-contain {
  display: flex;
  flex-direction: row;
}

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
    height: 80vh;
    margin-top: 2vh;
  }
  #tag-card {
    width: 40vh;
    height: 80vh;
    margin-top: 2vh;
  }
}
</style>
