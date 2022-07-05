import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css";
import router from "./router";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(faSortUp, faSortDown);
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
