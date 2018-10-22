import * as types from './mutations-types';

const mutations = {
  [types.SET_MENU](state, sideMenu) {
    state.sideMenu = sideMenu;
  },
  [types.SAVE_ID](state, id) {
    state.id = id;
  },
  [types.SAVE_ROLE](state, role_code) {
    state.role_code = role_code;
  },
};
export default mutations;

/**
 * ========================================
 * @example
 */
