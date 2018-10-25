<template>
  <div class="report-list">
    <padding-wrapper>
      <search-wrapper>
        <h2>{{isAdd ? '创建用户' : '编辑用户'}}</h2>
        <div class="info-warpper">
          <el-form ref="Info" :model="Info" status-icon :rules="rule" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="登录名" prop="user_account">
                  <el-input :disabled="!isAdd" v-model="Info.user_account"></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="isAdd" :span="5">
                <el-form-item label="登录密码" prop="unencrypted_pwd">
                  <el-input v-model="Info.unencrypted_pwd"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号码" prop="phone">
                  <el-input v-model="Info.phone"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="姓名" prop="user_name">
                  <el-input :disabled="!isAdd" v-model="Info.user_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="isAdd" :span="5">
                <el-form-item label="确认密码" prop="againNewPassword">
                  <el-input v-model="Info.againNewPassword"></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="Info.role_code === '1003'" :span="5">
                <el-form-item label="医院名称" prop="hospital_name">
                  <el-input :disabled="!isAdd" v-model="Info.hospital_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="角色" prop="name">
                  <el-radio v-model="Info.role_code" label="1003">用户</el-radio>
                  <el-radio v-model="Info.role_code" label="1000">管理员</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <div style="display:flex;justify-content:center">
                  <img v-show="!usbKey" src="../assets/image/uninsert.png" alt="">
                  <img v-show="usbKey" src="../assets/image/insert.png" alt="">
                </div>
              </el-col>

            </el-row>

          </el-form>
        </div>
        <div class="btn-wrapper">
          <el-button size="mini" @click="resetForm()">&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;</el-button>
          <el-button size="mini" type="primary" @click="submitForm('Info')">&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;</el-button>
        </div>
      </search-wrapper>
    </padding-wrapper>
  </div>
</template>

<script>
import SearchWrapper from '$base-c/SearchWrapper';
import PaddingWrapper from '$base-c/PaddingWrapper';
import auth from '../util/auth';
import { login_onclick } from '../util/usbKey';
import { SoftKey6W } from '../util/Syunew6';

export default {
  name: 'CreateUser',
  components: {
    SearchWrapper,
    PaddingWrapper,
  },
  data() {
    const validatePass = (rule, value, callback) => {
      const pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!pPattern.test(value)) {
        callback(new Error('密码中要包括数字大小写字母，不得少于6位'));
      } else {
        if (this.Info.unencrypted_pwd !== '') {
          this.$refs.Info.validateField('againNewPassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.Info.unencrypted_pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const phone = (rule, value, callback) => {
      if (!(/^1[234578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    return {
      isAdd: true,
      usbKey: false,
      s_pnp: null,
      Info: {
        user_account: '',
        unencrypted_pwd: '',
        againNewPassword: '',
        user_name: '',
        role_code: '1003',
        hospital_name: '',
        phone: '',
        usbKey: '',
        hospital_id: -1,
        hospital_primary: 1,
      },
      rule: {
        unencrypted_pwd: [{ validator: validatePass, trigger: 'blur' }],
        againNewPassword: [{ validator: validatePass2, trigger: 'blur' }],
        phone: [{ validator: phone, trigger: 'blur' }],
        user_account: [{ required: true, message: '登录名不能为空', trigger: 'blur' }],
        user_name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        hospital_name: [{ required: true, message: '医院名不能为空', trigger: 'blur' }],
      },
    };
  },

  mounted() {
    console.log(this.$route.query);
    this.judgeOperate(this.$route.query);
    this.load();
    this.userInfo = auth.getUser();
  },
  destroyed() {
    this.s_pnp.Socket_UK.close();
  },
  methods: {
    load() {
      const me = this;
      // 如果是IE10及以下浏览器，则跳过不处理
      if (navigator.userAgent.indexOf('MSIE') > 0 && !navigator.userAgent.indexOf('opera') > -1) return;
      try {
        this.s_pnp = new SoftKey6W();


        // 在使用事件插拨时，注意，一定不要关掉Sockey，否则无法监测事件插拨
        this.s_pnp.Socket_UK.onmessage = function got_packet(Msg) {
          const PnpData = JSON.parse(Msg.data);
          if (PnpData.type == 'PnpEvent')// 如果是插拨事件处理消息
          {
            if (PnpData.IsIn) {
              login_onclick().then((res) => {
                me.usbKey = true;
                me.Info.usbKey = res;
              });
              // alert(`UKEY已被插入，被插入的锁的路径是：${PnpData.DevicePath}`);
            } else {
              me.usbKey = false;
              me.Info.usbKey = '';
              // alert(`UKEY已被拨出，被拨出的锁的路径是：${PnpData.DevicePath}`);
            }
          }
        };
      } catch (e) {
        console.log(e);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this._insertUser();
          } else {
            this._editUser(this.$route.query.id);
          }
        }
      });
    },
    _insertUser() {
      this.$api.insertUInfo(this.Info).then((res) => {
        if (res.code === '200') {
          this.$message.success('添加成功！');
          this.$router.go(-1);
        }
      });
    },
    _editUser(userId) {
      const { phone, usbKey } = this.Info;
      this.$api.updateUserInfoByManage({ userId, phone, usbKey }).then((res) => {
        if (res.code === '200') {
          this.$message.success('修改成功！');
          this.$router.go(-1);
        }
      });
    },
    _getUserInfo(userId) {
      this.$api.selectUInfoByUserId({ userId }).then((res) => {
        if (res.code === '200') {
          console.log(res);
          this.Info.user_account = res.data.user_account;
          this.Info.user_name = res.data.user_name;
          this.Info.phone = res.data.phone;
          this.Info.hospital_name = res.data.hospital_name;
          this.Info.role_code = res.data.role_code;
          if (res.data.usb_key_pid) {
            this.usbKey = true;
          } else {
            this.usbKey = false;
          }
        }
      }).catch(() => {
        this.$message.warning('获取用户信息失败');
      });
    },
    judgeOperate(params) {
      if (params.type === 'edit') {
        this.isAdd = false;
        this._getUserInfo(params.id);
      } else if (params.type === 'add') {
        this.isAdd = true;
      }
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

