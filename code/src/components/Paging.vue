<template>
  <el-pagination
    layout="prev, pager, next"
    class="pages"
    background
    :page-size="size"
    :total="data.length"
    @size-change="setPagesSize"
    @current-change="setPagesChange">
  </el-pagination>
</template>

<script>
export default {
  name: 'Paging',
  props: {
    data: Array,
    size: Number,
  },
  beforeUpdate() {
    this.toParent();
  },
  data() {
    return {
      num: 1,
    };
  },
  computed: {
    pagesData() {
      return this.data.slice((this.num - 1) * this.size, this.num * this.size);
    },
  },
  methods: {
    setPagesSize(val) {
      this.size = val;
    },
    setPagesChange(val) {
      this.num = val;
      this.toParent();
    },
    toParent() {
      if (this.$utils.getType(this.data) === 'array' || this.data.length > 0) {
        this.$emit('pipe', this.pagesData);
      } else {
        this.$emit('pipe', ['数据异常']);
      }
    },
  },
};
</script>

<style scoped lang="less">
  .pages {
    text-align: center
  }
</style>
