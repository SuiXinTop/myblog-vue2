<template>
  <el-card>
    <div>
      <el-popconfirm
        confirm-button-text="好的"
        cancel-button-text="不用了"
        icon="el-icon-info"
        icon-color="blue"
        title="是否要恢复？"
        @confirm="recoverBlog()"
      >
        <el-button type="primary" icon="el-icon-edit" slot="reference">
          恢复
        </el-button>
      </el-popconfirm>
    </div>
    <el-divider />
    <el-table
      ref="multipleTable"
      :data="blogList"
      tooltip-effect="dark"
      style="width: 100%; border-radius: 6px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="blogImg" label="封面" width="200">
        <template slot-scope="scope">
          <el-image
            class="blog-img"
            :src="scope.row.blogImg"
            :preview-src-list="[scope.row.blogImg]"
            fit="cover"
            alt
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="blogTitle" label="标题" width="400">
        <template slot-scope="scope">
          <label v-text="scope.row.blogTitle" />
        </template>
      </el-table-column>
      <el-table-column prop="user" label="作者" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-user"
            @click="toZone(scope.row.userId)"
          >
            {{ scope.row.user.userName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="blogTime" label="发布时间" width="150">
        <template slot-scope="scope">
          <label v-text="dateDiff(scope.row.blogTime)" />
        </template>
      </el-table-column>
      <el-table-column prop="manage" label="管理" width="250">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click="toBlog(scope.row.blogId)"
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
import { getBlogException, recoverBlog } from "@/assets/js/api/blogManage";
import { dateDiff } from "@/assets/js/util/time";
import { modal } from "@/assets/js/util/modal";

export default {
  name: "RecoverBlog",
  mounted() {
    this.getBlogList();
  },
  data() {
    return {
      //页码
      page: { pageNum: 1, total: 0 },
      //该用户的博客列表信息
      blogList: [],
      //批量删除list
      blogIdList: [],
    };
  },
  methods: {
    //获取该用户的博客列表
    getBlogList() {
      getBlogException(this.page.pageNum).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          this.blogList = restMsg.data.list;
          this.page.total = restMsg.data.total;
        }
      });
    },
    //恢复博客
    recoverBlog() {
      //id未选择不发送请求
      if (this.blogIdList.length === 0) {
        return;
      }
      recoverBlog(this.blogIdList).then((res) => {
        let restMsg = res.data;
        if (restMsg.code === 200) {
          modal.notifySuccess(restMsg.msg);
          this.getBlogList();
        }
      });
    },
    //监听表格多选变化
    handleSelectionChange(val) {
      this.blogIdList = [];
      for (let i = 0; i < val.length; i++) {
        this.blogIdList.push(val[i].blogId);
      }
    },
    handlePageNumChange() {
      this.getBlogList();
    },
    toBlog(blogId) {
      this.$router.push({ path: "/blog", query: { blogId: blogId } });
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

.blog-title {
  font-size: 16px;
  line-height: 20px;
  font-family: 幼圆, serif;
  font-weight: bold;
  display: -webkit-box;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
