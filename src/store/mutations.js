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
  [types.SAVE_UNDOWNLOAD_COUNT](state, unDownloadFile) {
    state.unDownloadFileCount = unDownloadFile;
  },
  [types.CHANGE_DOWNLOAD_STATUS](state, value) {
    state.toDownloadFile = value;
  },
};
export default mutations;

/**
 * ========================================
 * @example
 */
