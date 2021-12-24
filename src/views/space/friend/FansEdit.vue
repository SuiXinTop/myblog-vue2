<template>
  <el-card>
    <div>
      <el-popconfirm
        confirm-button-text="好的"
        cancel-button-text="不用了"
        icon="el-icon-info"
        icon-color="red"
        title="是否批量删除粉丝？"
        @confirm="deleteFansList()"
      >
        <el-button type="danger" icon="el-icon-delete" slot="reference" round>
          删除
        </el-button>
      </el-popconfirm>
    </div>
    <el-divider />
    <el-table
      ref="multipleTable"
      :data="fansList"
      tooltip-effect="dark"
      style="width: 100%; border-radius: 6px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="blogImg" label="头像" width="100">
        <template slot-scope="scope">
          <el-image
            class="blog-img"
            :src="scope.row.fansUser.userImg"
            :preview-src-list="[scope.row.fansUser.userImg]"
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
            @click="toZone(scope.row.fansUser.userId)"
          >
            {{ scope.row.fansUser.userName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="attendTime" label="关注时间" width="250">
        <template slot-scope="scope">
          <label v-text="dateDiff(scope.row.attendTime)" />
        </template>
      </el-table-column>
      <el-table-column prop="manage" label="管理" width="250">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="toZone(scope.row.fansUser.userId)"
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
import { getUserId } from "@/assets/js/util/localStore";
import { modal } from "@/assets/js/util/modal";
import { dateDiff } from "@/assets/js/util/time";
import { deleteAttendList, getFansList } from "@/assets/js/api/friend";

export default {
  name: "FansEdit",
  mounted() {
    this.getFansList();
  },
  data() {
    return {
      //页码
      page: { pageNum: 1, total: 0 },
      //该用户的博客列表信息
      fansList: [],
      //批量删除list
      attendIdList: [],
    };
  },
  methods: {
    //获取该用户的粉丝列表
    getFansList() {
      getFansList(getUserId(), this.page.pageNum).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.fansList = restMsg.data.list;
          this.page.total = restMsg.data.total;
        }
      });
    },
    //监听页码变化
    handlePageNumChange() {
      this.getBlogList();
    },
    //批量删除粉丝
    deleteFansList() {
      //id未选择不发送请求
      if (this.attendIdList.length === 0) {
        return;
      }
      deleteAttendList(this.attendIdList).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          modal.notifySuccess(restMsg.msg);
          this.getFansList();
        }
      });
    },
    //监听表格多选变化
    handleSelectionChange(val) {
      this.attendIdList = [];
      for (let i = 0; i < val.length; i++) {
        this.attendIdList.push(val[i].attendId);
      }
    },
    toZone(userId) {
      this.$router.push({ path: "/zone", query: { userId: userId } });
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
