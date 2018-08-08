<template>
  <div class="verdict">
      <h2>个人汇总页</h2>
      <!-- 雷达图组件 -->
      <radar></radar>
  </div>
</template>

<script>
// 引入 ECharts 主模块
import radar from '../../components/RadarChart';

export default {
  name: 'Verdict',
  components: { radar },
  data() {
    return {
      summaryData: '',
    };
  },
  created() {
    // 获取个人汇总数据
    console.log(this.$route.params);
    // 判断对象是否为空
    if (Object.keys(this.$route.params).length !== 0) {
      this.summaryData = this.$route.params;
      // 将个人汇总数据存入本地
      this.$utils.setCache('summaryData', JSON.stringify(this.$route.params));
    }
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
