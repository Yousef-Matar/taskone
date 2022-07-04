import { createRouter, createWebHistory } from "vue-router";

import FirstPage from "./pages/FirstPage.vue";
import SecondPage from "./pages/SecondPage.vue";
import ThirdPage from "./pages/ThirdPage.vue";

const routes = [
  {
    path: "/",
    component: FirstPage,
  },
  {
    path: "/SecondPage",
    component: SecondPage,
  },
  {
    path: "/ThirdPage",
    component: ThirdPage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
