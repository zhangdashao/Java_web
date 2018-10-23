<template>
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="文件名">
      <el-input v-model="searchForm.fuzzyname" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="searchForm.fileType" clearable placeholder="全部类型">
        <el-option v-for="(item,index) in typeList" :key="index" :label="item.dic_name" :value="item.dic_value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="!waste" label="状态">
      <el-select v-model="searchForm.isDown" clearable placeholder="全部状态">
        <el-option label="已下载" value=2></el-option>
        <el-option label="未下载" value=1></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="role === 'waste' ? '删除时间' : '时间'">
      <el-date-picker format="yyyy-MM-dd" @change="changeTime" v-model="firEndTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item v-if="role === 'admin'" label="上传人">
      <el-input v-model="searchForm.uploadUserName" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="mini" type="primary" icon="el-icon-search" @click="comSearch">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button size="mini" type="primary" icon="el-icon-search" @click="resetSearchForm">重置</el-button>
    </el-form-item>
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
    waste: Boolean,
  },
  mounted() {
    this._selectDictionaryList();
  },
  data() {
    return {
      firEndTime: '',
      typeList: [],
    };
  },
  methods: {
    /** 获取文件类型列表 */
    _selectDictionaryList() {
      this.$api.selectDictionaryList({ typeCode: '0001' }).then((res) => {
        if (res.code === '200') {
          this.typeList = res.data;
        }
      }).catch(() => {
        this.$message.error('获取文件类型失败！');
      });
    },
    comSearch() {
      this.$emit('search-file', this.searchForm);
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
      this.firEndTime = '';
      this.$emit('reset-form-file');
    },
  },
};
</script>
<style lang="sass" scoped>

</style>

