import Vue from "vue";
import App from "./App.vue";
import router from "./router/routes.js";
import store from "./store/store.js";
import vuetify from './plugins/vuetify';
import moment from 'moment';
import * as firebase from 'firebase';

Vue.config.productionTip = false;
Vue.use(moment);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCjM4LAVMRgq8-SDIUJOr9cFytTzXsEOq0",
      authDomain: "vuetodo-acff5.firebaseapp.com",
      databaseURL: "https://vuetodo-acff5.firebaseio.com",
      projectId: "vuetodo-acff5",
      storageBucket: "vuetodo-acff5.appspot.com",
      messagingSenderId: "900063505834",
      appId: "1:900063505834:web:1d4e682472643009170fd3",
      measurementId: "G-1XWVMT609E"
    })
  }
}).$mount("#app");