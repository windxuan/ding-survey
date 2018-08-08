<template>
  <div class="wrap">
    <!-- <p>{{summary}}</p> -->
    <div ref="personalVerdict" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
// 引入雷达图
require('echarts/lib/chart/radar');
// 引入标题组件
require('echarts/lib/component/title');

export default {
  name: 'RandarChart',
  data() {
    return {
      summaryData: '',
      option: {
        title: {
          left: 'center',
          text: '个人能力展示',
        },
        radar: {
          triggerEvent: true,
          axisTick: {
            inside: true,
          },
          shape: 'polygon',
          splitNumber: 4,
          nameGap: 5,
          name: {
            formatter(value, indicator) {
              return `${value}\n(${indicator.indicator})`;
            },
            // fontSize: 12,
            textStyle: {
              fontSize: 12,
              color: '#000',
              padding: [5, 5],
            },
          },
          splitArea: {
            areaStyle: {
              color: ['#24868F', '#57C0C6', '#97DEE0', '#D2F0F0'], // 雷达图背景色
            },
          },
          indicator: [],
          radius: '50%',
          center: ['50%', '50%'], // 雷达图中心点的位置
        },
        series: [{
          symbol: 'none', // 去掉图表中各个图区域的边框线拐点
          type: 'radar',
          data: [
            {
              value: [],
              name: '各项得分:',
            },
          ],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#f00', // 绘制的线条颜色
                width: 2,
              },
            },
          },
        }],
      },
    };
  },
  mounted() {
    // 从本地读取数据
    this.summaryData = JSON.parse(this.$utils.getCache('summaryData'));
    if (this.summaryData !== null) {
      this.handleData();
      this.initEcharts();
    }
  },
  methods: {
    // 对获取的数据进行处理
    handleData() {
      if (this.summaryData) {
        this.summaryData[2].grades.forEach((ele) => {
          this.option.radar.indicator.push({ name: ele.value, indicator: ele.score, max: 95 });
          this.option.series[0].data[0].value.push(ele.score);
        });
      }
    },
    // 初始化echarts
    initEcharts() {
      const myEcharts = echarts.init(this.$refs.personalVerdict);
      myEcharts.setOption(this.option);
    },
  },
};
</script>

<style>

</style>
