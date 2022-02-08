<template>
  <div class="bor-cor">
    <div class="bor-cor-inner bor-cor-t" :style="borStyle"></div>
    <div class="bor-cor-inner bor-cor-r" :style="borStyle"></div>
    <div class="bor-cor-inner bor-cor-b" :style="borStyle"></div>
    <div class="bor-cor-inner bor-cor-l" :style="borStyle"></div>
  </div>
</template>

<script>
/*
四角边框组件
！父组件需定位
*/
export default {
  props: {
    width: String,
    size: String,
    color: String,
  },
  computed: {
    borStyle() {
      return {
        width: this.width,
        height: this.width,
        borderWidth: this.size,
        borderColor: this.color,
      }
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.bor-cor {
  .bor-cor-inner {
    width: 17px;
    height: 17px;
    border-width: 3px;
    border-color: #0073eb;
    position: absolute;
    z-index: 9;
  }
  .bor-cor-t,
  .bor-cor-r {
    top: 0;
    border-top-style: solid;
    border-color: #0073eb;

  }

  .bor-cor-b,
  .bor-cor-l {
    bottom: 0;
    border-bottom-style: solid;
    border-color: #0073eb;

  }

  .bor-cor-t,
  .bor-cor-l {
    left: 0;
    border-left-style: solid;
    border-color: #0073eb;

  }
  .bor-cor-r,
  .bor-cor-b {
    right: 0;
    border-right-style: solid;
    border-color: #0073eb;

  }
}
</style>