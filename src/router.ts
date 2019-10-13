import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    },
    {
      path: '/article',
      name: 'article',
      component: () => import(/* webpackChunkName: "article" */ '@/views/Article.vue'),
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import(/* webpackChunkName: "editor" */ '@/views/Editor.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
    },
    {
      path: '/registers',
      name: 'registers',
      component: () => import(/* webpackChunkName: "registers" */ '@/views/Register.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
    },
  ],
});
