<template>
  <div class="verdict">
      <h2>个人答题结果汇总</h2>
      <!-- 雷达图组件 -->
      <radar :summary='summaryData'></radar>
      <div class="result">
        <span class="title">评定结果:</span>
        <div class="judge"
         v-for="(v, i) in tagArr"
         :key="i">
        <el-tag
          :type="`${summaryData.grades[i].level === 2 ? 'success' : 'primary'}`"
          size="large">{{ v.value }}</el-tag>
          <div class="merit-wrap">优点：</div>
          <div class="merit">
              <span>{{v.merit}}  </span><br/>
          </div>
          <div class="defect-wrap">缺点：</div>
          <div class="defect">
              <span>{{v.defect}} ; </span>
          </div>
        </div>
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
      datas: {
        PL: {
          merit: '有创造力、想象力，灵活解决问题',
          defect: '弱于沟通和管理普通人，不守常规 ',
        },
        RI: {
          merit: '外向、热情、善交际、探索机会、建立联系',
          defect: '热情一过即失去兴趣 ',
        },
        CO: {
          merit: '成熟、自信、信任、一个好的主持人、阐明目标、促进决策',
          defect: '不必是最聪明或最有创造性的成员 ',
        },
        SH: {
          merit: '灵活、开朗、执着、怀疑、施压、出主意',
          defect: '易怒、脾气急 ',
        },
        ME: {
          merit: '严肃、有策略、有眼光、考虑周到、判断准确',
          defect: '缺少激发别人的动力和能力 ',
        },
        TW: {
          merit: '善交往、温和、感觉灵敏、容纳、倾听、解决摩擦',
          defect: '关键时刻不果断 ',
        },
        IM: {
          merit: '自律、可靠、保守、把想法付诸实际行动',
          defect: '有些不灵活、对新事物反应慢 ',
        },
        CF: {
          merit: '苦干、谨慎、有条理、准时、仔细精确',
          defect: '过分担心、不愿授权 ',
        },
        SP: {
          merit: '心眼单一、自我激励、投入、提供知识和技能 ',
          defect: '只在较窄的范围内做出贡献 ',
        },
      },
      summaryData: '',
      title: '',
      tagArr: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$dd.setRight();
      localStorage.removeItem('options');
    });
  },
  created() {
    if (this.$utils.hasCache('user')) {
      this.summaryData = this.$utils.getCache('user');
      if (this.$utils.hasFields(this.summaryData, 'grades')) {
        this.$dd.alert({ message: '无答卷记录' });
      }
    }
    this.title = this.summaryData.survey.surveyName;
    this.getTag();
  },
  methods: {
    getTag() {
      this.summaryData.grades.forEach((element) => {
        if (element.level >= 2) {
          this.tagArr.push({
            value: element.value,
            code: element.code,
            merit: this.datas[element.code].merit,
            defect: this.datas[element.code].defect,
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
  .verdict {
    .wrap {
      padding: 0;
      width: 100vw;
      height: 100vw;
    }
    h2 {
      padding: 40px 0;
      text-align: center;
      color: #000;
      font-weight: bold;
      background-image: url("../../assets/new01.png");
      background-size: 100% 100%;
    }
  }
  .result {
    padding: 2vh;
      background-color: #fff;
    .title{
      display: inline-block;
      height: 100%;
      margin: 0 2vh 2vh 0;
      color: #000;
      font-size: 18px;
      font-weight: bold;
    }
    .el-tag{
        font-size: 14px;
    }
  }
  .judge{
      margin-bottom: 20px;
  }
  .merit-wrap,.defect-wrap{
      color: #000;
      font-weight: bold;
      margin-left: 10px;
  }
  .merit,.defect{
      color: #000;
      font-weight: bold;
      margin: 10px 0 0 10px;
  }
  .merit-wrap{
      margin-top: 10px;
  }
  .defect-wrap{
      margin-top: 10px;
    }
</style>
