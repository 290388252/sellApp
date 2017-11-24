import Vue from 'vue';
import VueResource from 'vue-resource';
import Router from 'vue-router';
import goods from '../components/goods/goods';
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller';
import '../common/stylus/index.styl';

Vue.use(Router);
Vue.use(VueResource);
const routes = [
  {path: '/goods', name: goods, component: goods},
  {path: '/ratings', name: ratings, component: ratings},
  {path: '/seller', name: seller, component: seller}
];
const router = new Router({
  routes,
  linkActiveClass: 'active'
});
router.push('/goods');
export default router;
