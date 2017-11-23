import Vue from 'vue';
import Router from 'vue-router';
import goods from '../components/goods/goods';
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller';

Vue.use(Router);
const routes = [
  {path: '/goods', name: goods, component: goods},
  {path: '/ratings', name: ratings, component: ratings},
  {path: '/seller', name: seller, component: seller}
];
const router = new Router({
  routes
});
router.push('/goods');
export default router;
