<template>
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="文件名">
      <el-input v-model="searchForm.fuzzyname" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="searchForm.fileType" clearable placeholder="全部类型">
        <el-option label="word" value="word"></el-option>
        <el-option label="Excel" value="Excel"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="searchForm.isDown" clearable placeholder="全部状态">
        <el-option label="已下载" value=2></el-option>
        <el-option label="未下载" value=1></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="role === 'waste' ? '删除时间' : '时间'">
      <el-date-picker format="yyyy-MM-dd" @change="changeTime" v-model="firEndTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="上传人">
      <el-input v-model="searchForm.uploadUserName" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="mini" type="primary" icon="el-icon-search" @click="comSearch">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button size="mini" type="primary" icon="el-icon-search" @click="resetSearchForm">重置</el-button>
    </el-form-item>
    <!-- <el-form-item v-if="role === 'user'">
      <el-button size="mini" type="primary" icon="el-icon-search" @click="comAllDownload">批量下载</el-button>
    </el-form-item>
    <el-form-item v-if="false">
      <el-button size="mini" type="primary" icon="el-icon-search" @click="comAllOperate">批量恢复</el-button>
    </el-form-item> -->
  </el-form>
</template>
<script>
export default {
  name: 'SearchBar',
  props: {
    searchForm: {
      type: Object,
      default() {
        return {};
      },
    },
    role: String,
  },
  data() {
    return {
      firEndTime: '',
    };
  },
  methods: {
    comSearch() {
      this.$emit('search-file', this.searchForm);
    },
    /** 批量下载  */
    comAllDownload() {
      this.$emit('download-file');
    },
    /** 批量恢复  */
    comAllOperate() {
      this.$emit('reset-file');
    },
    changeTime() {
      if (this.firEndTime) {
        this.searchForm.startTime = this.formatTime(this.firEndTime[0]);
        this.searchForm.endTime = this.formatTime(this.firEndTime[1]);
      } else {
        this.searchForm.startTime = '';
        this.searchForm.endTime = '';
      }
      console.log(this.searchForm);
    },
    formatTime(time) {
      const year = time.getFullYear();
      const mothe =
        (time.getMonth() + 1).toString().length < 2
          ? `0${time.getMonth() + 1}`
          : time.getMonth() + 1;
      const day =
        time.getDate().toString().length < 2
          ? `0${time.getDate()}`
          : time.getDate();
      return `${year}-${mothe}-${day} 00:00:00`;
    },
    resetSearchForm() {
      this.searchForm.fuzzyname = '';
      this.firEndTime = '';
      this.searchForm.startTime = '';
      this.searchForm.endTime = '';
      this.$emit('reset-form-file');
    },
  },
};
</script>
<style lang="sass" scoped>

</style>

