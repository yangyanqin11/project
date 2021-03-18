<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    //  当页面挂载完成时
    var myChart = echarts.init(document.getElementById("main"));
    // 指定图表的配置项和数据
    var option ={
        title: {
                text: '近一周订单数量'
            },
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style scoped>
#main {
  width: 800px;
  height: 600px;
  margin: 20px auto;
}
</style>
