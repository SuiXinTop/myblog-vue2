<template>
  <div class="align-center">
    <top-bar />
    <el-card style="width: 140vh" header="公告">
      <el-timeline>
        <el-timeline-item
          v-for="(announcement, index) in announceTopList"
          :key="index"
          :timestamp="getFormatTime(announcement.amtTime)"
          placement="top"
        >
          <el-card shadow="hover">
            <p v-text="announcement.amtTitle" />
            <v-md-editor mode="preview" v-model="announcement.amtBody" />
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
    <br />
  </div>
</template>

<script>
import TopBar from "@/components/Bar/bar";
import { getTopAnnounce } from "@/assets/js/api/announce";
import { dateDiff } from "@/assets/js/util/time";
export default {
  name: "Announce",
  components: { TopBar },
  mounted() {
    this.getTopAnnounce();
  },
  data() {
    return {
      date: new Date(),
      announceList: [],
      announceTopList: [],
    };
  },
  methods: {
    getTopAnnounce() {
      getTopAnnounce().then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.announceTopList = restMsg.data;
        }
      });
    },
    //格式化时间
    getFormatTime(val) {
      return dateDiff(val);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/flex";

#announce-top-card {
  width: 120vh;
}
</style>
