<template>
  <div class="pure-img-list">
    <i class="el-icon el-icon-arrow-left" @click="uiScroll(0)"></i>
    <ul class="pi-wrap" ref="piWrap">
      <div class="li-wrapper">
        <li
          :class="['pi-item', index === activeIndex ? 'pi-active' : '']"
          v-for="(item, index) in list"
          :key="`pi${index}`"
          :style="{ width: imgWidth, height: imgHeight }"
          @click="handleClick(item, index)"
        >
          <img :src="imgPath + item.algorithmImageThumbUrl" alt="" />
        </li>
      </div>
    </ul>
    <i class="el-icon el-icon-arrow-right" @click="uiScroll(1)"></i>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    srcKey: {
      type: String,
      default: () => "algorithmImageThumbUrl",
    },
    imgWidth: {
      type: String,
      default: () => "124px",
    },
    imgHeight: {
      type: String,
      default: () => "90px",
    },
  },
  data() {
    return {
      activeIndex: 0,
      canClick: true,
      scrollLeft: 0,
    };
  },
  computed: {
    imgPath() {
      return process.env.API_IMG_URL;
    },
  },
  methods: {
    handleClick(item, index) {
      if (!this.canClick) return;
      this.canClick = false;
      this.activeIndex = index;
      // if (this.activeIndex === index) return;
      // 父组件可能有等待状态，触发父组件的事件后，再调用此回调改变激活状态
      this.$emit("handleClick", item, () => {
        this.canClick = true;
      });
    },
    // 对外提供，清除状态
    removeStatus() {
      this.activeIndex = -1;
    },
    uiScroll(direction) {
      if (direction) {
        this.$refs["piWrap"].scrollLeft += 133;
      } else {
        this.$refs["piWrap"].scrollLeft -= 133;
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.pure-img-list {
  display: flex;
  padding: 0 32px;
  position: relative;
  transition: all 0.5s;

  // margin-top: 20px;

  .pi-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    transition: all 0.5s;
    // overflow-x: auto;

    .li-wrapper {
      display: flex;
      transition: all 0.5s;
    }

    .pi-item {
      transition: all 0.5s;

      overflow: hidden;
      flex-shrink: 0;
      cursor: pointer;
      border: 2px solid #e5e5e5;
      text-align: center;

      &:not(:last-child) {
        margin-right: 8px;
      }

      img {
        height: 100%;
      }

      &.pi-active {
        border: 2px solid #0073eb;
      }
    }
  }

  .el-icon {
    font-size: 23px;
    font-weight: bold;
    color: #666;
    cursor: pointer;

    &.el-icon-arrow-left {
      position: absolute;
      top: 35px;
      left: 0px;
    }

    &.el-icon-arrow-right {
      position: absolute;
      top: 35px;
      right: 0px;
    }
  }
}
</style>
