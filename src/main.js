import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
// import Button from "ant-design-vue/lib/button";
// import "ant-design-vue/lib/button/style";
import { Button, Layout, Icon, Drawer, Radio, Menu, Form, Input, Select, LocaleProvider, Dropdown, DatePicker } from "ant-design-vue";
import Authorized from "./components/AuthorizeCom.vue";
import Auth from "./directives/auth";

//将 Vue 的生产提示关闭，这样在生产环境下不会产生提示信息。
Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
//这里全局注册
Vue.use(Dropdown);
Vue.use(DatePicker);


//全局注册组件
Vue.component("AuthorizedCom", Authorized);
//注册指令
Vue.use(Auth);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4435344_edk3thostv.js', // 在 iconfont.cn 上生成
});
//全局注册组件
Vue.component("IconFont", IconFont);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

/* 渲染函数是用来描述 Vue 组件的生成的函数，它接收一个 createElement 函数作为参数，通常简写为 h（这个 h 是 createElement 的缩写）。createElement 函数用于创建虚拟 DOM 元素。

在 render 选项中，(h) => h(App) 表示一个箭头函数，它接收 createElement 函数作为参数，并且调用 createElement(App) 来创建根组件 App 的虚拟 DOM 元素。这实际上就是告诉 Vue 使用 App 组件作为根组件来渲染应用。 */
