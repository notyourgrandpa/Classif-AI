import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueLazyload, {
  preLoad: 1.3,
  error: null,
  loading: null,
  attempt: 1,
});

app.mount("#app");
