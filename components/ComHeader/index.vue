<template>
  <div class="header-wrap" :class="{ 'header-bg': headBgIndex == 0 }">
    <div class="header-main">
      <div class="logo">
        <nuxt-link to="/">
          <img class="logo-img" src="@/static/logo-white.png" alt=""/>
          <span class="line"></span>
          <span class="title">AI 开放平台</span>
        </nuxt-link>
      </div>
      <div class="header-right">
        <div class="nav">
          <ul class="tabBox">
            <li
              v-for="item in navList"
              :key="item.id"
              @click="tabClick(item)"
              @mouseover.stop="handleDropDownMenu(item)"
            >
              {{ item.title }}
            </li>
          </ul>
          <div class="control-box">
            <p @click="goShoppingCart" style="margin-right: 10px;" v-if="isLogin">
              <span><i class="el-icon-shopping-cart-full"></i></span>
              <span>{{ `(${orderCartList.length})` }}</span>
            </p>
            <p class="console" @click="onJumpUrl">控制台</p>
            <i class="el-icon-right"></i>
          </div>
        </div>
      </div>
    </div>
    <dropdown-menu
      @controlDropdownMenuShow="controlDropdownMenuShow"
      v-show="isdropdownMenuShow"
      style="position: absolute;left:0;top:60px;"
    ></dropdown-menu>
  </div>
</template>

<script>
// import mixinRouter from "@/assets/mixin/mixin-router.js";
import dropdownMenu from "./dropdownMenu.vue";
import * as chargeModeApi from "@/assets/api/chargeMode.js";
import Cookies from "js-cookie";

export default {
  name: "CommHeader",
  components: {
    dropdownMenu
  },
  // mixins: [mixinRouter],
  props: {
    
  },
  created () {
    
  },
  watch: {
    $route(to, from) {
      // if (!from.path || from.path === this.routerPath.home) return;
      // if (to.path === "/") {
      //   this.tabValue = "home";
      // }
    }
  },
  computed: {
    headBgIndex() {
      return this.$store.state.carouselActiveIndex;
    },
    isLogin() {
      const TokenKey = "ssAI-Token";
      if (Cookies.get(TokenKey) !== undefined) {
        return true;
      } else {
        return false
      }
    }
  },
  data() {
    return {
      searchValue: "",
      toggleResetMenu: false,
      subMenuList: [],
      isScroll: false,
      myMenu: null,
      tabValue: "",
      isdropdownMenuShow: false,
      navList: [
        {
          title: "首页",
          id: "1",
          name: "index"
        },
        {
          title: "AI体验中心",
          id: "2",
          name: "ai"
        }
      ],
      orderCartList: []
    };
  },
  methods: {
    tabClick(item) {
      if (item.id !== "1") {
        return false;
      }
      this.$router.push({path: '/'});
    },
    onJumpUrl() {
      window.open(process.env.API_URL_BROWSER + "/console", "_blank");
    },
    controlDropdownMenuShow(isshow) {
      if (isshow == "0") {
        this.isdropdownMenuShow = false;
      }
    },
    handleDropDownMenu(item) {
      if (item.id == "2") {
        this.isdropdownMenuShow = true;
      } else {
        this.isdropdownMenuShow = false;
      }
    },
    // 购物车跳转
    goShoppingCart() {
      window.open(process.env.API_URL_BROWSER + "/console/#/finance/shoppingCarList", "_blank");
    },
    // 查询购物车
    getOrderCartList() {
      const TokenKey = "ssAI-Token";
      if (Cookies.get(TokenKey) == undefined) {
        return false;
      }
      chargeModeApi.getOrderCartList().then(res => {
        this.$store.commit("orderCartList", res);
        this.orderCartList = this.$store.state.orderCartList;
      });
    }
  },
  mounted() {
    this.getOrderCartList();
    // this.orderCartList = this.$store.state.orderCartList;
  }
};
</script>

<style scoped lang="scss">
.header-wrap {
  min-width: 1300px;
  width: 100%;
  height: 60px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  // box-shadow: 0px 7px 7px -7px #b0b0b0;
  // padding: 14px 0;
  background-color: transparent;

  .header-main {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-left: 7%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    min-width: 1200px;

    .logo {
      margin-right: 40px;
      color: #fff;

      & > a {
        display: flex;
        align-items: center;
        height: 100%;

        .line {
          margin: 0 20px;
          width: 2px;
          height: 35px;
          background-color: #fff;
        }

        .title {
          font-size: 18px;
          font-weight: bold;
          line-height: 31px;
          color: #fff;
        }
      }

      .logo-img {
        width: 100px;
        transition: all 0.5s;
      }

      &:hover {
        // animation: jello 1s;
      }
    }

    .header-right {
      height: 100%;
      flex: 1;
      color: #fff;

      .desc,
      .nav {
        // margin-top: 24px;
        // height: 60px;
        line-height: 50px;
        // padding-top: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .desc {
        justify-content: flex-end;
        // height: 50%;
        // padding-right: 25%;
        border-bottom: 1px solid #949496;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;

        .control-box {
          margin-right: 108px;
          margin-left: 155px;
          display: flex;
          height: 60px;
          font-size: 16px;
          align-items: center;

          > p {
            width: 77px;
            text-align: center;
            cursor: pointer;

            span {
              font-size: 14px;
            }
          }

          .el-icon-right {
            opacity: 0;
            transition: all 0.5s;
          }

          &:hover {
            .el-icon-right {
              opacity: 1;
            }
          }

          .user-control {
            display: flex;
            height: 100%;
            align-items: center;

            .active {
              height: 100%;
              width: 77px;
              text-align: center;
              line-height: 50px;
              cursor: pointer;
              border-left: 1px solid #949496;

              &:hover {
                background-color: #3388ff;
              }
            }
          }
        }
      }

      .nav {
        width: 100%;
        // height: 50%;
        padding-left: 80px;

        .tabBox {
          width: 60%;
          height: 60px;
          display: flex;
          flex-direction: row;
          align-items: center;

          li {
            width: 100px;
            color: #fff;
            height: 100%;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0);

            &:hover {
              cursor: pointer;
              border-bottom: 2px solid #fff;
            }
          }
        }

        /deep/ .el-tabs__active-bar {
          // height: 60px;
          background-color: #fff;
        }

        /deep/ .el-tabs__header {
          margin: 0;
        }

        /deep/ .el-tabs__item {
          line-height: 60px;
          font-size: 14px;
          color: #fff;
        }

        /deep/ .el-tabs__nav-wrap {
          &::after {
            height: 0;
            background-color: transparent;
          }
        }

        .control-box {
          margin-right: 108px;
          display: flex;
          height: 60px;
          // height: 100%;
          font-size: 14px;
          align-items: center;

          span {
            font-size: 14px;
          }

          > p {
            // width: 60px;
            text-align: center;
            cursor: pointer;
            line-height: 32px;
            font-size: 14px;

            // &:hover{
            //   &::after{
            //     content: ;
            //   }
            // }
          }

          .el-icon-right {
            margin-left: 6px;
            opacity: 0;
            transition: all 0.5s;
          }

          &:hover {
            .el-icon-right {
              opacity: 1;
            }
          }

          .user-control {
            display: flex;
            height: 100%;
            align-items: center;

            .active {
              height: 100%;
              width: 77px;
              text-align: center;
              // line-height: 50px;
              cursor: pointer;
              border-left: 1px solid #949496;

              &:hover {
                background-color: #3388ff;
              }
            }
          }
        }
      }
    }
  }
}

.header-bg {
  background-color: #000;
}
</style>
