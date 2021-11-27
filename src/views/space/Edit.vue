<template>
  <div>
    <img class="background-img" src="../../assets/images/1.jpg" alt />
    <markdown />
  </div>
</template>

<script>
import markdown from "@/components/MdEditor";

export default {
  name: "Edit",
  components: {
    markdown,
  },
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
