<template>
  <div class="about">
    <chat></chat>
  </div>
</template>
<script>
import chat from "@/components/Chat/chat";

export default {
  name: "about",
  components: {
    chat,
  },
  data() {
    return {
      router: this.$store.getters["router/getRouter"],
    };
  },
};
</script>
