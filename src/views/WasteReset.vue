<template>
  <div class="report-list" v-loading="loadSign">
    <bg-title title="用户文件恢复"></bg-title>
    <padding-wrapper>
      <search-wrapper>
        <search-bar :searchForm='selectParams' @search-file="search" :role='role' :waste=true @reset-form-file="resetSearch"></search-bar>
      </search-wrapper>
      <mini-wrapper>
        <div class="betweenLayout">
          <div>
          </div>
          <div>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="_deleteFile({type:'multiple',id:multipleSelection})">批量恢复</el-button>
          </div>
        </div>
      </mini-wrapper>
      <el-table :data="fileList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column align="left" header-align="center" prop="phone" label="文件名" width="350">
          <template scope="scope">
            <div style="display:flex;align-items:center">
              <i :style="{'color':scope.row.color}" :class="['iconfont',scope.row.type]"></i>
              <span :title="scope.row.file_original_name" style="width:300px;overflow:hidden;text-overflow: ellipsis; white-space: nowrap;">{{scope.row.file_original_name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="file_type" :formatter="formatterType" label="文件类型"></el-table-column>
        <el-table-column align="center" header-align="center" prop="upload_time" label="上传时间"></el-table-column>
        <el-table-column align="center" header-align="center" prop="file_size" :formatter="formatterFileSize" label="文件大小"></el-table-column>
        <el-table-column align="center" header-align="center" prop="user_name" label="上传人"></el-table-column>
        <el-table-column align="center" header-align="center" prop="download_count" label="下载次数"></el-table-column>
        <el-table-column align="center" header-align="center" prop="remark" label="备注"></el-table-column>
        <el-table-column align="center" header-align="center" prop="status" :formatter="formatterStatus" label="状态"></el-table-column>
        <el-table-column align="center" header-align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="_deleteFile({type: 'single',id:scope.row.id})">恢复</el-button>
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
import MiniWrapper from '$base-c/MiniWrapper';
import { getFileTypeIcon } from '../util/utils';

/** 此页面两个角色公用 */
export default {
  name: 'WasteReset',
  components: {
    BgTitle,
    SearchWrapper,
    PaddingWrapper,
    SearchBar,
    MiniWrapper,
  },
  data() {
    return {
      loadSign: false,
      role: '',
      selectParams: {
        fuzzyname: '',
        fileType: '',
        isDown: '',
        startTime: '',
        endTime: '',
        uploadUserName: '',
        page: 1,
        rows: 10,
      },
      downloadRecord: [],
      fileList: [],
      multipleSelection: [],
      totalCount: 0,
    };
  },
  mounted() {
    this.role = 'admin';
    this._selectFileDeleteList();
  },
  methods: {
    _selectFileDeleteList() {
      const copyParams = JSON.parse(JSON.stringify(this.selectParams));
      copyParams.fileName = copyParams.fuzzyname;
      copyParams.deleteStartTime = copyParams.startTime;
      copyParams.deleteEndTime = copyParams.endTime;
      delete copyParams.fuzzyname;
      delete copyParams.startTime;
      delete copyParams.endTime;
      this.$api.selectFileDeleteList(copyParams).then((res) => {
        this.fileList = res.data.fileList.map(item => getFileTypeIcon(item));
        this.totalCount = res.data.count;
      });
    },
    search() {
      this._selectFileDeleteList();
    },
    resetSearch() {
      this.selectParams = {
        fuzzyname: '',
        fileType: '',
        isDown: '',
        startTime: '',
        endTime: '',
        uploadUserName: '',
        page: 1,
        rows: 10,
      };
      this._selectFileDeleteList();
    },
    // 删除文件或者是放入垃圾箱
    _deleteFile(data) {
      let fileIds = '';
      if (data.type === 'multiple') {
        if (!data.id.length) {
          this.$message.warning('请选择条目！');
          return;
        } else {
          fileIds = JSON.stringify(this.multipleSelection);
        }
      } else if (data.type === 'single') {
        console.log(data.id);
        fileIds = JSON.stringify([data.id]);
      }

      // 目标状态：0表示已删除，1表示使用中，2表示垃圾箱
      this.$api.updateFileInfoStatus({ fileIds, targetStatus: 1 }).then((res) => {
        if (res.code === '200') {
          this._selectFileDeleteList();
          this.$message.success('操作成功！！！');
        }
      }, () => {
        this.$message.warning('操作出错了！');
      });
    },

    formatterStatus(row) {
      if (row.download_count === 0) {
        return '未下载';
      } else {
        return '已下载';
      }
    },
    formatterType(row) {
      return row.file_type.slice(1).toUpperCase();
    },
    formatterFileSize(row) {
      return `${(Number(row.file_size) / 1024).toFixed(1)}kb`;
    },
    /**  **************以下为分页方法↓******************** */
    handleSizeChange(pageSize) {
      this.selectParams.rows = pageSize;
      this._selectFileDeleteList();
    },
    handleCurrentChange(currentPage) {
      this.selectParams.page = currentPage;
      this._selectFileDeleteList();
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
  .iconfont{
    font-size: 23px !important;
  }
}
</style>
