<template>
  <div>
    <el-card class="tag-card" shadow="hover">
      <div id="wordCloud" style="width: 50vh; height: 50vh" />
    </el-card>
    <el-card class="tag-card" shadow="hover"> </el-card>
    <el-card class="tag-card" shadow="hover"> </el-card>
  </div>
</template>

<script>
import { modal } from "@/assets/js/util/modal";

let echarts = require("echarts/lib/echarts");
require("echarts-wordcloud");
import "echarts/theme/macarons.js";
import { getTagList } from "@/assets/js/api/tag";

export default {
  name: "HomeTag",
  mounted() {
    this.getTagList();
  },
  data() {
    return {};
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
      wordCloud.on("click", function (e) {
        modal.notifySuccess(e.name);
      });
    },
    getTagList() {
      getTagList()
        .then((res) => {
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
        })
        .catch();
    },
  },
};
</script>

<style lang="less" scoped>
.tag-card {
  text-align: left;
  width: 50vh;
  height: 50vh;
  backdrop-filter: blur(4px);
  background: rgba(250, 249, 249, 0.62);
  margin: 5px;
}
</style>
