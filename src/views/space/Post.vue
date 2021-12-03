<template>
  <div>
    <el-card>
      <span>标题</span>
      <el-input />
      <span>标签</span>
      <el-input />
      <span>发布实间</span>
      <br />
      <el-time-select />
    </el-card>
    <br />
    <md-editor />
    <br />
    <div style="text-align: right">
      <el-button type="primary">暂存</el-button>
      <el-button type="primary">发布</el-button>
    </div>
  </div>
</template>

<script>
import mdEditor from "@/components/MdEditor/mdEditor";

export default {
  name: "Post",
  components: {
    mdEditor,
  },
};
</script>

<style lang="less" scoped></style>
