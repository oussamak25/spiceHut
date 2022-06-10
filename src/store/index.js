import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
/* este es el store que nos sirve para guardar los datos importante y nos permite la persistencia
de datos gracias al plugin que tenemos intalado vuex-persist */

export default createStore({
  /* este es el state que no podemos modificar directamente sino que tenemos
  que llamar a las actions que a su vez llaman a las mutaciones y son las encargadas
  de cambiar el state, el state tambien es reactivo cuando una de sus varibles
  cambia cabia en todos los lugares de la app donde se utilice  */
  state: {

    loginNeeded: true, // usamos esta variable para comprobar si el usuario necesita login o no
    userData: null, // datos personales del usuario nombre correo etc
    userOrders: 0, // id de cada pedido relacionado con su correo
    appData: [], //
    actualOrder: [], // varibale que guarda el pedido actual del usuario
    orders: [], // variable que guarda todos los pedidos anteriores que ha realizado el usuario para mostrarselo
    fecha: '', // fecha del pedido
    hora: '', // hora del pedido

  },
  /* acciones sobre el state  */
  actions: {
    setLoginNeeded(context, value) {
      context.commit('setLoginNeeded', value);
    },
    setUserData(context, value) {
      context.commit('setUserData', value);
    },
    setUserOrders(context, value) {
      context.commit('setUserOrders', value);
    },
    setAppData(context, value) {
      context.commit('setAppData', value);
    },
    setActualOrder(context, value) {
      context.commit('setActualOrder', value);
    },
    addActualOrder(context, value) {
      context.commit('addActualOrder', value);
    },
    delActualOrder(context, value) {
      context.commit('delActualOrder', value);
    },
    setOrders(context, value) {
      context.commit('setOrders', value);
    },
    setFecha(context, value) {
      context.commit('setFecha', value);
    },
    setHora(context, value) {
      context.commit('setHora', value);
    },

  },

  mutations: {
    setLoginNeeded(state, value) {
      state.loginNeeded = value;
    },
    setUserData(state, value) {
      state.userData = value;
    },
    setUserOrders(state, value) {
      state.userOrders = value;
    },
    setAppData(state, value) {
      state.appData = value;
    },
    setActualOrder(state, value) {
      state.actualOrder = value;
    },
    setOrders(state, value) {
      state.orders = value;
    },
    setFecha(state, value) {
      state.fecha = value;
    },
    setHora(state, value) {
      state.hora = value;
    },
    addActualOrder(state, value) {
      let exist = false;
      for (let i = 0; i < state.actualOrder.length; i++) {
        const element = state.actualOrder[i];
        if (value.nombre === element.nombre) {
          exist = true;
        }
      }
      if (!exist) {
        state.actualOrder.push(value);
      }
    },
    delActualOrder(state, value) {
      for (let i = 0; i < state.actualOrder.length; i++) {
        const element = state.actualOrder[i];
        if (value === element) {
          state.actualOrder.splice(i, 1);
        }
      }
    },
  },

  getters: {
    getLoginNeeded(state) {
      return state.loginNeeded;
    },
    getUserData(state) {
      return state.userData;
    },
    getUserOrders(state) {
      return state.userOrders;
    },
    getAppData(state) {
      return state.appData;
    },
    getOrders(state) {
      return state.orders;
    },
    getActualOrder(state) {
      return state.actualOrder;
    },

  },
  plugins: [new VuexPersistence({ storage: window.localStorage }).plugin],
});
