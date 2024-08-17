import { createRouter, createWebHistory } from "vue-router";
import homepage from "../views/intro.vue";
import upload from "../views/upload.vue";
import aboutus from "../views/aboutus.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: homepage,
  },
  {
    path: "/upload",
    name: "upload",
    component: upload,
  },
  {
    path: "/aboutus",
    name: "aboutus",
    component: aboutus,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
