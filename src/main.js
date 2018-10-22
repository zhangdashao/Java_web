// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from './store';
import api from './api';
import beforeRouterEach from './router/before-each';
import * as fun from './global/global-function';

Vue.use(ElementUI, { size: 'small' });
beforeRouterEach();
Vue.config.productionTip = false;
Vue.prototype.$fun = fun;
Vue.prototype.$api = api;
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
