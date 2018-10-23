import http from '../util/request';
import { getDataStringify } from '../util/utils';

export default {
  // GET /util/createValidCode 生成验证码
  createValidCode: data => http.get(getDataStringify('/util/createValidCode', data)),
  // GET /util/selectAllProjectInfo 获取所有项目信息列表
  selectAllProjectInfo: data => http.get(getDataStringify('/util/selectAllProjectInfo', data)),
  // GET /util/selectDictionaryList 通过类型字典列表
  selectDictionaryList: data => http.get(getDataStringify('/util/selectDictionaryList', data)),
  // POST /util/selectRandomNumber 获取短信验证码盗刷随机数
  selectRandomNumber: data => http.post('/util/selectRandomNumber', data),
  // POST /util/selectSMSVerifyCode 获取短信验证码
  selectSMSVerifyCode: data => http.post('/util/selectSMSVerifyCode', data),
  // GET /util/selectUserInfoByUsbKey 通过key获取用户信息
  selectUserInfoByUsbKey: data => http.get(getDataStringify('/util/selectUserInfoByUsbKey', data)),
  // POST /util/upload111 上传报告111
  upload111: data => http.post('/util/upload111', data),
};
