<template>
  <div class="login">
    <div v-show="!isHelp" class="login-box">
      <div class="white_wrap">
        <h1 class="mb-30">满意云文件管理平台</h1>
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
                <el-input v-show="isPlug" @keydown.enter.native="doLogin" type="password" v-model="form.user_password"></el-input>
                <a v-show="!isPlug" style="color:#409EFF;cursor:pointer" :href="`${URL}/util/downDrive`">点击安装U盾插件</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="项　目" prop="project_id">
                <el-select disabled="true" v-model="form.project_id" placeholder="请选择项目">
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
          <el-row v-show="!usbKey">
            <el-col :span="6" :offset="1">
              <el-form-item label-width="390px;">
                <div v-show="isPlug  && !isIE9">
                  <i style="color:red" class="iconfont icon-tishi"></i>
                  <span style="color:red">请插入U盾！</span>
                </div>
                <div v-show="isIE9">
                  <i style="color:red" class="iconfont icon-tishi"></i>
                  <span style="color:red;">对不起，请使用高版本浏览器<a href="http://web.manyiyun.cn/file_system/util/downGoogle49" style="color:#409EFF;cursor:pointer">点此下载</a></span>
                </div>
                <div v-show="!isPlug">
                  <i style="color:red" class="iconfont icon-tishi"></i>
                  <span style="color:red">无法安装插件？ <i @click="isHelp = true" style="color:#409EFF;cursor:pointer">点击这里</i></span>
                </div>
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
    <div v-show="isHelp" class="login-box">
        <div class="white_wrap help">
          <i @click="isHelp = false"></i>
        </div>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { deepCloneJson } from '$global/global-function';
import auth from '../util/auth';
import localMenu from '../routerconfig/admin';
import { login_onclick2 } from '../util/usbKey';
import { getIEVersion } from '../util/utils';
import { SoftKey3W } from '../util/Syunew6';
import { MOCK_API } from '../util/request';

export default {
  name: 'LoginJL',
  data() {
    return {
      URL: '',
      valCodePrompt: '获取短信验证码',
      waitCoding: false,
      usbKey: false,
      s_pnp: null,
      isPlug: true,
      isHelp: false,
      isIE9: false,
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
    if (getIEVersion()) {
      this.isIE9 = true;
      return;
    }
    this.URL = MOCK_API;
    this.getProjectList();
    this.load();
    login_onclick2().then((res) => {
      if (res) {
        this.usbKey = true;
      }
    });
  },
  destroyed() {
    this.s_pnp.Socket_UK.close();
  },
  methods: {
    load() {
      const me = this;
      // 如果是IE10及以下浏览器，则跳过不处理，
      // if (navigator.userAgent.indexOf('MSIE') > 0 && !navigator.userAgent.indexOf('opera') > -1) return;
      try {
        this.s_pnp = new SoftKey3W();
        // 在使用事件插拨时，注意，一定不要关掉Sockey，否则无法监测事件插拨
        this.s_pnp.Socket_UK.onmessage = function got_packet(Msg) {
          const PnpData = JSON.parse(Msg.data);
          // 如果是插拨事件处理消息
          if (PnpData.type === 'PnpEvent') {
            if (PnpData.IsIn) {
              me.usbKey = true;
            } else {
              me.usbKey = false;
            }
          }
        };

        this.s_pnp.Socket_UK.onerror = function () {
          me.isPlug = false;
        };
      } catch (e) {
        alert(`${e.name}: ${e.message}`);
        return false;
      }
    },
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
              user_name,
              phone,
              hospital_id,
              user_account,
              id,
              project_id,
              project_name,
            } = data;
            auth.setProjectId(project_id);
            auth.setProjectName(project_name);
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
            sessionStorage.setItem('_undowloadFile', 'true');
          });
        }
      });
    },
    /** 获取项目列表 */
    getProjectList() {
      return this.$api.selectAllProjectInfo().then((res) => {
        this.projectList = res.data;
        this.form.project_id = res.data[0].project_code;
      });
    },
    /** 获取短信验证码 */
    getMsgCode() {
      login_onclick2()
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
            this.$message.success('验证码发送成功！！');
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
                count -= 1;
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
    .help{
      background: url("../assets/image/help.png") 0 0 no-repeat;
      background-size: 100% 100%;
      position: relative;
      i{
        position: absolute;
        top:0;
        right: 0;
        display: block;
        width: 35px;
        height: 35px;
      }
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

