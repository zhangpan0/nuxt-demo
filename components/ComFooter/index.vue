<template>
  <div class="footer-wrap">
    <div class="footer-center">
      <div class="g-center footer-up">
        <div class="footer-item footer-item1">
          <div class="title">
            <img src="@/static/images/home/factory/logo-blue.png" alt="">&nbsp;&nbsp;|&nbsp;&nbsp;AI开放平台
          </div>
          <div>
            让世界分享盛视AI智慧
          </div>
        </div>
        <div class="footer-item footer-item2">
          <img src="@/static/images/home/tel.png" alt=""> <span>4001-800-969</span>
        </div>
        <div class="footer-item footer-item3">
          <div class="footer-link"
            v-for="(item, index) in mainLinks"
            :key="index"
          >
            <a :href="item.url" target="_blank">{{item.title}}</a>
          </div>
        </div>
        <div class="footer-item footer-item4">
          <!-- <a class="link-console" :href="consoleLink" target="_blank">控制台</a> -->
          <div class="ewm">
            <img
              src="@/static/images/home/xcx.jpg"
              alt=""
            />
            微信小程序
            </div>
            <div class="ewm">
              <img
              width="80"
              src="@/static/images/home/app.png"
              alt=""
            />
            App
          </div>
          <div class="ewm">
              <img
              width="80"
              src="https://0.rc.xiniu.com/g1/M00/94/A5/CgAGTFiYC0CAIAc_AAAdVWp4dbo083.png"
              alt=""
            />
            盛视微信公众号
          </div>
        </div>
      </div>
    </div>
    <div class="footer-center">
      <div class="g-center">
        <CopyRight></CopyRight>
      </div>
    </div>
  </div>
</template>

<script>
import CopyRight from "./CopyRight.vue";

export default {
  name: "CommFooter",
  components: {
    CopyRight,
  },
  data() {
    return {
      mainLinks: [
        {
          title: "公司概况",
          url: "http://www.maxvision.com.cn/about.aspx?TypeId=1&FId=t1:1:1",
        },
        {
          title: "企业文化",
          url: "http://www.maxvision.com.cn/about.aspx?TypeId=2&FId=t1:2:1",
        },
        {
          title: "资质荣誉",
          url: "http://www.maxvision.com.cn/honor.aspx?TypeID=3&fid=t1:3:1",
        },
        {
          title: "盛视官网",
          url: "http://www.maxvision.com.cn/",
        },
      ],
      moreLinks: [
        {
          title: "热门产品",
          list: [
            {
              title: "云服务器",
              url: "",
            },
            {
              title: "对象存储",
              url: "",
            },
            {
              title: "边缘计算",
              url: "",
            },
          ],
        },
        {
          title: "人工智能",
          list: [
            {
              title: "人脸识别",
              url: "",
            },
            {
              title: "语音识别",
              url: "",
            },
            {
              title: "图像识别",
              url: "",
            },
          ],
        },
        {
          title: "友情链接",
          list: [
            {
              title: "盛视大脑",
              url: "",
            },
            {
              title: "盛视AI市场",
              url: "",
            },
            {
              title: "开发者中心",
              url: "",
            },
          ],
        },
      ],
      consoleLink:process.env.API_URL_BROWSER + '/console'
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
a,
a:focus,
a:hover {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}
.footer-wrap {
  color: #000;
  width: 100%;
  padding: 20px 0;
  .footer-center {
    width: 1200px;
    margin: 0 auto;
    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
  .footer-up {
    padding: 50px 0;
    border-top: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
    display: flex;
    .footer-item {
      height: 80px;
      border-right:1px solid #DCDCDC;
    }
    .footer-item:last-child {
      border: none;
    }
    .footer-item1 {
      width: 266px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      >.title {
        color: #366DFE;
        display: flex;
        align-items: center;
      }
      >div {
        font-size: 18px;
      }
    }
    .footer-item2 {
      display: flex;
      width: 330px;
      justify-content: center;
      align-items: center;
      img {
        margin-right: 15px;
      }
      span {
        font-size: 24px;
      }
    }
    .footer-item3 {
      width: 266px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 0 20px;
      .footer-link {
        width: calc(100% / 2);
        text-align: center;
      }
    }
    .footer-item4 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      padding-left: 40px;
      .link-console {
        font-weight: bold;
        font-size: 18px;
      }
      .ewm {
        text-align: center;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
    
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .up-left,
    .up-left-item {
      float: left;
    }
    .up-left-item {
      margin-right: 125px;
    }
    .up-right {
      float: right;
      & > h5 {
        font-size: 18px;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }
      & > ul {
        & > li {
          float: left;
          &:first-child {
            margin-right: 36px;
          }
          & > p {
            opacity: 0.6;
            font-size: 14px;
            line-height: 30px;
            margin-bottom: 10px;
          }
          .qrcode {
            width: 80px;
            height: 80px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .footer-middle {
    padding: 20px 0;
    .middle-item {
      font-size: 12px;
      line-height: 24px;
      a {
        font-size: 12px;
        opacity: 0.6;
        line-height: 24px;
      }
      .middle-item-title {
        float: left;
        width: 100px;
        text-align: left;
      }
      .middle-item-list {
        padding-left: 87px;
        & > li {
          float: left;
          margin-right: 20px;
        }
      }
    }
  }
}


</style>
