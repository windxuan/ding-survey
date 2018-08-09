<template>
  <div class="verdict">
      <h2>{{ title }}</h2>
      <!-- 雷达图组件 -->
      <radar :summary='summaryData' style="margin: 5vh 0"></radar>
      <div class="result">
        <span>评定结果:</span>
        <mt-badge
          size="large"
          v-for="(v, i) in tagArr"
          :key="i">{{ v }}</mt-badge>
      </div>

  </div>
</template>

<script>
import radar from '../../components/RadarChart';

export default {
  name: 'Verdict',
  components: { radar },
  data() {
    return {
      summaryData: '',
      title: '',
      tagArr: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      localStorage.removeItem('options');
    });
  },
  created() {
    // 获取个人汇总数据
    console.log(this.$route.params);
    // 判断对象是否为空
    if (Object.keys(this.$route.params).length !== 0) {
      // 将个人汇总数据存入本地
      this.$utils.setCache('summaryData', JSON.stringify(this.$route.params));
    }
    this.summaryData = JSON.parse(this.$utils.getCache('summaryData'));
    this.title = this.summaryData.survey.surveyName;
    this.getTag();
    console.log(this.summaryData);
  },
  methods: {
    getTag() {
      this.summaryData.grades.forEach((element) => {
        if (element.level >= 2) {
          this.tagArr.push(element.value);
        }
      });
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
    h2 {
      text-align: center;
    }
  }
  .result {
    padding: 2vh;
    span {
      display: inline-block;
      height: 100%;
      margin: 0 2vh 2vh 0;
    }
  }
</style>
