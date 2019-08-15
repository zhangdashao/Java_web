<template>
    <div class="project-list">
    <bg-title title="项目管理"></bg-title>
        <padding-wrapper>
            <search-wrapper>
                <el-form :inline="true" :model="listForm" class="listForm">
                    <el-form-item label="项目名称:">
                        <el-input @keydown.enter.native="searchProjectList" clearable v-model="listForm.fuzzyname" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="primary" icon="el-icon-search" @click="searchProjectList"></el-button>
                    </el-form-item>
                </el-form>
            </search-wrapper>
            <mini-wrapper>
                <div class="betweenLayout">
                    <p>共计&nbsp;
                        <span>{{totalCount}}&nbsp;</span>个项目</p>
                    <div>
                        <el-button size="mini" type="primary" @click="openDialog({type:'add'})">添加项目</el-button>
                    </div>
                </div>
            </mini-wrapper>
            <el-table :data="projectList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column align="center" header-align="center" type="index" label="序号"></el-table-column>
                <el-table-column align="center" header-align="center" prop="project_name" label="项目名称"></el-table-column>
                <el-table-column align="center" header-align="center" prop="province" label="所属省份"></el-table-column>
                <el-table-column align="center" header-align="center" prop="city" label="所属城市"></el-table-column>
                <el-table-column align="center" header-align="center" prop="create_time" label="创建时间"></el-table-column>
                <el-table-column align="center" header-align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="openDialog({type:'edit',data:scope.row})">编辑</el-button>
                        <el-button type="text" @click="delProject(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="float: right; margin-top: 0.5%; margin-bottom: 0.5%;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listForm.page" :page-sizes="[10, 20, 30, 40]"
                    :page-size="listForm.rows" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                </el-pagination>
            </div>
        </padding-wrapper>
        <el-dialog title="添加项目" :visible.sync="dialogFormVisible" width="600px" :modal-append-to-body="false">
            <el-form ref="projectForm" :model="projectForm" :rules="projectFormRules" label-width="90px">
                <el-row type="flex">
                    <el-form-item label="项目名称:" prop="project_name">
                        <el-input v-model="projectForm.project_name" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="省市" prop="selectOptions">
                        <el-cascader :options="options" v-model="projectForm.selectOptions">
                        </el-cascader>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="confirmType" :loading="projectLoading">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import BgTitle from '$base-c/BgTitle';
import SearchWrapper from '$base-c/SearchWrapper';
import MiniWrapper from '$base-c/MiniWrapper';
import { deepCloneJson, showConfirm } from '$global/global-function';
import PaddingWrapper from '$base-c/PaddingWrapper';
// import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText,  } from 'element-china-area-data';
import { provinceAndCityData, CodeToText, TextToCode } from 'element-china-area-data';

export default {
  name: 'ProjectList',
  components: {
    BgTitle,
    SearchWrapper,
    MiniWrapper,
    PaddingWrapper,
  },
  data() {
    return {
      listForm: {
        fuzzyname: '',
        page: 1,
        rows: 10,
      },
      projectForm: {
        project_name: '',
        selectOptions: [],
      },
      projectFormRules: {
        project_name: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' },
        ],
        selectOptions: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' },
        ],
      },
      options: provinceAndCityData,
      totalCount: 15,
      projectLoading: false,
      dialogFormVisible: false,
      projectList: [],
      multipleSelection: [],
      operateSign: 'add',
      editId: '',
    };
  },
  mounted() {
    this.searchProjectList();
  },
  methods: {
    handleSizeChange(pageSize) {
      this.listForm.rows = pageSize;
      this.searchProjectList();
    },
    handleCurrentChange(currentPage) {
      this.listForm.page = currentPage;
      this.searchProjectList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    searchProjectList() {
      this.$api.selectProjectList(deepCloneJson(this.listForm)).then(({ data }) => {
        this.projectList = data.projectList;
        this.totalCount = data.count;
      });
    },
    delProject(delData) {
      showConfirm(this).then(() => {
        this.$api.deletePInfo({ projectId: delData }).then((res) => {
          if (res.code === '200') {
            this.$message.success('删除成功');
            this.searchProjectList();
          }
        });
      });
    },
    openDialog({ type, data } = {}) {
      this.operateSign = type;
      if (type === 'add') {
        this.dialogFormVisible = true;
      } else if (type === 'edit') {
        this.editId = data.id;
        this.dialogFormVisible = true;
        this.projectForm.project_name = data.project_name;
        this.projectForm.selectOptions = [TextToCode[data.province].code, TextToCode[data.province][data.city].code];
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.projectForm = {
        project_name: '',
        selectOptions: [],
      };
    },
    requiredVerify() {
      let ret;
      this.$refs.projectForm.validate((valid) => {
        ret = valid;
      });
      return ret;
    },
    confirmType() {
      if (!this.requiredVerify()) {
        return false;
      }
      const postData = {
        project_name: this.projectForm.project_name,
        project_desc: '',
        province: CodeToText[this.projectForm.selectOptions[0]],
        city: CodeToText[this.projectForm.selectOptions[1]],
        district: '',
      };
      if (this.operateSign === 'add') {
        this.projectLoading = true;
        this.$api.addPInfo(postData).then((res) => {
          if (res.code === '200') {
            this.$message.success('创建成功');
            this.searchProjectList();
            this.projectLoading = false;
            this.closeDialog();
          }
        });
      } else {
        this.projectLoading = true;
        postData.id = this.editId;
        this.$api.updatePInfo(postData).then((res) => {
          if (res.code === '200') {
            this.$message.success('修改成功');
            this.searchProjectList();
            this.projectLoading = false;
            this.closeDialog();
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
    .project-list {
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
            span {
                color: #4576CE;
                font-size: 16px;
            }
        }
    }
</style>

