<template>
  <el-card>
    <div>
      <el-date-picker
        v-model="startTime"
        type="datetime"
        placeholder="选择开始时间"
      />
      至
      <el-date-picker
        v-model="endTime"
        type="datetime"
        placeholder="选择结束时间"
      />
      <label style="margin-left: 10px" />
      <el-button type="success" icon="el-icon-refresh-right" @click="refresh">
        刷新
      </el-button>

      <el-radio-group style="float: right" v-model="status">
        <el-radio-button label="0">异常</el-radio-button>
        <el-radio-button label="1">正常</el-radio-button>
        <el-radio-button label="2">所有</el-radio-button>
      </el-radio-group>
    </div>
    <br />
    <el-table
      ref="multipleTable"
      :data="logList"
      tooltip-effect="dark"
      style="width: 100%; border-radius: 6px"
    >
      <el-table-column prop="logName" label="编号" width="80">
        <template slot-scope="scope">
          <el-tag effect="dark"> <label v-text="scope.row.logId" /> </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="logName" label="标题" width="150">
        <template slot-scope="scope">
          <label v-text="scope.row.logName" />
        </template>
      </el-table-column>
      <el-table-column prop="businessType" label="业务" width="100">
        <template slot-scope="scope">
          <label v-if="scope.row.businessType === 0">OTHER</label>
          <label v-if="scope.row.businessType === 1">INSERT</label>
          <label v-if="scope.row.businessType === 2">UPDATE</label>
          <label v-if="scope.row.businessType === 3">DELETE</label>
          <label v-if="scope.row.businessType === 4">GRANT</label>
          <label v-if="scope.row.businessType === 5">EXPORT</label>
          <label v-if="scope.row.businessType === 6">IMPORT</label>
          <label v-if="scope.row.businessType === 7">FORCE</label>
          <label v-if="scope.row.businessType === 8">CLEAN</label>
        </template>
      </el-table-column>
      <el-table-column prop="operType" label="操作人" width="100">
        <template slot-scope="scope">
          <label v-if="scope.row.operType === 1">管理员</label>
          <label v-if="scope.row.operType === 2">用户</label>
        </template>
      </el-table-column>
      <el-table-column prop="operIp" label="用户IP" width="120">
        <template slot-scope="scope">
          <label v-text="scope.row.operIp" />
        </template>
      </el-table-column>
      <el-table-column prop="methodName" label="方法名" width="220">
        <template slot-scope="scope">
          <label v-text="scope.row.methodName" />
        </template>
      </el-table-column>
      <el-table-column prop="operStatus" label="状态" width="80">
        <template slot-scope="scope">
          <label v-if="scope.row.operStatus === 0">
            <el-tag effect="dark">异常</el-tag>
          </label>
          <label v-if="scope.row.operStatus === 1">
            <el-tag effect="dark">正常</el-tag>
          </label>
        </template>
      </el-table-column>
      <el-table-column prop="errorMsg" label="错误信息" width="250">
        <template slot-scope="scope">
          <label v-text="scope.row.errorMsg" />
        </template>
      </el-table-column>
      <el-table-column prop="operTime" label="时间" width="120">
        <template slot-scope="scope">
          <label v-text="dateDiff(scope.row.operTime)" />
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
import { getLogList } from "@/assets/js/api/sysLog";
import { dateDiff } from "@/assets/js/util/time";

export default {
  name: "SystemLog",
  mounted() {
    this.getLogList();
  },
  watch: {
    status() {
      this.page.pageNum = 1;
      this.getLogList();
    },
  },
  data() {
    return {
      //页码
      page: { pageNum: 1, total: 0 },
      logList: [],
      status: 2,
      startTime: null,
      endTime: new Date(),
    };
  },
  methods: {
    getLogList() {
      getLogList(this.page.pageNum, this.status, this.start, this.end).then(
        (res) => {
          let restMsg = res.data;
          if (restMsg.code === 200) {
            this.logList = restMsg.data.list;
            this.page.total = restMsg.data.total;
          }
        }
      );
    },
    handlePageNumChange() {
      this.getLogList();
    },
    refresh() {
      this.page.pageNum = 1;
      this.getLogList();
    },
    //转换时间
    dateDiff(val) {
      return dateDiff(val);
    },
  },
};
</script>

<style lang="less" scoped></style>
