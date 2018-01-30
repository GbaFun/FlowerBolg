// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import VueCookie from 'vue-cookie';

Vue.config.productionTip = false

//在main.js定义自定义指令 
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})


import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/error.svg',
  loading: '/static/loading.svg',
  attempt: 1
})
Vue.use(VueCookie);

import main from './store'
const store = new Vuex.Store({
  modules: {
    main,
  }
});

import $ from 'jquery'
import {
  setTimeout
} from 'timers';

//var domain = 'http://localhost:4000';
var domain = 'http://101.132.128.112:4000';
Vue.prototype.call = function (url, para, callback) {
  $.ajax({
    url: domain + url, //当前的RAMS
    //dataType: 'jsonp',
    data: para,
    type: 'POST',
    //jsonp: 'callback',
    beforeSend: function () {
      $('body').append('<div class="qwe" style="z-index:999;position:fixed;width:100vw;height:100vh;background:rgba(0,0,0,0.0);left:0px;top:0px;"><img style="width:200px;height:200px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);" src="/static/Ripple.svg"/></div>')
    },
    success: function (rs) {
      $('.qwe').remove();
      callback(rs)
    },
    timeout: 30000
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
