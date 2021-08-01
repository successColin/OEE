/*
 * @Author: cmk
 * @Date: 2021-04-19 14:01:24
 * @LastEditors: tjf
 * @LastEditTime: 2021-05-28 09:55:08
 * @Des: axios 封装
 */
import { Decrypt, Encrypt } from '@/utils/utils';
import axios from 'axios';
import { Loading, Message } from 'element-ui';
import qs from 'qs';
import { PREFIX, VERSION, whitePathName } from '../config';

// 3.响应拦截器
const errorCode = {
  400: '错误请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
};

class FetchData {
  constructor() {
    this.baseURL =
      process.env.NODE_ENV === 'development'
        ? `${PREFIX}/${VERSION}/`
        : `${PREFIX}/${VERSION}/`; // 请求路径
    this.timeout = 300000000; // 设置超时时间
    this.withCredentials = true;
    this.loadingInstance = null;
  }

  resolveData(data) {
    // 没参数不做处理返回
    if (!data || !data.logData) {
      return data;
    }
    const { userInfo } = window.vue.$store.state.userCenter;
    // 没有需要转换的logdata直接返回
    if (typeof data.logData !== 'object') {
      const tempObj = {
        content: Encrypt(
          `${userInfo.username}(${userInfo.account})${data.logData}`
        ),
        clientType: 'PC',
        curMenuId: window.vue.$store.state.base.curMenuId,
      };
      data.logData = tempObj;
      return data;
    }
    let str = '';
    let operateStr = '';
    // 新增编辑操作
    if ([1, 2].includes(data.logData.operateType)) {
      if (data.logData.operateType === 1) {
        // 新增数据
        operateStr = window.vue.$t('common.add', {
          name: window.vue.$t('common.data'),
        });
      } else {
        // 编辑数据
        operateStr = window.vue.$t('common.edit', {
          name: window.vue.$t('common.data'),
        });
      }
      const keys = Object.keys(data);
      keys.forEach((key) => {
        const tempObj = data.logData[key];
        if (tempObj) {
          if (tempObj.transFormArr) {
            const value = tempObj.value || 'value';
            const name = tempObj.key || 'name';

            const index = tempObj.transFormArr.findIndex(
              (item) => item[value] === data[key]
            );
            if (index !== -1) {
              str += `${tempObj.name}:${tempObj.transFormArr[index][name]},`;
            } else {
              // 数组直接转化为一个值
              let tempStr = '';
              tempObj.transFormArr.forEach((item) => {
                tempStr += `${item[name]},`;
              });
              str += `${tempObj.name}:${tempStr},`;
            }
          } else if (tempObj.showStr) {
            // 指定展示内容
            str += `${tempObj.name}:${tempObj.showStr},`;
          } else {
            str += `${tempObj.name}:${data[key]},`;
          }
        }
      });
    } else if (data.logData.operateType === 3) {
      // 删除数据
      operateStr = window.vue.$t('common.delete', {
        name: window.vue.$t('common.data'),
      });
      const value = data.logData.value || 'value';
      // const name = data.logData.key || 'id';
      data.logData.deleteArr.forEach((item) => {
        str += `(${data.logData.name}:${item[value]}),`;
      });
    } else if (data.logData.operateType === 4) {
      // 移动数据
      operateStr = window.vue.$t('common.move', {
        name: window.vue.$t('common.data'),
      });
      str = `(${data.logData.name}:${data.logData.switchName}),`;
    }
    const result = `${userInfo.username}(${userInfo.account})${operateStr}:${str}`;
    console.log(result);
    data.logData = {
      content: Encrypt(result.slice(0, -1)),
      clientType: 'PC',
      curMenuId: window.vue.$store.state.base.curMenuId,
    };
    return data;
  }

  setInterceptor(instance) {
    // 设置拦截器
    instance.interceptors.request.use(
      (config) => {
        // 打开loading
        if (config.showLoading) {
          this.loadingInstance = Loading.service({
            lock: true,
            text: '',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.2)',
            customClass: 'mask',
          });
        }
        if (
          config.method === 'post' ||
          config.method === 'put' ||
          config.method === 'patch'
        ) {
          config.data = this.resolveData(config.data);
          if (config.hasArray) {
            config.headers['Content-Type'] = 'application/json';
          } else if (config.headers['content-type'] !== 'multipart/form-data') {
            config.data = qs.stringify(config.data, {
              arrayFormat: 'indices',
              allowDots: true,
            });
          }
        } else {
          // 处理noData
          document.getElementsByClassName('apiotNoData').forEach((ele) => {
            ele.classList.add('apiotHiddenNoData');
          });
          config.params = this.resolveData(config.params);
          config.headers['Content-Type'] = 'multipart/form-data';
          config.headers['Cache-Control'] = 'no-cache';
          config.headers.Pragma = 'no-cache';
          config.paramsSerializer = function(params) {
            return qs.stringify(params, { allowDots: true });
          };
        }
        // token
        if (config.url !== 'login') {
          config.headers.token = Decrypt(localStorage.getItem('token') || '');
        }
        if (localStorage.apiotLanguage) {
          const language = localStorage.apiotLanguage.split('');
          language.splice(2, 0, '-');
          config.headers['Accept-Language'] = language.join('');
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    instance.interceptors.response.use(
      (res) => {
        if (res.config.url === 'login') {
          const token = res.headers.token || '';
          localStorage.setItem('token', Encrypt(token));
        }
        // 关闭loading
        if (res.config.showLoading) {
          this.loadingInstance.close();
        }

        const codeNumber = res.data.code;

        if (codeNumber === '00000') {
          // 处理noData
          document
            .getElementsByClassName('apiotHiddenNoData')
            .forEach((ele) => {
              ele.classList.remove('apiotHiddenNoData');
            });
          return res.data.data;
        }
        if (codeNumber === 'B0001') {
          return Promise.reject(res.data.data);
        }
        if (!res.config.showMsg) {
          Message.error({
            showClose: true,
            message: res.data.message,
          });
        }
        return Promise.reject(res.data);
      },
      // 登录失效，账号禁用等处理
      (error) => {
        const errMsg = error.message || '';
        if (errMsg.indexOf('401') !== -1) {
          const pathArr = window.location.pathname.split('/');
          const pathName = pathArr[pathArr.length - 1];
          if (!whitePathName.includes(pathName) || pathName === '404') {
            window.vue.$router.push('/login');
            const ignoreArr = ['system/sysMenu/menuCenter'];
            if (!ignoreArr.includes(error.response.config.url)) {
              Message.error({
                showClose: true,
                message: '登录失效',
              });
            }
            localStorage.removeItem('token');
            sessionStorage.clear();
          }

          return Promise.reject(error);
        }
        if (this.loadingInstance) {
          // this.loadingInstance.close();
        }
        /** *** 接收到异常响应的处理开始 **** */
        if (error && error.response) {
          // 1.公共错误处理
          // 2.根据响应码具体处理
          const code = error.response.status || 0;
          const errorMsg = `${errorCode[code] || '连接错误'}`;
          // if (code === 401) console.log('无权限做的出来');
          Message.error({
            showClose: true,
            message: errorMsg,
          });
        } else if (JSON.stringify(error).includes('timeout')) {
          // 超时处理
          Message.error({
            showClose: true,
            message: '服务器响应超时，请刷新当前页',
          });
        }
        // return new Promise((resolve, reject) => { reject(new Error('something bad happened')) })
        return Promise.reject(error);
      }
    );
  }

  request(request, baseURL) {
    const instance = axios.create();
    // 合并配置
    const config = {
      ...request,
      baseURL: baseURL || this.baseURL,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
    };
    this.setInterceptor(instance);

    return instance(config);
  }
}

export default new FetchData();
