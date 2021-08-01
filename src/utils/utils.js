import cnchar from 'cnchar';
import 'cnchar-poly';
import CryptoJS from 'crypto-js';

// 获取el当前位子
export function getElPos(element) {
  const rect = element.getBoundingClientRect();
  const top = document.documentElement.clientTop;
  const left = document.documentElement.clientLeft;

  return {
    top: rect.top - top,
    bottom: rect.bottom - top,
    left: rect.left - left,
    right: rect.right - left,
  };
}

// 数字转换成对应汉字
export function numToChinese(num) {
  const f = {
    0: '',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
  };
  num = num.toString();
  let str = '';
  for (let i = 0; i < num.length; i += 1) {
    str += f[num[i]];
  }
  return str;
}

/**
 * 将时间戳转换成日期
 */
export function formatDate(time, format) {
  const date = {
    'y+': time.getFullYear(), // 获取完整的年份(4位,1970)
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3),
    'S+': time.getMilliseconds(),
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(
      RegExp.$1,
      `${time.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }
  Object.keys(date).forEach((k) => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? date[k]
          : `00${date[k]}`.substr(`${date[k]}`.length),
      );
    }
  });

  return format;
}

export function toDate(val, mode = 'MM-dd hh:mm:ss') {
  if (val === 0) {
    return '-';
  }

  const newDate = new Date();
  newDate.setTime(val * 1000);

  return newDate.format(mode);
}

/**
 * 将日期转换成时间戳
 */

export function toTimestamp(Time) {
  const timestamp = Math.round(Time.getTime() / 1000);
  return timestamp;
}

// 随机最小到最大之间一个数 如果传入字符串 返回两位数 不足0补全
export function randint(n, m) {
  const c = m - n + 1;
  const num = Math.random() * c + Number(n);
  if (typeof n === 'string') {
    return Math.floor(num)
      .toString()
      .padStart(2, '0');
  }
  return Math.floor(num);
}

// 返回符号和字符串 默认两位小数 四舍五入
export function currency(value, decimal = 2) {
  value = parseFloat(value);
  if (!Number.isFinite(value) || (!value && value !== 0)) return '';
  const stringified = value.toFixed(decimal);
  return stringified;
}

// 解析url
export function getQueryString(name, str) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r;
  if (str) {
    r = str.split('?')[1].match(reg);
  } else {
    r = window.location.search.substr(1).match(reg);
  }
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

// 防抖函数
export function debounce(fn, delay = 200) {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // 模拟触发change事件
      fn.apply(this, args);
      // 清空计时器
      timer = null;
    }, delay);
  };
}

// 节流函数
export function throttle(fn, delay = 200) {
  let timer = null;
  return function(...args) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

const key = CryptoJS.enc.Hex.parse('31323334353637383930414243444546');
const iv = CryptoJS.enc.Hex.parse('31323334353637383930414243444546');

// // 解密方法
export function Decrypt(word) {
  // const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  // const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  // const decrypt = CryptoJS.AES.decrypt(srcs, key,
  // { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  // const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  // return decryptedStr.toString();
  if (!word) return;
  const dec = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(word), key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(dec);
}

// 加密方法
export function Encrypt(word) {
  if (!word) return;
  // const srcs = CryptoJS.enc.Utf8.parse(word);
  // console.log('CryptoJS.enc.Utf8.parse(word)', srcs);
  const encrypted = CryptoJS.AES.encrypt(word, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  // return encrypted.ciphertext.toString().toUpperCase();
  return encrypted.ciphertext.toString();
}

/**
 * 表单提交时，后台校验返回的错误信息处理成文字信息
 * @param errorObj
 * @param callback
 */
export function errorMessageProcessing(errorObj = {}, callback) {
  let message = '';
  Object.keys(errorObj).forEach((item) => {
    const html = `${item}${errorObj[item]}`;
    message += html;
  });
  callback(message);
}

// 提取尾字母大写
export function fontChange(userName) {
  if (!userName) return '';
  const len = userName.length;
  return cnchar.spell(userName.substring(len - 2), 'first', 'up');
}

// 自定义图标分组id
export const definedIconGroupID = [1, 2, 3];

// 生成唯一值
export function createUnique() {
  const str = 'abcdefghijklmnopqrstuvwxyzQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
  const { length } = str;
  const arr = [];
  const newArr = [];
  for (let i = 0; i < 6; i += 1) {
    const newIndex = Math.round(Math.random() * length);
    arr.push(str.charAt(newIndex));
  }
  arr.forEach((item) => {
    const newIndex = Math.round(Math.random() * 6);
    newArr.splice(newIndex, 0, item);
  });
  // console.log(newArr.join(''));
  // const unique = +new Date();
  // const random = Math.floor(Math.random() * 100);
  // return `${unique}${random}`;
  return newArr.join('');
}

export function showTimeName(timeString) {
  const date = new Date(timeString);
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  // today 为今天凌晨的时间
  const dayTime = 24 * 60 * 60 * 1000;
  const delta = today - date; // 得到相差的时间 ms
  if (delta > 0) {
    if (delta <= dayTime) {
      return '昨天';
    }
    if (delta <= 2 * dayTime) {
      return '前天';
    }
  } else if (-delta < dayTime) {
    return '今天';
  }
  return timeString;
}

// 根据文件的绝对路径获取对应的文件
export function getBlob({ url, token, method = 'get', contentType }, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.responseType = 'blob';
  xhr.setRequestHeader('token', token);
  if (contentType) {
    xhr.setRequestHeader('content-type', contentType);
  }
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log(xhr.response);
      cb(xhr.response);
    }
  };
  xhr.send();
}

// 获取文件之后进行下载
export function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    const body = document.querySelector('body');

    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // fix Firefox
    link.style.display = 'none';
    body.appendChild(link);

    link.click();
    body.removeChild(link);

    window.URL.revokeObjectURL(link.href);
  }
}

// 生成别名
export function createAlias(tableName) {
  const unique = createUnique();
  return `${tableName.slice(0, 2)}__${unique}`;
}

// 获取字符串匹配正则的字符串、起始位置
export function getChartsByEx(str, regExp) {
  const patt = new RegExp(regExp, 'g');
  const chartsPosArry = [];
  let result;
  // eslint-disable-next-line no-cond-assign
  while ((result = patt.exec(str)) != null) {
    chartsPosArry.push({
      result,
      from: result.index,
      to: patt.lastIndex,
    });
  }
  return chartsPosArry;
}
