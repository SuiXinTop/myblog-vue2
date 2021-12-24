<template>
  <el-card>
    <div>
      <el-popconfirm
        confirm-button-text="好的"
        cancel-button-text="不用了"
        icon="el-icon-info"
        icon-color="red"
        title="是否批量封禁？"
        @confirm="banUser()"
      >
        <el-button type="danger" icon="el-icon-delete" slot="reference" round>
          封禁
        </el-button>
      </el-popconfirm>
      <el-button
        type="success"
        style="float: right"
        icon="el-icon-refresh-right"
        @click="refresh"
      >
        刷新
      </el-button>
    </div>
    <el-divider />
    <el-table
      ref="multipleTable"
      :data="userList"
      tooltip-effect="dark"
      style="width: 100%; border-radius: 6px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="userImg" label="头像" width="100">
        <template slot-scope="scope">
          <el-image
            class="blog-img"
            :src="scope.row.userImg"
            :preview-src-list="[scope.row.userImg]"
            fit="cover"
            alt
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="user" label="名称" width="300">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-user"
            @click="toZone(scope.row.userId)"
          >
            {{ scope.row.userName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="loginTime" label="上次登录时间" width="250">
        <template slot-scope="scope">
          <label v-text="dateDiff(scope.row.loginTime)" />
        </template>
      </el-table-column>
      <el-table-column prop="loginIp" label="上次登录IP" width="250">
        <template slot-scope="scope">
          <label v-text="scope.row.loginIp" />
        </template>
      </el-table-column>
      <el-table-column prop="manage" label="管理" width="250">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="toZone(scope.row.userId)"
            icon="el-icon-search"
            round
            >详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <div style="text-align: center">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="page.pageNum"
        @current-change="handlePageNumChange"
        :page-size="10"
        :total="page.total"
      />
    </div>
  </el-card>
</template>

<script>
import { modal } from "@/assets/js/util/modal";
import { dateDiff } from "@/assets/js/util/time";
import { banUser, getUserNormal } from "@/assets/js/api/userManage";

export default {
  name: "BanUser",
  mounted() {
    this.getUserNormal();
  },
  data() {
    return {
      //页码
      page: { pageNum: 1, total: 0 },
      //该用户的博客列表信息
      userList: [],
      //批量删除list
      userIdList: [],
    };
  },
  methods: {
    //获取该用户的粉丝列表
    getUserNormal() {
      getUserNormal(this.page.pageNum).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.userList = restMsg.data.list;
          this.page.total = restMsg.data.total;
        }
      });
    },
    //监听页码变化
    handlePageNumChange() {
      this.getUserNormal();
    },
    //批量删除粉丝
    banUser() {
      //id未选择不发送请求
      if (this.userIdList.length === 0) {
        return;
      }
      banUser(this.userIdList).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          modal.notifySuccess(restMsg.msg);
          this.getUserNormal();
        }
      });
    },
    //监听表格多选变化
    handleSelectionChange(val) {
      this.userIdList = [];
      for (let i = 0; i < val.length; i++) {
        this.userIdList.push(val[i].userId);
      }
    },
    toZone(userId) {
      this.$router.push({ path: "/zone", query: { userId: userId } });
    },
    refresh() {
      location.reload();
    },
    //转换时间
    dateDiff(val) {
      return dateDiff(val);
    },
  },
};
</script>

<style scoped>
.blog-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.blog-img :hover {
  transition: all 1s ease-out;
  transform: scale(1.5);
}
</style>
