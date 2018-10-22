import http from '../util/request';
import { getDataStringify } from '../util/utils';

export default {
  // POST /user/deleteUserInfoBatch 管理员批量删除用户
  deleteUserInfoBatch: data => http.post('/user/deleteUserInfoBatch', data),
  // POST /user/insertUInfo 管理员添加用户信息
  insertUInfo: data => http.post('/user/insertUInfo', data),
  // POST /user/logOut 退出登录
  logOut: data => http.post('/user/logOut', data),
  // POST /user/login 用户账号密码登录
  login: data => http.post('/user/login', data),
  // GET /user/selectUInfoByUserId 通过userId查询用户基本信息
  selectUInfoByUserId: data => http.get(getDataStringify('/user/selectUInfoByUserId', data)),
  // GET /user/selectUInfoList 管理员根据条件查询用户信息
  selectUInfoList: data => http.get(getDataStringify('/user/selectUInfoList', data)),
  // GET /user/selectUInfoListPage 管理员通过项目id查询用户列表
  selectUInfoListPage: data => http.get(getDataStringify('/user/selectUInfoListPage', data)),
  // GET /user/selecteURoleByProjectId 管理员根据项目id查询项目角色
  selecteURoleByProjectId: data => http.get(getDataStringify('/user/selecteURoleByProjectId', data)),
  // POST /user/updateUInfoPassworsd 用户修改密码
  updateUInfoPassworsd: data => http.post('/user/updateUInfoPassworsd', data),
  // POST /user/updateUserNameByUserId 用户修改用户名称
  updateUserNameByUserId: data => http.post('/user/updateUserNameByUserId', data),
  // POST /user/updateUserPhoneByUserId 管理员修改用户手机号
  updateUserPhoneByUserId: data => http.post('/user/updateUserPhoneByUserId', data),
  // POST /user/verificationCodeLogin 验证码登录
  verificationCodeLogin: data => http.post('/user/verificationCodeLogin', data),
};
