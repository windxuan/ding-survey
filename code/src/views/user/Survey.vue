<template>
  <div class="survey swiper-container swiper-no-swiping" ref="swiper">
    <!-- 答题说明组件 -->
    <statement></statement>
    <div class="top-room">
      <h2>{{$utils.digitDX(activeIndex + 1) + '. ' + surveyData[activeIndex].questionName}}</h2>
      <div class="banner">已分配的分数：{{ scoreSum }}分</div>
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
              ref="ranges"
              :disabled="disable"
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
        <mt-button :disabled="activeIndex === 0" class="eida" @touchend="prev" @click="prev">上一题</mt-button>
        <span>{{ activeIndex + 1 }} / {{ surveyData.length }} </span>
        <mt-button class="eida" @touchend="next" @click="next">下一题</mt-button>
      </div>
    </mt-tabbar>
  </div>
</template>

<script>
import Swiper from 'swiper';
import { MessageBox, Toast, Indicator } from 'mint-ui';
import statement from '../../components/Statement';

export default {
  name: 'Survey',
  components: { statement },
  data() {
    return {
      disable: false,
      surveyData: [{ questionName: '' }],
      questions: [{ options: [{ score: 0 }] }],
      swiper: {},
      totalScore: 0,
      once: true,
    };
  },
  created() {
    // 检测问卷题目缓存
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
        this.initSwiper();
      });
    } else {
      this.sendSurvey();
    }
    // 检测答题记录缓存
    if (this.$utils.hasCache('options')) {
      this.questions = this.$utils.getCache('options');
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$utils.setCache('options', this.questions);
    next();
  },
  destroyed() {
    this.$utils.setCache('options', this.questions);
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
    // 实例化 Swiper 组件
    initSwiper() {
      this.swiper = new Swiper(this.$refs.swiper, { noSwiping: true });
    },
    // 获取问卷信息
    sendSurvey() {
      this.$http.get('survey')
        .then((result) => {
          this.surveyData = result.data.questions;
          this.createOptions();
          this.initSwiper();
          this.$utils.setCache('survey', this.surveyData);
        })
        .then(() => {
          this.initSwiper();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 生成答题记录信息
    createOptions() {
      if (this.$utils.hasCache('options')) {
        this.questions = this.$utils.getCache('options');
      } else {
        const arr = [];
        this.surveyData.forEach((element) => {
          const item = {};
          this.$set(item, 'id', element.id);
          this.$set(item, 'options', []);
          element.options.forEach((el, i) => {
            const opts = {};
            this.$set(opts, 'id', i + 1);
            this.$set(opts, 'codeId', el.codeId);
            this.$set(opts, 'score', 0);
            item.options.push(opts);
          });
          arr.push(item);
        });
        this.questions = arr;
      }
    },
    prev() {
      if (this.scoreSum === 10) {
        this.$refs.ranges.slice(0, 10 * this.activeIndex + 9).disabled = true;
      }
      this.swiper.slidePrev();
    },
    next() {
      if (this.scoreSum !== 10) {
        Toast({
          message: '总分必须为10分哦',
          className: 'score-tips',
          position: 'center',
          duration: 2000,
        });
      } else if (this.activeIndex === 0) {
        if (this.once) {
          MessageBox({
            title: '提示',
            message: '点击确定后，将无法修改',
            showCancelButton: true,
          }).then((msg) => {
            if (msg === 'confirm') {
              this.once = false;
              this.swiper.slideNext();
            }
            return false;
          });
        } else {
          this.swiper.slideNext();
        }
      } else if (this.activeIndex === this.surveyData.length - 1) {
        MessageBox({
          title: '提示',
          message: '已答完,确定提交？',
          showCancelButton: true,
        }).then((msg) => {
          if (msg === 'confirm') {
            Indicator.open();
            this.submitSurvey();
          }
          return false;
        });
      } else {
        this.swiper.slideNext();
      }
    },
    // 提交问卷
    submitSurvey() {
      const answer = {};
      this.$set(answer, 'staff', {});
      this.$set(answer, 'questions', this.questions);
      this.$set(answer.staff, 'staffName', '小彩蛋');
      this.$set(answer.staff, 'staffNo', this.$utils.randomSum(9));
      this.$set(answer.staff, 'mobliePhone', '12377778888');
      this.$http.post('survey', answer)
        .then((result) => {
          console.log(result);
          this.$router.push({
            name: 'verdict',
            params: result.data,
          });
          Indicator.close();
        })
        .catch((error) => {
          console.log(error);
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
      font-size: 1.3rem;
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
