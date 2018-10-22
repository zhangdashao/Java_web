/**
 * 1.(函数参数必填默认值)
 * @param {string} arg 参数名
 * @return 抛出错误
 */
export const required = (arg) => {
  throw new Error(`arguments ${arg || ''} is required`);
};

/**
 * 2.(对象类型判断)
 * @param {object} obj 要判断类型的对象
 * @return {string} 类型字符串
 * @example  const toString = Object.prototype.toString // toString.call(obj)
 */
export function type(obj) {
  const classType = {};
  // 生成一个classType的映射
  'Boolean Number String Function Array Date Regexp Object Error Null undefined '.split(' ').map((item) => {
    classType[`[object ${item}]`] = item.toLowerCase();
  });
  return typeof obj === 'object' || typeof obj === 'function' ?
    classType[Object.prototype.toString.call(obj)] || 'object' :
    typeof obj;
}

/**
 * 3.(对象深拷贝)
 * @param {object} obj copy的对象
 * @return {object} 深拷贝返回对象
 */
export function deepCloneJson(obj) {
  if (obj === null) return null;
  if (typeof obj !== 'object') return obj;
  if (obj.constructor === Date) return new Date(obj);
  if (obj.constructor === RegExp) return new RegExp(obj);
  const newObj = new obj.constructor(); // 保持继承链
  for (const key of Object.keys(obj)) {
    if (obj.hasOwnProperty(key)) { // 不遍历其原型链上的属性
      const val = obj[key];
      newObj[key] = typeof val === 'object' ? deepCloneJson(val) : val; // 使用arguments.callee解除与函数名的耦合
    }
  }
  return newObj;
}

/**
 * 4.(数组元素位置交换)
 * @param {Array} arr 要操作的数组
 * @param {Number} index 交换前原始索引
 * @param {Number} changeIndex 要交换的索引
 */
export function exchangeArrayItem(arr = required(), index = required(), changeIndex = required()) {
  if (type(arr) !== 'array') {
    throw new Error('The arr parameter must be an array type');
  }
  const copyArr = deepCloneJson(arr);
  [copyArr[index], copyArr[changeIndex]] = [copyArr[changeIndex], copyArr[index]];
  return copyArr;
}

/**
 *5.(创建guid)
 * @returns GUID是一种由算法生成的二进制长度为128位的数字标识符
 */
export function createGuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
}

/**
 * 6.(快速调用确认框)
 * @param {object} context 执行上下文必须为根节点注入elementui的实例
 * @returns {Promise} 确定resolve 取消reject
 */
export function showConfirm(context, text) {
  return context.$confirm(text || '此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  });
}

/**
 * 7.(手机号正则验证)
 * @param {string} str 测试的手机号字符串
 */
export function isPhoneAvailable(str) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!reg.test(str)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 8.(get请求参数拼接)
 * @param {string} url 借口基础url
 * @param {object} payload query 对象参数
 * @returns {string} 拼接参数之后的queryurl
 */
export function joinQueryStr(url = required(), payload) {
  if (type(url) !== 'string') {
    throw new Error(`url params must be stringtype ${url} is ${type(url)}`);
  }
  let retQueryStr = `${url}?`;
  for (const prop of Object.keys(payload)) {
    payload[prop] !== '' ? retQueryStr += `${prop}=${payload[prop]}&` : '';
  }
  return retQueryStr;
}


/**
 * 9.(自定义格式化时间)
 * @param {日期参数} time 需要格式化的时间戳
 * @param {string} format yyyy/MM/dd hh:mm:ss 需要format的格式
 * @returns {string} 格式化之后的时间字符串
 */
export function formatTime(time, format) {
  const dateTime = new Date(time);
  const o = {
    'M+': dateTime.getMonth() + 1, // month
    'd+': dateTime.getDate(), // day
    'h+': dateTime.getHours(), // hour
    'm+': dateTime.getMinutes(), // minute
    's+': dateTime.getSeconds(), // second
    'q+': Math.floor((dateTime.getMonth() + 3) / 3), // quarter
    S: dateTime.getMilliseconds(), // millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1,
      (`${dateTime.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1,
        RegExp.$1.length === 1 ? o[k] :
          (`00${o[k]}`).substr((`${o[k]}`).length));
    }
  }
  return format;
}

/**
 * 10.判断对象属性是否有空值
 * @param {object} obj 需要判断的对象
 */
export function propIsEmpty(obj) {
  return Object.values(obj).some(item => (item === ''));
}
