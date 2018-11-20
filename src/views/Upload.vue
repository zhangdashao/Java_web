<template>
  <div class="report-list">
    <padding-wrapper>
      <div class="upload-wrapper">
        <el-upload ref="upload" class="upload-demo" :limit="1" drag action="123" :before-upload="_beforeUpload" :multiple="false" :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <el-progress v-show="uploadStatus" :percentage="progess"></el-progress>
        </el-upload>
      </div>
      <div class="btn-wrapper">
        <el-input style="width:380px;margin-bottom:10px" type="textarea" :rows="4" placeholder="请输入内容" v-model="remark">
        </el-input>
        <el-button :loading="upLoading" type="primary" size="big" @click="startUpload">上 传</el-button>
      </div>
    </padding-wrapper>
  </div>
</template>
<script>
import PaddingWrapper from '$base-c/PaddingWrapper';

export default {
  name: 'upload',
  components: {
    PaddingWrapper,
  },
  data() {
    return {
      role: '',
      progess: 0,
      uploadStatus: false,
      upLoading: false,
      remark: '',
    };
  },
  watch: {
    progess(val) {
      if (val === 0) {
        this.uploadStatus = false;
      } else if (val === 100) {
        setTimeout(() => {
          this.uploadStatus = false;
          this.$message.success('上传成功');
        }, 1000);
      } else {
        this.uploadStatus = true;
      }
    },
  },
  mounted() {
    this.role = this.$store.getters.getRole;
  },
  methods: {
    // 开始上传文件
    startUpload() {
      this.$refs.upload.submit();
    },
    // 上传
    _beforeUpload(file) {
      this.upLoading = true;
      const postData = {
        remark: this.remark,
        file,
      };
      let upload = null;
      if (this.role === 'admin') {
        upload = this.$api.uploadManageUser(postData);
      } else if (this.role === 'user') {
        upload = this.$api.uploadCommonUser(postData, this.getUploadProgress);
      }
      upload.then((res) => {
        if (res.code === '200') {
          this.upLoading = false;
          this.remark = '';
        }
      }, () => {
        this.upLoading = false;
      });
      return false;
    },
    getUploadProgress(e) {
      this.progess = Math.round(e.loaded / e.total * 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.report-list {
  height: 100%;
  width: 100%;
  .upload-wrapper,.btn-wrapper {
    display: flex;
    justify-content: center;
  }
  .btn-wrapper{
    padding: 10px;
    flex-direction: column;
    align-items: center;
  }
}
</style>

