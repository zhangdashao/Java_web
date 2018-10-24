<template>
  <div class="report-list">
    <bg-title title="用户管理"></bg-title>
    <padding-wrapper>
      <search-wrapper>
        <el-form :inline="true" :model="selectParams">
          <el-form-item label="用户名">
            <el-input v-model="selectParams.username" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="医院">
            <el-input v-model="selectParams.hospitalName" placeholder="请输入医院名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" icon="el-icon-search" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </search-wrapper>
      <mini-wrapper>
        <div class="betweenLayout">
          <div>
          </div>
          <div>
            <el-button size="mini" type="primary" @click="_deleteUser({type:'multiple',id:multipleSelection})">批量关闭</el-button>
            <el-button size="mini" type="primary" @click="$router.push({name: 'CreateUser',query:{type:'add'}})" icon="el-icon-plus">添加用户</el-button>
          </div>
        </div>
      </mini-wrapper>
      <el-table :data="userList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" header-align="center" prop="user_name" label="用户名"></el-table-column>
        <el-table-column align="center" header-align="center" prop="hospital_name" label="医院"></el-table-column>
        <el-table-column align="center" header-align="center" prop="hospital_name" label="角色" :formatter="formatterRole"></el-table-column>
        <el-table-column align="center" header-align="center" prop="phone" label="手机号"></el-table-column>
        <el-table-column align="center" header-align="center" prop="modify_time" label="更新时间"></el-table-column>
        <el-table-column align="center" header-align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="_deleteUser({type:'single',id:scope.row.id})">关闭用户</el-button>
            <!-- <span style="color:#409EFF">|</span>
            <el-button type="text">历史上传记录</el-button> -->
            <span style="color:#409EFF">|</span>
            <el-button type="text" @click="$router.push({name: 'CreateUser', query:{id:scope.row.id,type:'edit'}})">编辑</el-button>
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

export default {
  name: 'UserList',
  components: {
    BgTitle,
    SearchWrapper,
    PaddingWrapper,
    SearchBar,
    MiniWrapper,
  },
  data() {
    return {
      selectParams: {
        username: '',
        hospitalName: '',
        page: 1,
        rows: 10,
      },
      selectUserList: [],
      userList: [],
      multipleSelection: [],
      totalCount: 0,

      rulesAddUser: {
        user_account: [
          { required: true, message: '请输入用户账户', trigger: 'blur' },
        ],
        user_name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
        ],
        unencrypted_pwd: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
        ],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        role_code: [
          { required: true, message: '请选择用户角色', trigger: 'change' },
        ],
        hospital_primary: [
          { required: true, message: '请输入医院主联系人', trigger: 'blur' },
        ],
        hospital_name: [
          { required: true, message: '请输入医院名称', trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {
    this._getUserList();
    this._getSelectUserList();
  },
  computed: {
    dialogTitle() {
      return this.operateState === 'edit' ? '编辑查看' : '添加医院';
    },
  },
  methods: {
    _getUserList() {
      const copyParams = JSON.parse(JSON.stringify(this.selectParams));
      this.$api.selectUInfoListPage(copyParams).then((res) => {
        this.userList = res.data.uInfoList;
        this.totalCount = res.data.count;
      });
    },
    _getSelectUserList() {
      this.$api.selecteURoleByProjectId().then((res) => {
        if (res.code === '200') {
          this.selectUserList = res.data;
        }
      });
    },
    search() {
      this._getUserList();
    },
    reset() {
      this.selectParams = {
        user_name: '',
        hospital_name: '',
        page: 1,
        rows: 10,
      };
      this._getUserList();
    },
    // 删除用户方法（删除一条或者是多条）
    _deleteUser(data) {
      let id = '';
      if (data.type === 'multiple') {
        if (!data.id.length) {
          this.$message.warning('请选择条目！');
          return;
        } else {
          id = JSON.stringify(data.id);
        }
      } else if (data.type === 'single') {
        id = JSON.stringify([data.id]);
      }
      this.$api.deleteUserInfoBatch({ userIds: id }).then((res) => {
        if (res.code === '200') {
          this._getUserList();
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        }
      });
    },
    formatterRole(row) {
      console.log(row);
      return row.role_code === '1003' ? '用户' : '管理员';
    },
    /**  **************以下为分页方法↓******************** */
    handleSizeChange(pageSize) {
      this.selectParams.rows = pageSize;
      this._getUserList();
    },
    handleCurrentChange(currentPage) {
      this.selectParams.page = currentPage;
      this._getUserList();
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
