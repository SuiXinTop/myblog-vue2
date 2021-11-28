<template>
  <div>
    <img class="background-img" src="../../assets/images/1.jpg" alt />
    <md-editor />
  </div>
</template>

<script>
import mdEditor from "@/components/MdEditor/mdEditor";

export default {
  name: "Edit",
  components: {
    mdEditor,
  },
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
