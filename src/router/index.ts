import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import About from "@/views/About.vue";
import Chat from "@/views/Chat.vue";
import Examples from "@/views/Examples.vue";

// Custom Apps
import YouTubeDl from "@/views/apps/YouTubeDl/YouTubeDl.vue";
import NasBrowser from "@/views/apps/NasBrowser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat
  },
  {
    path: "/examples",
    name: "Examples",
    component: Examples
  },
  {
    path: "/apps/ytdl",
    name: "YouTubeDl",
    component: YouTubeDl
  },
  {
    path: "/apps/nas-browser",
    name: "NasBrowser",
    component: NasBrowser
  },
];

const router = new VueRouter({
  routes
});

export default router;

// Example:
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
//component: () =>
//    import(/* webpackChunkName: "about" */ "../views/About.vue")
