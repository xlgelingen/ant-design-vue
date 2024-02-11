<template>
  <div>
    <ChartCom :options="chartOptions" style="height: 400px" />
  </div>
</template>

<script>
import ChartCom from "../../components/ChartCom.vue";

export default {
  components: {
    ChartCom,
  },
  data() {
    return {
      chartOptions: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "长筒靴"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 11, 10, 10, 40],
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>
