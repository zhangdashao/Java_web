<template>
    <!-- <div class="user-detail"> -->
    <padding-wrapper>
        <div class="detail-wrap">
            <base-title :title="titleText"></base-title>
            <el-form ref="detailForm" :model="detailForm" :rules="detailFormRules" label-width="90px" status-icon>
                <el-row :gutter="30">
                    <el-col :span="6">
                        <el-form-item label="用户角色" prop="role_code">
                            <el-select :disabled="isPwd" style="width:100%" v-model="detailForm.role_code" placeholder="请选择角色">
                                <el-option v-for="item in roleList" :key="item.role_code" :label="item.role_name" :value="item.role_code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="医院名称:" prop="hospital_id">
                            <el-input :disabled="isPwd" v-model="detailForm.hospital_id" placeholder="请输入医院名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="科室/部门" prop="department_name">
                            <el-input :disabled="isPwd" v-model="detailForm.department_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="病区">
                            <el-input :disabled="isPwd" v-model="detailForm.department_id" placeholder="没有可为空"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="6">
                        <el-form-item label="姓名" prop="user_name">
                            <el-input :disabled="isPwd" v-model="detailForm.user_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系方式" prop="phone">
                            <el-input :disabled="isPwd" v-model="detailForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="6">
                        <el-form-item label="用户名" prop="user_account">
                            <el-input :disabled=" routeType!=='add'" v-model="detailForm.user_account"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="用户密码" prop="unencrypted_pwd">
                            <el-input v-model="detailForm.unencrypted_pwd"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="确认密码" prop="againNewPassword">
                            <el-input v-model="detailForm.againNewPassword"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row type="flex" justify="end">
                <el-button-group>
                    <el-button size="large" type="primary" @click="linkList">　取消　</el-button>
                    <el-button v-show="routeType === 'add'" size="large" type="primary" @click="createUser">确定添加</el-button>
                    <el-button v-show="routeType !== 'add'" size="large" type="primary" :loading="modifyLoading" @click="confirmModify">确定修改</el-button>
                </el-button-group>
            </el-row>
        </div>
    </padding-wrapper>
</template>

<script>
import BaseTitle from '$base-c/BaseTitle';
import { isPhoneAvailable, deepCloneJson } from '$global/global-function';
import PaddingWrapper from '$base-c/PaddingWrapper';


export default {
  name: 'UserDetail',
  components: {
    BaseTitle,
    PaddingWrapper,
  },
  data() {
    // const phoneValid = (rule, value, callback) => {
    //   if (isPhoneAvailable(value)) {
    //     callback();
    //   } else {
    //     callback('请输入正确手机号 ');
    //   }
    // };
    // const confirmPwdValid = (rule, value, callback) => {
    //   if (value !== this.detailForm.unencrypted_pwd) {
    //     callback('请保持两次密码一致');
    //   } else {
    //     callback();
    //   }
    // };
    return {
      routeType: 'add',
      titleText: '创建用户',
      roleList: [],
      detailForm: {
        role_code: '',
        hospital_id: '',
        department_name: '',
        department_id: '',
        user_name: '',
        phone: '',
        user_account: '',
        unencrypted_pwd: '',
        againNewPassword: '',
        hospital_primary: '1',
      },
      modifyLoading: false,
      detailFormRules: {
        // role_code: [
        //   { required: true, message: '请选择角色', trigger: 'blur' },
        // ],
        // hospital_id: [
        //   { required: true, message: '请选择医院', trigger: 'blur' },
        // ],
        // department_name: [
        //   { required: true, message: '请输入科室', trigger: 'blur' },
        // ],
        // user_name: [
        //   { required: true, message: '请输入姓名', trigger: 'blur' },
        // ],
        // phone: [
        //   { required: true, message: '请输入手机号', trigger: 'blur' },
        //   { validator: phoneValid, trigger: 'blur' },
        // ],
        // user_account: [
        //   { required: true, message: '请输入用户名', trigger: 'blur' },
        // ],
        // unencrypted_pwd: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
        // ],
        // againNewPassword: [
        //   { required: true, message: '请再次确认密码', trigger: 'blur' },
        //   { validator: confirmPwdValid, trigger: 'blur' },
        // ],
      },
    };
  },
  computed: {
    isPwd() {
      return this.routeType === 'pwd';
    },
  },
  mounted() {
    this.getProjectList();
    const { type, data } = this.$route.params;
    this.routeType = type;
    switch (type) {
      case 'edit':
        {
          this.routeType = 'edit';
          this.titleText = '编辑信息';
          const { role_code, hospital_id, department_name, department_id, user_name, phone, user_account, unencrypted_pwd, hospital_primary } = data;
          this.detailForm = { role_code, hospital_id, department_name, department_id, user_name, phone, user_account, unencrypted_pwd, againNewPassword: unencrypted_pwd, hospital_primary };
        }
        break;
      case 'pwd':
        {
          this.routeType = 'pwd';
          this.titleText = '修改密码';
          const { role_code, hospital_id, department_name, department_id, user_name, phone, user_account, unencrypted_pwd, hospital_primary } = data;
          this.detailForm = { role_code, hospital_id, department_name, department_id, user_name, phone, user_account, unencrypted_pwd, againNewPassword: unencrypted_pwd, hospital_primary };
        }
        break;
      default:
        break;
    }
  },
  methods: {
    getProjectList() {
      this.$api.getProjectRoleList().then(({ data }) => {
        this.roleList = deepCloneJson(data);
      });
    },
    linkList() {
      this.$router.push({
        path: '/userlist',
      });
    },
    createUser() {
      this.$refs.detailForm.validate((valid) => {
        if (valid) {
          const createData = deepCloneJson(this.detailForm);
          !createData.department_id && delete createData.department_id;
          createData.role_desc = this.roleList.find(item => item.role_code === createData.role_code).role_name;
          this.$api.createUser(createData).then(({ data }) => {
            if (data.code === '200') {
              this.$message.success('添加用户成功');
            }
          });
        }
      });
    },
    confirmModify() {
      if (this.isPwd) {
        this.modifyLoading = true;
        const { user_account, unencrypted_pwd, againNewPassword } = this.detailForm;
        this.$api.AdminModifyUserPwd({ user_account, newPassword: unencrypted_pwd, againNewPassword }).then((res) => {
          if (res.code === '200') {
            this.modifyLoading = false;
            this.$message.success('密码修改成功');
          }
        }, () => {
          this.modifyLoading = false;
        });
      } else {
        this.$api.AdminModifyUserInfo(deepCloneJson(this.detailForm)).then((res) => {
          if (res.code === '200') {
            this.$message.success('用户信息修改成功');
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
    .detail-wrap {
        background: #ffffff;
        box-sizing: border-box;
        padding: 40px 20px;
    }
</style>
