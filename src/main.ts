import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import users from '@/store/modules/users';
import DateFilter from '@/app-shared/date.filter';
import '@/assets/main.css';

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);

router.beforeEach((to, from, next) => {
  // Promise.all([users.checkAuth()]).then(next);
  if (!users.checkAuth()) { next('/login'); } else { next(); }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
