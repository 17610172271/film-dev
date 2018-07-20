// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './lib/css'
import './lib/script'
import './lib/global'
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from '@/store/index.js'
import ElementUI from 'element-ui'
import router from './router'
import EventBus from './lib/eventBus.js'
import axios from 'axios'
import echarts from 'echarts'
import api from '@/api'

import 'element-ui/lib/theme-chalk/index.css'
import './css/ionicons.min.css?v=2.0.1'
import './css/font-awesome.min.css?v=2.0.1'
import './css/style.css?v=2.0.1'
Vue.use(Vuex)
Vue.use(ElementUI)

// 拦截器
axios.interceptors.request.use(
  config => {
    // config.headers.ContentType = 'application/x-www-form-urlencoded'
    return config
  },
  err => {
    ElementUI.Message({
      type: 'error',
      message: '请求超时!'
    })
    return Promise.resolve(err)
  }
)
axios.interceptors.response.use(
  data => {
    return data
  },
  err => {
     if (err.response.status === 401 && err.response.data.msg === '请登录后操作') {
       router.replace({name: 'login'})
     } else if (err.response.status === 404) {
       router.push({name: '404'})
     } else if (err.response.status === 500 || err.response.status === 501 || err.response.status === 502 || err.response.status === 503 || err.response.status === 504 || err.response.status === 505) {
       // ElementUI.Message({
       //   type: 'error',
       //   message: '服务器错误!'
       // })
       router.push({name: '500'})
     } else {
       ElementUI.Message({
         type: 'error',
         message: '未知错误!'
       })
     }
     return Promise.resolve(err)
  }
)

Vue.prototype.$echarts = echarts
Vue.prototype.$bus = EventBus
Vue.prototype.$http = axios
Vue.prototype.$bus.token = window.localStorage.getItem('Auth') || ''
//Vue.prototype.$bus.url = window.location.host === 'localhost:8080' ? 'http://www.agent_api.com/' : 'http://192.168.120.216:8004/'
// Vue.prototype.$bus.url = 'http://192.168.120.216:8004/'
Vue.prototype.$bus.authInfo = JSON.parse(window.localStorage.getItem('authInfo'))
/* eslint-disable no-new */

// 引入mockjs
require('./mock.js')

new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: {
    App
  }
})
