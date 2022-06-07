import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

export default createStore({
  state: {
    loginNeeded: true,
    userData: null,
    userOrders: 0,
    appData: [],
    actualOrder: [],
    orders: [],
    fecha: '',
    hora: '',

  },
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
