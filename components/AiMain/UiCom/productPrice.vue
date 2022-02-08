<!--  -->
<template>
  <section>
    <div class="g-center productAdvBox" id="productPrice" style="margin-top: 100px;">
      <div class="flex-center move-top">
        <h2 class="title g-mg-b-sm">产品价格</h2>
      </div>
      <div class="productPrice">
        <div
          class="priceContainer"
          v-for="item in reduceMealList"
          :key="item.id"
        >
          <h5>{{ item.algorithmSetmealName }}</h5>
          <div class="tips">{{ item.algorithmSetmealDesc }}</div>
          <div class="line"></div>
          <div class="priceBox">
            <div class="info">
              <span>算法次数</span>
              <span>{{ `${item.setmealAlgorithmTimes}次` }}</span>
            </div>
            <div class="info">
              <span>有效期</span>
              <span v-if="item.algorithmSetmealForever == '1'">永久有效</span>
              <span v-if="item.algorithmSetmealForever == '0'">{{
                  `${item.algorithmSetmealExpire}天`
                }}</span>
            </div>
          </div>
          <div class="freePrice" v-if="item.algorithmSetmealType == '0'">
            免费
          </div>
          <div class="freePrice" v-if="item.algorithmSetmealType !== '0'">
            {{ `${item.algorithmSetmealPrice}元` }}
          </div>
          <div class="btnBox">
            <el-button
              :disabled="disabled"
              v-if="item.algorithmSetmealType == '0'"
              type="danger"
              size="mini"
              @click="purchase(item)"
            >立即领取
            </el-button
            >
            <el-button
              v-if="item.algorithmSetmealType !== '0'"
              type="primary"
              size="mini"
              @click="purchase(item)"
            >立即查看
            </el-button
            >
          </div>
        </div>
      </div>
      <div class="productPrice noMsg" v-if="productPriceList.length === 0">
        <div>
          暂无相关套餐
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as chargeModeApi from "@/assets/api/chargeMode.js";

export default {
  data() {
    return {
      reduceMealList: [],
      productPriceList: [],
       
    };
  },
  methods: {
     // 查询算法关联套餐接口
    getAlgSetMeal() {
      let id = this.$store.state.firstNav.id;
      chargeModeApi.getAlgSetMeal(id).then(res => {
        let freeList = []
        let payList = []
        res.forEach(current => {
          if (current.algorithmSetmealType === '0') {
            freeList.push(current)
          } else if (current.algorithmSetmealType === '1') {
            payList.push(current)
          }
        })
        let freeLen = freeList.length;
        let arr = [];
        arr = arr.concat(freeList).concat(payList.slice(0, 3 - freeLen));
        this.reduceMealList = arr
        this.productPriceList = res;
        localStorage.setItem("productPriceList", JSON.stringify(this.productPriceList));
        this.$store.commit('isDisableStore',JSON.parse(localStorage.getItem("productPriceList")))
      });
    },
  },
  mounted() {
    // this.getAlgSetMeal();
  },
}
</script>

<style lang='scss' scoped>
.productAdvBox {
  height: 520px;
  margin-top: 30px;
  .productPrice {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .priceContainer {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      width: 285px;
      height: 370px;
      padding: 27px;
      border: 1px solid #ebf0f7;
      background: #ffffff;

      h5 {
        font-size: 16px;
        color: #0e050b;
      }

      .tips {
        font-size: 14px;
        color: #999999;
        margin-top: 19px;
      }

      .line {
        margin-top: 29px;
        height: 2px;
        background: #1d7bff;
      }

      .priceBox {
        margin-top: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .info {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 18px;

          font-weight: 400;

          span {
            font-size: 16px;

            &:first-child {
              color: #000000;
            }

            &:last-child {
              color: #1d7bff;
            }
          }
        }
      }

      .freePrice {
        font-size: 24px;
        color: #ff4d4f;
        text-align: center;
        line-height: 65px;
        width: 100%;
      }

      .price {
        font-size: 24px;
        text-align: center;
        width: 100%;

        .nowPrice {
          span {
            &:first-child {
              font-size: 24px;
              color: #ff4d4f;
            }

            &:last-child {
              font-size: 16px;
            }
          }
        }

        .originalprice {
          font-size: 16px;
          font-weight: 400;
          color: #999999;

          &::after {
            content: "";
            position: absolute;
            width: 130px;
            height: 2px;
            background: #ff4d4f;
            left: 50%;
            transform: translate(-50%, 10px);
          }
        }
      }

      .btnBox {
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 27px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
.noMsg {
  display: flex;
  height: 80%;

  div {
    font-size: 20px;
  }
}

</style>