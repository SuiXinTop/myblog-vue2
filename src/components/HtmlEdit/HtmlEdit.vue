<template>
  <div>
    <quill-editor ref="QuillEditor" :options="editorOption" v-model="value" />
    <el-upload
      action="#"
      style="display: none"
      accept="image/jpeg,image/png,image/jpg"
      :before-upload="onBeforeUpload"
      :http-request="Upload"
    >
      <el-button id="upload-img" size="small" type="primary"
        >点击上传
      </el-button>
    </el-upload>
  </div>
</template>

<script>
import { upload } from "@/assets/js/api/file";
import { Quill } from "vue-quill-editor";

var Link = Quill.import("formats/link");
class FileBlot extends Link {
  // 继承Link Blot
  static create(value) {
    let node = undefined;
    if (value && !value.href) {
      // 适应原本的Link Blot
      node = super.create(value);
    } else {
      // 自定义Link Blot
      node = super.create(value.href);
      // node.setAttribute("download", value.innerText); // 左键点击即下载
      node.innerText = value.innerText;
      node.download = value.innerText;
    }
    return node;
  }
}
FileBlot.blotName = "link";
FileBlot.tagName = "A";
Quill.register(FileBlot);

const editorOption = {
  theme: "snow",
  placeholder: "请在这里输入",
  modules: {
    toolbar: {
      container: [["link", "image", "file"]],
      handlers: {
        image: function (value) {
          if (value) {
            document.getElementById("upload-img").click();
          } else {
            this.quill.format("image", false);
          }
        },
        file: function (value) {
          if (value) {
            document.getElementById("upload-img").click();
          } else {
            this.quill.format("image", false);
          }
        },
      },
    },
  },
};
export default {
  name: "HtmlEdit",
  watch: {
    value: function (value) {
      this.$emit("input", value);
    },
  },
  mounted() {
    //自定义按钮内容初始化
    this.initFile();
  },
  data() {
    return {
      editorOption,
      value: "",
    };
  },
  methods: {
    initFile() {
      const sourceEditorButton = document.querySelector(".ql-file");
      sourceEditorButton.innerHTML =
        '<i class="el-icon-files" style="font-size: 18px;color: black"></i>';
    },
    onBeforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 5;
      if (!isLt1M) {
        this.$notify.error("上传文件大小不能超过 5MB!");
      }
      return isLt1M;
    },
    Upload(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("type", "chat");
      upload(formData)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.$notify.success(res.data.msg);
            this.handleSuccess(res.data.data, param.file);
            return;
          }
          this.$notify.error(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
          this.$notify.error("上传失败");
        });
    },
    handleSuccess(url, file) {
      let quill = this.$refs.QuillEditor.quill;
      let length = quill.getSelection().index;
      if (/^image/.test(file.type)) {
        // image直接插入image标签显示
        quill.insertEmbed(length, "image", url);
      } else {
        // file则显示名为filename的A标签
        quill.insertEmbed(length, "link", { href: url, innerText: file.name });
      }
      quill.setSelection(length + file.name.length);
    },
  },
};
</script>

<style lang="less">
//渲染输入框图片大小
.quill-editor img {
  width: 50vh;
  height: auto;
  object-fit: cover;
}
</style>
