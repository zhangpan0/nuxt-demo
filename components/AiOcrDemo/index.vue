<!--  -->
<template>
  <div class="ocr-demo-layout" id="productTest">
    <div class="flex-center title-box">
      <h2 class="title g-mg-b-sm">产品体验</h2>
    </div>
    <div class="paddingTop procudtTestContainer">
      <div class="flex-between">
        <div class="wrap-l">
          <DataShowLeft 
            :uploadUrl="host + cityApiUrl.requestCityApi"
            :ocrType="cityTypeConfig.garbageFull"
            tabKey="side"
            :isShowOcrJsonResult="false"
            :tabList="demotabList"
            imgSelectSrcKey="src"
            :apiFn="requestCityApi"
            :requestConfig="requestConfig"
            :isDrawCanvasRect="true"
            :isNeedClipImages="true"
            :drawRectKeyConfig="drawRectKeyConfig"
            :rectRandomColor="true"
            :keyCN="maxvisionKeyCN"
            @ocrSuccess="handleOcrSuccess"
            @clearResult="clearOcrResult"
            :isCanvas="false"
            :clickable="false"
          ></DataShowLeft>
        </div>
        <div class="wrap-r">
          <DataShowRight 
            :list="clipImagesMaxvision"
            :info="detectInfo"
            :reList="detectList"
            :keyCN="maxvisionKeyCN"
          ></DataShowRight>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataShowRight from './right/rightIndex'
import DataShowLeft from './left/leftIndex'
import {initAiData} from './init-aiData.js'

import {
  requestCityApi,
  cityTypeConfig,
  cityApiUrl,
} from "@/assets/api/algAllApi.js";
import MixinFunDemo from "@/assets/mixin/mixin-fun-demo.js";
export default {
  props:{},
  extends:initAiData,
  mixins:[MixinFunDemo],
  data() {
    return {
      host:'',
      headDescs: ["从品种、颜色、体型、是否着装和是否牵绳五个角度分析宠物属性"],
      // aiIntro: "针对垃圾收集点，识别分析垃圾桶垃圾是否溢出。",
      requestCityApi,
      cityApiUrl,
      cityTypeConfig,
      // 不显示hide：true的tab
      demotabList: [
        {
          label: "",
          side: "",
          samples: [],
          hide: true,
        },
      ],
      requestConfig: {
        params: 'image="File对象" 或 url="文件地址"',
        method: "POST",
        url: cityApiUrl.requestCityApi,
        header: "none",
      },
      // 识别数据结果key
      resultKeys: [],
      // 识别数据结果
      resultData: [],
      resultDataBaidu: [],
      resultDataTencent: [],
      clipImagesMaxvision: [],
      clipImagesBaidu: [],
      clipImagesTencent: [],
      // 检测数据
      detectInfo: {},
      detectList: [],
      detectInfoBaidu: {},
      detectInfoTencent: {},
      keyCN: {
        x: "x1",
        y: "y1",
        width: "宽",
        height: "高",
      },
      // 返回结果字段中文配置-盛视
      maxvisionKeyCN: {
        type: "类型",
        prop: "置信度",
      },
      // 返回结果字段中文配置-百度
      baiduKeyCN: {},
      // 返回结果字段中文配置-腾讯
      tencentKeyCN: {},
      baiduResultKey: "person_info",
      tencentResultKey: "BodyDetectResults",
      // 坐标信息
      locationMaxvision: [],
      locationBaidu: [],
      locationTencent: [],
      keyToChineseConfig: {},
      restoreTopToggle: false,
      listMaxvision: [],
      activeTabIndex: 0,
      maxvisionResultKey: "data",
      maxvisionDataKey: "data",
      drawRectKeyConfig: {
        x: "x",
        y: "y",
        width: "width",
        height: "height",
        rotation: "rotation",
      },
      count: -1,
    };
  },
  methods: {
    initData() {
      // 识别样图设置
      this.demotabList[0].samples = samplesCityGarbageFull;
    },
    initCount(count) {
      this.count = count;
    },
    dataProcessMaxvision(data) {
      if (!Array.isArray(data)) return;
      data.map((item) => {
        item.prop = item.prop.toString().substring(0, 5);
        return;
      });
      this.listMaxvision = data;
      this.detectList = data;
      this.locationMaxvision = data.map((item) => ({
        x: item.left,
        y: item.top,
        width: item.right - item.left,
        height: item.bottom - item.top,
        type: item.type,
      }));
      this.listMaxvision = data.map((item) => ({
        x: item.left,
        y: item.top,
        width: item.right - item.left,
        height: item.bottom - item.top,
        prop: item.prop,
        type: item.type == 1 ? "垃圾箱满溢" : "垃圾箱即将满",
        rectColor : item.type == 1 ? "" : "#FFCA00"
      }));
      this.detectList = this.listMaxvision;
      this.initCount(data.length);
    },
    dataProcessBaidu(list = []) {
      if (!Array.isArray(list)) return;
      this.locationBaidu = list.map((item) => item.location);
      this.locationBaidu.forEach((item) => {
        item.x = item.left;
        item.y = item.top;
      });
    },
    dataProcessTencent(list = []) {
      if (!Array.isArray(list)) return;
      this.locationTencent = list.map((item) => item.BodyRect);
    },
    // mixin调用，裁剪图像回调
    handleClipImagesCbk(clipCbk) {
      if (typeof clipCbk === "function") {
        const [clipImagesMaxvision = []] = clipCbk([this.listMaxvision]);
        this.clipImagesMaxvision = clipImagesMaxvision;
        this.initFirstDetectInfo();
      }
    },
    // mixin调用，绘制矩形-盛视数据
    handleDrawCanvasRectCbk(drawCanvasRectCbk) {
      if (typeof drawCanvasRectCbk === "function")
        drawCanvasRectCbk(this.listMaxvision);
    },
    clearOcrResultInMixin() {
      this.clipImagesMaxvision = [];
      this.clipImagesBaidu = [];
      this.clipImagesTencent = [];
      this.restoreTopToggle = !this.restoreTopToggle;
      this.listMaxvision = [];
      this.detectInfo = {};
      this.detectInfoBaidu = {};
      this.detectInfoTencent = {};
      this.count = -1;
    },
    getActiveIndex(activeTabIndex) {
      this.activeTabIndex = activeTabIndex;
      this.initFirstDetectInfo();
    },
    handleThumbCarouselItemClick(index) {
      this.detectInfo = this.listMaxvision[index];
    },
    handleThumbCarouselItemClickBaidu(index) {
      this.detectInfoBaidu = this.jsonBaidu[index].attributes;
    },
    handleThumbCarouselItemClickTencent(index) {
      this.detectInfoTencent = this.jsonTencent[index].BodyAttributeInfo;
    },
    initFirstDetectInfo() {
      if (this.listMaxvision && this.listMaxvision.length > 0) {
        this.detectInfo = this.listMaxvision[0];
      }
    }, 
  },
  components:{
    DataShowRight,
    DataShowLeft
  },
  created() {
     
  },
}
</script>

<style lang='scss' scoped>
.ocr-demo-layout {
  width: 1200px;
  margin: 0 auto;
  .title-box {
    margin-top: 80px;
  }
  .procudtTestContainer {
    background: url("~@/static/images/ai/pictureBg.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .wrap-l {
    width: 740px;
    margin-right: 17px;
  }
  .wrap-r {
    width: 392px;
    /deep/ .ac-wrap {
      height: 100%;
    }

    /deep/ .tabs-cont {
      height: 602px;
    }
  }
}
</style>