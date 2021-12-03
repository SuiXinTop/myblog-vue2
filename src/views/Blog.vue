<template>
  <div>
    <img class="background-img" src="../assets/images/1.jpg" alt />
    <TopBar />
    <div class="alignCenter" style="padding-top: 30px; margin-left: 120px">
      <div class="rowContain">
        <!--        中部栏-->
        <div class="alignCenter">
          <div class="contain">
            <!--            正文-->
            <div style="margin: 10px 20px 20px 20px">
              <el-skeleton type style="width: 100%" :loading="show" animated>
                <template #template>
                  <el-skeleton-item
                    variant="image"
                    style="width: 100%; height: 440px"
                  />
                </template>
              </el-skeleton>
              <img
                v-if="blog.image !== ''"
                style="
                  width: 100%;
                  object-fit: cover;
                  border-radius: 4px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4),
                    0 0 6px rgba(0, 0, 0, 0.4);
                "
                :src="blog.image"
                alt=""
              />
              <h1 style="text-align: center" v-text="blog.title" />
              <!--              作者信息-->
              <el-row :gutter="20">
                <el-col :span="2">
                  <div class="grid-content"></div>
                </el-col>
                <el-col :span="6" style="margin-top: 14px; font-size: 20px">
                  <div class="grid-content">
                    {{ blog.userTab.nickName }}
                  </div>
                </el-col>
                <el-col :span="8" :offset="8">
                  <div class="grid-content">
                    发布于<label
                      style="color: green"
                      v-text="blog.recordDate"
                    />
                  </div>
                </el-col>
              </el-row>
              <el-divider />
              <!--              内容-->
              <div v-text="blog.body" />
              <el-skeleton :rows="5" animated :loading="show" />
              <el-divider />
              <!--              标签-->
              <el-tag v-if="blog.tag !== ''" v-text="blog.tag" />
              <!--              情况-->
              <p>
                发布于 - <label style="color: green" v-text="blog.recordDate" />
              </p>

              <!--              底部组件-->
              <div style="text-align: center">
                <el-button disabled style="border: 0"
                  ><i class="el-icon-view" /> {{ blog.browserNum }}
                </el-button>
                <el-button style="border: 0"
                  ><i class="el-icon-circle-check" />{{ blog.likeNum }}
                </el-button>
                <el-button v-if="false" style="border: 0"
                  ><i class="el-icon-success" />{{ blog.likeNum }}
                </el-button>
                <el-button style="border: 0"
                  ><i class="el-icon-star-off" />{{ blog.collectNum }}
                </el-button>
                <el-button v-if="false" style="border: 0"
                  ><i class="el-icon-star-off" />{{ blog.collectNum }}
                </el-button>
                <el-button style="border: 0">
                  <i class="el-icon-share" />分享
                </el-button>
              </div>
              <h4 style="text-align: center">
                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                  本作品系原创，采用《署名-非商业性使用-禁止演绎 4.0
                  国际》许可协议
                </a>
              </h4>
            </div>
            <br />
          </div>
          <!--          评论-->
          <div class="contain" style="margin-bottom: 200px; padding: 10px">
            <div style="margin: 0 10px 0 10px">
              <p style="line-height: 10px">共{{ total }}条评论</p>
              <el-divider />
              <!--              评论框-->
              <span>评论框<i class="el-icon-s-comment" /></span>
              <VueEmoji
                class="comment-container"
                ref="emoji"
                @input="onInput"
                :value="myText"
                width="100vh"
              />
              <div style="text-align: right">
                <el-button
                  style="background: #12b212; color: white; margin: 10px 0 0 0"
                  >发布评论
                </el-button>
              </div>
              <el-divider />
              <!--            评论内容-->
              <div v-for="item in comment" :key="item.recordDelta">
                <div v-if="item !== ''">
                  <el-row :gutter="10">
                    <el-col :span="2">
                      <img
                        class="headImg"
                        :src="blog.userTab.images"
                        alt=""
                        style="
                          width: 50px;
                          height: 50px;
                          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68),
                            0 0 6px rgba(255, 255, 255, 0.6);
                        "
                      />
                    </el-col>
                    <el-col :span="4" style="margin-top: 14px">
                      <label
                        style="color: #12b212"
                        v-text="item.userTab.nickName"
                      />
                      <i class="el-icon-s-comment" style="color: skyblue" />
                    </el-col>
                    <el-col :span="8" :offset="10" style="margin-top: 14px">
                      <label> 发布于 {{ item.recordDate }}</label>
                    </el-col>
                  </el-row>
                  <div>
                    <h3
                      style="
                        border: 3px solid rgba(18, 178, 18, 0.79);
                        border-radius: 5px;
                        padding: 6px;
                      "
                      v-text="item.body"
                    />
                    <div style="text-align: right">
                      <el-button style="color: white; background: #12b212"
                        ><i class="el-icon-check"></i>点赞
                      </el-button>
                    </div>
                  </div>
                </div>
                <el-divider />
              </div>
              <!--            换页-->
              <div style="text-align: center; margin: 15px 0 15px 0">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10, 20, 50, 100]"
                  :page-size="pageSize"
                  layout=" prev, pager, next"
                  :total="total"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <!--        右边信息栏-->
        <div class="alignCenter" style="margin: 30px 0 30px 0">
          <!--          博主信息-->
          <div class="aside-content">
            <div class="rowContain" style="margin: 10px">
              <img
                class="headImg"
                :src="blog.userTab.images"
                alt=""
                style="
                  width: 80px;
                  height: 80px;
                  border: 6px solid rgba(125, 253, 125, 0.62);
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68),
                    0 0 6px rgba(255, 255, 255, 0.6);
                "
              />
              <div class="alignCenter" style="margin: 20px 10px 10px 20px">
                <label
                  style="font-size: 22px"
                  v-text="blog.userTab.nickName"
                ></label>
                <label
                  style="font-size: 16px"
                  v-text="blog.userTab.nickName"
                ></label>
              </div>
            </div>
            <br />
            <el-row :gutter="0" style="text-align: center">
              <el-col :span="12"
                >关注 {{ blog.userTab.attentionNumber }}
              </el-col>
              <el-col :span="12">粉丝 {{ blog.userTab.friendNumber }}</el-col>
            </el-row>
            <br />
            <el-button
              style="
                background: #12b212;
                color: white;
                font-size: 20px;
                width: 90%;
              "
            >
              关注博主
            </el-button>
          </div>
          <div class="aside-content">
            <div
              style="
                font-size: 20px;
                font-weight: bold;
                border-bottom: 1px solid;
                padding: 10px 0 10px 0;
              "
            >
              宣传栏
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- you can add element tooltip -->
    <back-to-top />
  </div>
</template>

<script>
import { MyBlog, comment } from "@/assets/js/var";
import TopBar from "@/components/Bar/bar";
import BackToTop from "@/components/BackToTop/backTop";
import { getBlogByBlogId, getCommentByBlogId } from "@/assets/js/api/blog";
import VueEmoji from "emoji-vue";

export default {
  name: "blog",
  components: {
    BackToTop,
    TopBar,
    VueEmoji,
  },
  mounted() {
    this.getBlog();
    this.getComment();
  },
  data() {
    return {
      show: true,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      blog: MyBlog,
      comment: comment,
    };
  },
  methods: {
    // 获取博客信息及其用户
    getBlog() {
      let params = { blogId: this.$route.params.blogId };
      getBlogByBlogId(params).then((res) => {
        this.blog = res.data;
        this.show = false;
      });
    },
    // 获取博客评论信息及其用户
    getComment() {
      let params = {
        blogId: this.$route.params.blogId,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      getCommentByBlogId(params).then((res) => {
        this.comment = res.data.list;
        this.total = res.data.total;
      });
    },
    // 处理当前页码变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getComment();
    },
    // 每页数量变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.getComment();
    },
  },
};
</script>

<style lang="less" scoped>
.alignCenter {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.rowContain {
  display: flex;
  flex-direction: row;
  text-align: center;
}

.asideIcon {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: white;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
  border: 4px solid rgba(125, 253, 125, 0.62);
}

.contain {
  text-align: left;
  width: 800px;
  background: white;
  border-radius: 8px;
  margin: 30px 15px 20px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
}

.aside-left {
  width: 100px;
  height: 400px;
  margin: 30px 15px 20px 15px;
}

.aside-content {
  width: 340px;
  height: 240px;
  border-radius: 8px;
  background: white;
  margin: 0 15px 30px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
}

.el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
