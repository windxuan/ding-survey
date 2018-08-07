<template>
  <div class="negation">
    <img src="../assets/font_notfound.png" alt="" width="680" height="280">
    <div class="negation-txt">
      页面飞去外太空啦
      <br>
          即将离开本页，
          <i>{{secs}}</i>
          秒后自动返回
    </div>
    <span><a @click="goPrev">立即返回</a></span>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  data() {
    return {
      secs: 5,
    };
  },
  watch: {
    secs() {
      return this.secs === 0 && this.$router.go(-1);
    },
  },
  created() {
    const vm = this;
    setInterval(() => vm.secs > 0 && vm.secs--, 1000);
  },
  methods: {
    // 返回上一级
    goPrev() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
.negation {
  position: relative;
  img {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
  }
  .negation-txt {
    position: absolute;
    top: 485px;
    left: 50%;
    width: 525px;
    height: 60px;
    transform: translateX(-50%);
    color: #32a8ee;
    line-height: 30px;
    font-family: Tahoma;
    font-size: 22px;
    text-align: center;
  }
  span {
    position: absolute;
    top: 585px;
    left: 50%;
    width: 125px;
    height: 55px;
    transform: translateX(-50%);
    border: 1px solid #32a8ee;
    border-radius: 30px;
    text-align: center;
    line-height: 50px;
    font-family: Tahoma;
    font-size: 24px;
    color: #32a8ee;
    &:hover {
      cursor: pointer;
      background: rgba(144, 199, 231, 0.4);
    }
  }
}
</style>
