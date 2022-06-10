// Import Vue
import { createApp } from 'vue';

// import de mi store personal

import store from '@/store';
// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-Vue Plugin
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.scss';

// Import App Component
import { initializeApp } from 'firebase/app';
import App from '../components/app.vue';

// firebase
// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

//configuracion de conexion con firebase
const firebaseConfig = {
  apiKey: 'AIzaSyB6UtV6bVo4gEin2q1lNrJIhbOqvkHcKpY',
  authDomain: 'spicehut-e868d.firebaseapp.com',
  projectId: 'spicehut-e868d',
  storageBucket: 'spicehut-e868d.appspot.com',
  messagingSenderId: '163352899073',
  appId: '1:163352899073:web:b9fa2b354763a7e33a9a00',
};
initializeApp(firebaseConfig);

// Init App
const app = createApp(App);
app.use(store);

// Register Framework7 Vue components
registerComponents(app);

// Mount the app
app.mount('#app');
