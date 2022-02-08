<template>
  <div class="head-banner" :style="navItem.bgUrl ? 'background:url(https://file.maxvision.cn/ai-resource/image/bg3.png)' : 'background: #dae2f4'">
    <div class="bg-Container">
      <div class="text-cont">
        <h2 class="g-mg-b-xs tc-title">{{ navItem.title || "" }}</h2>
        <p class="tc-desc g-mg-b-xs">
          {{ navItem.desc || "" }}
        </p>
        <div class="g-mg-b-xs">
          <el-button type="primary" size="small" @click="purchase" :disabled="isDisable"
          >立即选购
          </el-button
          >
          <el-button type="primary" size="small" @click="goTechDoc"
          >技术文档
          </el-button
          >
          <el-button type="primary" size="small" @click="goProductPrice">产品价格</el-button>
        </div>
      </div>
      <img v-if="!navItem.bgUrl" src="@/static/images/ai/design.png"/>
    </div>
  </div>
</template>

<script>
import * as jump from "@/assets/js/jump.js";

export default {
  props: {
    
  },
  computed: {
    isDisable() {
      return this.$store.state.productPriceList.length <= 0;
    },
    navItem() {
      return this.$store.state.firstNav;
    },
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {
    // 立即选购
    purchase() {
      let productPriceList = JSON.parse(
        localStorage.getItem("productPriceList")
      );
      let arr = productPriceList.filter(item => {
        return item.algorithmSetmealPrice !== "0";
      });
      if (arr.length !== 0) {
        this.$router.push({
          path: "/chargeMode/chargeMode"
        });
      }
    },
    // 跳转技术文档
    goTechDoc() {
      window.open(jump.techDocLink);
    },
    // 跳转产品价格
    goProductPrice() {
      window.open(jump.productPriceLink)
    }
  },
  mounted() {
  }
};
</script>
<style scoped lang="scss">
.head-banner {
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background: #dae2f4;
  min-height: 366px;
  height: 426px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*   .bg-img {
    width: 100%;
    // min-width: 1680px;
    min-height: 366px;
    height: 426px;
    object-fit: cover;
  } */

  .bg-Container {
    width: 70%;
    margin-top: 105px;
    height: 300px;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    .text-cont {
      transition: all 0.5s;
      z-index: 1;
      display: flex;
      flex-direction: column;

      h2 {
        font-size: 36px;
        font-weight: bold;
        color: #000000;
      }
    }

    img {
      height: 289px;
      object-fit: cover;
    }
  }

  .tc-title {
    transition: all 0.5s;
    color: inherit;
    font-size: 30px;
    font-weight: 400;
  }

  .tc-desc {
    transition: all 0.5s;
    color: inherit;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    color: #0e050b;
  }
}
</style>
