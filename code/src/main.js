import Vue from 'vue';
import ElementUI from 'element-ui';

// 静态资源引入
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import 'swiper/dist/css/swiper.min.css';

// 引入模块
import App from './App.vue';
import router from './router';
import store from './store';
import http from './plugin/http';
import utils from './plugin/utils';
import dd from './plugin/dingtalk';

// 组件化
Vue.use(ElementUI);

// 全局绑定
Vue.prototype.$http = http;
Vue.prototype.$utils = utils;
Vue.prototype.$dd = dd;

// 关闭消息提示
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
