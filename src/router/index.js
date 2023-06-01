import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import Transfer from '../components/Transfer.vue';
import Account from '../components/accounts/Account.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/transfer', component: Transfer },
  { path: '/account', component: Account },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
