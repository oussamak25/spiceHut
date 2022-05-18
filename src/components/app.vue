<template>
  <f7-app v-bind="f7params">
    <f7-view
      main
      url="/"
    />
  </f7-app>
</template>
<script>
import { ref, onMounted } from 'vue';
import { f7, f7ready } from 'framework7-vue';
import { getDevice } from 'framework7/lite-bundle';
import cordovaApp from '../js/cordova-app.js';

import routes from '../js/routes.js';
import store from '../js/store';

export default {
  setup() {
    const device = getDevice();
    // Framework7 Parameters
    const f7params = {
      name: 'SpiceHut', // App name
      theme: 'auto', // Automatic theme detection

      id: 'io.framework7.myapp', // App bundle ID
      // App store
      store,
      // App routes
      routes,

      // Input settings
      input: {
        scrollIntoViewOnFocus: device.cordova && !device.electron,
        scrollIntoViewCentered: device.cordova && !device.electron,
      },
      // Cordova Statusbar settings
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
    };
      // Login screen data
    const username = ref('');
    const password = ref('');

    const alertLoginData = () => {
      f7.dialog.alert(`Username: ${username.value}<br>Password: ${password.value}`, () => {
        f7.loginScreen.close();
      });
    };
    onMounted(() => {
      f7ready(() => {
        // Init cordova APIs (see cordova-app.js)
        if (device.cordova) {
          cordovaApp.init(f7);
        }

        // Call F7 APIs here
      });
    });

    return {
      f7params,
      username,
      password,
      alertLoginData,
    };
  },
};
</script>
<style lang="scss" scoped>

</style>