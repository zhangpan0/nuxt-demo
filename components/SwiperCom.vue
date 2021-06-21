<template>
  <div>
    <div
      v-if="initStatus"
      v-swiper:mySwiper="swiperOption"
      :class="cusClass + ' swiperWrap swiperBox ' + swpName"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="banner in list">
          <a v-if="banner.link" :href="banner.link" target="_blank">
            <img :src="banner.src" />
          </a>
          <img v-else :src="banner.src" />
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      //banner数组
      type: Array,
      default: function () {
        return [];
      },
    },
    cusClass: {
      //自定义类名
      type: String,
      default: "",
    },
    loop: {
      //是否循环
      type: Boolean,
      default: true,
    },
    delay: {
      //间隔时间
      type: Number,
      default: 3000,
    },
    spaceBetween: {
      //两个恶轮播的间隔
      type: Number,
      default: 0,
    },
    slidesPerView: {
      //一页显示几个
      type: Number,
      default: 1,
    },
    paginationType: {
      //导航点类型
      // 'bullets'  圆点（默认）
      // 'fraction'  分式
      // 'progressbar'  进度条
      // 'custom' 自定义
      type: String,
      default: "",
    },
  },
  data() {
    return {
      initStatus: false, //初始化状态
      swpName: this.roundString(), //swiper的类名
      swiperOption: {}, //swiper参数
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.swiperOption = {
        loop: self.loop,
        centeredSlides: true,
        slidesPerView: self.slidesPerView, //一页显示几个
        spaceBetween: self.spaceBetween, //间隔
        autoplay: {
          //自动轮播
          delay: self.delay,
          disableOnInteraction: false, //操作swiper后 自动轮播不会停止
        },
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true,
          type: self.paginationType ? self.paginationType : "bullets",
        },
        on: {
          slideChange() {
            console.log("onSlideChangeEnd", this);
          },
          tap() {
            console.log("onTap", this);
          },
        },
      };
      this.initStatus = true; //渲染swiper
    });
  },
  methods: {
    roundString() {
      //生成随机字符串
      let str = "";
      let chars = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      chars.forEach(() => {
        str += chars[Math.ceil(Math.random() * 25)];
      });
      return str;
    },
  },
};
</script>
<style lang="scss" scoped>
.swiperWrap {
  .swiper-slide {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>