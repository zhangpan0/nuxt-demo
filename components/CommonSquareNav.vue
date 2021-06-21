<template>
  <div class="square-nav-wrapper">
    <div class="square-wrapper">
      <div
        :class="['square-item', active === index && 'square-item-active']"
        v-for="(item, index) in navList"
        :key="`square-${index}`"
        @click="switchActive(index)"
      >
        <img
          class="square-icon"
          :src="active === index ? item.activeIconUrl : item.defaultIconUrl"
        />
        <div class="square-title">{{ item.title }}</div>
      </div>
    </div>
    <div class="nav-detail">
      <template v-if="!!aiList">
        <div
          :class="['nav-item', curPath === item.url && 'nav-item-active']"
          v-for="(item, index) in aiList[active] && aiList[active].children"
          :key="`alItem-${index}`"
          @click="switchNav(item, active)"
        >
          {{ item.title }}
          <i class="el-icon-right"></i>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import targetDefault from "@/assets/image/nav/target-default.png";
import targetActive from "@/assets/image/nav/target-active.png";
import imgidentifyDefault from "@/assets/image/nav/imgidentify-default.png";
import imgidentifyActive from "@/assets/image/nav/imgidentify-active.png";
import fontDefault from "@/assets/image/nav/font-default.png";
import fontActive from "@/assets/image/nav/font-active.png";
import attributeDefault from "@/assets/image/nav/attribute-default.png";
import attributeActive from "@/assets/image/nav/attribute-active.png";
import imgdealDefault from "@/assets/image/nav/imgdeal-default.png";
import imgdealActive from "@/assets/image/nav/imgdeal-active.png";
import biologyDefault from "@/assets/image/nav/biology-default.png";
import biologyActive from "@/assets/image/nav/biology-active.png";
import voiceDefaultDefault from "@/assets/image/nav/voice-default.png";
import voiceActive from "@/assets/image/nav/voice-active.png";

export default {
  name: "CommonSquareNav",
  props: {},
  data() {
    return {
      active: 0,
      navList: [
        {
          title: "目标检测",
          defaultIconUrl: targetDefault,
          activeIconUrl: targetActive,
        },
        {
          title: "图像识别",
          defaultIconUrl: imgidentifyDefault,
          activeIconUrl: imgidentifyActive,
        },
        {
          title: "文字识别",
          defaultIconUrl: fontDefault,
          activeIconUrl: fontActive,
        },
        {
          title: "属性分析",
          defaultIconUrl: attributeDefault,
          activeIconUrl: attributeActive,
        },
        {
          title: "图像处理",
          defaultIconUrl: imgdealDefault,
          activeIconUrl: imgdealActive,
        },
        {
          title: "生物特征识别",
          defaultIconUrl: biologyDefault,
          activeIconUrl: biologyActive,
        },
        {
          title: "语音技术",
          defaultIconUrl: voiceDefaultDefault,
          activeIconUrl: voiceActive,
        },
      ],
    };
  },
  computed: {
    aiList() {
      return this.$store.state.aiList;
    },
    curPath() {
      return this.$route.path;
    },
  },
  watch: {
    $route: {
      handler(val) {
        if (!val.query.squareActive) return;
        this.active = Number(val.query.squareActive);
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {},
  methods: {
    switchActive(index) {
      if (index === this.active) return;
      this.active = index;
    },
    switchNav(navInfo, active) {
      const queryPart = this.aesEncrypt({
        i: navInfo.id,
        n: navInfo.title,
      });
      const query = Object.assign(queryPart, { squareActive: active });
      this.$router.push({
        path: navInfo.url,
        query,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.square-nav-wrapper {
  margin-top: -4px;
  width: 100%;
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;

  .square-wrapper {
    width: 1190px;
    height: 160px;
    display: flex;
    background-color: #fff;
    box-shadow: 0px 0px 5px 0px rgba(12, 12, 12, 0.39);
    transform: translateY(-80px);

    .square-item {
      width: 170px;
      height: 160px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: relative;

      .square-icon {
        width: 54px;
        height: 54px;
      }

      .square-title {
        margin-top: 10px;
        font-size: 21px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #2b2e2e;
      }

      &:not(:last-child) {
        &::after {
          content: "";
          height: 25%;
          width: 1px;
          background-color: #ddd;
          position: absolute;
          right: -1px;
          top: 37.5%;
        }
      }

      &.square-item-active {
        background-color: #0073eb;

        .square-title {
          color: #fff;
        }
      }
    }
  }

  .nav-detail {
    width: 1190px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    transform: translateY(-50px);

    .nav-item {
      width: 190px;
      height: 60px;
      margin-right: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s;
      color: #444444;
      background-color: transparent;
      position: relative;
      cursor: pointer;

      .el-icon-right {
        opacity: 0;
        transition: all 0.5s;
        position: absolute;
        right: 15px;
        top: 22.5px;
        color: #3388ff;
      }

      &:hover {
        color: #3388ff;
        background-color: #fff;
        box-shadow: 0 0 10px #dadee4;

        .el-icon-right {
          opacity: 1;
        }
      }

      &.nav-item-active {
        width: 210px;
        height: 60px;
        color: #3388ff;
        background-color: #fff;
        box-shadow: 0 0 10px #dadee4;

        &:hover {
          .el-icon-right {
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>
