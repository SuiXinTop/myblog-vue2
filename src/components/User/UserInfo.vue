<template>
  <div style="min-height: 70vh">
    <div style="text-align: center">
      <el-image
        class="user-img"
        :src="user.userImg"
        :preview-src-list="[user.userImg]"
        lazy
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline" />
        </div>
      </el-image>
    </div>
    <div>
      <el-button
        type="primary"
        style="float: right"
        icon="el-icon-edit"
        @click="updateState = !updateState"
      >
        修改
      </el-button>
      <br />
      <el-descriptions title="用户信息" :column="3" border>
        <el-descriptions-item label="用户名">
          <label v-text="user.userName" v-if="!updateState" />
          <el-input v-model="user.userName" v-if="updateState" />
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          {{ user.userEmail }}
        </el-descriptions-item>
        <el-descriptions-item label="居住地">
          <label v-text="user.userAddress" v-if="!updateState" />
          <el-input v-model="user.userAddress" v-if="updateState" />
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          <label v-if="!updateState">
            <label v-if="user.userSex == 0">女</label>
            <label v-if="user.userSex == 1">男</label>
          </label>
          <div v-if="updateState">
            <el-radio v-model="user.userSex" label="0" border>女</el-radio>
            <el-radio v-model="user.userSex" label="1" border>男</el-radio>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="注册时间">
          {{ dateDiff(user.registerTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="权限">
          {{ user.role.roleName }}
        </el-descriptions-item>
        <el-descriptions-item label="上次登录时间">
          {{ dateDiff(user.loginTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="上次登录IP">
          {{ user.loginIp }}
        </el-descriptions-item>
      </el-descriptions>
      <br />
      <div style="float: right" v-if="updateState">
        <el-button type="primary" icon="el-icon-edit" @click="updateUserInfo">
          确认修改
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="updateState = false"
        >
          取消
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserByUserId, updateInfo } from "@/assets/js/api/user";
import { getUserId } from "@/assets/js/util/localStore";
import { dateDiff } from "@/assets/js/util/time";
import { modal } from "@/assets/js/util/modal";

export default {
  name: "UserInfo",
  mounted() {
    this.getUserByUserId();
  },
  data() {
    return {
      updateState: false,
      user: {},
    };
  },
  methods: {
    getUserByUserId() {
      getUserByUserId(getUserId()).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.user = restMsg.data;
        }
      });
    },
    updateUserInfo() {
      let form = {
        userId: this.user.userId,
        userName: this.user.userName,
        userSex: this.user.userSex,
        userAddress: this.user.userAddress,
      };
      updateInfo(form).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          modal.notifySuccess(restMsg.msg);
          this.updateState = false;
        }
      });
    },
    dateDiff(val) {
      return dateDiff(val);
    },
  },
};
</script>

<style lang="less" scoped>
.user-img {
  width: 20vh;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.68), 0 0 6px rgba(255, 255, 255, 0.6);
}
</style>
