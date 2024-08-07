import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/Home.vue";
import AlbumList from "@/components/AlbumList.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/albumlist/:artistId",
    name: "AlbumList",
    component: AlbumList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
