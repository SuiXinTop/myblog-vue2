<template>
  <div id="app">
    <transition
      appear
      enter-active-class="animate__animated animate__fadeIn animate__fast"
      leave-active-class="animate__animated animate__fadeOut animate__fast"
    >
      <router-view />
    </transition>
  </div>
</template>

<style lang="less">
.background-img {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999;
  filter: blur(5px);
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

a {
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
  font-family: "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: fit-content;
}

/* 滚动条 */
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 2px;
}

*::-webkit-scrollbar-thumb {
  background: rgba(206, 210, 218, 0.5);
  border-radius: 8px;
}

*::-webkit-scrollbar-thumb:hover {
  background: rgba(50, 50, 73, 0.58);
}

*::-webkit-scrollbar-corner {
  background: #fff;
}
</style>
