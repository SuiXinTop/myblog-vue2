<template>
  <div>
    <markdown />
  </div>
</template>

<script>
import markdown from "@/components/MdEditor";

export default {
  name: "Post",
  components: {
    markdown,
  },
};
</script>

<style lang="less" scoped></style>
