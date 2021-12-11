<template>
  <div class="about">
    <top-bar />
    关于
  </div>
</template>
<script>
import TopBar from "@/components/Bar/bar";
export default {
  name: "about",
  components: { TopBar },
  mounted() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
#about {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comment-container {
  border: 0;
}
</style>
