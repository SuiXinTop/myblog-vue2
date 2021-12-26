<template>
  <el-card>
    <div>
      <el-popconfirm
        confirm-button-text="好的"
        cancel-button-text="不用了"
        icon="el-icon-edit"
        icon-color="blue"
        title="是否置顶？"
        @confirm="topAnnounce()"
      >
        <el-button type="primary" icon="el-icon-edit" slot="reference">
          置顶
        </el-button>
      </el-popconfirm>
      <label style="margin-left: 10px" />
      <el-popconfirm
        confirm-button-text="好的"
        cancel-button-text="不用了"
        icon="el-icon-info"
        icon-color="red"
        title="是否删除？"
        @confirm="deleteAnnounce()"
      >
        <el-button type="danger" icon="el-icon-delete" slot="reference">
          删除
        </el-button>
      </el-popconfirm>
      <label style="margin-left: 10px" />
      <el-button type="success" icon="el-icon-refresh-right" @click="refresh">
        刷新
      </el-button>
      <el-radio-group style="float: right" v-model="isAsc">
        <el-radio-button label="0">正序</el-radio-button>
        <el-radio-button label="1">倒序</el-radio-button>
      </el-radio-group>
    </div>
    <el-divider />
    <el-table
      ref="multipleTable"
      :data="announceList"
      tooltip-effect="dark"
      style="width: 100%; border-radius: 6px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="blogTitle" label="标题" width="500">
        <template slot-scope="scope">
          <label v-text="scope.row.amtTitle" />
        </template>
      </el-table-column>
      <el-table-column prop="blogTime" label="发布时间" width="250">
        <template slot-scope="scope">
          <label v-text="dateDiff(scope.row.amtTime)" />
        </template>
      </el-table-column>
      <el-table-column prop="top" label="置顶" width="250">
        <template slot-scope="scope">
          <label v-if="scope.row.amtTop === 1">是</label>
          <label v-if="scope.row.amtTop === 0">否</label>
        </template>
      </el-table-column>
      <el-table-column prop="top" label="管理" width="150">
        <template>
          <router-link to="/announce">
            <el-button type="success" icon="el-icon-search" round
              >详情
            </el-button>
          </router-link>
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
import {
  deleteAnnounce,
  getAnnounce,
  topAnnounce,
} from "@/assets/js/api/announce";
import { dateDiff } from "@/assets/js/util/time";
import { modal } from "@/assets/js/util/modal";

export default {
  name: "AnnounceEdit",
  mounted() {
    this.getAnnounce();
  },
  watch: {
    isAsc() {
      this.getAnnounce();
    },
  },
  data() {
    return {
      //页码
      page: { pageNum: 1, total: 0 },
      announceList: [],
      announceIdList: [],
      isAsc: 0,
    };
  },
  methods: {
    topAnnounce() {
      if (this.announceIdList.length === 0) {
        return;
      }
      topAnnounce(this.announceIdList).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          modal.notifySuccess(restMsg.msg);
          this.getAnnounce();
        }
      });
    },
    deleteAnnounce() {
      if (this.announceIdList.length === 0) {
        return;
      }
      deleteAnnounce(this.announceIdList).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          modal.notifySuccess(restMsg.msg);
          this.getAnnounce();
        }
      });
    },
    getAnnounce() {
      getAnnounce(this.page.pageNum, this.isAsc).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.announceList = restMsg.data.list;
          this.page.total = restMsg.data.total;
        }
      });
    },
    //监听页码变化
    handlePageNumChange() {
      this.getBlogList();
    },
    //监听表格多选变化
    handleSelectionChange(val) {
      this.announceIdList = [];
      for (let i = 0; i < val.length; i++) {
        this.announceIdList.push(val[i].amtId);
      }
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

<style scoped></style>
