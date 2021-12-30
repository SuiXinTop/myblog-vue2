<template>
  <div>
    <div v-if="fansList.length === 0">
      <el-empty
        style="background: white; background-size: cover"
        :image-size="200"
      />
    </div>
    <div v-else>
      <el-card header="全部粉丝">
        <div v-for="(fans, index) in fansList" :key="index">
          <div
            style="display: flex; align-items: center"
            @click="toZone(fans.fansUser.userId)"
          >
            <el-image class="user-img" :src="fans.fansUser.userImg">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
            <div style="margin-left: 10px">
              <label v-text="fans.fansUser.userName" style="font-size: 34px" />
              <br />
              <label v-text="dateDiff(fans.attendTime)" />
            </div>
          </div>
          <br />
        </div>
      </el-card>
      <br />
      <el-card class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="page.pageNum"
          @current-change="handlePageNumChange"
          :page-size="10"
          :total="page.total"
        />
      </el-card>
    </div>
    <div style="margin-bottom: 10vh" />
    <back-top />
  </div>
</template>

<script>
import BackTop from "@/components/BackToTop/backTop";
import { getFansList } from "@/assets/js/api/friend";
import { dateDiff } from "@/assets/js/util/time";
export default {
  name: "ZoneFans",
  components: { BackTop },
  mounted() {
    this.getFansList();
  },
  data() {
    return {
      page: { pageNum: 1, total: 0 },
      fansList: [],
    };
  },
  methods: {
    getFansList() {
      getFansList(this.$route.query.userId, this.page.pageNum).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.fansList = restMsg.data.list;
          this.page.total = restMsg.data.total;
        }
      });
    },
    handlePageNumChange() {
      this.getCollectByUserId();
    },
    toZone(userId) {
      this.$router.push({ path: "/zone", query: { userId: userId } });
      location.reload();
    },
    dateDiff(val) {
      return dateDiff(val);
    },
  },
};
</script>

<style lang="less" scoped>
.user-img {
  width: 10vh;
  min-width: 60px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
}

.pagination {
  text-align: center;
  border-radius: 8px;
}
</style>
