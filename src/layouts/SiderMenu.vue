<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="
            () => {
              if ($route.path !== item.path) {
                $router.push({ path: item.path, query: $route.query });
              } else {
                //location.reload();
                reloadPage();
              }
            }
          "
        >
          <a-icon v-if="item.meta.icon" type="item.meta.icon" />
          <span>11{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu
          v-else
          :key="item.path"
          :menu-info="item"
          :parentQuery="$route.query"
          @reloadPage="reloadPage"
        />
      </template>
    </a-menu>
    <!-- <button @click="showQuery">xianshi query</button> -->
  </div>
</template>

<script>
import SubMenu from "./SubMenu.vue";
import { check } from "../utils/auth";

export default {
  components: {
    //sub-menu是SubMenu 的别名
    "sub-menu": SubMenu,
  },
  props: {
    theme: {
      type: String,
      default: "dark",
    },
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    // console.log("data方法中的routes:", this.$router.options.routes);
    const menuData = this.getMenuData(this.$router.options.routes);
    // console.log("menuData: ", menuData);
    return {
      collapsed: false,
      menuData,
      selectedKeys: [],
      openKeys: [],
    };
  },
  watch: {
    //用于监视 $route.path 的变化。当路由路径发生变化时，将触发该函数。
    "$route.path": function (val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
  },
  methods: {
    // showQuery() {
    //   console.log(this.$route.query);
    // },
    reloadPage() {
      console.log("执行页面刷新操作")
      // 执行页面刷新操作
      window.location.reload();
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKeys) {
      const menuData = [];
      // console.log("最外层：",routes);
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKeys || item.path];
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            // console.log("第二层name的if");
            newItem.children = this.getMenuData(item.children);
            // console.log("menuData: ",menuData);
          } else {
            //主要是给step-form用的
            this.getMenuData(
              item.children,
              selectedKeys ? parentKeys : [...parentKeys, item.path],
              selectedKeys || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          // console.log("第二层use的elseif");
          // console.log("use前的menuData: ",menuData)
          // console.log("item.children： ",item.children)
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
          // console.log("use后的menuData: ",menuData)
        }
      }
      return menuData;
    },
  },
};
</script>
