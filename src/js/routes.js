import HomePage from '../pages/home.vue';
import AboutPage from '../pages/about.vue';
import Login from '../pages/login.vue';
import NotFoundPage from '../pages/404.vue';
import FrPrincipal from '@/pages/FrPrincipal.vue';
import FrCarrito from '@/pages/FrCarrito.vue';
import FrDelivery from '@/pages/FrDelivery.vue';
import Horario from '@/pages/Horario.vue';
import Profile from '@/pages/profile.vue';
import Orders from '@/pages/orders.vue';

/* Rutas de las paginas que se van cargando dentro del app.vue */
const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/profile/',
    component: Profile,
  },
  {
    path: '/orders/',
    component: Orders,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/horario/',
    component: Horario,
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
