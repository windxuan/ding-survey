import axios from 'axios';
import store from './store';

// 真实接口
const mock = 'https://easy-mock.com/mock/5b57ec7b9ddd1140ec2eb381/survey/api';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api/' : mock;

// 是否使用模拟接口
const useMock = true;

if (useMock) {
  axios.defaults.baseURL = mock;
}


// 创建取消请求令牌
const { CancelToken } = axios;
const source = CancelToken.source();

// 汇总数据预处理
function converSummary(data) {
  const tempData = data.map((val) => {
    const tags = [];
    val.grades.map((v) => {
      if (v.level >= 2) tags.push(v.value);
      return val;
    });
    val.tags = tags;
    return val;
  });
  return tempData;
}

// 请求拦截 - 附加凭证
axios.interceptors.request.use(
  (config) => {
    if (/summary|logout/.test(config.url)) {
      config.headers.Authorization = store.state.token;
    }
    return config;
  },
  err => Promise.reject(err)
);

// 响应拦截
axios.interceptors.response.use(
  (result) => {
    if (/summary/.test(result.config.url)) {
      return converSummary(result.data);
    }
    return result;
  },
  error => Promise.reject(error)
);

// 定义请求实例
axios.create({
  timeout: 5000,
  cancelToken: source.token,
});

export default axios;
