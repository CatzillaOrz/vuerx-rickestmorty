import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueRx from "vue-rx";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(VueRx);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
