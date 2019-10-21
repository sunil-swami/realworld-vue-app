import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import articles from '@/store/modules/articles';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeGlobal.vue'),
        },
        {
          path: 'my-feed',
          name: 'home-my-feed',
          component: () => import('@/views/HomeMyFeed.vue'),
        },
        {
          path: 'tag/:tag',
          name: 'home-tag',
          component: () => import('@/views/HomeTag.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    },
    {
      name: 'article',
      path: '/articles/:slug',
      component: () => import(/* webpackChunkName: "article" */ '@/views/Article.vue'),
      beforeEnter: (to, from, next) => {
        Promise.all([
                articles.fetchArticle(to.params.slug , undefined),
                articles.fetchComments(to.params.slug),
          ]).then(() => {
            next();
    });
      },
      props: true,
    },
    {
      name: 'article-edit',
      path: '/editor/:slug?',
      props: true,
      component: () => import(/* webpackChunkName: "articleEdit" */ '@/views/ArticleEdit.vue'),
    },
     {
      path: '/@:username',
      component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
      children: [
        {
          path: '',
          name: 'profile',
          component: () => import('@/views/ProfileArticles.vue'),
        },
        {
          name: 'profile-favorites',
          path: 'favorites',
          component: () => import('@/views/ProfileFavorited.vue'),
        },
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "registers" */ '@/views/Register.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
    },
  ],

});
