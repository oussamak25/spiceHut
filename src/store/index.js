import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

export default createStore({
  state: {
    loginNeeded: true,
    userData: null,
    userOrders: null,
    appData: null,

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

  },
  plugins: [new VuexPersistence({ storage: window.localStorage }).plugin],
});
