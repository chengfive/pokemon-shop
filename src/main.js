import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue3-lazy";

createApp(App)
  .use(store)
  .use(router)
  .use(VueLazyload, {
    error: require("@/assets/error.png"),
  })
  .mount("#app");
