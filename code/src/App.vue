<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  @import './style/common';
  @import './style/mixin';
  @import './style/mini-ui';
  @import './style/element-ui';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
