import http from '../axios/request'
import { getDataStringify } from '../utils/utils.js'

export default {
  // GET /util/createValidCode 生成验证码
  createValidCode: (data) => http.get(getDataStringify('/util/createValidCode', data)),
  // GET /util/downFile1111 下载报告附件文件1111
  downFile1111: (data) => http.get(getDataStringify('/util/downFile1111', data)),
  // GET /util/selectAllProjectInfo 获取所有项目信息列表
  selectAllProjectInfo: (data) => http.get(getDataStringify('/util/selectAllProjectInfo',data)),
  // POST /util/selectRandomNumber 获取短信验证码盗刷随机数
  selectRandomNumber: (data) => http.post('/util/selectRandomNumber', data),
  // POST /util/selectSMSVerifyCode 获取短信验证码
  selectSMSVerifyCode: (data) => http.post('/util/selectSMSVerifyCode', data),
  // POST /util/upload111 上传报告111
  upload111: (data) => http.post('/util/upload111', data),
}
