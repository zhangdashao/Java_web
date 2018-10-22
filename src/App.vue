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
    });
  },
  methods: {
    ...mapActions({
      handlePermission: 'handlePermission',
    }),
  },
};
</script>

