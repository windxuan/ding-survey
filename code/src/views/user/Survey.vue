<template>
  <div class="survey swiper-container swiper-no-swiping" ref="swiper">
    <div class="top-room">
      <h2>{{surveyData[activeIndex].questionName}}</h2>
      <div class="banner" @click="submitSurvey">我的分数是：{{ scoreSum }}分</div>
    </div>
    <!-- 主要答题界面内容 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide swiper-no-swiping" v-for="(value, index) in surveyData" :key="index">
        <ul>
          <li v-for="(v, i) in value.options" :key="i">
            <div class="center-title-wrap">
              <span class="center-title">{{i + 1}}、</span>
              <span class="center-title-two">{{v.optionName}}</span>
            </div>
            <mt-range
              v-model="questions[index].options[i].score"
              :max="10"
              :step="1"
              :bar-height="5">
              <div class="range-end" slot="end">
                <span>{{ questions[index].options[i].score }}</span>
                <div class="na1"></div>
                <div class="na2"></div>
                <div class="na3"></div>
                <div class="na4"></div>
              </div>
            </mt-range>
          </li>
        </ul>
      </div>
    </div>
    <!-- 底部内容 -->
    <mt-tabbar fixed>
      <div class="botton">
        <mt-button class="eida" @click="prev" @touchend="prev">上一题</mt-button>
        <span>{{activeIndex + 1}} / 7 </span>
        <mt-button class="eida" @click="next" @touchend="next">下一题</mt-button>
      </div>
    </mt-tabbar>
  </div>
</template>

<script>
import Swiper from 'swiper';

export default {
  name: 'Survey',
  data() {
    return {
      surveyData: [{ questionName: '' }],
      questions: [{ options: [{ score: 0 }] }],
      swiper: {},
      totalScore: 0,
    };
  },
  created() {
    // 检测问卷缓存
    if (this.$utils.hasCache('survey')) {
      new Promise((success) => {
        const data = this.$utils.getCache('survey');
        if (data.length > 1) {
          success(data);
        }
      }).then((data) => {
        this.surveyData = data;
        this.createOptions();
      }).then(() => {
        this.swiper = new Swiper(this.$refs.swiper, { noSwiping: true });
      });
    } else {
      this.sendSurvey();
    }
  },
  computed: {
    activeIndex() {
      return this.swiper.realIndex || 0;
    },
    scoreSum() {
      let sum = 0;
      this.questions[this.activeIndex].options.map((val) => {
        sum += val.score;
        return sum;
      });
      return sum;
    },
  },
  methods: {
    // 获取问卷信息
    sendSurvey() {
      this.$http.get('survey')
        .then((result) => {
          this.surveyData = result.data.questions;
          this.createOptions();
          this.$utils.setCache('survey', this.surveyData);
        })
        .then(() => {
          this.swiper = new Swiper(this.$refs.swiper, { noSwiping: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 生成答题参数项
    createOptions() {
      const arr = [];
      this.surveyData.forEach((element) => {
        const obj = {
          id: element.id,
          options: [],
        };
        element.options.forEach((el, i) => {
          obj.options.push({
            id: i + 1,
            codeId: el.codeId,
            score: 0,
          });
        });
        arr.push(obj);
      });
      this.questions = JSON.parse(JSON.stringify(arr));
    },
    prev() {
      this.swiper.slidePrev();
    },
    next() {
      this.swiper.slideNext();
    },
    // 提交问卷
    submitSurvey() {
      this.$http.post('survey', {
        staff: {
          staffName: '小彩蛋',
          staffNo: '142536',
          moblie: '12377778888',
        },
        questions: this.questions.map(val => val.options.filter(val => val.score > 0)),
      })
        .then((result) => {
          console.log(result);
        });
    },
  },
};
</script>

<style scoped lang="less">
  .center-title-wrap{
    position: relative;
  }
  .center-title {
    line-height: 30px;
    position: absolute;
    text-align: center;
    top: 4px;
    left: 0;
  }
  .center-title-two{
    width: 82%;
    display: inline-block;
    padding-top: 5px;
    padding-left: 1.5em;
    line-height: 30px;
    letter-spacing: 3px;
  }
  .survey {
    display: block;
    height: 100%;
    color: #fff;
    background: #3B4148;
    .mint-swipe {
      height: 100%;
      overflow: visible;
    }
  }
  .range-end {
    margin-left: 10px;
    width: 25px;
    height: 25px;
    position: relative;
    span {
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 25px;
    }
    .na1{
      position: absolute;
      top: 0;
      left: 0;
      border-top: 1px solid #53E2F0;
      border-left: 1px solid #53E2F0;
    }
    .na2{
      position: absolute;
      top: 0;
      right: 0;
      border-top: 1px solid #53E2F0;
      border-right: 1px solid #53E2F0;
    }
    .na3{
      position: absolute;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid #53E2F0;
      border-left: 1px solid #53E2F0;
    }
    .na4{
      position: absolute;
      bottom: 0;
      right: 0;
      border-bottom: 1px solid #53E2F0;
      border-right: 1px solid #53E2F0;
    }
  }
  .na1,.na2,.na3,.na4{
    width: 6px;
    height: 6px;
  }
  .top-room{
    position: fixed;
    width: 100%;
    height: 22%;
    background-image: url("../../assets/new01.png");
    background-size: 100% 100%;
    z-index: 10;
    text-align: center;
    h2{
      width: 100%;
      color: #000;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  .banner{
    width: 200px;
    height: 30px;
    background-image: url("../../assets/banner.png");
    background-size: 100% 100%;
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 30px;
    color: #f00;
  }
  .survey-box{
    border: 3px solid #f00;
    height: 800px;
    background: #3B4148;
  }
  .swiper-wrapper{
    padding: 0 15px;
    background-color:#3B4148 ;
    ul{
      margin-top:50%;
      padding-bottom: 30px;
      overflow: hidden;
    }
  }
  .botton {
    width: 100%;
    background-color: #2E353D;
    height: 50px;
    span{
      color: #fff;
      padding: 0 30px;
    }
  }
  .eida{
    background-color: #EFF03C;
    color: #000;
    width: 80px;
    height: 35px;
    margin-top: 7px;
  }
</style>
