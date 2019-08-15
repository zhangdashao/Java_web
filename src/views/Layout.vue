<template>
    <div class="layout">
        <el-container>
            <el-aside style="width:200px;display:flex;flex-direction:column;height:100%">
                <div class="logo-wrapper">
                    <img src="../assets/image/left_title.png" width="176" height="52" alt="嘉量">
                </div>
                <BaseAside></BaseAside>
            </el-aside>
            <el-container>
                <el-header height="60px">
                    <div class="header-content">
                        您好,{{user_name}}　　{{role === 'admin'? '管理员' : '医院用户'}}|
                        <!-- <a href="#">设置</a>| -->
                        <a href="#" @click="logout">退出</a>

                        <span v-show="role === 'admin'" style=" margin: 0 30px;">
                            <el-badge :value="$store.state.unDownloadFileCount" :max="10" class="item">
                                <el-button :disabled="$store.state.unDownloadFileCount == 0" type="danger" icon="el-icon-message" @click="toUndownload" round></el-button>
                            </el-badge>
                        </span>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import BaseAside from '$component/base-components/BaseAside';
import auth from '$util/auth';

export default {
  role: '',
  user_name: '',
  name: 'Layout',
  components: {
    BaseAside,
  },
  data() {
    return {
      unDownloadFile: 0,
    };
  },
  created() {
    this.role = this.$store.getters.getRole;
    this.user_name = JSON.parse(sessionStorage.getItem(auth.userKey)).user_name;
    this.unDownloadFile = this.$store.state.unDownloadFileCount;
  },
  mounted() {
  },
  methods: {
    logout() {
      const loginPath = auth.getLoginPath();
      this.$api.logOut().then((res) => {
        if (res.code === '200') {
          auth.logout();
          this.$router.push(loginPath);
        }
      }, () => {
        auth.logout();
        this.$router.push(loginPath);
      });
    },
    toUndownload() {
      this.$router.push({ name: 'FileList', params: { type: 'undownload' } });
      let count = this.$store.state.toDownloadFile;
      this.toDownload(count += 1);
    },
    ...mapMutations({
      toDownload: 'CHANGE_DOWNLOAD_STATUS',
    }),
  },
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .layout {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100vh;
        width: 100%;
        .el-container {
            height: 100%;
        }
        .logo-wrapper {
            height: 140px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .el-container{
            box-shadow: 2px 0 6px #000;
        }
        .el-header{
            box-shadow: 2px 0px 6px #a79898;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 14px;
            a{
                text-decoration: none;
                color: #4576CE;
            }
        }
        .el-main{
            padding: 0;
            font-size: 0;
            background: #ebeef5;
        }

    }
</style>

