<template>
  <div>
    <el-input type="text" v-model="blog.blogTitle" placeholder="标题" />
    <v-md-editor
      :disabled-menus="[]"
      left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"
      v-model="blog.blogBody"
      :include-level="[1, 2, 3, 4, 5]"
      style="height: 100vh"
    />
    <el-button type="primary" @click="updateBlog">修改</el-button>
  </div>
</template>

<script>
import { getBlog, updateBlog } from "@/assets/js/api/blog";

export default {
  name: "BlogUpdate",
  props: ["blogId"],
  mounted() {
    this.getBlog();
  },
  data() {
    return {
      blog: {},
    };
  },
  methods: {
    getBlog() {
      getBlog(this.blogId)
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
    updateBlog() {
      updateBlog(this.blog)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.$notify.success(res.data.msg);
            return;
          }
          this.$notify.error(res.data.msg);
        })
        .catch((err) => {
          this.$notify.error(err.message);
        });
    },
  },
};
</script>

<style scoped></style>
