<template>
  <div class="page-404">
    <IconFont type="icon-404" class="icon-404" />
    <img :src="logo404" style="display:block; margin:0 auto;">
    <!-- <div class="vue-svg-loader">
      <Logo404 />
    </div> -->
  </div>
</template>

<script>
// 没有使用 vue-svg-loader 时 logo404 是路径
import logo404 from "@/assets/logo404.svg";
// 使用 vue-svg-loader 时 Logo404 是函数式组件
// import Logo404 from "@/assets/logo404.svg";
export default {
  data() {
      return {
          logo404
      }
  },
  // components: {
  //   Logo404,
  // },
};
</script>

<style lang="less">
.page-404 {
  text-align: center;
  .icon-404 {
    svg {
      font-size: 100px;
    }
  }
  img {
    width: 100px;
  }
}
</style>
