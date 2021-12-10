<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <el-avatar id="user-img" shape="square" fit="cover" :src="userImg" />
    <el-divider />
    <el-upload
      :show-file-list="false"
      :auto-upload="false"
      :on-change="changeUpload"
      action="#"
      :multiple="false"
      drag
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div style="width: 100%; height: 50vh; text-align: center">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
        />
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadUserImg } from "@/assets/js/api/file";
import { getUserId, getUserImg, setUserImg } from "@/assets/js/util/localStore";
import { modal } from "@/assets/js/util/modal";

export default {
  name: "UserImg",
  data() {
    return {
      userImg: getUserImg(),
      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 300, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [5, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
    };
  },
  methods: {
    // 上传按钮   限制图片大小
    changeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        modal.notifyError("上传文件大小不能超过 5MB!");
        return;
      }
      this.option.img = URL.createObjectURL(file.raw);
      this.dialogVisible = true;
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        const formData = new FormData();
        formData.append("file", data);
        formData.append("userId", getUserId());
        uploadUserImg(formData)
          .then((res) => {
            let restMsg = res.data;
            if (restMsg.code === 200) {
              modal.notifySuccess(restMsg.msg);
              setUserImg(restMsg.data);
              this.userImg = getUserImg();
              this.dialogVisible = false;
              return;
            }
            modal.notifyError(restMsg.msg);
            this.dialogVisible = false;
          })
          .catch((err) => {
            console.log(err);
            modal.notifyError("上传失败");
            this.dialogVisible = false;
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
#user-img {
  width: 30vh;
  height: 30vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
}
</style>
