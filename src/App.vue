<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import auth from './util/auth';

export default {
  name: 'App',
  mounted() {
    // 刷新时 判断loginkey？触发handlePermission
    this.$nextTick(() => {
      const loginKeyValue = auth.judgeLogin();
      const unDownloadFileCount = auth.getUNdownloadFileCount();
      const id = auth.getUserId();
      const role_code = auth.getRole();
      console.log(role_code);
      if (loginKeyValue) {
        this.handlePermission({
          menuData: JSON.parse(loginKeyValue),
          id,
          role_code,
        });
      }
      if (unDownloadFileCount) {
        this.handleSaveCount(unDownloadFileCount);
      }
    });
  },
  methods: {
    ...mapActions({
      handlePermission: 'handlePermission',
      handleSaveCount: 'handleSaveCount',
    }),
  },
};
</script>
<style>
@import url('./util/element-cover.scss');
</style>

