<template>
  <div >
    <a-drawer
      placement="right"
      width="300px"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
          <div>
            <h2>整体风格定制</h2>
            <a-radio-group
              :value="$route.query.navTheme || 'dark'"
              @change="(e) => handleSettingChange('navTheme', e.target.value)"
            >
              <a-radio value="dark">黑色</a-radio>
              <a-radio value="light">白色</a-radio>
            </a-radio-group>
            <h2>导航模式</h2>
            <a-radio-group
              :value="$route.query.navLayout || 'left'"
              @change="(e) => handleSettingChange('navLayout', e.target.value)"
            >
              <a-radio value="left">左侧</a-radio>
              <a-radio value="top">顶部</a-radio>
            </a-radio-group>
          </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      //$router.push() 方法将更新后的路由对象作为参数传入，触发路由导航，将用户重定向到新的 URL 地址。
      this.$router.push({
          query: {
            //通过 ...this.$route.query 来获取当前路由的查询参数，并使用展开运算符将其包含在新对象中
              ...this.$route.query,
              [type]: value
          }
      });
    }
  },
};
</script>
<style lang="less">
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background-color: #1890ff;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>




