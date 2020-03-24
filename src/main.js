import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import "layui-src/dist/css/layui.css"
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.$http = axios


import "./assets/layuiadmin/style/admin.css"
import "./assets/layuiadmin/style/login.css"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import "./assets/js/login.js"
