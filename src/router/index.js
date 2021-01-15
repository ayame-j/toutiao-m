import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/Login') },
  {
    path: '/',
    name: 'PersonalCenter',
    component: () => import('@/views/PersonalCenter'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home'),
      },
      {
        path: '/Questions',
        name: 'Questions',
        component: () => import('@/views/Questions'),
      },
      {
        path: '/Mine',
        name: 'Mine',
        component: () => import('@/views/Mine'),
      },
      {
        path: '/Video',
        name: 'Video',
        component: () => import('@/views/Video'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  login,
});

export default router;
