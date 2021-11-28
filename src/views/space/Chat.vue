<template>
  <div>
    <chat />
  </div>
</template>

<script>
import chat from "@/components/Chat/chat";

export default {
  name: "Chat",
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

<style scoped></style>
