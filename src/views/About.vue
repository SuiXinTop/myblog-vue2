<template>
  <div class="align-center">
    <top-bar />
    <div style="margin: 80px" />
    <div style="border-radius: 8px" id="vs" />
  </div>
</template>
<script>
import TopBar from "@/components/Bar/bar";
import Player from "xgplayer/dist/simple_player";
import volume from "xgplayer/dist/controls/volume";
import playbackRate from "xgplayer/dist/controls/playbackRate";

export default {
  name: "about",
  components: { TopBar },
  mounted() {
    new Player({
      id: "vs",
      url: "https://music.163.com/song/media/outer/url?id=1369798757.mp3",
      // url: "http://118.31.15.127:9000/business/GTAV1080p.mp4",
      controlPlugins: [volume, playbackRate],
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
    });
  },
  data() {
    return {
      code: "https://www.baidu.com",
      taleList: [
        {
          date: "2020/04/25 21:19:07",
          text: { text: "起床不" },
          mine: false,
          name: "留恋人间不羡仙",
          img: "../image/one.jpeg",
        },
        {
          date: "2020/04/25 21:19:07",
          text: {
            text: "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>",
          },
          mine: false,
          name: "只盼流星不盼雨",
          img: "../image/two.jpeg",
        },
        {
          date: "2020/04/25 21:19:07",
          text: { text: "<img data-src='../image/three.jpeg'/>" },
          mine: false,
          name: "只盼流星不盼雨",
          img: "../image/two.jpeg",
        },
        {
          date: "2020/04/16 21:19:07",
          text: {
            text: "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />",
          },
          mine: true,
          name: "JwChat",
          img: "../image/three.jpeg",
        },
        {
          date: "2021/03/02 13:14:21",
          mine: false,
          name: "留恋人间不羡仙",
          img: "../image/one.jpeg",
          text: {
            system: {
              title: "在接入人工前，智能助手将为您首次应答。",
              subtitle: "猜您想问:",
              content: [
                {
                  id: `system1`,
                  text: "组件如何使用",
                },
                {
                  id: `system2`,
                  text: "组件参数在哪里查看",
                },
                {
                  id: "system",
                  text: "我可不可把组件用在商业",
                },
              ],
            },
          },
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@import "../assets/css/flex";

.comment-container {
  border: none;
}
</style>
