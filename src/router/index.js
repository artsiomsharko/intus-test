import { createRouter, createWebHistory } from "vue-router";
import UsersManagment from "@/views/UsersManagment.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: UsersManagment,
    },
  ],
});

export default router;
