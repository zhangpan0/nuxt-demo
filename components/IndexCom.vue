<template>
  <div class="home-index">
    <div class="introduction">
      <div class="part part-first">
        <div class="title">
          专注安防技术研究及应用<span class="strong">2 0</span>余年
          丰富的Al应用场景与案例积累
        </div>
        <video class="vedio" ref="vedio" autoplay="autoplay" muted loop>
          <source src="@/assets/image/video/aivedio2.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="part part-second">
        <div class="title">
          让<span class="strong">A.I.</span>变得简单 服务全社会
        </div>
        <img class="img" src="@/assets/image/video/socicalService.png" />
      </div>
      <div class="part part-third">
        <div class="switch-platform-wrapper">
          <div
            :class="['btn', platformActive === 0 && 'btn-active']"
            @click="switchPlatformActive(0)"
          >
            数据中台
          </div>
          <div
            :class="['btn', platformActive === 1 && 'btn-active']"
            @click="switchPlatformActive(1)"
          >
            算法中台
          </div>
          <div
            :class="['btn', platformActive === 2 && 'btn-active']"
            @click="switchPlatformActive(2)"
          >
            应用中台
          </div>
        </div>
        <video class="vedio" ref="platformVedio" autoplay="autoplay" muted loop>
          <source :src="dataCenterPlatform" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import dataCenterPlatform from "@/assets/image/video/datavedio.mp4";
import algorithmCenterPlatform from "@/assets/image/video/algorithmvedio.mp4";
import appCenterPlatform from "@/assets/image/video/appvedio.mp4";

/* 首页 */
export default {
  data() {
    return {
      carouselActiveIndex: 0,
      currentNewsIndex: 0,
      timer: null,
      time: 8,
      showArrow: false,
      dataCenterPlatform,
      algorithmCenterPlatform,
      appCenterPlatform,
      platformActive: 0,
    };
  },
  computed: {
    platformImg() {
      return this.platformActive === 0
        ? dataCenterPlatform
        : this.platformActive === 1
        ? algorithmCenterPlatform
        : appCenterPlatform;
    },
  },
  mounted() {
    // const clientHeight = this.$refs['carouselRef'].$el.children[0].clientHeight;
    // this.setSwiperHeight(clientHeight);
    // 浏览器窗口变化则改变轮播图的高度
    // 因为element的轮播图内部是绝对定位的，高度坍塌，所以高度写死了100vh，不这样搞的话视频的背景会出现问题
    // 以后有好的办法记得优化
    // imgcook的官网背景图是png 有动效的 研究一下吧
    // window.onresize = () => {
    //   this.setSwiperHeight(clientHeight);
    // };
  },
  methods: {
    handleCarouselChange(index) {
      this.carouselActiveIndex = index;
    },
    handleClickLeft() {
      this.$refs.carouselRef.prev();
    },
    handleClickRight() {
      this.$refs.carouselRef.next();
    },
    switchPlatformActive(index) {
      this.platformActive = index;
      this.$refs["platformVedio"].load();
    },
    setSwiperHeight(clientHeight) {
      const vedioClientHeight = this.$refs["vedio"].clientHeight;
      if (vedioClientHeight <= clientHeight) {
        this.$refs[
          "carouselRef"
        ].$el.children[0].style.height = `${vedioClientHeight}px`;
      } else {
        this.$refs[
          "carouselRef"
        ].$el.children[0].style.height = `${clientHeight}px`;
      }
    },
  },
};
</script>
<style scoped lang='scss'>
.home-index {
  .banner-main {
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    .slide {
      position: relative;
      height: 100%;
      .text {
        opacity: 0;
        transition: all 0.3s 0.5s ease-in-out;
        color: #fdfcfc;
        .desc {
          font-weight: 400;
          text-align: center;

          span {
            font-size: inherit;
          }
        }
        &.text-active {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .vedio {
        width: 100%;
      }
    }
  }
}

.carousel-wrap {
  position: relative;
  .scroll-arrow {
    width: 35px;
    height: 99px;
    position: absolute;
    left: 50%;
    bottom: 5%;
    margin-left: -17.5px;
    z-index: 2;
    animation: upDown 1s 0.3s linear infinite alternate;
    .inner {
      width: 100%;
      height: 100%;
      background: url("~@/assets/image/scroll-arrow.png") no-repeat;
      background-size: cover;
    }
  }
}

.introduction {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .part {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 120px 0;
    .title {
      font-size: 32px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      text-align: center;
      color: #000000;

      .strong {
        color: #3388ff;
        font-size: 48px;
      }
    }
    .img {
      max-width: 1100px;
      margin-top: 25px;
    }
    .vedio {
      width: 100%;
      mix-blend-mode: screen;
    }
  }
  .part-second {
    background-color: #f2f2f2;

    .img {
      margin-top: 100px;
    }
  }
  .part-third {
    .img {
      margin-top: 100px;
    }
    .switch-platform-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      .btn {
        width: 300px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        border-radius: 5px;
        font-size: 32px;
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 50px;
        }
        &.btn-active {
          color: #fff;
          background-color: #3388ff;
          border: 1px solid #3388ff;
        }
      }
    }
  }
}

@keyframes upDown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(30px);
  }
}
</style>