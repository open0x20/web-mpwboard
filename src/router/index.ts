import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import About from "@/views/About.vue";
import Chat from "@/views/Chat.vue";
import Examples from "@/views/Examples.vue";

// Custom Apps
import AnythingToAudioConverter from "@/views/apps/AnythingToAudioConverter/AnythingToAudioConverter.vue";
import NasBrowser from "@/views/apps/NasBrowser.vue";
import DnsmasqDynconf from "@/views/apps/DnsmasqDynconf/DnsmasqDynconf.vue";
import Bookshelf from "@/views/apps/Bookshelf/Bookshelf.vue";

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
    path: "/apps/atac",
    name: "AnythingToAudioConverter",
    component: AnythingToAudioConverter
  },
  {
    path: "/apps/nas-browser",
    name: "NasBrowser",
    component: NasBrowser
  },
  {
    path: "/apps/dnsmasq-dynconf",
    name: "DnsmasqDynconf",
    component: DnsmasqDynconf
  },
  {
    path: "/apps/bookshelf",
    name: "Bookshelf",
    component: Bookshelf
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
