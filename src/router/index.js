import Vue from "vue";
import VueRouter from "vue-router";
import {
  all_admin,
  getRole,
  getToken,
  super_admin,
} from "@/assets/js/util/localStore";
import { modal } from "@/assets/js/util/modal";
import Blog from "@/views/Blog";
import BlogPost from "@/views/space/blog/BlogPost";
import About from "@/views/About";
import Home from "@/views/Home";
import NotFound from "@/views/error/NotFound";
import Space from "@/views/space/Space";
import Chat from "@/views/space/user/Chat";
import SpaceHome from "@/views/space/SpaceHome";
import Group from "@/views/space/user/Group";
import Search from "@/views/Search";
import Announce from "@/views/Announce";
import UserEdit from "@/views/space/user/UserEdit";
import Zone from "@/views/zone/Zone";
import BlogEdit from "@/views/space/blog/BlogEdit";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";
import Admin from "@/views/admin/Admin";
import NoRole from "@/views/error/NoRole";
import ZoneBlog from "@/views/zone/ZoneBlog";
import ZoneCollect from "@/views/zone/ZoneCollect";
import ZoneAttend from "@/views/zone/ZoneAttend";
import ZoneFans from "@/views/zone/ZoneFans";
import ZoneHome from "@/views/zone/ZoneHome";
import TagSearch from "@/views/TagSearch";
import AttendEdit from "@/views/space/friend/AttendEdit";
import FansEdit from "@/views/space/friend/FansEdit";
import ZoneHistory from "@/views/zone/ZoneHistory";
import ZoneComment from "@/views/zone/ZoneComment";
import AdminHome from "@/views/admin/AdminHome";
import BanBlog from "@/views/admin/blog/BanBlog";
import RecoverBlog from "@/views/admin/blog/RecoverBlog";
import BanUser from "@/views/admin/user/BanUser";
import RecoverUser from "@/views/admin/user/RecoverUser";
import UpdateRole from "@/views/admin/user/UpdateRole";
import AnnounceEdit from "@/views/admin/announce/AnnounceEdit";
import AnnouncePost from "@/views/admin/announce/AnnouncePost";
import SystemLog from "@/views/admin/system/SystemLog";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/announce",
    name: "Announce",
    component: Announce,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    // /blog?blogId=??
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    // /tag?tagName=??
    path: "/tag",
    name: "Tag",
    component: TagSearch,
  },
  {
    // /zone?userId=??
    path: "/zone",
    component: Zone,
    redirect: "/zone/home",
    children: [
      {
        path: "home",
        name: "个人空间首页",
        component: ZoneHome,
      },
      {
        path: "blog",
        name: "博客列表",
        component: ZoneBlog,
      },
      {
        path: "collect",
        name: "收藏列表",
        component: ZoneCollect,
      },
      {
        path: "attend",
        name: "关注列表",
        component: ZoneAttend,
      },
      {
        path: "fans",
        name: "粉丝列表",
        component: ZoneFans,
      },
      {
        path: "history",
        name: "浏览历史",
        component: ZoneHistory,
      },
      {
        path: "comment",
        name: "评论历史",
        component: ZoneComment,
      },
    ],
  },
  {
    // /space/getUserId()
    path: "/space",
    component: Space,
    redirect: "/space/home",
    children: [
      {
        path: "home",
        name: "管理中心首页",
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
        name: "私信",
        component: Chat,
        meta: {
          requireAuth: true,
          keepAlive: true,
        },
      },
      {
        path: "group",
        name: "群聊",
        component: Group,
        meta: {
          requireAuth: true,
          keepAlive: true,
        },
      },
      {
        path: "attend",
        name: "关注管理",
        component: AttendEdit,
        meta: {
          requireAuth: true,
          keepAlive: true,
        },
      },
      {
        path: "fans",
        name: "粉丝管理",
        component: FansEdit,
        meta: {
          requireAuth: true,
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/admin",
    name: "管理后台",
    component: Admin,
    redirect: "/admin/home",
    children: [
      {
        path: "home",
        name: "管理后台首页",
        component: AdminHome,
        meta: {
          requireAuth: true,
          requireRole: true,
          role: all_admin,
          keepAlive: true,
        },
      },
      {
        path: "banUser",
        name: "封禁用户",
        component: BanUser,
        meta: {
          requireAuth: true,
          requireRole: true,
          role: all_admin,
          keepAlive: true,
        },
      },
      {
        path: "recoverUser",
        name: "恢复用户",
        component: RecoverUser,
        meta: {
          requireAuth: true,
          requireRole: true,
          role: all_admin,
          keepAlive: true,
        },
      },
      {
        path: "role",
        name: "修改role",
        component: UpdateRole,
        meta: {
          requireAuth: true,
          requireRole: true,
          role: super_admin,
          keepAlive: true,
        },
      },
      {
        path: "banBlog",
        name: "封禁博客",
        component: BanBlog,
        meta: {
          requireAuth: true,
          requireRole: true,
          role: all_admin,
          keepAlive: true,
        },
      },
      {
        path: "recoverBlog",
        name: "恢复博客",
        component: RecoverBlog,
        meta: {
          requireAuth: true,
          requireRole: true,
          role: all_admin,
          keepAlive: true,
        },
      },
      {
        path: "postAnnounce",
        name: "发布公告",
        component: AnnouncePost,
        meta: {
          requireAuth: true,
          requireRole: true,
          role: super_admin,
          keepAlive: true,
        },
      },
      {
        path: "editAnnounce",
        name: "编辑公告",
        component: AnnounceEdit,
        meta: {
          requireAuth: true,
          requireRole: true,
          role: super_admin,
          keepAlive: true,
        },
      },
      {
        path: "log",
        name: "系统日志",
        component: SystemLog,
        meta: {
          requireAuth: true,
          requireRole: true,
          role: super_admin,
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/403",
    name: "权限不足",
    component: NoRole,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/404",
    name: "未找到页面",
    component: NotFound,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/*",
    redirect: "/404",
    meta: {
      keepAlive: true,
    },
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  //是否需要登录
  if (to.meta.requireAuth) {
    if (!getToken()) {
      next({
        path: "/login",
      });
      return;
    }
  }
  //是否需要权限
  if (to.meta.requireRole) {
    let role = to.meta.role;
    if (role.indexOf(getRole()) === -1) {
      modal.notifyWarning("权限不足");
      next({
        path: "/403",
      });
    }
  }
  next();
});

export default router;
