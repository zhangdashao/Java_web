import http from '../util/request';
import { getDataStringify } from '../util/utils';

export default {
  // POST /file/deleteManageUploadFile 管理员删除自己上传的公共文件
  deleteManageUploadFile: data => http.post('/file/deleteManageUploadFile', data),
  // GET /file/downFile 下载文件
  downFile: data => http.get(getDataStringify('/file/downFile', data), { responseType: 'blob' }),
  // GET /file/downFileBatch 批量下载报告附件文件
  downFileBatch: data => http.get(getDataStringify('/file/downFileBatch', data), { responseType: 'blob' }),
  // GET /file/selectCommonUserPubList 普通用户查询公共文件列表
  selectCommonUserPubList: data => http.get(getDataStringify('/file/selectCommonUserPubList', data)),
  // GET /file/selectFileDeleteList 管理员查询文件删除列表
  selectFileDeleteList: data => http.get(getDataStringify('/file/selectFileDeleteList', data)),
  // GET /file/selectFileDownRecordList 查询文件下载列表
  selectFileDownRecordList: data => http.get(getDataStringify('/file/selectFileDownRecordList', data)),
  // GET /file/selectFileList 查询文件列表，管理员和普通用户都能用
  selectFileList: data => http.get(getDataStringify('/file/selectFileList', data)),
  // GET /file/selectManageUploadPubList 管理员查询自己上传的公共文件列表
  selectManageUploadPubList: data => http.get(getDataStringify('/file/selectManageUploadPubList', data)),
  // GET /file/selectNoDownloadCount 管理员查询未下载文件总数
  selectNoDownloadCount: () => http.get('/file/selectNoDownloadCount'),
  // POST /file/updateFileInfoStatus 设置文件状态
  updateFileInfoStatus: data => http.post('/file/updateFileInfoStatus', data),
  // POST /file/uploadCommonUser 普通医院用户上传文件
  uploadCommonUser: data => http.post('/file/uploadCommonUser', data),
  // POST /file/uploadManageUser 管理员上传文件
  uploadManageUser: data => http.post('/file/uploadManageUser', data),
};
