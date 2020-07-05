import Vue from "vue";
import VueRouter from "vue-router";
import MyDay from '../views/MyDay.vue';
import Important from '../views/Important.vue';
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "myday",
    component: MyDay,
  },
  {
    path: '/important',
    name: 'important',
    component: Important
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;