<template>
  <div class="report-list">
    <padding-wrapper>
      <search-wrapper>
        <search-bar :searchForm='selectParams' @search-file="search" @download-file="download"></search-bar>
      </search-wrapper>
      <el-table :data="fileList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="file_original_name" label="用户名"></el-table-column>
        <el-table-column align="center" header-align="center" prop="file_size" label="医院"></el-table-column>
        <el-table-column align="center" header-align="center" prop="upload_time" label="更新时间"></el-table-column>
        <el-table-column align="center" header-align="center" prop="remark" label="最后一次操作记录"></el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text">删除</el-button>
            <span style="color:#409EFF">|</span>
            <el-button type="text">下载</el-button>
            <span style="color:#409EFF">|</span>
            <el-button type="text">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float: right; margin-top: 0.5%; margin-bottom: 0.5%;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="selectParams.page" :page-sizes="[10, 20, 30, 40]" :page-size="selectParams.rows" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>

    </padding-wrapper>
  </div>
</template>

<script>
import BgTitle from '$base-c/BgTitle';
import SearchWrapper from '$base-c/SearchWrapper';
import PaddingWrapper from '$base-c/PaddingWrapper';
import SearchBar from '$base-c/SearchBar';

export default {
  name: 'FileList',
  components: {
    BgTitle,
    SearchWrapper,
    PaddingWrapper,
    SearchBar,
  },
  data() {
    return {
      selectParams: {
        fuzzyname: '',
        startTime: '',
        endTime: '',
        isDown: '',
        userId: '',
        type: 2, // 1表示管理员文件列表，2表示普通用户文件列表，3表示普通用户垃圾箱
        page: 1,
        rows: 10,
      },
      fileList: [],
      multipleSelection: [],
      totalCount: 0,
    };
  },
  mounted() {
    this.selectParams.userId = this.$store.state.id;
    this._getFileList();
  },
  computed: {
    dialogTitle() {
      return this.operateState === 'edit' ? '编辑查看' : '添加医院';
    },
  },
  methods: {
    _getFileList() {
      const copyParams = JSON.parse(JSON.stringify(this.selectParams));
      this.$api.selectFileList(copyParams).then((res) => {
        this.fileList = res.data.fileList;
        this.totalCount = res.data.count;
      });
    },
    search() {
      this._getFileList();
    },
    download() {
      if (this.multipleSelection.length > 0) {

      } else {
        this.$message({ message: '请选择要操作条目', type: 'warning' });
      }
    },
    /**  **************以下为分页方法↓******************** */
    handleSizeChange(pageSize) {
      this.selectParams.rows = pageSize;
      this._getFileList();
    },
    handleCurrentChange(currentPage) {
      this.selectParams.page = currentPage;
      this._getFileList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      this.multipleSelection = val.map(item => item.id);
      console.log(this.multipleSelection);
    },


  },
};
</script>

<style lang="scss" scoped>
.report-list {
  height: 100%;
  width: 100%;
  .listForm {
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .betweenLayout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 5px 0;
  }
}
</style>
