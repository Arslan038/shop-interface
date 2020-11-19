import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import AntD from 'ant-design-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'ant-design-vue/dist/antd.css';
import store from './store'
import 'native-toast/dist/native-toast.css'

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const loggedUser = JSON.parse(localStorage.getItem('manicardsShop'));
  const loggedUserData = JSON.parse(localStorage.getItem('manicardsShopData'));

  if (requiresAuth && (!loggedUser || !loggedUserData)) {
    next('/')
  }
  else {
    next()
  }
})

// window.baseURL = 'http://ftp.manicards.com/api/'
 window.baseURL = 'https://api.manicards.com/api/manicardsclient/'

Vue.use(BootstrapVue);
Vue.use(AntD);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
