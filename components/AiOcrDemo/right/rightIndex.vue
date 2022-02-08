<template>
  <!-- 右侧数据展示 -->
  <transition :name="transitionName">
    <div class="data-display">
      <div class="dd-title">
        <i></i><h4 class="dd-tl">数据展示</h4>
      </div>
      <MyCheckout ></MyCheckout>
      <div class="display-list">
        <el-scrollbar class="tabs-cont">
          <!-- 左侧图片右侧文字描述展示 -->
          <div>
            <ThumbCarousel v-bind="$attrs" />
          </div>
          <!-- 文字识别展示文字描述和信息的 -->
          <!-- <div>
          </div> -->
          <!-- 通用文字展示段落的 -->
          <!-- <div>
          </div> -->
          <!-- 展示图像的 -->
          <!-- <div>
          </div> -->
          <!-- 人脸关键点 -->
          <!-- <div>
          </div> -->
          <!-- 识别人脸数量展示 -->
          <!-- <div>
          </div> -->
        </el-scrollbar>
      </div>
    </div>
  </transition>
</template>

<script>
import {getObjKeys, isJsonObj} from "@/assets/js/utils.js";
import ListKeyValue from "./ListKeyValue.vue";
import MyCheckout from "./MyCheckout.vue";
import MixinCompoPraise from "@/assets/mixin/mixin-compo-praise.js";
import ListSort from "./ListSort.vue";
import ThumbCarousel from './ThumbCarousel.vue'

/* 算法对比组件 */
export default {
  inheritAttrs: false,
  mixins: [MixinCompoPraise],
  components: {
    ListKeyValue,
    MyCheckout,
    ListSort,
    ThumbCarousel
  },
  props: {
    imgUrlSet: {
      type: String,
      default: ''
    },
    ocrId: {
      type: Number,
    },
    times: {
      type: Array,
      default: () => [],
    },
    /*
    list数据格式：{ keys: [字段], keyCN: {字段：中文配置}, listKey: 列表数据key，dataKey：数据key， data: {} }
    */
    // 显示隐藏组件
    showCompareCompo: {
      type: Boolean,
      default: () => false,
    },
    // 是否自定义列表
    isCustom: {
      type: Boolean,
      default: () => false,
    },
    // 数据展示标题
    dtitle: {
      type: String,
      default: () => "算法时间对比",
    },
    // 设置过渡名
    transitionName: {
      type: String,
      default: () => "",
    },
    listItemMaxHeight: {
      type: String,
      default: () => "",
    },
    dataListHeight: {
      type: String,
      default: () => "calc(100% - 98px)",
    },
    tabsToggleReset: Boolean,
    show: false,
  },
  computed: {
    isShow() {
      return this.showCompareCompo;
    },
    id() {
      return this.ocrId;
    },
  },
  watch: {
    id(val) {
      this.ocrId = val;
      // this.$store.commit("setOcrId", val);
    },
    times(newVal) {
      return;
      if (this.isShow) {
        this.$nextTick(() => {
          this.handleCreateChart(newVal);
        });
      }
    },
    isShow(newVal) {
      return;
      if (!newVal) {
        const option = this.myChart.getOption();
        option.series[0].data = [];
        this.myChart.setOption(option);
      }
    },
    list: {
      handler(newList) {
        // if (newList) {
        //   this.tabs = newList;
        // } else {
        //   this.tabs = [];
        // }
        this.tabs = [];
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      chartId: "time-chart",
      myChart: null,
      getObjKeys,
      isJsonObj,
      activeTabIndex: 0,
      tabs: [],
    };
  },
  methods: {
    handleCreateChart(data) {
      if (!Array.isArray(data)) return;
      if (!this.myChart) {
        this.myChart = this.createChart(this.chartId, data);
      } else {
        const option = this.myChart.getOption();
        option.series[0].data = data.map((item) => item.time);
        option.xAxis[0].data = data.map((item) => item.label);
        this.myChart.setOption(option);
      }
    },
    createChart(id, seriesData = []) {
      // 基于准备好的dom，初始化echarts实例
      const container = document.getElementById(id);
      if (!container) return null;
      let myChart = this.$echarts.init(container);
      let labels = [];
      let times = [];
      seriesData.forEach(({label, time}) => {
        labels.push(label);
        times.push(time);
      });
      const textColor = "#757575";
      // 绘制图表
      myChart.setOption({
        title: {
          text: "",
          textStyle: {},
        },
        tooltip: {},
        grid: {
          x: "10%", //距离左边
          x2: 0, //距离右边
          y: "18%", //距离上边
          y2: "12%", //距离下边
        },
        xAxis: {
          axisLabel: {
            color: textColor,
          },
          //设置轴线的属性
          axisLine: {
            lineStyle: {
              color: textColor,
            },
          },
          data: labels,
        },
        yAxis: {
          name: "毫秒", //坐标名字
          nameLocation: "end", //坐标位置，支持start,end，middle
          nameTextStyle: {
            //字体样式
            // fontSize: 16, //字体大小
            // padding: 2, //距离坐标位置的距离
            color: textColor,
          },
          //设置轴线的属性
          axisLine: {
            lineStyle: {
              color: textColor,
              // width:8,//这里是为了突出显示加上的
            },
          },
          // boundaryGap: [0, 10],
          axisLabel: {
            color: textColor,
          },
        },
        series: [
          {
            name: "时间",
            type: "bar",
            data: times,
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              //数值样式
              color: textColor,
              fontSize: 16,
            },
            tooltip: {
              // formatter: '{b}：{c} 毫秒'
              formatter(params) {
                return `${params.marker}${params.name}：${params.value} 毫秒`;
              },
            },
          },
        ],
      });
      return myChart;
    },
    handleTabClick(item, index) {
      if (this.activeTabIndex === index) return;
      this.activeTabIndex = index;
      this.$emit("getActiveIndex", index); // 暂时没作用
    },
    createInfoByBaiduData(data) {
      const retObj = {};
      Object.values(data).forEach((item, index) => {
        retObj[`baiduKey${index}`] = item.words;
      });
      return retObj;
    },
    createValKeyConfigByBaiduData(data) {
      const retObj = {};
      Object.keys(data).forEach((item, index) => {
        retObj[`baiduKey${index}`] = item;
      });
      return retObj;
    },
  },
  created() {
  },
  mounted() {
  },
};
</script>
<style scoped lang='scss'>

.data-display {
  height: 100%;
  .dd-title {
    color: #757575;
    font-size: 18px;
    margin-bottom: 10px;
    display:flex;
    align-items:center;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
    .dd-tl {
      font-size: 18px;
      font-weight: 400;
      color: #2b2e2e;
    }
    i {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: url("~@/static/images/ai/icon-data-display.png") no-repeat;
      background-size: contain;
      margin-right: 6px;
    }
  }
  .display-list {
    padding:0 20px;
    height:calc(100% - 120px);
    .tabs-cont {
      margin-top: 10px;
      /deep/ .ditem {
        scrollbar-width: none;
        // width: 100%;
        height: 100%;
        background-color: #fff;
        transition: all 0.2s ease-in;

        .ditem-title {
          border-bottom: 1px solid rgb(219, 219, 219);
          text-align: right;
          color: cornflowerblue;
          padding: 10px 0;
          letter-spacing: 10px;
          font-weight: 700;
        }

        .json-cont {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          /deep/ .no_data {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, 50%);
          }

          /deep/ span {
            font-size: 14px;
          }
        }
      }
    }
  }
}

</style>
