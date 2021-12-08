const state = {
  blog: {
    blogTitle: "",
    blogBody:
      "# MyBlog\n" +
      "\n" +
      "### 介绍\n" +
      "\n" +
      "\n" +
      "\n" +
      "### 技术栈\n" +
      "\n" +
      "#### 后端：\n" +
      "\n" +
      "java基础\n" +
      "\n" +
      "框架：spring、springmvc、springboot、mybatis\n" +
      "\n" +
      "搜索引擎：elastic search\n" +
      "\n" +
      "缓存，鉴权：redis\n" +
      "\n" +
      "消息队列：rocketMQ\n" +
      "\n" +
      "文件系统：minio\n" +
      "\n" +
      "日志：logback\n" +
      "\n" +
      "分页：pageHelper\n" +
      "\n" +
      "接口文档: knif4j-swagger\n" +
      "\n" +
      "日志导出：easyExcel\n" +
      "\n" +
      "#### 前端：\n" +
      "\n" +
      "Vue 3、ElementUI、Vuex、VueCli4、axios\n" +
      "\n" +
      "#### 数据库:\n" +
      "\n" +
      "mysql、elastic search\n" +
      "\n" +
      "#### 部署：\n" +
      "\n" +
      "docker，nginx\n" +
      "\n" +
      "\n" +
      "\n" +
      "### 截图\n" +
      "\n",
    blogImg: "",
  },
};
const getters = {
  getBlog: (state) => {
    return state.blog;
  },
};
const mutations = {};
const actions = {};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
