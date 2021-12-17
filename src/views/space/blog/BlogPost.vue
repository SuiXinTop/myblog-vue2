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
              <el-upload
                accept="image/jpeg,image/png,image/jpg"
                :before-upload="onBeforeUploadBlogImg"
                :http-request="UploadBlogImg"
                action="#"
                :multiple="false"
                :show-file-list="false"
                drag
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  <em>上传封面</em>，将文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <img
                v-if="blog.blogImg"
                :src="blog.blogImg"
                style="
                  height: 300px;
                  width: 100%;
                  object-fit: cover;
                  border-radius: 8px;
                "
                preview
                alt
              />
            </el-col>
          </el-row>
        </el-form-item>
        <v-md-editor
          :disabled-menus="[]"
          left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"
          v-model="blog.blogBody"
          :include-level="[1, 2, 3, 4, 5]"
          @upload-image="UploadBlogContent"
          @copy-code-success="handleCopyCodeSuccess"
          style="height: 100vh"
        />
        <div style="text-align: right">
          <el-button type="primary" @click="saveBlogTemp">暂存</el-button>
          <el-button type="primary" @click="saveBlog">发布</el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { saveBlog } from "@/assets/js/api/blog";
import { upload } from "@/assets/js/api/file";
import { getUserId } from "@/assets/js/util/localStore";

export default {
  name: "BlogPost",
  components: {},
  data() {
    return {
      blog: {
        blogTitle: "",
        blogBody: "",
        blogImg: null,
        userId: getUserId(),
      },
    };
  },
  methods: {
    saveBlogTemp() {
      this.$notify.success("成功");
      this.blog = { userId: getUserId() };
    },
    saveBlog() {
      saveBlog(this.blog)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.blog = { userId: getUserId() };
            this.$notify.success(res.data.msg);
            return;
          }
          this.$notify.warning(res.data.msg);
        })
        .catch((err) => {
          this.$notify.error(err.message);
        });
    },
    onBeforeUploadBlogImg(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt1M = file.size / 1024 / 1024 < 5;
      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 5MB!");
      }
      return isIMAGE && isLt1M;
    },
    UploadBlogImg(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("type", "chat");
      upload(formData)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.$notify.success(res.data.msg);
            this.blog.blogImg = res.data.data;
            return;
          }
          this.$notify.error(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error("上传失败");
        });
    },
    UploadBlogContent(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      const file = files[0];
      const form = new FormData();
      form.append("file", file);
      form.append("type", "blog");
      upload(form)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            insertImage({
              url: res.data.data,
              desc: file.name,
              width: "auto",
              height: "auto",
            });
            this.$notify.success(res.data.msg);
            return;
          }
          this.$notify.error(res.data.msg);
        })
        .catch((err) => {
          this.$notify.error(err.message);
        });
    },
    handleCopyCodeSuccess(code) {
      this.$notify.info(code);
    },
  },
};
</script>

<style lang="less" scoped></style>
