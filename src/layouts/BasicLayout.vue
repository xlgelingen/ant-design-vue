<template>
  <div>
    <Header></Header>
    <Sider></Sider>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./HeaderLayout.vue";
import Footer from "./FooterLayout.vue";
import Sider from "./SiderMenu.vue";

export default {
    components: {
        Header,Footer,Sider
    },

}

</script>

<style>

</style>
