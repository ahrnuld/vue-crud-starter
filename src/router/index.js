import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import Transfer from '../components/Transfer.vue';
import Account from '../components/Account.vue';
//import TransferHistoryList from '../components/TransferHistoryList.vue';

/*import ProductList from '../components/products/ProductList.vue';
import CreateProduct from '../components/products/CreateProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';*/

const routes = [
  { path: '/', component: Home },
  { path: '/transfer', component: Transfer },
  { path: '/account', component: Account },
  //{ path: '/transferlist', component: TransferHistoryList },

  /*{ path: '/products', component: ProductList },
  { path: '/createproduct', component: CreateProduct },
  { path: '/editproduct/:id', component: EditProduct, props: true  }*/
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
