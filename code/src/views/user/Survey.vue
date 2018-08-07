<template>
  <!-- <div class="survey"> -->
    <div class="survey swiper-container swiper-no-swiping" ref="swiper">
      <div class="top-room">
        <!-- <h2>{{surveyData.questions[activeIndex].questionName}}</h2> -->
        <div class="banner">我的分数是：分</div>
      </div>
      <!--</div>-->
      <!-- 主要答题界面内容 -->
      <!-- <div class="center-room"> -->
        <!-- <mt-loadmore> -->
          <div class="swiper-wrapper">
            <div class="swiper-slide swiper-no-swiping" v-for="(question, key) in surveyData.questions" :key="key">
              <ul>
                <li v-for="(option, index) in question.options" :key="index">
                  <div class="center-title-wrap">
                    <span class="center-title">{{index + 1}}、</span>
                    <span class="center-title-two">{{option.optionName}}</span>
                  </div>
                  <mt-range
                    v-model="option.score"
                    :min="0"
                    :max="10"
                    :step="1"
                    :bar-height="5">
                    <div class="range-end" slot="end">
                      <span>{{option.score}}</span>
                      <div class="na1"></div>
                      <div class="na2"></div>
                      <div class="na3"></div>
                      <div class="na4"></div>
                    </div>
                  </mt-range>
                </li>
              </ul>
              <!-- {{question}} -->
            </div>
          </div>
        <!-- </mt-loadmore> -->
      <!-- </div> -->
      <!-- 底部内容 -->
      <mt-tabbar fixed>
        <div class="botton">
          <mt-button class="eida" @click="handlePrev" @touchend="handlePrev">上一题</mt-button>
          <span>{{activeIndex + 1}} / 7 </span>
          <mt-button class="eida" @click="handleNext" @touchend="handleNext">下一题</mt-button>
        </div>
      </mt-tabbar>
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'Survey',
  data() {
    return {
      // totalScore: 0,
      // range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      surveyData: '',
      mySwiper: '',
      totalScore: 0,
    };
  },
  created() {
    this.getSurvey();
  },
  mounted() {
    // this.getSurvey();
  },
  computed: {
    // calcTotalScore() {
    //   if (this.surveyData !== '') {
    //     this.totalScore = 0;
    //     this.surveyData.questions.forEach((ele) => {
    //       ele.options.forEach(element => this.totalScore += element.score);
    //     });
    //   }
    //   return this.totalScore;
    // },
    activeIndex() {
      return this.mySwiper.realIndex;
    },
  },
  // watch: {
  //   // 计算总分
  //   range: function(val) {
  //     this.totalScore =  val.reduce((prev, crru) => {
  //       return prev + crru;
  //     });
  //   },
  // },
  methods: {
    // swipe配置数据
    initSwiper() {
      const container = this.$refs.swiper;
      const config = {
      // 禁止滑动
        noSwiping: true,
      };
      // 初始化swipe
      this.mySwiper = new this.$swiper(container, config);
    },
    // 获取问卷信息
    getSurvey() {
      this.$http.get('survey')
        .then((res) => {
          console.log(res.data);
          this.surveyData = res.data;
        }).then(() => {
          this.initSwiper();
        });
    },
    // 上一页
    handlePrev() {
      this.mySwiper.slidePrev();
    },
    // 下一页
    handleNext() {
      this.mySwiper.slideNext();
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
            // font-size: 18px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            // margin-left: -130px;
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
        // margin-left: -100px;
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
        // margin: 0 auto;
        // width: 90%;
        background-color:#3B4148 ;
        // margin-bottom: 50px;
        .mint-loadmore {
            // overflow: visible;
        }
        ul{
            margin-top:50%;
            padding-bottom: 30px;
            overflow: hidden;
        }
        li{
            // margin-bottom: .9em;
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
