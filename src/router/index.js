import Vue from "vue";
import VueRouter from "vue-router";
import Blog from "@/views/Blog";
import Post from "@/views/space/Post";
import About from "@/views/About";
import Home from "@/views/Home";
import NotFound from "@/views/error/NotFound";
import Space from "@/views/space/Space";
import Edit from "@/views/space/Edit";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/blog/:blogId",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/space",
    name: "个人后台管理",
    component: Space,
    children: [
      {
        path: "",
        name: "个人后台首页",
        component: About,
      },
      {
        path: "post",
        name: "博客发布",
        component: Post,
      },
      {
        path: "edit",
        name: "博客编辑",
        component: Edit,
      },
    ],
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.name) {
    next({
      path: "/404",
    });
  }
  next();
});

export default router;
