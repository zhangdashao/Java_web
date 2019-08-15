// import { Notification } from 'element-ui';
import router from './index';
import auth from '../util/auth';

// 路由钩子过滤配置
const filterPath = ['/login', '/loginjl'];

export default () => {
  router.beforeEach((to, from, next) => {
    if (filterPath.indexOf(to.path) !== -1) {
      next();
      return;
    }
    if (auth.judgeLogin()) {
      next();
    } else {
      // Notification.error({
      //   title: '错误',
      //   message: '请先登录',
      // });
      next({
        path: '/login',
      });
    }
    if (!to.matched.length) {
      next({
        path: '/fileList',
      });
    }
  });
};

