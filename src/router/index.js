import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import Transfer from '../components/Transfer.vue';
import Account from '../components/Account.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
//import TransferHistoryList from '../components/TransferHistoryList.vue';

/*import ProductList from '../components/products/ProductList.vue';
import CreateProduct from '../components/products/CreateProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';*/

const routes = [
  { path: '/', component: Home },
  { path: '/transfer', component: Transfer },
  { path: '/account', component: Account },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
  //{ path: '/transferlist', component: TransferHistoryList },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
