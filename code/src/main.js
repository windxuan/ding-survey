// 引入组件
import Vue from 'vue';
import MintUI from 'mint-ui';
import ElementUI from 'element-ui';
import Md5 from 'js-md5';
import * as Ding from 'dingtalk-jsapi';

// 引入静态资源
import 'mint-ui/lib/style.css';
import 'element-ui/lib/theme-chalk/base.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import 'swiper/dist/css/swiper.min.css';
import swiper from 'swiper/dist/js/swiper.min.js';

// 引入模块
import App from './App.vue';
import router from './router';
import store from './store';
import utils from './utils';
import http from './http';

// 组件化
Vue.use(MintUI);
Vue.use(ElementUI);

// 全局绑定
Vue.prototype.$http = http;
Vue.prototype.$utils = utils;
Vue.prototype.$swiper = swiper;
Vue.prototype.$md5 = Md5;
Vue.prototype.$dd = Ding;

// 关闭消息提示
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
