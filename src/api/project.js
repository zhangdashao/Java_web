import http from '../util/request';
import { getDataStringify } from '../util/utils';

export default {
  // POST /project/addPInfo 添加项目信息
  addPInfo: data => http.post('/project/addPInfo', data),
  // POST /project/deletePInfo 删除项目信息
  deletePInfo: data => http.post('/project/deletePInfo', data),
  // GET /project/selectProjectList 查询项目列表
  selectProjectList: data => http.get(getDataStringify('/project/selectProjectList', data)),
  // POST /project/updatePInfo 修改项目信息
  updatePInfo: data => http.post('/project/updatePInfo', data),
};
