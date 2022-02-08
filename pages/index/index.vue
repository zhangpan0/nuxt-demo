<!-- 首页 -->
<template>
  <div class="home-index">
    <!-- 轮播 -->
    <div class="carousel-wrap">
      <el-carousel
        ref="carouselRef"
        indicator-position=""
        :autoplay="true"
        :interval="4000"
        arrow="never"
        :height="bannerHeight + 'px'"
        @change="handleCarouselChange"
        style="overflow: hidden"
      >
        <el-carousel-item
          style="display: inline-block"
          v-for="(item, index) in bannerNewList"
          :key="'banner' + index"
        >
          <div class="banner-main" :style="'height:' + bannerHeight + 'px'">
            <div class="slide">
              <img
                :src="imgDomain + item.homeBannerWebUrl"
                alt=""
                width="100%"
                ref="bannerImg"
                v-if="!item.video"
                @load="imageLoaded"
              />
              <video
                v-else
                class="main-vedio"
                ref="mainVideo"
                autoplay="autoplay"
                style="width: 100%; height: 100%"
                muted
                loop
                playsinline
              >
                <source :src="item.video" type="video/mp4" />
              </video>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item style="display: inline-block">
          <div class="banner-main" :style="'height:' + bannerHeight + 'px'">
            <div class="slide">
              <video
                class="main-vedio"
                ref="mainVideo"
                autoplay="autoplay"
                style="width: 100%; height: 100%"
                muted
                loop
                playsinline
              >
                <source :src="bannerList.video" type="video/mp4" />
              </video>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- ai能力 -->
    <div class="ai-cont-wrap">
      <div class="ai-title">
        <div class="title">AI能力</div>
        <div class="title-des">丰富的Al应用场景与案例积累 开启盛视AI</div>
      </div>
      <div class="ai-cont">
        <div class="ai-cont-l">
          <div
            v-for="(v, i) in aiList"
            :key="v.id"
            :class="{ 'active-ai': aiArrIndex == i }"
            @click="changeTab(v, i)"
          >
            {{ v.title }}
          </div>
        </div>
        <div class="ai-cont-r">
          <div class="ai-cont-des">
            <div class="ai-cont-des-t">{{ aiSubCurrent.title }}</div>
            <div class="ellipsis-3">{{ aiSubCurrent.description }}</div>
          </div>
          <div class="ai-cont-list">
            <div v-for="(item, i) in aiSubArr" :key="i" @click="goToLink(item, 0)" class="ai-cont-list-box">
              <div class="ai-cont-list-t">{{ item.title }}</div>
              <div class="ai-cont-item">
                <div class="ellipsis-2">{{ item.description || "--" }}</div>
                <div class="ai-enter">进入AI能力</div>
              </div>
            </div>
          </div>
          <el-empty
            description="暂未开放 敬请期待！"
            v-if="false"
          ></el-empty>
        </div>
      </div>
      <div class="ai-title">
        <div class="ai-more" @click="enterAi">
          更多AI能力&nbsp;<i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <!-- ai工厂 -->
    <FactoryAnimate />
  </div>
</template>

<script>
import bannerOld1 from "@/static/images/home/banner/banner1_bg.png";
import biology from "@/assets/videos/biology.mp4";
import { deepCopy } from "@/assets/js/utils";
import FactoryAnimate from "@/components/FactoryAnimate/index";
import { getBannerList } from "@/assets/api/index";

/* 首页 */
export default {
  data() {
    return {
      carouselActiveIndex: 0,
      bannerList: {
        homeBannerWebUrl: bannerOld1,
        video: biology,
      },
      aiArrIndex: 0,
      loadCount: 0,
      bannerHeight: 640,
      imgDomain: process.env.API_IMG_URL,
      aiSubArr:[]
    };
  },
  // 首页算法菜单
  async asyncData({ app, params, store }) {
    try {
      const res = await getBannerList();
      return { bannerNewList: res.rows || [] };
    } catch (err) {
      return { bannerNewList: [] };
    }
  },
  computed: {
    aiList() {
      return this.$store.state.aiList;
    },
    aiSubCurrent() {
      let arr = deepCopy(this.aiList);
      return arr[+this.aiArrIndex] || {};
    },
  },
  components: {
    FactoryAnimate,
  },
  mounted() {
    window.addEventListener("resize", this.getImageHeight, false);
    this.$store.commit("setCarouselIndex", 0); // header有背景色
    this.$nextTick(() => {
      this.changeTab(this.aiList[0], 0);
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.getImageHeight, true);
  },
  methods: {
    // 获取算法菜单
    getAiSubArr() {
      let arr = deepCopy(this.aiSubCurrent.children || []);
      this.aiSubArr = arr.length > 6 ? arr.splice(0,6) : arr;
    },
    // 获取图片的高度
    getImageHeight() {
      if (this.$refs.bannerImg[0]) {
        this.bannerHeight = this.$refs.bannerImg[0].height;
      }
    },
    // 切換算法場景
    changeTab(v, index) {
      if (index == 2 || index == 4) {
        // return this.$message.warning("暂未开放 敬请期待！");
      }
      this.aiArrIndex = index;
      this.getAiSubArr();
      let navInfo = {
        title: v.title,
        bgUrl: this.imgDomain + v.backgroupImageUrl,
        desc: v.description,
      };
      // this.$store.commit("setNavText", navInfo);
    },
    goToLink(navInfo) {
      let id;
      let item = navInfo.children.length > 0 ? navInfo.children[0] : navInfo; // 以及菜单
      if (navInfo.name == "wenzishibie") {
        // 车牌
        item = navInfo.children[0];
        if (item.name == "plateLicenseOcr") {
          id = navInfo.children[0].children[0].children[0].id; // 车牌三级菜单id
        }
      } else {
        id = item.id;
      }
      const queryPart = this.aesEncrypt({
        i: item.id,
        n: item.title,
      });
      let query = Object.assign(queryPart, {
        squareActive: this.aiArrIndex,
        id: id,
      });
      if (item.url) {
        this.$router.push({
          path: item.url,
          query,
        });
      }
    },
    // 進入更多Ai
    enterAi() {
      // this.$store.commit("setNavText", this.$store.state.firstNav);
      const queryPart = this.aesEncrypt({
        i: this.$store.state.firstNav.childId,
        n: this.$store.state.firstNav.title,
      });
      var query = Object.assign(queryPart, { squareActive: 0 });
      this.$router.push({
        path: this.$store.state.firstNav.url,
        query,
      });
    },
    // 图片加载完
    imageLoaded() {
      this.loadCount++;
      if (this.loadCount == 1) {
        this.bannerHeight = this.$refs.bannerImg[0].height;
      }
    },
    // header有背景色
    handleCarouselChange(index) {
      this.carouselActiveIndex = index;
      this.$store.commit("setCarouselIndex", this.carouselActiveIndex);
    },
  },
};
</script>
<style scoped lang='scss'>
/deep/ .el-carousel__indicators--horizontal {
  margin-bottom: 20px;
}
.ai-cont-wrap {
  width: 1200px;
  margin: 0 auto;
  .ai-title {
    text-align: center;
    margin: 90px 0;
    .title {
      font-size: 30px;
      font-weight: 400;
    }
    .title-des {
      font-size: 18px;
      padding-top: 10px;
    }
    .ai-more {
      height: 60px;
      width: 184px;
      background: #f5f5f5;
      border-radius: 4px;
      font-size: 16px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #000;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .ai-cont {
    display: flex;
    justify-content: space-between;
    .ai-cont-l {
      width: 180px;
      margin-right: 10px;
      background: #f3f6fb;
      font-size: 20px;
      > div {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
      }
      .active-ai {
        color: #fff;
        background: #1d7bff;
      }
    }
    .ai-cont-r {
      flex: 1;
      .ai-cont-des {
        height: 160px;
        padding: 10px 40px;
        background-color: #d5e7ff;
        background-image: url("~@/static/images/home/ai-des.png");
        background-repeat: no-repeat;
        background-position: right bottom;
        > div {
          color: #7d7d7d;
          font-size: 14px;
        }
        .ai-cont-des-t {
          color: #1d7bff;
          font-size: 18px;
          padding: 15px 0;
        }
      }
      .ai-cont-list {
        display: flex;
        flex-wrap: wrap;
        .ai-cont-list-box {
          width: 330px;
          height: 160px;
          background-color: #f3f6fb;
          margin: 10px 10px 0 0;
          padding: 15px 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .ai-cont-list-t {
            font-size: 18px;
            padding: 10px 0;
          }

          .ai-cont-item {
            flex: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            & > div {
              color: #7d7d7d;
              font-size: 14px;
            }
            .ai-enter {
              text-align: center;
              font-size: 14px;
              color: #1d7bff;
              width: 100px;
              height: 30px;
              line-height: 30px;
              border: 1px solid #1d7bff;
              border-radius: 4px;
              font-size: 14px;
              display: none;
            }
          }
          &:hover {
            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            .ai-enter {
              display: inline-block;
            }
          }
        }
        > div:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}

.home-index {
  .carousel-wrap  {
    position: relative;
    .banner-main {
      // height: 100%;
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      .slide {
        position: relative;
        height: 100%;
        // width: 100%;
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

        .video {
          font-family: "object-fit: cover;";
          width: 100%;
          // object-fit: cover;
          height: 100%;
        }
      }
    }
  }
}
</style>
