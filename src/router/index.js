import Vue from 'vue';
import Router from 'vue-router';

const Login = r => require.ensure([], () => r(require('$views/Login.vue')), 'Login');
const LoginJL = r => require.ensure([], () => r(require('$views/LoginJL.vue')), 'LoginJL');
const Layout = r => require.ensure([], () => r(require('$views/Layout.vue')), 'Layout');
const CommonFile = r => require.ensure([], () => r(require('$views/CommonFile.vue')), 'CommonFile');
const Upload = r => require.ensure([], () => r(require('$views/Upload.vue')), 'Upload');
const Setting = r => require.ensure([], () => r(require('$views/Setting.vue')), 'Setting');
const FileList = r => require.ensure([], () => r(require('$views/FileList.vue')), 'FileList');

export const defaultRouter = [
  {
    path: '/',
    redirect: '/fileList',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'fileList',
        name: 'FileList',
        component: FileList,

      },

      {
        path: 'upload',
        name: 'Upload',
        component: Upload,

      },
      {
        path: 'setting',
        name: 'Setting',
        component: Setting,

      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/loginjl',
    name: 'LoginJL',
    component: LoginJL,
  },
];


Vue.use(Router);

export default new Router({
  routes: defaultRouter,
});
