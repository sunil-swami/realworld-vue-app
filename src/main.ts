import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import users from '@/store/modules/users';
import '@/assets/main.css';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  Promise.all([users.checkAuth()]).then(next);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
