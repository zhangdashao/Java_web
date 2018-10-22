import * as types from './mutations-types';
import addComponent from '../util/dynamicRouter';
import VM from '../main';
import { deepCloneJson } from '../global/global-function';
import { defaultRouter } from '../router/index';
import auth from '../util/auth';


/**
 * ========================================
 * @example
 */

/**
  * (处理菜单权限action) 1, 数据存入vuex 2，动态加载路由 3,完成权限处理跳转路由
  * @param {menuData} array 权限对应菜单数据
  */


export const handlePermission = ({ commit }, { menuData, id, role_code }) => {
  const resData = deepCloneJson(menuData);
  commit(types.SET_MENU, resData);
  commit(types.SAVE_ID, id);
  commit(types.SAVE_ROLE, role_code);
  const copyResData = deepCloneJson(resData);
  const routes = copyResData.reduce((init, next) => (next.children.length ? init.concat(...next.children) : ''), []);
  routes.forEach((route) => {
    route.component = addComponent(route.name);
  });
  defaultRouter[0].children.push(...routes);
  VM.$router.addRoutes(defaultRouter);
  // if (role_code === '1000') {
  //   VM.$router.push({ path: '/userList' });
  // } else if (role_code === '1003') { VM.$router.push({ path: '/fileList' }); }
  if (VM.$route.path === '/login' || VM.$route.path === '/loginjl') {
    VM.$router.push({ path: '/commonFile' });
  }
};

