<template>
  <div class="AiPlatformDropdownmenu" @mouseleave="mouseLeaveMenu">
    <el-scrollbar class="firstMenuBox">
      <div
        class="firstMenuunSelected"
        v-for="(item, index) in menuList"
        :key="index"
        :style="{
          backgroundColor: index == isfirstMenuunSelected ? '#e9eaec' : '#fff'
        }"
        @mouseenter="enterfirstMenuunSelected(item, index)"
      >
        <img :src="item.bgUrl" />
        <h5>
          {{ item.title }}
        </h5>
      </div>
    </el-scrollbar>
    <el-scrollbar class="childrenMenuBox">
      <!-- https://cloudcache.tencent-cloud.cn/qcloud/portal/kit/images/slice/close.bd5c2f48.svg -->
      <div class="pls-nav-dropdown-close" @click="closeDropdown"></div>
      <div class="productBox">
        <!-- <h5 @click="dayin()">应用产品》</h5> -->
        <div class="productTitleBox">
          <div
            class="productTitle"
            v-for="item in menuList[this.isfirstMenuunSelected].children"
            :key="item.id"
          >
            <h6>{{ item.title }}</h6>
            <el-scrollbar class="titleBox">
              <div
                class="thirdtitleBox"
                @click="enterThirdtitleBoxSelected(i, item)"
                v-for="i in item.children"
                :key="i.id"
              >
                <span>{{ i.title }}</span>
                <img
                  v-if="i.menuType == '1'"
                  src="@/static/images/dropdownMenu/HOT.png"
                />
                <img
                  v-if="i.menuType == '2'"
                  src="@/static/images/dropdownMenu/NEW.png"
                />
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <div class="caseBox" v-show="false">
        <h5>应用案例》</h5>
        <div class="caseBox">
          <div class="case">
            <img src="" />
            <div class="caseMsg">
              <div>2021-10-27</div>
              <div>北京大兴机场项目智能化建设</div>
            </div>
          </div>
          <div class="case">
            <img src="" />
            <div class="caseMsg">
              <div>2021-10-27</div>
              <div>北京大兴机场项目智能化建设</div>
            </div>
          </div>
          <div class="case">
            <img src="" />
            <div class="caseMsg">
              <div>2021-10-27</div>
              <div>北京大兴机场项目智能化建设</div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "AiPlatformDropdownmenu",
  data() {
    return {
      isfirstMenuunSelected: "0"
    };
  },
  mounted() {},
  methods: {
    // 一级菜单滑入
    enterfirstMenuunSelected(item, index) {
      if (index === this.isfirstMenuunSelected) return;
      this.isfirstMenuunSelected = index
      return false
      if (item.title == "语音技术") {
        this.$message({
          message: "功能正在开发，敬请期待~",
          type: "warning"
        });
        return;
      }
      if (1) {
        let navInfo = {
          title: this.menuList[this.isfirstMenuunSelected].title,
          bgUrl:
            process.env.API_IMG_URL +
            this.menuList[this.isfirstMenuunSelected].backgroupImageUrl,
          desc: this.menuList[this.isfirstMenuunSelected].description
        };
        // this.$store.commit("setNavText", navInfo);
        if (this.aiList[index].children[0].children.length > 0) {
          let nav = this.aiList[index].children[0].children[0];
          this.enterThirdtitleBoxSelected(nav, this.isfirstMenuunSelected);
        } else {
          let nav = this.aiList[index].children[0];
          this.enterThirdtitleBoxSelected(nav, this.isfirstMenuunSelected);
        }
      }
    },
    // 此处是算法的上一级=>场景id
    findPid (pid) {
      let id = 0;
      try {
        let func = (arr) => {
          arr.forEach(v => {
            if (v.children) {
              if (v.id == pid) {
                id = v.pid;
                throw new Error();
              }
              func(v.children);
            }
          })
        }
        func(this.menuList);
      } catch (e) {

      }
      return id
    },
    // 三级菜单
    enterThirdtitleBoxSelected(navInfo, item) {
      sessionStorage.setItem("selectSecondMenu", JSON.stringify(item)); //被选中的二级菜单
      sessionStorage.setItem("selectThirdMenu", JSON.stringify(navInfo)); //被选中的三级菜单
      // 缓存选中的算法菜单
      let currentAi = {...this.firstNav,...{
        title: navInfo.title,
        desc: navInfo.description,
        id: navInfo.id,
        pid: this.findPid(navInfo.pid),
        name: navInfo.name,
      }}
      this.$store.commit("setFirstNav", currentAi);
      //TODO: 车牌暂时只有一级处理,aesEncrypt()为加密函数
      let query = {
        ...this.aesEncrypt({
          i: currentAi.id,
          n: currentAi.title
        }),
        ...{
          squareActive: this.isfirstMenuunSelected,
          pid:currentAi.pid,
          name:currentAi.name,
        }
      }
      this.$router.push({
        path: '/ai',
        query,
      });
      this.$emit("controlDropdownMenuShow", "0");
    },
    closeDropdown() {
      this.$emit("controlDropdownMenuShow", "0");
    },
    mouseLeaveMenu() {
      this.$emit("controlDropdownMenuShow", "0");
    }
  },
  computed: {
    menuList() {
      //   console.log(this.$store.state.aiList);
      this.$store.state.aiList.forEach(item => {
        item.bgUrl = process.env.API_IMG_URL + item.icon;
      });
      return this.$store.state.aiList;
    },
    firstNav() {
      return this.$store.state.firstNav;
    },
  }
};
</script>

<style lang="scss" scoped>
.AiPlatformDropdownmenu {
  height: 620px;
  width: 100%;
  position: absolute;

  display: flex;
  flex-direction: row;
  background-color: "#f1f2f5";
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
}
.firstMenuBox {
  flex: 13;
  background: #fff;
  .firstMenuunSelected {
    width: 100%;
    height: 68px;
    padding-top: 7px;
    padding-bottom: 7px;
    // background: #e9eaec;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    img {
      width: 24px;
    }
    h5 {
      font-size: 14px;
      font-weight: bold;
      color: #1d7bff;
    }
  }
}
.childrenMenuBox {
  flex: 83;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
  .pls-nav-dropdown-close {
    position: absolute;
    right: 0;
    top: 10px;
    width: 32px;
    height: 32px;
    &::after {
      cursor: pointer;
      content: "";
      display: block;
      width: 12px;
      height: 12px;
      background-image: url(https://cloudcache.tencent-cloud.cn/qcloud/portal/kit/images/slice/close.bd5c2f48.svg);
    }
  }
}
.productBox {
  //border: 1px solid red;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 415px;
  h5 {
    font-size: 16px;
    font-weight: bold;
    color: #1d7bff;
    height: 66px;
    padding-left: 24px;
    padding-top: 27px;
    border-bottom: 1px solid #e9eaec;
  }
  .productTitleBox {
    height: 100%;
    padding-left: 24px;
    padding-top: 29px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .productTitle {
      //border: 1px solid red;
      margin-right: 50px;
      width: 320px;
      margin-bottom: 30px;
      h6 {
        font-size: 13px;
        font-weight: bold;
        color: #000000;
        padding-bottom: 12px;
        border-bottom: 1px solid #e9eaec;
      }
      .titleBox {
        width: 100%;
        .thirdtitleBox {
          display: flex;
          align-items: center;
          margin-top: 17px;
          span {
            font-size: 13px;
            color: #444444;
            margin-right: 17px;
            &:hover {
              color: #2468f2;
              cursor: pointer;
            }
          }
          img {
            width: 22px;
            height: 7px;
          }
        }
      }
    }
  }
}
.caseBox {
  flex: 1;
  width: 100%;
  h5 {
    font-size: 16px;
    font-weight: bold;
    color: #1d7bff;
    height: 66px;
    padding-left: 24px;
    padding-top: 27px;
    border-bottom: 1px solid #e9eaec;
  }
  .caseBox {
    height: 100%;
    width: 100%;
    padding-left: 24px;
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    .case {
      width: 448px;
      display: flex;
      flex-direction: row;
      img {
        width: 160px;
        height: 100px;
      }
      .caseMsg {
        padding-left: 20px;
        font-size: 16px;
        color: #000000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
