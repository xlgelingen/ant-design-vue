<template>
  <div>
    <ChartCom :options="chartOptions" style="height: 400px" />
  </div>
</template>

<script>
import ChartCom from "../../components/ChartCom.vue";
import axios from "axios";

export default {
  components: {
    ChartCom,
  },
  data() {
    return {
      chartOptions: {},
    };
  },
  mounted() {
    this.getChartData();
  },
  methods: {
    getChartData() {
      axios
        .get("/api/dashboard/chart")
        .then((response) => {
          this.chartOptions = {
            title: {
              text: "ECharts 入门示例",
            },
            tooltip: {},
            legend: {
              data: ["销量"],
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
            },
            yAxis: {},
            series: [
              {
                name: "销量",
                type: "bar",
                data: response.data,
              },
            ],
          };
        });
    },
  },
};
</script>

<style>
</style>
