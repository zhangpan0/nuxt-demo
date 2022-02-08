<template>
  <div>
    <div v-if="isCheck" :class="$store.state.ocrId !== 0 ? 'ischeckout_box' : 'unshow'">
      <i class="el-icon-s-opportunity" style="color: #ffd700"></i
      ><span>感谢您的反馈~</span>
    </div>
    <div :class="$store.state.ocrId !== 0 ? 'checkout_box' : 'unshow'" v-else>
      <div class="check_item" @click="onCheckout(1)">
        <i class="el-icon-success" style="color: green"></i><span>正确</span>
      </div>
      <div class="check_item" @click="onCheckout(0)">
        <i class="el-icon-error" style="color: red"></i><span>错误</span>
      </div>
    </div>
  </div>
</template>

<script>
import { checkoutOcr } from "@/assets/api/index.js";
export default {
  props: {},
  data() {
    return {
      isCheck: true,
      stime: Date.now(),
      isShow: false,
      id: 0,
    };
  },
  watch: {
    "$store.state.ocrId"(val) {
      this.isCheck = false;
      setTimeout(() => {
        this.id = val;
      }, 2000);
    },
  },
  computed: {},
  methods: {
    praiseCbk() {
      this.isCheck = true;
    },
    onCheckout(status) {
      const etime = Date.now();
      if (etime - this.stime > 1000) {
        this.stime = etime;
        let httpData = {
          status: status,
          id: this.$store.state.ocrId,
        };
        checkoutOcr(httpData)
          .then((res) => {
            this.isCheck = true;
          })
          .catch((err) => {
            this.$message.error(err.msg || "异常，请稍后重试");
          });
        this.praiseCbk;
      }
    },
  },
  created() {},
  mounted() {
  },
  beforeDestroy() {
    this.$store.commit("setOcrId", 0);
  },
  destroyed() {},
};
</script>
<style scoped lang='scss'>
.unshow {
  display: none;
  transition: 1s all;
}
.ischeckout_box {
  border: 1px solid red ;
  padding: 8px 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    color: #333333;
    font-size: 14px;
    margin-left: 8px;
  }
}
.checkout_box {
  transition: 1s all;
  display: flex;
  align-items: center;
  padding: 8px 60px;
  justify-content: space-between;
  .check_item {
    cursor: pointer;
    width: 48%;
    height: 40px;
    border: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    justify-content: center;
    > i {
      margin-right: 8px;
    }
    > span {
      color: #333333;
      font-size: 14px;
    }
    &:nth-child(1):hover {
      transition: 0.5s all;
      border: green 1px solid;
    }
    &:nth-child(2):hover {
      transition: 0.5s all;
      border: red 1px solid;
    }
  }
  .btn {
    display: flex;
    align-items: center;
  }
  .good {
    margin-right: 15px;
  }
  .fa {
    font-size: 22px;
    color: rgba(0, 0, 0, 0.5);
    margin-right: 6px;
  }
  .active {
    color: #0073eb;
  }
}
</style>
