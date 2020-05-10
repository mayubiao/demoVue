import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import './assets/css/theme/index.css'



axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.HOST = '/api'

/* eslint-disable no-new */
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

})




