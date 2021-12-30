<template>
  <div>
    <el-card>
      <div>
        <el-button
          type="success"
          style="float: right"
          icon="el-icon-refresh-right"
          @click="refresh"
        >
          刷新
        </el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        style="width: 100%; border-radius: 6px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="userImg" label="头像" width="120">
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
        <el-table-column prop="user" label="名称" width="250">
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
        <el-table-column prop="role" label="权限" width="150">
          <template slot-scope="scope">
            <label v-text="scope.row.role.roleName" />
          </template>
        </el-table-column>
        <el-table-column prop="loginTime" label="上次登录时间" width="200">
          <template slot-scope="scope">
            <label v-text="dateDiff(scope.row.loginTime)" />
          </template>
        </el-table-column>
        <el-table-column prop="loginIp" label="上次登录IP" width="200">
          <template slot-scope="scope">
            <label v-text="scope.row.loginIp" />
          </template>
        </el-table-column>
        <el-table-column prop="manage" label="管理" width="300">
          <template slot-scope="scope">
            <el-button
              type="success"
              @click="toZone(scope.row.userId)"
              icon="el-icon-search"
              round
              >详情
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="clickUpdateShow(scope.row.userId, scope.row.roleId)"
              round
              >修改
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
    <el-dialog
      style="text-align: center"
      v-if="updateShow"
      title="选择权限"
      :visible.sync="updateShow"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      append-to-body
    >
      <el-select v-model="updateForm.roleId" placeholder="请选择">
        <el-option
          v-for="role in options"
          :key="role.roleId"
          :label="role.roleName"
          :value="role.roleId"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateShow = false">取 消</el-button>
        <el-button type="primary" @click="updateRole"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserNormal } from "@/assets/js/api/userManage";
import { dateDiff } from "@/assets/js/util/time";
import { getRoleList } from "@/assets/js/api/role";
import { updateInfo } from "@/assets/js/api/user";
import { modal } from "@/assets/js/util/modal";

export default {
  name: "UpdateRole",
  mounted() {
    this.getUserNormal();
    this.getRoleList();
  },
  data() {
    return {
      //页码
      page: { pageNum: 1, total: 0 },
      //该用户的博客列表信息
      userList: [],
      //批量删除list
      userIdList: [],
      options: [],
      updateForm: {
        userId: null,
        roleId: null,
      },
      updateShow: false,
    };
  },
  methods: {
    getUserNormal() {
      getUserNormal(this.page.pageNum).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.userList = restMsg.data.list;
          this.page.total = restMsg.data.total;
        }
      });
    },
    getRoleList() {
      getRoleList().then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.options = restMsg.data;
        }
      });
    },
    updateRole() {
      updateInfo(this.updateForm).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          modal.notifySuccess(restMsg.msg);
          this.getUserNormal();
          this.updateShow = false;
        }
      });
    },
    //监听页码变化
    handlePageNumChange() {
      this.getUserNormal();
    },
    clickUpdateShow(userId, roleId) {
      this.updateForm.userId = userId;
      this.updateForm.roleId = roleId;
      this.updateShow = true;
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

<style lang="less" scoped>
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
