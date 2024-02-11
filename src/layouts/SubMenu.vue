<template functional>
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon v-if="props.menuInfo.meta.icon" :type="props.menuInfo.meta.icon" />
      <span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item 
        v-if="!item.children" 
        :key="item.path"
        @click="() => {
              if (parent.$route.path !== item.path) {
                parent.$router.push({path: item.path, query: parent.$route.query})
              } else {
                //如果跳转页面和当前页面一样，就刷新页面
                parent.reloadPage();
              }
            }"
      >
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
export default {
  props: ['menuInfo', 'parentQuery'],
};
</script>

<style>

</style>


