<template>
  <div class="zhezhao" ref="zhezhao" v-show="flag">
    <div class="zhezhao-wrap">
      <div class="zhezhao-box">
        <div class="zhezhao-title">
          <p>答题说明</p>
        </div>
        <ul class="zhezhao-text">
          <li>本问卷共有七个部分，每部分有十项陈述。每部分的总分是10分。请将10分分配给你认为最准确地描述你的行为或感觉的项目上。</li>
          <li>你可以自由分配这10分，你认为哪一项越能反映你的行为或感受，就给这一项一个较高的分数；这10分既可以分别打给几项，也可以只打到一项上。</li>
          <li><span class="import">注意：每一部分的总分必须是10分。</span></li>
        </ul>
        <el-button
          type="primary"
          class="zhezhao-button"
          @click="flag = !flag">我已阅读，开始答题</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statement',
  data() {
    return {
      flag: true,
    };
  },
};
</script>

<style scoped lang="less">
  /* 遮罩层样式开始*/
  .zhezhao{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,.6);
    z-index: 20;
    .zhezhao-wrap{
      width: 80%;
      border-radius: 20px;
      position: fixed;
      top: 50%;
      left: 50%;
      background-color: #fff;
      width:80%;
      -webkit-transform: translateX(-50%) translateY(-50%);
      z-index: 21;
      color: #000;
      p{
        font-size: .32rem;
        text-align: center;
      }
      .zhezhao-text{
        width: 85%;
        margin: 0 auto;
        li{
          margin-top: 15px;
          text-indent: .36rem;
          font-size: .36rem;
        }
      }
      .zhezhao-button{
        height: 30px;
        display: block;
        margin: 20px auto;
        text-align: center;
        background-color: #6580F3;
      }
    }
  }
  .import{
    color: #f00;
  }
  .zhezhao-title{
    width: 100%;
    height: 70px;
    text-align: center;
    background-image: url("../assets/zzbanner.png");
    background-size: 100% 100%;
    padding-top: 20px;
    /*border: 1px solid #000;*/
  }
  /*遮罩层样式结束*/
</style>
