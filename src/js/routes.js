import HomePage from '../pages/home.vue';
import AboutPage from '../pages/about.vue';
import Login from '../pages/login.vue';
import NotFoundPage from '../pages/404.vue';
import FrPrincipal from '@/pages/FrPrincipal.vue';
import FrCarrito from '@/pages/FrCarrito.vue';
import FrDelivery from '@/pages/FrDelivery.vue';



const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/login/',
    component: Login,
  },
  {
    path: '/frPrincipal/',
    component: FrPrincipal,
  },
  {
    path: '/frCarrito/',
    component: FrCarrito,
  },
  {
    path: '/frDelivery/',
    component: FrDelivery,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
