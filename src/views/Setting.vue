<template>
  <div class="report-list">
    <padding-wrapper>
      <search-wrapper>
        <h2>设置个人信息</h2>
        <div class="info-warpper">
          <el-form ref="Info" :model="Info" status-icon :rules="rule" style="width:420px;" label-width="80px">
            <el-form-item label="账号" prop="name">
              <el-input disabled v-model="account"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="Info.name"></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="user_password">
              <el-input type="password" v-model="Info.user_password"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="Info.pass"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="checkPass">
              <el-input type="password" v-model="Info.checkPass"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-wrapper">
          <!-- <el-button size="mini" @click="resetForm()">&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;</el-button> -->
          <el-button size="mini" type="primary" @click="submitForm('Info')">&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;</el-button>
        </div>
      </search-wrapper>
    </padding-wrapper>
  </div>
</template>

<script>
import SearchWrapper from '$base-c/SearchWrapper';
import PaddingWrapper from '$base-c/PaddingWrapper';

export default {
  name: 'Setting',
  components: {
    SearchWrapper,
    PaddingWrapper,
  },
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };
    const validateOldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入旧密码'));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号'));
      } else if (!/^1[34578]\d{9}$/.test(this.Info.phone)) {
        return callback(new Error('请正确输入手机号'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      const pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!pPattern.test(value)) {
        callback(new Error('密码中要包括数字大小写字母，不得少于6位'));
      } else {
        if (this.Info.checkPass !== '') {
          this.$refs.Info.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.Info.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      account: '',
      role: '',
      Info: {
        name: '',
        phone: '',
        pass: '',
        checkPass: '',
        user_password: '',
      },
      rule: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' },
        ],
        user_password: [
          { validator: validateOldPass, trigger: 'blur' },
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
        ],
        name: [
          { validator: checkName, trigger: 'blur' },
        ],
      },
    };
  },

  mounted() {
    this.role = this.$store.getters.getRole;
    this._getUserBaseInfo();
  },
  methods: {
    _getUserBaseInfo() {
      this.$api.selectUInfoByUserId({ userId: this.$store.state.id }).then((res) => {
        if (res.code === '200') {
          this.account = res.data.user_account;
          this.Info.name = res.data.user_name;
          this.Info.phone = res.data.phone;
        }
      }).catch(() => {
        this.$message.warning('获取用户信息失败！');
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const user_name = this.Info.name;
          const postData = {
            user_password: this.Info.user_password,
            newPassword: this.Info.pass,
            againNewPassword: this.Info.pass,
          };
          const updateName = this.$api.updateUserNameByUserId({ user_name });
          const updatePassword = this.$api.updateUInfoPassworsd(postData);
          Promise.all([updateName, updatePassword]).then(() => {
            this.$message.success('修改信息成功！');
          });
        }
      });
    },
    resetForm() {
      this.$router.go(-1);
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
        padding: 1rem 0 4rem 1rem;
        margin: 0 -25px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
      }
      .btn-wrapper {
        display: flex;
        padding-top: 30px;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

