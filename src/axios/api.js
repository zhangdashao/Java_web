import http from './request'
import { getDataStringify } from '../utils/utils.js'

// 登录
export const login = (data) => http.get(getDataStringify('/login',data))
