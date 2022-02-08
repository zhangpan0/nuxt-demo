<!-- ai能力公共组件 -->
<template>
  <section>
      <Banner />
      <BannerTab />
      <slot></slot>
      <ProductPrice ref="ProductPrice"/>
      <TechExchange />
      <Recommend />
  </section>
</template>

<script>
import Banner from './UiCom/banner'
import BannerTab from './UiCom/bannerTab'
import ProductPrice from './UiCom/productPrice'
import TechExchange from './UiCom/techExchange'
import Recommend from './UiCom/recommend'
export default {
  data() {
    return {
       
    };
  },
  components:{
    Banner,
    BannerTab,
    ProductPrice,
    TechExchange,
    Recommend
  },
  methods: {
     
  },
  created() {
     
  },
}
</script>

<style lang='scss' scoped>
/deep/ {
  .title {
    // position: absolute;
    // top: -42px;
    font-size: 26px;
    color: #333333;
    &::before {
      content: "";
      position: absolute;
      width: 27px;
      height: 18px;
      background: url("~@/static/images/ai/titleCover.png") no-repeat;
      transform: translate(-56px, 10px);
    }
    &::after {
      content: "";
      position: absolute;
      width: 27px;
      height: 18px;
      background: url("~@/static/images/ai/titleCover.png") no-repeat;
      transform: translate(29px, 10px);
    }
  }
}

</style>