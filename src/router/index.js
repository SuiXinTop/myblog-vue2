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
import SpaceHome from "@/views/space/SpaceHome";
import Login from "@/views/LoginPage";
import Register from "@/views/Register";
import Group from "@/views/space/Group";
import Search from "@/views/Search";
import Announce from "@/views/Announce";
import { getToken } from "@/assets/js/util/localStore";
import { routerPath } from "@/assets/js/util/path";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: routerPath.home,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: routerPath.home,
    name: "Home",
    component: Home,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/announce",
    name: "Announce",
    component: Announce,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: routerPath.about,
    name: "About",
    component: About,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: Login,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: routerPath.blog,
    name: "Blog",
    component: Blog,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: routerPath.space,
    component: Space,
    redirect: "/space/home",
    children: [
      {
        path: "home",
        name: "space",
        component: SpaceHome,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "post",
        name: "博客发布",
        component: Post,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "edit",
        name: "博客编辑",
        component: Edit,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "chat",
        name: "chat",
        component: Chat,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "group",
        name: "group",
        component: Group,
        meta: {
          requireAuth: true,
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
