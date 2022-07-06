import { createRouter, createWebHistory } from "vue-router";

import FirstPage from "./pages/FirstPage.vue";
import SecondPage from "./pages/SecondPage.vue";
import ThirdPage from "./pages/ThirdPage.vue";
import FourthPage from "./pages/FourthPage.vue";

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
  {
    path: "/FourthPage",
    component: FourthPage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
