<template>
  <div>
    <a-date-picker />
    <ChartCom :options="chartOptions" style="height: 400px" />
    <pre v-highlightjs><code class="html">{{chartCode}}</code></pre>
  </div>
</template>

<script>
import ChartCom from "../../components/ChartCom.vue";
// import axios from "axios";
import request from "@/utils/request.js";
import chartCode from "!!raw-loader!@/components/ChartCom.vue";

export default {
  components: {
    ChartCom,
  },
  data() {
    return {
      chartOptions: {},
      chartCode,
    };
  },
  mounted() {
    this.getChartData();
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        methods: "get",
      }).then((response) => {
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
      // axios
      //   .get("/api/dashboard/chart")
      //   .then((response) => {
      //     this.chartOptions = {
      //       title: {
      //         text: "ECharts 入门示例",
      //       },
      //       tooltip: {},
      //       legend: {
      //         data: ["销量"],
      //       },
      //       xAxis: {
      //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      //       },
      //       yAxis: {},
      //       series: [
      //         {
      //           name: "销量",
      //           type: "bar",
      //           data: response.data,
      //         },
      //       ],
      //     };
      //   });
    },
  },
};
</script>

<style>
</style>
