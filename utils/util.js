// 小程序工具函数库

/**
 * 格式化时间
 * @param {Date} date 日期对象
 * @param {String} format 格式化字符串，如 'YYYY-MM-DD hh:mm:ss'
 */
const formatTime = (date, format = 'YYYY-MM-DD hh:mm:ss') => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return format
    .replace('YYYY', year)
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('hh', hour.toString().padStart(2, '0'))
    .replace('mm', minute.toString().padStart(2, '0'))
    .replace('ss', second.toString().padStart(2, '0'));
};

/**
 * 获取当前日期字符串
 */
const getCurrentDate = () => {
  return formatTime(new Date(), 'YYYY-MM-DD');
};

/**
 * 获取当前时间字符串
 */
const getCurrentTime = () => {
  return formatTime(new Date(), 'hh:mm:ss');
};

/**
 * 防抖函数
 * @param {Function} func 要执行的函数
 * @param {Number} delay 延迟时间（毫秒）
 */
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * 节流函数
 * @param {Function} func 要执行的函数
 * @param {Number} delay 延迟时间（毫秒）
 */
const throttle = (func, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

/**
 * 深拷贝对象
 * @param {Object} obj 要拷贝的对象
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * 验证手机号
 * @param {String} phone 手机号
 */
const validatePhone = (phone) => {
  const phoneReg = /^1[3-9]\d{9}$/;
  return phoneReg.test(phone);
};

/**
 * 验证邮箱
 * @param {String} email 邮箱地址
 */
const validateEmail = (email) => {
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailReg.test(email);
};

/**
 * 生成随机字符串
 * @param {Number} length 字符串长度
 */
const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * 计算两个日期之间的天数差
 * @param {Date} date1 日期1
 * @param {Date} date2 日期2
 */
const getDaysDifference = (date1, date2) => {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};

/**
 * 将对象转换为URL参数字符串
 * @param {Object} obj 参数对象
 */
const objectToUrlParams = (obj) => {
  const params = new URLSearchParams();
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      params.append(key, obj[key]);
    }
  }
  return params.toString();
};

/**
 * 获取全局应用实例
 */
const getGlobalApp = () => {
  return getApp();
};

module.exports = {
  formatTime,
  getCurrentDate,
  getCurrentTime,
  debounce,
  throttle,
  deepClone,
  validatePhone,
  validateEmail,
  generateRandomString,
  getDaysDifference,
  objectToUrlParams,
  getGlobalApp
}; 