<template>
  <div class="report-list"
  v-loading="loadSign"
  element-loading-text="正在下载中..."
  element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <bg-title :title="role === 'user' ? '我的文件' : '用户文件'"></bg-title>
    <padding-wrapper>
      <search-wrapper>
        <search-bar :searchForm="selectParams" @search-file="search" :role='role' :waste=false @reset-form-file="resetSearch"></search-bar>
      </search-wrapper>
      <mini-wrapper>
        <div class="betweenLayout">
          <div>
          </div>
          <div>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="_downloadFile({type:'multiple',id:multipleSelection})">批量下载</el-button>
            <el-button v-if="role === 'user'" size="mini" type="primary" icon="el-icon-plus" @click="_deleteFile({type: 'multiple',id:multipleSelection})">批量删除</el-button>
            <el-button v-if="role === 'user'" size="mini" type="primary" @click="$router.push({name:'Upload'})" icon="el-icon-plus">上传文件</el-button>
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
            <el-button v-if="role ==='user'" type="text" @click="_deleteFile({type: 'single',id:scope.row.id})">删除</el-button>
            <span v-if="role ==='user'" style="color:#409EFF">|</span>
            <el-button type="text" @click="_downloadFile({type:'single',id:scope.row.id,name:scope.row.file_original_name})">下载</el-button>
            <span style="color:#409EFF">|</span>
            <el-button type="text" @click="_getDownloadRecord(scope.row.id)">下载记录</el-button>
            <span style="color:#409EFF">|</span>
            <el-button type="text" @click="$router.push({name: 'FileDetail',query:{id:scope.row.id}})">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float: right; margin-top: 0.5%; margin-bottom: 0.5%;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="selectParams.page" :page-sizes="[10, 20, 30, 40]" :page-size="selectParams.rows" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>

      <el-dialog :modal-append-to-body="false" :append-to-body="true" title="下载记录" :visible.sync="dialogShowDownloadView" width="901px">
        <el-table :data="downloadRecord" tooltip-effect="dark" style="width: 100%">
          <el-table-column align="center" header-align="center" prop="file_original_name" label="文件名"></el-table-column>
          <el-table-column align="center" header-align="center" prop="create_time" label="下载时间"></el-table-column>
          <el-table-column align="center" header-align="center" prop="user_name" label="下载人"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogShowDownloadView = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="dialogShowDownloadView = false">确 定</el-button>
        </span>
      </el-dialog>


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
  name: 'FileList',
  components: {
    BgTitle,
    SearchWrapper,
    PaddingWrapper,
    SearchBar,
    MiniWrapper,
  },
  data() {
    return {
      dialogShowDownloadView: false,
      loadSign: false,
      role: '',
      selectParams: {
        fuzzyname: '',
        fileType: '',
        uploadUserName: '',
        isDown: '',
        startTime: '',
        endTime: '',
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
    this.role = this.$store.getters.getRole;
    this.selectAdminOrUser();
  },
  methods: {
    _getUserFileList() {
      const copyParams = JSON.parse(JSON.stringify(this.selectParams));
      copyParams.fileName = copyParams.fuzzyname;
      copyParams.userId = this.$store.state.id;
      copyParams.type = 2;
      delete copyParams.fuzzyname;
      delete copyParams.uploadUserName;
      this.$api.selectUserFileList(copyParams).then((res) => {
        this.fileList = res.data.fileList.map(item => getFileTypeIcon(item));
        this.totalCount = res.data.count;
      });
    },
    _getAdminFileList() {
      const copyParams = JSON.parse(JSON.stringify(this.selectParams));
      copyParams.fileName = copyParams.fuzzyname;
      copyParams.status = 1;
      delete copyParams.fuzzyname;
      this.$api.selectFileListManage(copyParams).then((res) => {
        this.fileList = res.data.fileList.map(item => getFileTypeIcon(item));
        this.totalCount = res.data.count;
      });
    },
    /** 根据角色决定调用哪个接口 */
    selectAdminOrUser() {
      if (this.role === 'admin') {
        this._getAdminFileList();
      } else if (this.role === 'user') {
        this._getUserFileList();
      }
    },
    search() {
      this.selectAdminOrUser();
    },
    resetSearch() {
      this.selectParams = {
        fuzzyname: '',
        fileType: '',
        uploadUserName: '',
        isDown: '',
        startTime: '',
        endTime: '',
        page: 1,
        rows: 10,
      };
      this.selectAdminOrUser();
    },
    // 下载文件方法（下载一条或者是多条）
    _downloadFile(data) {
      let id = '';
      let _download = null;
      if (data.type === 'multiple') {
        if (!data.id.length) {
          this.$message.warning('请选择条目！');
          return;
        } else {
          id = encodeURIComponent(
            JSON.stringify(data.id.map(item => ({ file_id: item }))),
          );
          _download = this.$api.downFileBatch({ downFileList: id });
        }
      } else if (data.type === 'single') {
        id = String(data.id);
        _download = this.$api.downFile({ fileId: id });
      }
      this.loadSign = true;
      _download.then((res) => {
        this.loadSign = false;
        const blob = new Blob([res]);
        let fileName = '未命名.rar';
        if (data.type === 'multiple') {
          fileName = '批量文件.zip';
        } else {
          fileName = data.name;
        }
        if ('download' in document.createElement('a')) {
          // 非IE下载
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
        this.$message.success('下载成功');
      }).then(() => {
        this.selectAdminOrUser();
      })
        .catch(() => {
          this.loadSign = false;
          this.$message.warning('下载出错！');
        });
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
      this.$api.updateFileInfoStatus({ fileIds, targetStatus: 2 }).then((res) => {
        if (res.code === '200') {
          this.selectAdminOrUser();
          this.$message.success('操作成功！！！');
        }
      }, () => {
        this.$message.warning('操作出错了！');
      });
    },
    // 获取文件下载记录列表
    _getDownloadRecord(id) {
      const data = {
        fileId: id,
        page: 1,
        rows: 10,
      };
      this.$api.selectFileDownRecordList(data).then((res) => {
        if (res.code === '200') {
          this.downloadRecord = res.data.fileList;
          this.dialogShowDownloadView = true;
        }
      }).catch(() => {
        this.dialogShowDownloadView = false;
        this.$message.error('获取下载记录失败');
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
  .iconfont{
    font-size: 23px !important;
  }
}
</style>
