<template>
  <div class="rect-item" :style="rectStyle" @click="handleClick"></div>
</template>

<script>
export default {
  props: {
    coord: Object,
    keyConfig: {
      type: Object,
      default: () => ({
        x: "x",
        y: "y",
        width: "width",
        height: "height",
      }),
    },
    rectColor: String,
    rectColorActive: String,
  },
  computed: {
    rectStyle() {
      const w = this.coord[this.keyConfig.width];
      const h = this.coord[this.keyConfig.height];
      if (w <= 0 || h <= 0) return { display: "none" };
      return {
        left: this.coord[this.keyConfig.x] + "px",
        top: this.coord[this.keyConfig.y] + "px",
        width: w + "px",
        height: h + "px",
        borderColor: this.rectColor,
      };
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("handleClick");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.rect-item {
  position: absolute;
  border: 2px solid #c3c3c3;
}
.active {
  border: 2px solid #4fff00;
  border-color: #61e635 !important;
  z-index: 2;
}
</style>