import Vue from "vue";
import VueRouter from "vue-router";
import Blog from "@/views/Blog";
import Post from "@/views/space/Post";
import About from "@/views/About";
import Home from "@/views/Home";
import NotFound from "@/views/error/NotFound";
import Space from "@/views/space/Space";
import Edit from "@/views/space/Edit";
import Chat from "@/views/space/Chat";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/home",
  },
  {
    path: "/home",
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
    name: "space",
    component: Space,
    children: [
      {
        path: "home",
        name: "spaceHome",
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
      {
        path: "chat",
        name: "chat",
        component: Chat,
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
  mode: "history",
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (!to.name) {
//     next({
//       path: "/404",
//     });
//   }
//   next();
// });

export default router;
