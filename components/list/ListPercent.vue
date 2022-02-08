<template>
  <div class="list-percent">
    <table border="0">
      <tr
        class="lp-row"
        v-for="(item, index) in list"
        :key="'lp' + index"
        :style="{ color: textColor }"
      >
        <td>{{ item[keyConfig.label] }}</td>
        <td class="line-td">
          <div class="line-wrap">
            <div
              class="percent-line"
              :style="{
                width: `${
                  item[keyConfig.percent] > 1
                    ? item[keyConfig.percent]
                    : getPercentNumber(item[keyConfig.percent]) * 100
                }%`,
                backgroundColor: color,
              }"
            ></div>
          </div>
        </td>
        <td>{{ getPercentNumber(item[keyConfig.percent]) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    keyConfig: {
      type: Object,
      default: () => ({
        label: "label",
        percent: "percent",
      }),
    },
    //   保留小数位数，默认3位
    fixNum: {
      type: Number,
      default: () => 3,
    },
    color: {
      type: String,
      default: () => "#4A81FF",
    },
    textColor: {
      type: String,
      default: () => "#242527",
    }
  },
  data() {
    return {};
  },
  methods: {
    getPercentNumber(doubleNum, fixNum = this.fixNum) {
      if (typeof doubleNum !== "number") return doubleNum;
      return doubleNum.toFixed(fixNum);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.list-percent {
  color: #ffffff;
  font-size: 16px;
  max-height: 100%;
  table {
    width: 100%;
  }
  tr {
    margin-bottom: 14px;
    td {
      line-height: 2;
      &:first-child{
        text-align: right;
      }
    }
  }
  .line-td {
    padding-left: 20px;
    padding-right: 10px;
    width: 60%;
    .line-wrap{
      height: 16px;
      background: #B5B5B5;
    }
    .percent-line {
      width: 0;
      height: 100%;
      background-color: #ffffff;
      transition: width 2s ease-in-out;
    }
  }
}
</style>