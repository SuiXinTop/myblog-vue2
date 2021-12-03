<template>
  <div>
    <v-md-editor
      :disabled-menus="[]"
      :value="content"
      :include-level="[1, 2, 3, 4, 5]"
      @upload-image="handleUploadImage"
      @copy-code-success="handleCopyCodeSuccess"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mdEditor",
  data() {
    return {
      content:
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
    };
  },
  methods: {
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

<style scoped></style>
