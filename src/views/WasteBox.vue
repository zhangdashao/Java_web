<template>
  <div class="report-list">
    <bg-title title="文件回收站"></bg-title>
    <padding-wrapper>
      <search-wrapper>
        <search-bar :searchForm='selectParams' @search-file="search" @reset-file="reset" role='waste'></search-bar>
      </search-wrapper>
      <el-table :data="fileList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="file_original_name" label="文件名"></el-table-column>
        <el-table-column align="center" header-align="center" prop="upload_time" label="删除时间"></el-table-column>
        <el-table-column align="center" header-align="center" prop="file_size" label="文件大小"></el-table-column>
        <el-table-column align="center" header-align="center" prop="remark" label="备注"></el-table-column>
        <el-table-column v-if="role === 'admin'" align="center" header-align="center" prop="remark" label="状态"></el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template slot-scope="scope">
            <el-button v-if="role === 'user'" type="text" @click="_userResetFile({type: 'delete',id:scope.row.id})">删除</el-button>
            <el-button v-if="role === 'admin'" type="text" @click="_userResetFile({type: 'reset',id:scope.row.id})">管理员恢复</el-button>
            <span v-if="role === 'user'" style="color:#409EFF">|</span>
            <el-button v-if="role === 'user'" type="text" @click="_userResetFile({type: 'reset',id:scope.row.id})">恢复</el-button>
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
  name: 'WasteBox',
  components: {
    BgTitle,
    SearchWrapper,
    PaddingWrapper,
    SearchBar,
  },
  data() {
    return {
      role: '',
      selectParams: {
        fuzzyname: '',
        startTime: '',
        endTime: '',
        isDown: '',
        userId: '',
        type: 3, // 1表示管理员文件列表，2表示普通用户文件列表，3表示普通用户垃圾箱
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
    this.role = this.$store.getters.getRole;
    this.selectAdminOrUser();
  },
  computed: {
    dialogTitle() {
      return this.operateState === 'edit' ? '编辑查看' : '添加医院';
    },
  },
  methods: {
    _getUserWasteFileList() {
      const copyParams = JSON.parse(JSON.stringify(this.selectParams));
      this.$api.selectFileList(copyParams).then((res) => {
        if (res.code === '200') {
          this.fileList = res.data.fileList;
          this.totalCount = res.data.count;
        }
      });
    },
    _getAdminWasteFileList() {
      const data = {
        fuzzyname: this.selectParams.fuzzyname,
        deleteStartTime: this.selectParams.startTime,
        deleteEndTime: this.selectParams.endTime,
        page: this.selectParams.page,
        rows: this.selectParams.rows,
      };
      this.$api.selectFileDeleteList(data).then((res) => {
        if (res.code === '200') {
          this.fileList = res.data.fileList;
          this.totalCount = res.data.count;
        }
      });
    },
    /** 根据角色决定调用哪个接口 */
    selectAdminOrUser() {
      if (this.role === 'admin') {
        this._getAdminWasteFileList();
      } else if (this.role === 'user') {
        this._getUserWasteFileList();
      }
    },
    search() {
      this.selectAdminOrUser();
    },
    reset() {
      if (this.multipleSelection.length > 0) {
      } else {
        this.$message({ message: '请选择要操作条目', type: 'warning' });
      }
    },
    /** 用户操作删除或者是恢复 */
    _userResetFile(params) {
      const _reset = this.$api.updateFileInfoStatus;
      if (params.type === 'delete') {
        _reset({ fileId: params.id, targetStatus: 0 }).then(
          (res) => {
            console.log(res);
            if (res.code === '200') {
              this.selectAdminOrUser();
              this.$message.success('操作成功！！！');
            }
          },
          () => {
            this.$message.warning('操作出错了！');
          },
        );
      } else if (params.type === 'reset') {
        _reset({ fileId: params.id, targetStatus: 1 }).then(
          (res) => {
            console.log(res);
            if (res.code === '200') {
              this.selectAdminOrUser();
              this.$message.success('操作成功！！！');
            }
          },
          () => {
            this.$message.warning('操作出错了！');
          },
        );
      }
    },
    /**  **************以下为分页方法↓******************** */
    handleSizeChange(pageSize) {
      this.selectParams.rows = pageSize;
      this.selectAdminOrUser();
    },
    handleCurrentChange(currentPage) {
      this.selectParams.page = currentPage;
      this.selectAdminOrUser();
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
