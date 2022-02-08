<!--  -->
<template>
  <section>
    <div class="g-center recommendBox" id="recommend">
      <div class="flex-center move-top">
        <h2 class="title g-mg-b-sm">相关推荐</h2>
      </div>
      <div class="recommendContainer">
        <img
          class="leftImg"
          src="@/static/images/ai/yingyongchangjing.png"
        />
        <img
          class="centerImg"
          src="@/static/images/ai/division.png"
        />
        <el-scrollbar class="programmeDetailBox">
          <div
            class="programmeDetail"
            v-for="(item, index) in recommendList"
            :key="index"
          >
            <img :src="item.icon" v-if="false"/>
            <div class="center">
              <h6>{{ item.title }}</h6>
              <div>{{ item.description }}</div>
            </div>
            <div class="rightBox">
              <el-button
                type="primary"
                size="mini"
                @click="enterThirdtitleBoxSelected(item)"
              >查看详情
              </el-button
              >
              <!-- <el-button type="primary" size="mini" style="margin:0"
                >联系我们</el-button
              > -->
            </div>
          </div>
        </el-scrollbar>
        <!-- <div class="programmeDetailBox">
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      recommendList:[],
      selectSecondMenu: {}, //被选中的二级菜单
      selectThirdMenu: {}, //被选中的三级菜单
    };
  },
  methods: {
     // 相关推荐
    getRecommend() {
      this.selectSecondMenu = JSON.parse(
        sessionStorage.getItem("selectSecondMenu")
      );
      this.selectThirdMenu = JSON.parse(
        sessionStorage.getItem("selectThirdMenu")
      );
      let arr = [];
      arr = this.selectSecondMenu.children.filter(item => {
        return item.id !== this.selectThirdMenu.id;
      });
      arr.forEach(item => {
        item.icon = process.env.API_IMG_URL + item.icon;
      });
      arr = arr.slice(0, 3);
      this.recommendList = arr;
    },
    // 点击方案详情跳转其他相关算法
    enterThirdtitleBoxSelected(navInfo) {
      sessionStorage.setItem("selectThirdMenu", JSON.stringify(navInfo)); //被选中的三级菜单
      let obj = {
        title: navInfo.title,
        desc: navInfo.description
      };
      // this.$store.commit("setNavText", obj);
      const queryPart = this.aesEncrypt({
        i: navInfo.id,
        n: navInfo.title
      });
      this.$store.commit("setIntro", navInfo.description);
      if (navInfo.name == "plateLicenseOcr") {
        let id = navInfo.children[0].children[0].id;
        var query = Object.assign(
          queryPart,
          {squareActive: this.isfirstMenuunSelected},
          {id: id}
        );
      } else {
        var query = Object.assign(queryPart, {
          squareActive: this.isfirstMenuunSelected
        });
      }
      this.$router.push({
        path: navInfo.url,
        query
      });
    }
  },
  mounted () {
    this.getRecommend();
  },
}
</script>

<style lang='scss' scoped>
.recommendBox {
  width: 100%;
  height: 600px;
  background: url("~@/static/images/ai/background.png") no-repeat;
  background-size: 100% 100%;

  .title {
    margin-top: 30px;
  }

  .recommendContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 420px;

    .leftImg {
      width: 550px;
      height: 100%;
    }

    .centerImg {
      width: 16px;
      margin-left: 30px;
      margin-right: 30px;
    }

    .programmeDetailBox {
      width: 590px;
      height: 100%;
      // overflow: scroll;
      .programmeDetail {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 12px;
        height: 130px;

        img {
          width: 146px;
          height: 100%;
        }

        .center {
          padding: 15px;
          flex: 1;
          height: 100%;

          h6 {
            font-size: 18px;
            font-weight: bold;
            color: #010101;
          }

          div {
            font-size: 16px;
            font-weight: 400;
            color: #010101;
            line-height: 18px;
          }
        }

        .rightBox {
          width: 106px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        }
      }
    }
  }
}
</style>