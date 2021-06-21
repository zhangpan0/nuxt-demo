<template>
  <div class="header-wrap">
    <div class="wrap-main">
      <div class="logo">
        <nuxt-link to="/" class="logo-box">
          <img
            class="logo-img"
            src="@/static/image/logo.png"
            alt=""
          />
          <span class="line"></span>
          <span class="title">AI 开放平台</span>
        </nuxt-link>
      </div>
      <div class="nav-title">
        <div class="nav-title-l">
          <div v-for="(v,i) in menuList" :key="i" :class="{active:v.url == routeFlag}">
            <nuxt-link :to="v.url" class="pointer">{{v.title}}</nuxt-link>
          </div>
        </div>
        <div class="nav-title-r">
          登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  watch: {
    
  },
  computed: {
    menuList() {
      return [
        {
          title: "首页",
          url: "/",
          disable: false,
        },
        {
          title: "AI能力",
          url: "/ai",
          disable: false,
        },
        {
          title: "应用案例",
          url: '/case',
          disable: false,
        }
      ];
    },
    routeFlag () {
      return this.$route.path
    }
  },
  mounted () {
    
  },
  data() {
    return {
      selectIndex:0,
      searchValue: "",
      toggleResetMenu: false,
      subMenuList: [],
      isScroll: false,
      myMenu: null,
      tabValue: ''
    };
  },
  methods: {
    tabClick() {
      switch(this.tabValue) {
        case 'ai':
          this.$router.push({ 
            path: '/ai/image/basic' ,
            query: this.aesEncrypt({
              i: 8,
              n: "通用目标检测",
            }),
          });
          break;
        case 'application':
          this.$router.push({ path: this.routerPath.hoem_case });
          break;
        default: 
          window.location.href = 'http://192.168.103.109'
      }
    },
  },
  mounted() {
   
  },
};
</script>

<style scoped lang="scss">
.header-wrap {
  height:70px;
  color:#6c6c6c;
  .wrap-main {
    display:flex;
    align-items: center;
    .logo-box {
      display:flex;
      height:70px;
      align-items: center;
      width: 250px;
      .logo-img {
        padding-right:20px;
        border-right:2px solid #6c6c6c;
        margin-right:20px;
      }
    }
    .nav-title {
      flex: 1;
      display:flex;
      justify-content: space-between;
      align-items: center;
      margin-left:20px;
      .nav-title-l {
        display: flex;
        >div {
          min-width:80px;
          margin-right:20px;
          >a {
            min-width:80px;
            display:flex;
            height:70px;
            align-items:center;
            justify-content:center;
            color:#6c6c6c;
          }
        }
        .active {
          height: 70px;
          border-bottom:3px solid skyblue;
          box-sizing: border-box;
        }
      }
      .nav-title-r {
        width:80px;
        text-align: center;
      }
    }
  }
}
</style>
