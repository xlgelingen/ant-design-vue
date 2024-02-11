import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "../views/NotFound";
// import HomeView from "../views/HomeView.vue";
// import RenderRouterView from "../components/RenderRouterView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    //在Menu中隐藏
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/UserLogin.vue"),
      },
      {
        path: "/user/register",
        name: "resgiter",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/UserRegister.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "",
        redirect: "/dashboard"
      },
      //会从有name的地方开始渲染，所以Dashboard和form都是一级菜单
      {
        path: "/dashboard",
        name: "Dashboard",
        //添加一些原信息
        meta: { icon: "dashboard", title: "仪表盘" },
        redirect: "/dashboard/analysis",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/DashboardAnalysis"),
          },
        ]
      },
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form",
            redirect: "/form/basic-form"
          },
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm"),
          },
          {
            path: "/form/step-form",
            name: "stepform",
            meta: { title: "分步表单" },
            //在Menu中隐藏子组件
            hideChildrenInMenu: true,
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/StepIndex"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/FormStep1"),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/FormStep2"),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/FormStep3"),
              },
            ]
          },
        ]
      }
    ],
  },
  {
    path: "*",
    name: "404",
    //在Menu中隐藏
    hideInMenu:true,
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start();
  }
  next();
})

router.afterEach(() => {
  NProgress.done();
})

export default router;
