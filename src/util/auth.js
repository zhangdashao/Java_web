export default {
  loginKey: '_loginKey7173887657',
  tokenKey: '_tokenKey1qazxsw2',
  roleKey: 'roleKey',
  userKey: '_userInfo',
  pathKey: '_loginPath',
  optKey: '_optKey',
  projectIdKey: '_projectIdKey',
  projectNameKey: '_projectNameKey',
  judgeLogin() {
    return sessionStorage.getItem(this.loginKey);
  },
  setLoginKey(value) {
    sessionStorage.setItem(this.loginKey, value);
  },
  getUserId() {
    return JSON.parse(sessionStorage.getItem(this.userKey)).id;
  },
  getToken() {
    return sessionStorage.getItem(this.tokenKey);
  },
  setToken(value) {
    sessionStorage.setItem(this.tokenKey, value);
  },
  setRole(rolw_code) {
    sessionStorage.setItem(this.roleKey, rolw_code);
  },
  getRole() {
    return sessionStorage.getItem(this.roleKey);
  },
  setUser(value) {
    sessionStorage.setItem(this.userKey, value);
  },
  getUser() {
    return JSON.parse(sessionStorage.getItem(this.userKey));
  },
  logout() {
    sessionStorage.clear();
  },
  setLoginPath(value) {
    sessionStorage.setItem(this.pathKey, JSON.stringify(value));
  },
  getLoginPath() {
    return JSON.parse(sessionStorage.getItem(this.pathKey));
  },
  setDefaultOpt(value) {
    sessionStorage.setItem(this.optKey, JSON.stringify(value));
  },
  getDefaultOpt() {
    return JSON.parse(sessionStorage.getItem(this.optKey));
  },
  setProjectId(value) {
    sessionStorage.setItem(this.projectIdKey, value);
  },
  getProjectId() {
    return sessionStorage.getItem(this.projectIdKey);
  },
  setProjectName(value) {
    sessionStorage.setItem(this.projectNameKey, value);
  },
  getProjectName() {
    return sessionStorage.getItem(this.projectNameKey);
  },
  codeToRole: {
    1000: '管理员',
    1001: '录入员',
    1002: '审核员',
    1003: '医院',
    1004: '卫计委初审',
    1005: '卫计委终审',
  },
};
