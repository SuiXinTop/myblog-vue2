<template>
  <div id="app">
    <img class="background-img" src="@/assets/images/1.jpg" alt />
    <back-top />
    <transition
      appear
      enter-active-class="animate__animated animate__fadeIn animate__slow"
    >
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive" />
      </keep-alive>
    </transition>

    <transition
      appear
      enter-active-class="animate__animated animate__fadeIn animate__slow"
    >
      <router-view v-if="!this.$route.meta.keepAlive" />
    </transition>
  </div>
</template>

<style lang="less">
@import "assets/css/scrollbar";

.background-img {
  top: 0;
  left: 0;
  position: fixed;
  z-index: -999;
  filter: blur(1px);
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

a {
  text-decoration: none;
}
.router-link {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}

.headImg {
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
}

#app {
  color: #2c3e50;
  font-family: "微软雅黑 Light", "JetBrains Mono", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: fit-content;
}
</style>
<script>
import BackTop from "@/components/BackToTop/backTop";
export default {
  components: { BackTop },
};
</script>
