<template>
  <div class="verdict">
      <h2>个人汇总页</h2>
      <!-- <h3>个人能力展示</h3> -->
      <div class="wrap">
        <div ref="personalVerdict" style="width: 100%; height: 100%;"></div>
      </div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
import { mapMutations } from 'vuex';

const echarts = require('echarts/lib/echarts');
// 引入雷达图
require('echarts/lib/chart/radar');
// 引入标题组件
require('echarts/lib/component/title');

export default {
  name: 'Verdict',
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
          // silent: false,
          // axisLine: false,
          axisTick: {
          // show: false,
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
  created() {
    const token = this.$utils.getCache('token');
    console.log(token);
    if (token) {
      this.setToken(token);
    }
    this.getData();
  },
  methods: {
    ...mapMutations(['setToken']),
    // 请求汇总数据
    getData() {
      this.$http.get('summary')
        .then((res) => {
          // console.log(res);
          this.summaryData = res;
          this.handleData();
          this.initEcharts();
        });
    },
    // 处理汇总数据
    handleData() {
      if (this.summaryData !== null) {
        console.log(this.summaryData);
        this.summaryData[9].grades.forEach((ele) => {
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

<style lang="less" scoped>
  .verdict {
    // overflow-x: hidden;
    .wrap {
      padding: 0;
      width: 100vw;
      height: 100vw;
    }
    h3 {
      text-align: center;
    }
  }
</style>
