<template>
  <div>
    <el-form ref="form" class="form" :model="blog">
      <el-card>
        <el-form-item prop="blogTitle">
          <el-input type="text" v-model="blog.blogTitle" placeholder="标题">
            <template slot="prepend">
              <i class="el-icon-top" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="blogImg">
          <el-row>
            <el-col :span="10">
              <span>封面</span>
              <el-upload
                class="upload-demo"
                :on-change="fileChange"
                action=""
                :multiple="false"
                :show-file-list="false"
                drag
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-image
                :src="blog.blogImg"
                fit="cover"
                style="height: 300px; width: 100%"
              >
              </el-image>
            </el-col>
          </el-row>
        </el-form-item>
      </el-card>
      <v-md-editor
        :disabled-menus="[]"
        left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"
        v-model="blog.blogBody"
        :include-level="[1, 2, 3, 4, 5]"
        @upload-image="handleUploadImage"
        @copy-code-success="handleCopyCodeSuccess"
        style="height: 100vh"
      />
    </el-form>
    <div style="text-align: right">
      <el-button type="primary" @click="saveBlogTemp">暂存</el-button>
      <el-button type="primary" @click="saveBlog">发布</el-button>
    </div>
  </div>
</template>

<script>
import { saveBlog } from "@/assets/js/api/blog";
import axios from "axios";

export default {
  name: "Post",
  components: {},
  data() {
    return {
      blog: {
        blogTitle: "",
        blogBody:
          "# MyBlog\n" +
          "\n" +
          "### 介绍\n" +
          "\n" +
          "\n" +
          "\n" +
          "### 技术栈\n" +
          "\n" +
          "#### 后端：\n" +
          "\n" +
          "java基础\n" +
          "\n" +
          "框架：spring、springmvc、springboot、mybatis\n" +
          "\n" +
          "搜索引擎：elastic search\n" +
          "\n" +
          "缓存，鉴权：redis\n" +
          "\n" +
          "消息队列：rocketMQ\n" +
          "\n" +
          "文件系统：minio\n" +
          "\n" +
          "日志：logback\n" +
          "\n" +
          "分页：pageHelper\n" +
          "\n" +
          "接口文档: knif4j-swagger\n" +
          "\n" +
          "日志导出：easyExcel\n" +
          "\n" +
          "#### 前端：\n" +
          "\n" +
          "Vue 3、ElementUI、Vuex、VueCli4、axios\n" +
          "\n" +
          "#### 数据库:\n" +
          "\n" +
          "mysql、elastic search\n" +
          "\n" +
          "#### 部署：\n" +
          "\n" +
          "docker，nginx\n" +
          "\n" +
          "\n" +
          "\n" +
          "### 截图\n" +
          "\n",
        blogImg: null,
        userId: 1,
      },
    };
  },
  methods: {
    saveBlogTemp() {
      this.$notify.success("成功");
      this.blog.blogBody = "";
    },
    saveBlog() {
      saveBlog(this.blog)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.blog = {};
            this.$notify.success(res.data.msg);
            return;
          }
          this.$notify.warning(res.data.msg);
        })
        .catch((err) => {
          this.$notify.error(err.message);
        });
    },
    upload() {},
    fileChange(file) {
      this.blog.blogImg = file.url;
    },
    handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      const file = files[0];
      const desc = file.name;
      const form = new FormData();
      form.append("file", file);
      form.append("blogId", "10");
      console.log(file);
      axios
        .post("/api/file/file/blog", form)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200 || res.data.code === "200") {
            insertImage({
              url: res.data.data,
              desc: desc,
              // width: "auto",
              // height: "auto",
            });
          } else {
            this.$notify.error({
              title: "上传失败",
              message: res.data.msg,
            });
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: "上传失败",
            message: err.data.msg,
          });
          return false;
        });
    },
    handleCopyCodeSuccess(code) {
      this.$message.info(code);
    },
  },
};
</script>

<style lang="less" scoped></style>
