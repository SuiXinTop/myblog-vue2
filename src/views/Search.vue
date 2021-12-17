<template>
  <div id="search">
    <top-bar />
    <!-- 搜索框 -->
    <section class="searchBox">
      <div class="inputBox">
        <input
          type="text"
          placeholder="Search"
          id="searchInput"
          v-model="queryString"
          @keyup.enter="search"
        />
        <el-button
          icon="el-icon-search"
          type="text"
          style="color: white"
          @click="search"
        />
      </div>
    </section>
    <div class="align-center">
      <el-card
        v-if="this.queryResultShow"
        :header="'共搜索到' + page.total + '结果'"
        style="width: 150vh; height: 150vh"
      >
      </el-card>
      <br />
      <el-card
        v-if="this.queryResultShow"
        style="width: 150vh; text-align: center"
      >
        <el-pagination
          layout="prev, pager, next"
          :current-page="page.pageNum"
          :page-size="15"
          :total="page.total"
        />
      </el-card>
      <div style="margin-bottom: 10vh" />
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/Bar/bar";

export default {
  name: "Search",
  components: { TopBar },
  data() {
    return {
      queryString: "", // 查询字符串
      queryResultShow: false,
      page: { pageNum: 1, total: 0 },
      blogList: [],
    };
  },
  methods: {
    search() {
      if (this.queryString === "") {
        return;
      }
      this.queryString = "";
      this.queryResultShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/flex";
/* 中间搜索框 */
.searchBox {
  width: 60vw;
  min-width: 400px;
  height: 30vh;
  margin: 10vh auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.inputBox {
  width: 80%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  padding: 0 15px;
  border-radius: 10px;
}

.inputBox > input {
  background: none;
  border: none;
  outline: none;
  padding: 0 10px 0 0;
  flex: 1;
  height: 44px;
  color: #242323;
  font-size: 16px;
}
</style>
