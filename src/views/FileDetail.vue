<template>
  <div class="report-list" v-loading="loadSign">
    <padding-wrapper>
      <search-wrapper>
        <div class="info-warpper">
          <h2><i style="font-size:30px" class="iconfont icon--pdf-file-format-"></i> {{fileInfo.file_original_name}}</h2>
          <el-row :gutter="20">
            <el-col :span="3">
              <div style="padding:10px 20px 0">
                <span style="color:#ccc">文件种类</span>
                <span>{{fileInfo.file_type.slice(1).toUpperCase()}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div style="padding:10px 20px 0">
                <span style="color:#ccc">上传时间</span>
                <span>{{fileInfo.create_time}}</span>
                <span></span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3">
              <div style="padding:10px 20px 0">
                <span style="color:#ccc">文件大小</span>
                <span>{{(fileInfo.file_size/1024).toFixed(1)+'kb'}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div style="padding:10px 20px 0">
                <span style="color:#ccc">上传人</span>
                <span>{{fileInfo.user_name}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="3">
              <div style="padding:10px 20px 0">
                <span style="color:#ccc">文件状态</span>
                <span>{{fileInfo.status}}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="padding:10px 20px 0">
                <span style="color:#ccc">备注</span>
                <span>{{fileInfo.remark ? fileInfo.remark : '无'}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <div style="margin:15px 20px">

            <el-button v-if="role === 'user'" type="primary" size="large" @click="_deleteFile">删除</el-button>
            <el-button type="primary" size="large" @click="_downloadFile">下载</el-button>
            </div>
          </el-row>

        </div>
        <div class="time-line-wrapper">
          <ul class="ant-timeline">
            <li v-for="(item,index) in commentList" :key="index" class="ant-timeline-item">
              <div :class="['ant-timeline-item-tail',]"></div>
              <div :class="['ant-timeline-item-head', 'ant-timeline-item-head-blue']"></div>
              <div :class="['ant-timeline-item-content']">
                <p>{{`${item.create_time} ${item.user_name}`}}</p>
                <p>{{item.comment_detail}}</p>
              </div>
            </li>
            <li class="ant-timeline-item">
              <div :class="['ant-timeline-item-tail']"></div>
              <div :class="['ant-timeline-item-head', 'ant-timeline-item-head-blue']"></div>
              <div :class="['ant-timeline-item-content']">
                <div style="width:500px">
                  <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="commentDetail">
                  </el-input>
                </div>
                <div style="margin-top:15px">
                  <el-button plain type="primary" size="large" @click="commentDetail = ''">取消</el-button>
                  <el-button plain type="primary" size="large" @click="_addCommentForFile">提交</el-button>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </search-wrapper>

    </padding-wrapper>
  </div>
</template>

<script>
import SearchWrapper from '$base-c/SearchWrapper';
import PaddingWrapper from '$base-c/PaddingWrapper';

export default {
  name: 'FileDetail',
  components: {
    SearchWrapper,
    PaddingWrapper,
  },
  data() {
    return {
      fileId: '',
      role: '',
      loadSign: false,
      commentDetail: '',
      fileInfo: {},
      commentList: [],
      data: [1, 2, 5],
    };
  },
  created() {
    this.role = this.$store.getters.getRole;
    this.fileId = this.$route.query.id;
  },
  mounted() {
    this._getFileDetail();
    this._getCommentList();
  },
  methods: {
    /** 获取文件评论列表 */
    _getCommentList() {
      return this.$api.selectFileInfoCommentList({ fileId: this.fileId }).then((res) => {
        if (res.code === '200') {
          this.commentList = res.data;
        }
      }).catch(() => {
        this.$message.warning('获取文件评论失败！');
      });
    },
    /** 获取文件详细信息 */
    _getFileDetail() {
      this.$api.selectFileInfoDetail({ fileId: this.fileId }).then((res) => {
        if (res.code === '200') {
          if (res.data.status === 1) {
            res.data.status = '使用中';
          } else {
            res.data.status = '垃圾箱';
          }
          this.fileInfo = res.data;
        }
      }).catch(() => {
        this.$message.warning('获取文件信息失败！');
      });
    },
    /** 添加文件评论 */
    _addCommentForFile() {
      if (!this.commentDetail) {
        this.$message.warning('评论不能为空');
        return;
      }
      this.$api.addFileInfoComment({ fileId: this.fileId, commentDetail: this.commentDetail }).then((res) => {
        if (res.code === '200') {
          this._getCommentList();
        }
      }).then(() => {
        this.commentDetail = '';
        this.$message.success('回复成功!');
      }).catch(() => {
        this.$message.success('评论失败！');
      });
    },
    /** 下载文件 */
    _downloadFile() {
      const id = String(this.fileId);

      this.loadSign = true;
      this.$api.downFile({ fileId: id }).then((res) => {
        this.loadSign = false;
        const blob = new Blob([res]);
        const fileName = this.fileInfo.file_original_name;

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
      })
        .catch(() => {
          this.loadSign = false;
          this.$message.warning('下载出错！');
        });
    },
    _deleteFile() {
      const fileIds = JSON.stringify([this.fileId]);

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

  },
};
</script>

<style lang="scss" scoped>
.report-list {
  .padding-wrapper {
    .search-wrapper {
      border-top: 2px solid #0066cc;
      h2 {
        display: flex;
        align-items: center;
        i {
          font-size: 16px;
          padding: 0 4px;
        }
      }
      .info-warpper {
        padding: 1rem 0 1rem 1rem;
        margin: 0 -25px;
        border-bottom: 1px solid #eee;
      }
      .btn-wrapper {
        display: flex;
        padding-top: 30px;
        justify-content: center;
        // align-items: center;
      }
    }
  }
  .time-line-wrapper {
    padding-top:10px;
    .ant-timeline {
      font-size: 14px;
      list-style: none;
      margin: 0;
      padding-left: 5px!important;
      .ant-timeline-item {
        position: relative;
        padding: 0 0 20px;
        .ant-timeline-item-tail {
          position: absolute;
          left: 6px;
          top: 3px;
          height: 100%;
          border-left: 2px solid #e8e8e8;
        }
        .ant-timeline-item-head-blue {
          background-color: rgba(0, 183, 255, 0.959) !important;
        }
        .ant-timeline-item-head {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: #fff;
          border-radius: 100px;
          border: 2px solid transparent;
        }
        .ant-timeline-item-content {
          margin: 0 0 0 18px;
          position: relative;
          top: -1px;
        }
        .ant-timeline-item-last {
          display: none;
        }
      }
    }
  }
}
</style>

