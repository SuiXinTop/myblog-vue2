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
import Login from "@/views/Login";
import Register from "@/views/Register";
import Group from "@/views/space/Group";

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
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
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
    path: "/blog",
    name: "Blog",
    component: Blog,
    meta: {
      requireAuth: false,
    },
  },
  {
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
    if (!localStorage.getItem("token")) {
      next({
        // path: "/login",
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
