<template>
  <div ref="chartDom"></div>
</template>

<script>
// import echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";

export default {
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    options(val) {
      this.Chart.setOption(val);
    },
  },
  created() {
    //防抖，不然resize会运行好多次，这样就只运行两次
    this.resize = debounce(this.resize, 300);
  },
  //添加事件监听
  mounted() {
    import("echarts").then((echarts) => {
      this.renderChart(echarts);
      //添加事件监听
      addListener(this.$refs.chartDom, this.resize);
    });
  },
  beforeDestroy() {
    //在组件销毁之前移除事件监听
    removeListener(this.$refs.chartDom, this.resize);
    //把chart示例销毁掉，防止内存泄漏
    this.Chart.dispose();
    this.Chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.Chart.resize();
    },
    renderChart(echarts) {
      // 基于准备好的dom，初始化echarts实例
      this.Chart = echarts.init(this.$refs.chartDom);
      // 使用刚指定的配置项和数据显示图表。
      this.Chart.setOption(this.options);
    },
  },
};
</script>

<style>
</style>
