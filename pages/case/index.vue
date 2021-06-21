<template>
  <div class="case-home">
    <div class="banner">
      <h2 class="banner-title">应用案例</h2>
    </div>
    <!-- 案例回顾 -->
    <div class="review">
      <div class="g-center">
        <h3 class="tl-sec bold g-mg-t-lg g-mg-b-lg">案例回顾</h3>
        <ul class="flex-between-center review-list">
          <li
            class="review-item"
            :style="{ backgroundImage: `url(${item.src})` }"
            v-for="(item, index) in reviewList"
            :key="'rv' + index"
            @click="handleReviewClick(item)"
          >
            <div class="desc">
              <h4 class="g-ellipsis-one ls-sm desc-title">{{ item.title }}</h4>
              <p class="desc-icon">
                <i class="el-icon-video-camera-solid"></i>立即观看
              </p>
            </div>
            <div class="flex-center-center el-icon-video-play icon-play"></div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 案例精选 -->
    <div class="g-pd-t-lg g-pd-b-lg g-mg-t-lg g-mg-b-lg choose">
      <div class="g-center">
        <h3 class="tl-sec bold g-mg-b-lg">案例精选</h3>
        <ul class="flex-between-center choose-list">
          <li
            class="g-flip list-item"
            v-for="(item, index) in chooseList"
            :key="'cho' + index"
          >
            <div
              class="g-flip-cont g-flip-front"
              :style="{ backgroundImage: `url(${item.src})` }"
            >
              <img class="choose-logo" :src="item.logo" alt="" />
            </div>
            <div class="g-flip-cont g-flip-back">
              <h3 class="g-pd-t-sm g-pd-b-sm title">{{ item.title }}</h3>
              <p class="desc">{{ item.desc }}</p>
              <!-- <CommButton
                class="detail-btn"
                label="查看详情"
                fsize="14px"
                border="1px solid #fff"
                :isAnimate="false"
                bgImgSrc=""
                bgColor="#195FF1"
                @handleClick="jumpTo"
              >
                <i class="el-icon-caret-right" slot="after"></i>
              </CommButton> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 更多案例 -->
    <div class="g-pd-b-lg more">
      <div class="g-center">
        <h3 class="tl-sec bold g-mg-b-lg">更多案例</h3>
        <div class="g-flex more-cont">
          <div class="element-menu more-nav">
            <el-menu default-active="0" @select="handleMoreNavSelect">
              <el-menu-item
                v-for="(item, index) in moreNavList"
                :key="'mor' + index"
                :index="index + ''"
              >
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </el-menu>
          </div>
          <transition-group
            class="g-f-clr more-list"
            appear
            name="trans-up"
            tag="div"
          >
            <div
              class="g-mg-b-xm g-fl more-list-item"
              v-for="(subItem, subIndex) in moreListData"
              :key="subItem.title + subIndex"
            >
              <img :src="subItem.logo" alt="" />
              <h3 class="g-mg-t-sm">{{ subItem.title }}</h3>
              <p class="g-mg-t-sm">{{ subItem.desc }}</p>
              <!-- <CommButton
                class="detail-btn"
                label="查看详情"
                fsize="14px"
                color="#195FF1"
                border="1px solid #195FF1"
                :isAnimate="false"
                bgImgSrc=""
                bgColor="transparent"
                @handleClick="jumpTo"
              >
                <i class="el-icon-caret-right" slot="after"></i>
              </CommButton> -->
            </div>
          </transition-group>
          <!-- <div class="g-f-clr more-list"></div> -->
        </div>
      </div>
    </div>
    <MyDialog
      :isCenter="true"
      :isShow="videoVisible"
      :isShowClose="false"
      :isShowFooter="false"
      :closeOnMask="true"
      @handleClose="handleCloseDialog"
    >
      <!-- https://doc.bce.baidu.com/bce-documentation/case/kaifazhezhengyan.mp4 -->
      <div class="video-dialog" slot="cont">
        <video :src="videoUrl" controls autoplay loop></video>
      </div>
    </MyDialog>
  </div>
</template>

<script>
import pic1 from "@/assets/image/case/industry-scene-1.jpg";
import pic2 from "@/assets/image/case/industry-scene-2.jpg";
import pic3 from "@/assets/image/case/industry-scene-3.jpg";
import pic4 from "@/assets/image/case/bg-block-3.jpg";
import logo1 from "@/assets/image/case/logo-1.png";
import logo2 from "@/assets/image/case/logo-2.png";
import logo3 from "@/assets/image/case/logo-3.png";
import logo4 from "@/assets/image/case/logo-4.png";

export default {
  data() {
    return {
      reviewList: [
        {
          src: pic1,
          title: "视频标题",
          desc: "视频描述",
          url: "",
        },
        {
          src: pic2,
          title: "视频标题",
          desc: "视频描述",
          url: "",
        },
        {
          src: pic3,
          title: "视频标题",
          desc: "视频描述",
          url: "",
        },
      ],
      videoVisible: false,
      chooseList: [
        {
          logo: logo1,
          src: pic1,
          title: "河北港口集团",
          desc: "河北港口集团--案例描述",
        },
        {
          logo: logo2,
          src: pic2,
          title: "唯捷城市配送",
          desc: "唯捷城市配送--案例描述",
        },
        {
          logo: logo3,
          src: pic3,
          title: "中国国际航空公司",
          desc: "中国国际航空公司--案例描述",
        },
        {
          logo: logo4,
          src: pic4,
          title: "一汽物流有限公司",
          desc: "一汽物流有限公司--案例描述",
        },
      ],
      moreNavList: [
        {
          name: "分类1",
          data: [
            {
              logo: logo1,
              src: pic1,
              title: "河北港口集团",
              desc: "河北港口集团--案例描述",
            },
            {
              logo: logo2,
              src: pic2,
              title: "唯捷城市配送",
              desc: "唯捷城市配送--案例描述",
            },
          ],
        },
        {
          name: "分类2",
          data: [
            {
              logo: logo3,
              src: pic3,
              title: "中国国际航空公司",
              desc: "中国国际航空公司--案例描述",
            },
            {
              logo: logo4,
              src: pic4,
              title: "一汽物流有限公司",
              desc: "一汽物流有限公司--案例描述",
            },
          ],
        },
      ],
      moreListData: [],
      videoUrl: "",
    };
  },
  methods: {
    handleReviewClick(item) {
      this.videoVisible = true;
      this.videoUrl = item.url || "";
    },
    handleCloseDialog() {
      this.videoVisible = false;
    },
    jumpTo() {},
    handleMoreNavSelect(index) {
      this.moreListData = this.moreNavList[index].data || [];
    },
    initMore() {
      this.moreListData = this.moreNavList[0].data || [];
    },
  },
  created() {},
  mounted() {
    this.initMore();
  },
};
</script>
<style scoped lang='scss'>
.case-home {
  min-height: calc(100vh - 75px);
  background-color: #fff;
  .banner {
    height: 400px;
    background: url("@/assets/image/case/bg-block-5.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    .banner-title {
      font-size: 32px;
      font-weight: 700;
      color: #242424;
      width: 70%;
      text-align: right;
      margin-top: 9%;
      display: block;
    }
  }
  .review {
    .review-list {
      height: 300px;
      .review-item {
        position: relative;
        background-size: cover;
        border-radius: 6px;
        overflow: hidden;
        flex-basis: 31%;
        height: 100%;
        cursor: pointer;
        .desc {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          padding: 10px;
          .desc-title {
            font-size: 18px;
            max-height: calc(100% - 60px);
          }
          .desc-icon {
            font-size: 13px;
            color: #00e7ff;
            margin-top: 6px;
            i {
              margin-right: 3px;
            }
          }
        }
        .icon-play {
          font-size: 80px;
          color: #fff;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          opacity: 0;
          transform: scale(2.2);
          transform-origin: center center;
          transition: all 0.2s;
        }
        &:hover {
          .desc {
            .desc-title {
              white-space: normal;
            }
          }
          .icon-play {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
    }
  }
  .video-dialog {
    video {
      width: 800px;
      height: 480px;
      object-fit: cover;
    }
  }
  .choose {
    background: url("@/assets/image/case/bg-block-6.png") #274371 center center no-repeat;
    .tl-sec {
      color: #fff;
    }
    .choose-list {
      .list-item {
        width: 290px;
        height: 300px;
        margin-bottom: 5px;
        position: relative;
        .g-flip-front {
          .choose-logo {
            max-width: 70%;
            margin: 10px;
          }
        }
        .g-flip-back {
          background: #195ff1;
          padding: 10px;
          color: #fff;
          .title {
            font-size: 18px;
          }
          .desc {
            max-height: 176px;
            overflow: hidden;
            opacity: 0.8;
            line-height: 22px;
          }
          .detail-btn {
            position: absolute;
            bottom: 5px;
            right: 5px;
            height: 35px !important;
            i {
              transition: all 0.3s;
            }
            &:hover {
              i {
                margin-right: -5px;
              }
            }
          }
        }
      }
    }
  }
  .more {
    .more-nav {
      width: 180px;
    }
    .more-list {
      width: calc(100% - 200px);
      .more-list-item {
        width: 30%;
        height: 370px;
        margin-left: 3%;
        padding: 20px;
        color: #191c3d;
        box-shadow: 0 0 10px #dadee4;
        position: relative;
        img {
          max-width: 100%;
        }
        h3 {
          text-align: center;
        }
        p {
          opacity: 0.8;
          max-height: 96px;
          overflow: hidden;
        }
        .detail-btn {
          opacity: 0;
          transition: all 0.3s;
          transform: translateY(20px);
          height: 35px !important;
          position: absolute;
          bottom: 20px;
          right: 20px;
        }
        &:hover {
          .detail-btn {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    }
  }
}
</style>