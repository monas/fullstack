import Vue, { createApp } from "@vue/compat";
import { createPinia } from "pinia";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
