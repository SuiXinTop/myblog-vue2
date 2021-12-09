<template>
  <div>
    <div id="topBar">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-button id="logo" type="text" @click="toMain()">
            segmentFault
          </el-button>
        </el-col>
        <el-col :span="10">
          <el-button class="link" type="text" @click="toSearch">
            搜索
          </el-button>
          <el-divider direction="vertical" />
          <el-button class="link" type="text" @click="toAnnounce">
            公告
          </el-button>
          <el-divider direction="vertical" />
          <el-button class="link" type="text" @click="toAbout">
            关于
          </el-button>
        </el-col>
        <el-col :span="6" style="text-align: right">
          <div v-if="false">
            <el-button
              style="
                background: #13b213;
                color: white;
                width: 120px;
                height: 60px;
                font-size: 20px;
              "
            >
              注册登录
            </el-button>
          </div>
          <div v-if="true" style="margin: 10px auto">
            <avater :size="60" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import avater from "@/components/Avater/avater";
export default {
  name: "topBar",
  components: {
    avater,
  },
  data() {
    return {};
  },
  methods: {
    toMain() {
      this.$router.push("/");
    },
    toSearch() {
      this.$router.push("/search");
    },
    toAnnounce() {
      this.$router.push("/announce");
    },
    toAbout() {
      this.$router.push("/about");
    },
  },
};
</script>

<style lang="less" scoped>
#topBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  line-height: 80px;
  height: 80px;
  text-align: center;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 2px solid rgba(176, 241, 120, 0.63);
  box-shadow: 0 6px 4px rgba(0, 0, 0, 0.4), 0 0 6px rgba(255, 255, 255, 0.6);
}

#logo {
  font-size: 30px;
  font-weight: bold;
  color: #12b212;
}

#dialog {
  text-align: center;
}

.link {
  font-size: 24px;
  color: #646464;
}

.link :hover {
  color: #12b212;
}
</style>
