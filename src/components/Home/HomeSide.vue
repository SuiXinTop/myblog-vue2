<template>
  <div>
    <el-card
      :body-style="{ padding: '0px' }"
      class="tag-card"
      header="标签云"
      shadow="hover"
    >
      <div id="wordCloud" style="width: 100%; height: 30vh" />
    </el-card>
    <el-card
      :body-style="{ padding: '0px' }"
      class="announce-card"
      header="置顶公告"
      shadow="hover"
    >
      <div
        v-for="(announce, index) in announceList"
        :key="index"
        style="margin: 10px"
      >
        <div style="border-bottom: #2c3e50 1px dashed; padding-bottom: 5px">
          <el-button type="primary" circle> {{ index + 1 }}. </el-button>
          <label v-text="announce.amtTitle" />
          <el-button
            style="float: right"
            type="success"
            icon="el-icon-d-arrow-right"
            @click="toAnnounce(announce.amtId)"
            round
          />
        </div>
        <br />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getTopAnnounce } from "@/assets/js/api/announce";

let echarts = require("echarts/lib/echarts");
require("echarts-wordcloud");
import "echarts/theme/macarons.js";
import { getTagList } from "@/assets/js/api/tag";

export default {
  name: "HomeSide",
  mounted() {
    this.getTagList();
    this.getTopAnnounce();
  },
  data() {
    return {
      announceList: [],
    };
  },
  methods: {
    initWordCloud(list) {
      let wordCloud = echarts.init(document.getElementById("wordCloud"));
      let option = {
        title: {
          text: "",
          x: "center",
        },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            sizeRange: [14, 26],
            rotationRange: [0, 0],
            //随机生成字体颜色
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 256),
                      Math.round(Math.random() * 256),
                      Math.round(Math.random() * 256),
                    ].join(",") +
                    ")"
                  );
                },
              },
            },
            //位置相关设置
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "300%",
            height: "300%",
            //数据
            data: list,
          },
        ],
      };
      wordCloud.setOption(option);
      //点击事件
      wordCloud.on("click", (e) => {
        this.toTag(e.value);
      });
    },
    getTagList() {
      getTagList().then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          let list = [];
          for (let i = 0; i < restMsg.data.length; i++) {
            list.push({
              name: restMsg.data[i].tagName,
              value: restMsg.data[i].tagId,
            });
          }
          this.initWordCloud(list);
        }
      });
    },
    toTag(val) {
      this.$router.push({ path: "/tag", query: { tagId: val } });
    },
    toAnnounce(val) {
      this.$router.push({ path: "/announce", query: { amtId: val } });
    },
    getTopAnnounce() {
      getTopAnnounce().then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.announceList = restMsg.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tag-card {
  margin-bottom: 2vh;
  width: 50vh;
  height: 40vh;
  backdrop-filter: blur(3px);
  background: rgba(255, 255, 255, 0.7);
  border: none;
}
.announce-card {
  width: 50vh;
  min-height: 60vh;
  backdrop-filter: blur(3px);
  background: rgba(255, 255, 255, 0.7);
  border: none;
}
</style>
