// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
// 监控报错
// import Raven from 'raven-js';
// import RavenVue from 'raven-js/plugins/vue';
// Vue.prototype.$Raven = Raven;
// Raven.config('http://7787595bd2574f6ca0e7ed0d5cec3c83@sentry.shenmajr.com/14')
//     .addPlugin(RavenVue, Vue)
//     .install();

import App from './App'
import store from './vuex/store'
import router from './router'
import axios from 'axios';
Vue.prototype.$axios = axios;

import ElementUI from 'element-ui';
import { Loading } from 'element-ui'
Vue.use(ElementUI);

import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';   //浅绿色主题

// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

// 全局函数
import base from './base'
Vue.use(base);

Vue.config.productionTip = false



//----------------------------------------
// import Vue from 'vue';
// import Router from 'vue-router';
//
// Vue.use(Router);


// axios.get('https://easy-mock.com/mock/5a12764bef842836ae773582/code/router').then(function(r){
//   console.log(r);
//   console.log(r.data.data);
//   let route =[];
//   for(let i = 0;i<r.data.data.length;i++){
//     route.path = r.data.data[i].path;
//     route.component = 'resolve => require(['+r.data.data[i].component+'], resolve)';
//   }
//   console.log(route);
//   let router = new Router({routes: r.data.data});
  /* eslint-disable no-new */
  // new Vue({
  //   el: '#app',
  //   router,
  //   template: '<App/>',
  //   components: {App}
  // })
// })

//---------------------------------------------

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
