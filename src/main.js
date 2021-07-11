import { createApp } from "vue";
import App from "./App.vue";
import Route from "./route/index";
import "./index.css";

createApp(App).use(Route).mount("#app");
