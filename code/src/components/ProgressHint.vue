<template>
  <div class="total"
    :class="{
    'start-1': data === 1,
    'start-2': data === 2,
    'start-3': data === 3,
    'start-4': data === 4,
    'start-5': data === 5,
    'start-6': data === 6,
    'start-7': data === 7,
    'start-8': data === 8,
    'start-9': data === 9,
    'warn': data > 10,
    'end': data === 10
  }">
    <span v-if="data < 10">{{ `可分配 ${10 - data} 分` }}</span>
    <span v-if="data === 10">
      <i class="el-icon-check"> </i>
      已分配完成
    </span>
    <span v-if="data > 10">
      <i class="el-icon-close"> </i>
      {{ `已超出 ${data - 10} 分 `}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ProgressHint',
  props: ['data'],
};
</script>

<style scoped lang="less">
  .total {
    position: fixed;
    top: 2rem;
    left: 50%;
    display: inline-block;
    margin-left: -25%;
    padding: 2px 0;
    width: 50%;
    color: #000;
    z-index: 10;
    text-align: center;
    background-color: #F6F6F6;
    border-radius: .3rem;
    transition: background .5s;
    &.end {
      background-color: #9FF048;
    }
    &.warn {
      color: #fff;
      background-color: #FF534D;
    }
    > span {
      position: relative;
      z-index: 100;
    }
  }
  .el-icon-check,
  .el-icon-close {
    font-weight: 600;
  }
  .start(@score-size) when (@score-size > 0) {
    .start(@score-size - 1);
    .total.start-@{score-size}::before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 10% * @score-size;
      height: 100%;
      background: fade(#EFF03C, 50% + (5.556% * @score-size));
      border-radius: .3rem 0 0 .3rem;
    }
  }
  .start(9);
</style>
