<template>
  <div>
    <el-form ref="form" class="form" :model="announce">
      <el-card>
        <el-form-item>
          <el-input v-model.trim="announce.amtTitle" placeholder="标题">
            <template slot="prepend">
              <i class="el-icon-ice-tea" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <label style="font-weight: bolder">类型：</label>
          <el-radio-group v-model="announce.amtTop">
            <el-radio-button label="0">普通</el-radio-button>
            <el-radio-button label="1">置顶</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <v-md-editor
          :disabled-menus="[]"
          left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"
          v-model="announce.amtBody"
          :include-level="[1, 2, 3, 4, 5]"
          @upload-image="UploadBlogContent"
          @copy-code-success="handleCopyCodeSuccess"
          style="height: 100vh"
        />
        <br />
        <el-button
          type="primary"
          style="width: 120px; height: 40px; font-size: 20px; float: right"
          @click="saveAnnounce"
        >
          发布
        </el-button>
        <br />
        <br />
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { upload } from "@/assets/js/api/file";
import { modal } from "@/assets/js/util/modal";
import { saveAnnounce } from "@/assets/js/api/announce";
import { hideLoading, showLoading } from "@/axios/loading";

export default {
  name: "AnnouncePost",
  data() {
    return {
      announce: {
        amtTitle: "",
        amtBody: "",
        amtTop: 0,
      },
    };
  },
  methods: {
    saveAnnounce() {
      showLoading();
      saveAnnounce(this.announce)
        .then((res) => {
          let restMsg = res.data;
          if (restMsg.code === 200) {
            this.announce = { amtTitle: "", amtBody: "", top: 0 };
            modal.notifySuccess(restMsg.msg);
          }
          hideLoading();
        })
        .catch(() => {
          hideLoading();
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
    handleCopyCodeSuccess() {
      modal.notifySuccess("复制成功");
    },
  },
};
</script>

<style lang="less" scoped></style>
