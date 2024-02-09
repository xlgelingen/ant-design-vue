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
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path:"",
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
      {
        path: "/dashboard",
        name: "Dashboard",
        redirect: "/dashboard/analysis",
        component: { render: h => h("router-view")},
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/DashboardAnalysis"),
          },
        ]
      },
      {
        path: "/form",
        name: "form",
        component: { render: h => h("router-view")},
        children: [
          {
            path: "/form",
            redirect: "/form/basic-form"
          },
          {
            path: "/form/basic-form",
            name: "basicform",
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm"),
          },
          {
            path: "/form/step-form",
            name: "stepform",
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
  if(to.path != from.path){
    NProgress.start();
  }
  next();
})

router.afterEach(() => {
  NProgress.done();
})

export default router;
