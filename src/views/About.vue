<template>
  <div class="align-center">
    <top-bar />
    <el-card style="width: 120vh">
      <!--music：当前播放的音乐。 list：播放列表 ：showlrc：是否显示歌词-->
      <aplayer :music="audio[0]" :list="audio" :showlrc="true"></aplayer>
      <el-calendar v-model="date" />
    </el-card>
    <div
      style="
        min-height: 300px;
        margin-top: 200px;
        background: #ffffff;
        width: 100%;
      "
      id="vs"
    >
      sdasd
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/Bar/bar";
import aplayer from "vue-aplayer";
// import Player from "xgplayer/dist/simple_player";
// import volume from "xgplayer/dist/controls/volume";
// import playbackRate from "xgplayer/dist/controls/playbackRate";

export default {
  name: "about",
  components: { TopBar, aplayer },
  mounted() {
    // new Player({
    //   id: "vs",
    //   // url: "https://music.163.com/song/media/outer/url?id=1369798757.mp3",
    //   url: "https://www.bilibili.com/video/BV1U3411t7Xo?t=1.7",
    //   controlPlugins: [volume, playbackRate],
    //   playbackRate: [0.5, 0.75, 1, 1.5, 2],
    // });
  },
  data() {
    return {
      audio: [
        {
          title: "天空之城",
          artist: "黄叶",
          url: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E5%A4%A9%E7%A9%BA%E4%B9%8B%E5%9F%8E.m4a",
          pic: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720200713203148.jpg",
          lrc: "[00:00.00] (,,•́ . •̀,,) 刚刚开始学钢琴弹的hhhh",
        },
        {
          title: "蒲空英的约定",
          artist: "黄叶",
          url: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A.m4a",
          pic: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720200713203148.jpg",
          lrc: "[00:00.00] (,,•́ . •̀,,) 刚刚开始学钢琴弹的hhhh",
        },
        {
          title: "无畏",
          artist: "马頔",
          url: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E9%A9%AC%E9%A0%94%20-%20%E6%97%A0%E7%95%8F.flac",
          pic: 'https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E4%BB%A5%E5%AE%B6%E4%B9%8B%E5%90%8D.jpg', // prettier-ignore
          lrc: "[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词",
        },
        {
          title: "蓝乐",
          artist: "白纸",
          url: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/%E8%93%9D%E4%B9%90%20-%20%E7%99%BD%E7%BA%B8.flac",
          pic: "https://edu-guil-1010.oss-cn-beijing.aliyuncs.com/-1992181439.jpg",
          lrc: "[00:00.00] (,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词",
        },
      ],
      date: new Date(),
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
