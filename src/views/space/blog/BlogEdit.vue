<template>
  <div>
    <div>
      <router-link to="/space/post">
        <el-button>新增</el-button>
      </router-link>
      <el-popconfirm
        confirm-button-text="好的"
        cancel-button-text="不用了"
        icon="el-icon-info"
        icon-color="red"
        title="这是一段内容确定删除吗？"
        @confirm="deleteBlog()"
      >
        <el-button slot="reference">删除</el-button>
      </el-popconfirm>
    </div>
    <el-table
      ref="multipleTable"
      :data="blogList"
      tooltip-effect="dark"
      style="width: 100%"
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
      <el-table-column prop="blogTitle" label="标题" width="900">
        <template slot-scope="scope">
          <router-link
            :to="{ path: '/blog', query: { blogId: scope.row.blogId } }"
            v-text="scope.row.blogTitle"
          />
        </template>
      </el-table-column>
      <el-table-column prop="manage" label="管理">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            icon="el-icon-info"
            icon-color="blue"
            title="是否修改？"
            @confirm="clickUpdateShow(scope.row.blogId)"
          >
            <el-button slot="reference"> 修改</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-divider />
    <div style="text-align: center">
      <el-pagination
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :current-page.sync="page.pageNum"
        @current-change="handlePageNumChange"
        :page-size="10"
        :total="page.total"
      />
    </div>
    <el-dialog
      v-if="updateShow"
      title="编辑博客"
      :fullscreen="true"
      :close-on-click-modal="false"
      :visible.sync="updateShow"
      :destroy-on-close="true"
      style="min-width: 150vh"
    >
      <blog-update :blog-id="blogId" />
    </el-dialog>
  </div>
</template>

<script>
import { deleteBlog, getBlogListByUserId } from "@/assets/js/api/blog";
import { getUserId } from "@/assets/js/util/localStore";
import { modal } from "@/assets/js/util/modal";
import { dateDiff } from "@/assets/js/util/time";
import BlogUpdate from "@/components/Blog/BlogUpdate";

export default {
  name: "BlogEdit",
  components: { BlogUpdate },
  mounted() {
    this.getBlogList();
  },
  data() {
    return {
      //修改博客需传入子组件的id
      updateShow: false,
      blogId: null,
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
      getBlogListByUserId(getUserId(), this.page.pageNum)
        .then((res) => {
          let restMsg = res.data;
          console.log(restMsg);
          if (restMsg.code === 200) {
            this.blogList = restMsg.data.list;
            this.page.total = restMsg.data.total;
            return;
          }
          modal.notifyError(restMsg.msg);
        })
        .catch();
    },
    //监听页码变化
    handlePageNumChange() {
      this.getBlogList();
    },
    //批量删除博客
    deleteBlog() {
      //id未选择不发送请求
      if (this.blogIdList.length === 0) {
        return;
      }
      deleteBlog(this.blogIdList)
        .then((res) => {
          let restMsg = res.data;
          console.log(restMsg);
          if (restMsg.code === 200) {
            modal.notifySuccess(restMsg.msg);
            this.getBlogList();
            return;
          }
          modal.notifyError(restMsg.msg);
        })
        .catch(() => {
          modal.notifyError("出现未知错误");
        });
    },
    //监听表格多选变化
    handleSelectionChange(val) {
      this.blogIdList = [];
      console.log(this.blogIdList);
      for (let i = 0; i < val.length; i++) {
        this.blogIdList.push(val[i].blogId);
      }
      console.log(this.blogIdList);
    },
    //使修改界面出现
    clickUpdateShow(id) {
      this.blogId = id;
      this.updateShow = true;
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
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
