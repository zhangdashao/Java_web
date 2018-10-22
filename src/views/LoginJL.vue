<template>
  <div class="login">
    <div class="login-box">
      <div class="white_wrap">
        <h1 class="mb-30">嘉量文件管理平台</h1>
        <el-form class="login-form" ref="form" status-icon :model="form" :rules="rules" label-width="80px" label-position="left">

          <el-row>
            <el-col :span="9">
              <el-form-item label="用户名" prop="user_account">
                <el-input v-model="form.user_account"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="密　码" prop="user_password">
                <el-input @keydown.enter.native="doLogin" type="password" v-model="form.user_password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="项　目" prop="project_id">
                <el-select v-model="form.project_id" placeholder="请选择项目">
                  <el-option v-for="item in projectList" :key="item.project_code" :label="item.project_name" :value="item.project_code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="usbKey" :gutter="20" class="mb-30">
            <el-col :span="6">
              <el-form-item label="验证码" class="auth-code" prop="SMSCode">
                <el-input @keydown.enter.native="doLogin" v-model="form.SMSCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button @click="getMsgCode" :disabled="waitCoding" type="text">{{valCodePrompt}}</el-button>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="5" :offset="1">
              <el-form-item label-width="300px;">
                <i style="color:red" class="iconfont icon-tishi"></i>
                <span style="color:red">请插入U盾！</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="waitCoding">
            <el-col :span="9">
              <el-form-item label-width="300px;">
                <i style="color:#409EFF" class="iconfont icon-tishi"></i>
                <span style="color:#409EFF">已向您尾号{{form.phone.substring(7)}}的手机发送验证码，请查收</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="3">
              <el-form-item label-width="0">
                <el-button round type="primary" @click="doLogin">　　登录　　</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-form-item label-width="300px;" label="您好，欢迎登陆">
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { deepCloneJson } from '$global/global-function';
import auth from '../util/auth';
import localMenu from '../routerconfig/hospital';
import { load, login_onclick } from '../util/usbKey';

export default {
  name: 'LoginJL',
  data() {
    return {
      valCodePrompt: '获取短信验证码',
      waitCoding: false,
      usbKey: false,
      form: {
        user_account: '',
        user_password: '',
        project_id: '',
        SMSCode: '',
        phone: '',
        usbKey: '',
      },
      projectList: [],
      rules: {
        user_account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        user_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        SMSCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        project_id: [{ required: true, message: '请输入项目', trigger: 'blur' }],
      },
    };
  },
  mounted() {
    this.getProjectList();
    load().then((res) => {
      console.log(res);
      if (res) {
        this.usbKey = true;
      } else {
        this.usbKey = false;
      }
    });
  },
  methods: {
    doLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const loginData = Object.assign({}, this.form);
          const enterAdmin = this.form.project_id === 'admin';
          if (!this.usbKey) {
            this.$message.error('请插入U盾！');
            return;
          }
          this.$api.login(loginData).then(({ data }) => {
            const {
              urlList: menu,
              user_name,
              phone,
              hospital_id,
              user_account,
              id,
            } = data;
            auth.setProjectId(this.form.project_id);
            auth.setLoginPath({ name: 'LoginJL' });
            auth.setUser(
              JSON.stringify({
                user_name,
                phone,
                hospital_id,
                user_account,
                id,
              }),
            );
            // auth.setLoginKey(JSON.stringify(deepCloneJson(menu)));
            auth.setLoginKey(JSON.stringify(deepCloneJson(localMenu)));
            auth.setRole(data.role_code);
            this.handlePermission({
              // menuData: deepCloneJson(menu),
              menuData: deepCloneJson(localMenu),
              enterAdmin,
              id,
              role_code: data.role_code,
            });
            auth.setToken(data.token);
          });
        }
      });
    },
    /** 获取项目列表 */
    getProjectList() {
      return this.$api.selectAllProjectInfo().then(({ data }) => {
        this.projectList = data;
      });
    },
    /** 获取短信验证码 */
    getMsgCode() {
      login_onclick()
        .then((res) => {
          if (res) {
            this.form.usbKey = res;
            // 通过usbkeyid获取手机号
            return this.$api.selectUserInfoByUsbKey({ usbKey: res });
          }
        })
        .then((res) => {
          if (res.code === '200') {
            this.form.phone = res.data.phone;
            // 通过手机号获取获取验证码随机数
            return this.$api.selectRandomNumber({ phone: res.data.phone });
          }
        })
        .then((res) => {
          if (res.code === '200') {
            return this.$api.selectSMSVerifyCode({
              phone: this.form.phone,
              randomValidate: res.data,
            });
          }
        })
        .then((res) => {
          if (res.code === '200') {
            this.$message.success(`验证码发送成功！！${res.data}`);
          }
        })
        .then(() => {
          // 未获取验证码
          if (!this.waitCoding) {
            this.waitCoding = true;
            let count = 10;
            this.valCodePrompt = `${count}s后重新获取`;
            const timer = setInterval(() => {
              if (count > 1) {
                count--;
                this.valCodePrompt = `${count}s后重新获取`;
              } else {
                this.valCodePrompt = '获取短信验证码';
                this.waitCoding = false;
                clearInterval(timer);
              }
            }, 1000);
          }
        })
        .catch(() => {
          this.$message.warning('验证码获取失败！！');
        });

      setTimeout(() => {}, 0);
    },

    ...mapMutations({
      setRoutes: 'SET_ROUTES',
    }),
    ...mapActions({
      getMenu: 'getMenu',
      handlePermission: 'handlePermission',
    }),
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: url("../assets/image/login_bg.jpg") 0 0 no-repeat;
  background-size: cover;
  .login-box {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -450px;
    margin-top: -250px;
    width: 900px;
    height: 450px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 15px #000;
    box-sizing: border-box;
    .white_wrap {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 50px;
      background: url("../assets/image/login_img.png") 392px 100px no-repeat;
    }
    h1 {
      color: #5599dd;
      font-weight: normal;
      margin: 3px 0;
    }
    .mb-30 {
      margin-bottom: 30px;
    }
  }
}
</style>

