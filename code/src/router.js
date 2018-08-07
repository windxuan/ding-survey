import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import utils from './utils';
import Login from './views/admin/Login.vue';
import Survey from './views/user/Survey.vue';
import Page404 from './views/Page404.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'survey',
      component: Survey,
      beforeEnter: (to, from, next) => {
        if (!store.getters.isMob) {
          next({ name: 'login' });
        }
        next();
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.getters.isMob) {
          next({ name: 'survey' });
        }
        next();
      },
    },
    {
      path: '/verdict',
      name: 'verdict',
      component: () => import('./views/user/Verdict.vue'),
    },
    {
      path: '/summary',
      name: 'summary',
      component: () => import('./views/admin/Summary.vue'),
      beforeEnter: (to, from, next) => {
        store.commit('setToken', utils.getCache('token'));
        if (!store.getters.loginStatus) {
          return next({ name: 'login' });
        }
        return next();
      },
    },
    {
      path: '*',
      name: 'page404',
      component: Page404,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Mobile
  if (store.getters.isMob) {
    if (to.name === 'login') {
      return next({ name: 'survey' });
    }
    if (to.name === 'summary') {
      return next({ name: 'page404' });
    }
  }
  // PC
  if (!store.getters.isMob) {
    if (to.name === 'survey') {
      return next({ name: 'login' });
    }
    if (to.name === 'verdict') {
      return next({ name: 'page404' });
    }
  }
  return next();
});

export default router;
