import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'; 
import FlagIcon from 'vue-flag-icon';
import axios from 'axios';
import store from "./store";
import i18n from '@/plugins/i18n';
import Swal from 'sweetalert2';
import VueCookies from 'vue-cookies';

Vue.prototype.$http = axios;

const token = localStorage.getItem('Token');
const isLoggedIn = localStorage.getItem('isLoggedIn') == "true" ? true : false;
if (token != "" && isLoggedIn == true) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
}

window.$ = window.jQuery = require("jquery");
Vue.config.productionTip = false
Vue.use(FlagIcon);
Vue.use(VueCookies);
new Vue({
  i18n,
  vuetify,
  store,
  router,
  Swal,
  render: h => h(App)
}).$mount('#app')
