import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { START_LOCATION } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/deck",
      name: "deck",
      component: () => import("@/views/DeckView.vue"),
    },
    {
      path: "/result",
      name: "result",
      component: () => import("@/views/ResultView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (from === START_LOCATION && to.name !== "home") {
    next({ name: "home" });
  }
  next();
});
export default router;
