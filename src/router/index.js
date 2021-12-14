import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "@/assets/js/util/localStore";
import Blog from "@/views/Blog";
import BlogPost from "@/views/space/blog/BlogPost";
import About from "@/views/About";
import Home from "@/views/Home";
import NotFound from "@/views/error/NotFound";
import Space from "@/views/space/Space";
import Chat from "@/views/space/user/Chat";
import SpaceHome from "@/views/space/SpaceHome";
import Login from "@/views/LoginPage";
import Group from "@/views/space/user/Group";
import Search from "@/views/Search";
import Announce from "@/views/Announce";
import UserEdit from "@/views/space/user/UserEdit";
import Zone from "@/views/zone/Zone";
import BlogEdit from "@/views/space/blog/BlogEdit";

import RegisterPage from "@/views/RegisterPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requireAuth: false,
      keepAlive: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      requireAuth: false,
      keepAlive: false,
    },
  },
  {
    path: "/announce",
    name: "Announce",
    component: Announce,
    meta: {
      requireAuth: false,
      keepAlive: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      requireAuth: false,
      keepAlive: true,
    },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: Login,
    meta: {
      requireAuth: false,
      keepAlive: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    meta: {
      requireAuth: false,
      keepAlive: false,
    },
  },
  {
    // /blog?blogId=??
    path: "/blog",
    name: "Blog",
    component: Blog,
    meta: {
      requireAuth: false,
      keepAlive: false,
    },
  },
  {
    // /tag?tagName=??
    path: "/tag",
    name: "Tag",
    meta: {
      requireAuth: false,
      keepAlive: false,
    },
  },
  {
    // /zone?userId=??
    path: "/zone",
    name: "Zone",
    component: Zone,
    meta: {
      requireAuth: false,
      keepAlive: false,
    },
  },
  {
    // /space/getUserId()
    path: "/space",
    component: Space,
    redirect: "/space/home",
    children: [
      {
        path: "home",
        name: "space",
        component: SpaceHome,
        meta: {
          requireAuth: true,
          keepAlive: true,
        },
      },
      {
        path: "user",
        name: "用户信息",
        component: UserEdit,
        meta: {
          requireAuth: true,
          keepAlive: true,
        },
      },
      {
        path: "post",
        name: "博客发布",
        component: BlogPost,
        meta: {
          requireAuth: true,
          keepAlive: true,
        },
      },
      {
        path: "edit",
        name: "博客编辑",
        component: BlogEdit,
        meta: {
          requireAuth: true,
          keepAlive: true,
        },
      },
      {
        path: "chat",
        name: "chat",
        component: Chat,
        meta: {
          requireAuth: true,
          keepAlive: true,
        },
      },
      {
        path: "group",
        name: "group",
        component: Group,
        meta: {
          requireAuth: true,
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
    meta: {
      requireAuth: false,
      keepAlive: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.name) {
    next({
      path: "/404",
    });
    return;
  }
  if (to.meta.requireAuth) {
    if (!getToken()) {
      next({
        path: "/login",
      });
      return;
    }
    if (to.meta.role !== "admin") {
      next({
        // path: "/login",
      });
      return;
    }
  }
  next();
});

export default router;
