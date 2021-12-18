<template>
  <div>
    <el-form ref="form" class="form" :model="blog">
      <el-card>
        <el-form-item prop="blogTitle">
          <el-input v-model.trim="blog.blogTitle" placeholder="标题">
            <template slot="prepend">
              <i class="el-icon-ice-tea" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="blogImg">
          <el-row>
            <el-col :span="10">
              <el-upload
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
        <br />
        <div style="text-align: right">
          <el-button
            type="primary"
            icon="el-icon-edit"
            style="width: 140px; height: 50px; font-size: 26px"
            @click="saveBlog"
            round
          >
            发布
          </el-button>
        </div>
      </el-card>
    </el-form>
    <el-dialog
      style="text-align: center"
      title="添加标签，请谨慎选择"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      append-to-body
    >
      <el-select
        v-model="tagIdList"
        multiple
        filterable
        value-key="key"
        collapse-tags
        :multiple-limit="5"
        default-first-option
        placeholder="请选择文章标签"
      >
        <el-option
          v-for="item in options"
          :key="item.tagId"
          :label="item.tagName"
          :value="item.tagId"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTags"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addBlogTag, saveBlog } from "@/assets/js/api/blog";
import { upload } from "@/assets/js/api/file";
import { getUserId } from "@/assets/js/util/localStore";
import { getTagList } from "@/assets/js/api/tag";
import { modal } from "@/assets/js/util/modal";

export default {
  name: "BlogPost",
  watch: {
    tagList() {
      console.log(this.tagList);
    },
  },
  data() {
    return {
      dialogVisible: false,
      blog: {
        blogTitle: "",
        blogBody: "",
        blogImg: null,
        userId: getUserId(),
      },
      blogId: null,
      tagIdList: [],
      options: [],
    };
  },
  methods: {
    saveBlog() {
      saveBlog(this.blog).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.blog = { userId: getUserId() };
          this.blogId = restMsg.data;
          modal.notifySuccess(restMsg.msg);
          this.dialogVisible = true;
          this.getTagList();
          return;
        }
        modal.notifyWarning(restMsg.msg);
      });
    },
    addTags() {
      addBlogTag(this.tagIdList, this.blogId).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          modal.notifySuccess("添加成功");
          this.dialogVisible = false;
          return;
        }
        modal.notifyWarning(restMsg.msg);
      });
    },
    getTagList() {
      getTagList(1).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.options = restMsg.data;
        }
      });
    },
    onBeforeUploadBlogImg(file) {
      const isIMAGE =
        file.type === "image/jpeg" || "image/jpg" || "image/png|| image/bmp";
      const isLt1M = file.size / 1024 / 1024 < 5;
      if (!isIMAGE) {
        modal.notifyError("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        modal.notifyError("上传文件大小不能超过 5MB!");
      }
      return isIMAGE && isLt1M;
    },
    UploadBlogImg(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("type", "chat");
      upload(formData).then((res) => {
        if (res.data.code === 200) {
          modal.notifySuccess(res.data.msg);
          this.blog.blogImg = res.data.data;
          return;
        }
        modal.notifyError(res.data.msg);
      });
    },
    UploadBlogContent(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      const file = files[0];
      const form = new FormData();
      form.append("file", file);
      form.append("type", "blog");
      upload(form).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          insertImage({
            url: res.data.data,
            desc: file.name,
            width: "auto",
            height: "auto",
          });
          modal.notifySuccess(res.data.msg);
          return;
        }
        modal.notifyError(res.data.msg);
      });
    },
    handleCopyCodeSuccess(code) {
      modal.notifySuccess(code);
    },
  },
};
</script>

<style lang="less" scoped></style>
