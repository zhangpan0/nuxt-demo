<template>
  <!-- 左侧展示区域 -->
  <div class="ocr-demo">
    <!-- 图片展示区域 -->
    <div class="ocr-demo-cont">
      <div class="img-wrap">
        <div :class="imgDisplayCls">
          <!-- 展示画布 -->
          <canvas class="cvs" id="image-canvas" v-if="isCanvas"></canvas>
          <OcrDemoImg
            ref="ocrDemoImgRef"
            :src="imgDisplaySrc"
            :drawRectKeyConfig="drawRectKeyConfig"
            :isDrawRect="isDrawCanvasRectComputed"
            :coords="coords"
            :keyCN="keyCN"
            :clickable="clickable"
            v-else
            @handleRectItemClick="handleRectItemClick"
            v-bind="$attrs"
          ></OcrDemoImg>
        </div>
      </div>
      <div class="border-down-box">
        <!-- 样图选择 -->
        <PureImgList
          ref="pureImgListRef"
          :list="imgSelectList"
          :srcKey="imgSelectSrcKey"
          imgWidth="124px"
          imgHeight="90px"
          @handleClick="handleImgSelect"
        ></PureImgList>
        <!-- 输入网络URL -->
        <div class="g-mg-t-sm img-input">
          <div class="img-input-cont">
            <!-- <el-input
                class="img-el-input"
                placeholder="请输入网络图片URL"
                v-model="imgRemoteSrc"
              >
                <template slot="append">
                  <div
                    class="test-btn"
                    @click="confirmTest"
                    :disabled="scanLoading"
                  >
                    检测
                  </div>
                </template>
              </el-input>
              <span style="margin: 0 20px; color: #fff">或</span> -->
            <!-- 上传文件 -->
            <el-upload
              class="upload-demo"
              :action="uploadUrlComputed"
              :show-file-list="false"
              :name="uploadFileKey"
              :before-upload="beforeUpload"
              :on-success="handleLocalImgUploadSuccess"
              :on-error="handleLocalImgUploadError"
              :http-request="cusUpload"
              :disabled="scanLoading"
              accept="image/jpeg,image/png,image/jpg,image/bmp"
            >
              <el-button class="upload-btn" plain
                ><i class="fa fa-plus"></i>上传本地图片</el-button
              >
            </el-upload>
          </div>
          <div class="input-tip">
            *此处仅供功能展示，图片类型支持PNG、 JPG、 JPEG、 BMP, 大小不超过6M
          </div>
          <div class="input-tip">
            *该接口实际能力的图片格式及大小要求以接口文档为准
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PureImgList from "./PureImgList.vue";
import OcrDemoImg from "./OcrDemoImg.vue";

import JsonCollapse from "@/components/OcrDemo/JsonCollapse.vue";
import { getPicList } from "@/assets/api/index.js";

// import * as imageConversion from "image-conversion";
// import { compress, compressAccurately } from "image-conversion";

import {
  getObjKeys,
  readBlobAsDataURL,
  isHttpOrHttps,
  getMinScaleRatio,
  imgToFile,
  clearStorage,
  setDomShrink,
} from "@/assets/js/utils.js";
import {
  canvasDrawImg,
  canvasDrawLinesByCoordinates,
  canvasDrawRect,
  startClip,
} from "@/assets/js/mycanvas.js";

/*
功能演示组件
接口请求成功返回：
1、接口数据；
2、根据坐标点画线框：传入 isDrawLineFrame 为true，返回 drawLineFrameCbk(coords: [{x, y}])
3、根据点及宽高画矩形：传入 isDrawCanvasRect 为true，返回 drawCanvasRectCbk(list: [{x, y, width, height, rotation}])
4、裁剪图像：传入 isNeedClipImages 为true，返回 clipImagesCbk(list: [{x, y, width, height, rotation}])
*/
export default {
  components: {
    PureImgList,
    OcrDemoImg,
    JsonCollapse,
  },
  props: {
    requestConfig: {
      type: Object,
      default: () => ({
        params: "",
        method: "",
        url: "",
        header: "",
      }),
    },
    // 文件上传接口地址
    uploadUrl: {
      type: String,
      default: () => "",
    },
    // 接口函数
    apiFn: {
      type: Function,
      default: () => null,
    },
    isChange: {
      type: Number,
      default: () => null,
    },
    imgSelectSrcKey: {
      type: String,
      default: () => "algorithmImageUrl",
    },
    // 识别类型
    ocrType: {
      type: String,
      default: () => "",
    },
    // tab列表
    // tabList: {
    //   type: Array,
    //   default: () => [],
    // },
    // 样图key
    sampleKey: {
      type: String,
      default: () => "samples",
    },
    // tab切换时传参的key
    tabKey: {
      type: String,
      default: () => "",
    },
    // 上传的文件字段名
    uploadFileKey: {
      type: String,
      default: () => "image",
    },
    // 是否显示折叠面板识别结果
    isShowOcrJsonResult: {
      type: Boolean,
      default: () => false,
    },
    // 是否显示图像内角落识别结果
    isShowResultCorner: {
      type: Boolean,
      default: () => false,
    },
    // 是否显示图集识别结果
    isShowResultGallery: {
      type: Boolean,
      default: () => false,
    },
    // 是否画线框
    isDrawLineFrame: {
      type: Boolean,
      default: () => false,
    },
    // 是否画矩形
    isDrawCanvasRect: {
      type: Boolean,
      default: () => false,
    },
    // 是否需要裁剪图像
    isNeedClipImages: {
      type: Boolean,
      default: () => false,
    },
    // 坐标点
    coordinates: {
      type: Array,
      default: () => [],
    },
    // 坐标点x、y的key
    xyKeys: {
      type: Array,
      default: () => ["x", "y"],
    },
    // 线段颜色
    lineColor: {
      type: String,
      default: () => "red",
    },
    // 线段宽度
    lineWidth: {
      type: Number,
      default: () => 2,
    },
    // 绘制矩形key配置
    drawRectKeyConfig: {
      type: Object,
      default: () => ({
        x: "x",
        y: "y",
        width: "width",
        height: "height",
        rotation: "rotation",
      }),
    },
    // 矩形颜色
    rectColor: {
      type: String,
      default: () => "red",
    },
    // 矩形类型：1：线框；2：填充
    rectType: {
      type: Number,
      default: () => 1,
    },
    // 是否随机画矩形框颜色
    rectRandomColor: Boolean,
    // 是否返回模拟数据
    isMockData: {
      type: Boolean,
      default: () => false,
    },
    showCollapse: Boolean,
    isCanvas: {
      type: Boolean,
      default: () => true,
    },
    keyCN: Object,
    clickable: Boolean,
  },
  watch: {
    // tabList: {
    //   handler(val) {
    //     // this.setImgListActive(-1);
    //     this.clearOcr();
    //     this.initOperation();
    //   },
    //   immediate: true,
    //   deep: true,
    // },
    // 监测算法菜单改变了
    firstNav: {
      handler(val) {
        console.log(3333333);
        this.clearOcr();
        this.initOperation();
      },
    },
    isChange: function (val) {
      this.setImgListActive(-1);
    },
  },
  computed: {
    uploadUrlComputed() {
      return `${this.uploadUrl}?${this.tabKey}=${this.tabValue}&type=${this.ocrType}`;
    },
    changeId() {
      return this.isChange;
    },
    changeTbList() {
      return this.tabList;
    },
    imgDisplayCls() {
      return this.scanLoading ? "img-display g-scan" : "img-display";
    },
    tabListComputed() {
      return this.tabList.filter((tab) => !tab.hide);
    },
    isDrawLineFrameComputed() {
      return this.isDrawLineFrame;
    },
    isDrawCanvasRectComputed() {
      return this.isDrawCanvasRect;
    },
    isNeedClipImagesComputed() {
      return this.isNeedClipImages;
    },
    aiId() {
      return this.$store.state.aiId;
    },
    growRatio() {
      const gr = 1 - this.shrinkRatio;
      return gr <= 0 ? 1 : gr;
    },
    imgPath() {
      return process.env.API_IMG_URL;
    },
    firstNav() {
      return this.$store.state.firstNav;
    },
  },
  data() {
    return {
      imgRemoteSrc: "", // 输入路径
      imgDisplaySrc: "", // 展示图片路径
      tabValue: "", // tab绑定值
      ocrResponse: null,
      scanLoading: false,
      messageOffset: 200,
      tabActiveIndex: 0,
      imgSelectList: [],
      cvs: null, // canvas节点
      canvasWidth: 0,
      canvasHeight: 0,
      isShrinkCanvas: false, // 是否缩小canvas
      clipImageUrls: [], // 裁剪图像路径数组
      drewImageDom: null,
      coords: [], // 坐标宽高列表
      shrinkRatio: 1,
      tabList: [
        {
          label: "",
          side: "0",
          samples: [],
          hide: true,
        },
      ],
    };
  },
  methods: {
    handleRequest() {},
    // 点击检测按钮
    confirmTest() {
      if (!this.imgRemoteSrc || !isHttpOrHttps(this.imgRemoteSrc)) {
        return this.$message.warning("无效的网络地址！");
      }
      this.clearOcr();
      this.handleImgSelect(
        {
          remoteUrl: this.imgRemoteSrc,
        },
        () => {
          this.setImgListActive(-1);
        }
      );
    },
    _showScanLoading() {
      this.scanLoading = true;
    },
    _hideScanLoading() {
      this.scanLoading = false;
    },
    cusUpload({ file }) {
      if (!this.apiFn) {
        return this._hideScanLoading();
      }
      const params = {
        [this.tabKey]: this.tabValue,
        type: this.ocrType,
        file: {
          blob: file,
          name: file.name,
        },
      };
      this._execApiFn(params);
    },
    // 文件上传前操作
    beforeUpload(file) {
      //TODO 图片对比,清空旧值
      if (this.$attrs.imgUrlSet) {
        this.$emit("update:imgUrlSet", "");
      }
      return new Promise((resolve, reject) => {
        const isLt6M = file.size / 1024 / 1024 < 6;
        if (!isLt6M) {
          this.$message.error("上传文件大小不能超过 6MB!");
          return;
        }
        resolve(file);

        // imageConversion.compressAccurately(file, 2000).then((res) => {
        //   resolve(res);
        // });
        // console.log(file);
        // imageConversion.compress(file, 0.3).then((res) => {
        //   console.log(res);
        //   resolve(res);
        // });

        // if (!isLt6M) {
        //   this.$message.error("上传文件大小不能超过 1MB!");
        //   return;
        // }
        this.setImgListActive(-1);
        this.clearOcr();
        readBlobAsDataURL(file, (fileDataUrl) => {
          this.imgDisplaySrc = fileDataUrl;
          if (this.isCanvas) {
            canvasDrawImg("image-canvas", fileDataUrl, {}, (img) => {
              this.drewImageDom = img;
              this.shrinkRatio = setDomShrink(this.cvs);
              this._showScanLoading();
            });
          } else {
            this._showScanLoading();
          }
        });
      });
    },
    // 文件上传识别成功
    handleLocalImgUploadSuccess(res, file) {
      this.ocrResponse = res.shengshiResult;
      if (res.data) {
        // 开启绘制线框回调，传入坐标点二维数组
        this._addDrawLineFrameCbk(res.data);
        // 绘制矩形回调
        this._addDrawCanvasRectCbk(res.data);
        // 裁剪图像回调
        this._addClipImagesCbk(res.data);
        // 回传获取绘制的图片
        res.data.drewImageDom = this.drewImageDom;
      }
      this._hideScanLoading();
      this.$emit("ocrSuccess", res.data);
    },
    handleLocalImgUploadError(err, file, fileList) {
      this._hideScanLoading();
      this.$message({
        message: "上传失败，请重试",
        type: "error",
        offset: this.messageOffset,
      });
    },
    handleJsonCollapseChange(activeNames) {
      if (!activeNames) {
        this.initJsonActiveName();
      }
    },

    // 根据坐标点画线框
    _drawCanvasDotsZone(coordinates) {
      if (this.isCanvas) {
        canvasDrawLinesByCoordinates({
          canvasId: "image-canvas",
          coordinates,
          xyKeys: this.xyKeys,
          lineColor: this.lineColor,
          lineWidth: this.lineWidth / this.shrinkRatio,
        });
      } else {
      }
    },
    // 根据坐标点画线框回调：drawLineFrameCbk
    _addDrawLineFrameCbk(returnData) {
      if (this.isDrawLineFrameComputed && typeof returnData === "object") {
        returnData.drawLineFrameCbk = (coordinates) => {
          this._drawCanvasDotsZone(coordinates);
        };
      }
    },
    // 根据左上角坐标及宽高绘制矩形框
    _drawCanvasRect(list = []) {
      if (!Array.isArray(list)) return;
      if (this.isCanvas) {
        if (this.cvs) {
          const context = this.cvs.getContext("2d");
          // 字段配置
          const { x, y, width, height, rotation } = this.drawRectKeyConfig;
          list.forEach((item) => {
            canvasDrawRect({
              context,
              x: item[x],
              y: item[y],
              width: item[width],
              height: item[height],
              rotation: item[rotation],
              type: this.rectType,
              color: this.rectColor,
              lineWidth: this.lineWidth / this.shrinkRatio,
              randomColor: this.rectRandomColor,
            });
          });
        }
      } else {
      }
    },
    // 根据左上角坐标及宽高绘制矩形框回调：drawCanvasRectCbk
    _addDrawCanvasRectCbk(returnData) {
      if (this.isDrawCanvasRectComputed && typeof returnData === "object") {
        returnData.drawCanvasRectCbk = (list) => {
          // 坐标及展示属性同级结构 [{坐标，属性}]
          this.coords = list;
          this._drawCanvasRect(list);
        };
      }
    },
    // 根据左上角坐标及宽高裁剪图像，list:[[多个坐标]]
    _clipImagesByRect(list) {
      if (this.isCanvas) {
        if (this.cvs) {
          const context = this.cvs.getContext("2d");
          let clipImageUrls = [];
          // 字段配置
          const { x, y, width, height, rotation } = this.drawRectKeyConfig;
          list.forEach((group) => {
            if (!Array.isArray(group)) return;
            let tempUrls = [];
            group.forEach((item) => {
              tempUrls.push({
                src: startClip(
                  {
                    x: item[x] || item.X,
                    y: item[y] || item.Y,
                    w: item[width] || item.Width,
                    h: item[height] || item.Height,
                    rotation: item[rotation] || item.Rotation,
                  },
                  context
                ),
                width: item[width],
                height: item[height],
              });
            });
            clipImageUrls.push(tempUrls);
          });
          this.$emit("getClipImages", clipImageUrls);
          return clipImageUrls;
        }
      } else {
        const ocrDemoImgRef = this.$refs.ocrDemoImgRef;
        if (ocrDemoImgRef) {
          return ocrDemoImgRef._clip(list);
        }
        return [];
      }
    },
    // 裁剪图像回调：clipImagesCbk
    _addClipImagesCbk(returnData) {
      if (this.isNeedClipImagesComputed && typeof returnData === "object") {
        returnData.clipImagesCbk = (list) => {
          return this._clipImagesByRect(list);
        };
      }
      return [];
    },

    // json折叠面板默认激活项
    initJsonActiveName() {
      const jc = this.$refs.jsonCollapse;
      if (jc) {
        jc.initJsonActiveName();
      }
    },
    // 初始tab值、样图列表，并默认识别
    initTabRelateData() {
      const tabFirst = this.tabList[0];
      tabFirst ? (this.tabValue = tabFirst[this.tabKey]) : "";
      this.imgSelectList = tabFirst[this.sampleKey] || [];
      this.initDisplayImgAndStartOcr();
    },
    // tab切换
    handleTabChange(index) {
      if (this.tabActiveIndex === index) return;
      this.clearOcr();
      this.setImgListActive(0);
      this.$emit("handleTabChange", index);
      this.tabActiveIndex = index;
      const currentTab = this.tabList[index];
      this.tabValue = currentTab[this.tabKey];
      this.imgSelectList = currentTab[this.sampleKey] || [];
      this.initDisplayImgAndStartOcr(index);
    },
    setImgListActive(index) {
      this.$refs.pureImgListRef.activeIndex = index;
    },
    // 清空识别结果
    clearResult() {
      this.$emit("clearResult");
    },
    clearOcr() {
      this.ocrResponse = null;
      this.drewImageDom = null;
      this.coords = [];
      this.clearResult();
      this.initJsonActiveName();
    },
    handleRectItemClick(idx) {
      this.$emit("handleRectItemClick", idx);
    },

    //第一步 获取画布
    initOperation() {
      this.cvs = document.querySelector("#image-canvas");
      return new Promise((reslove, reject) => {
        getPicList(this.firstNav.id).then((res) => {
          this.imgSelectList = res.rows;
          reslove(this.initDisplayImgAndStartOcr());
        });
      });
    },
    // 默认显示第一张样图并识别
    initDisplayImgAndStartOcr(index = 0) {
      this.imgDisplaySrc = this.imgSelectList[index]
        ? this.imgPath + this.imgSelectList[index].algorithmImageUrl
        : "";
      if (this.imgDisplaySrc) {
        this.handleImgSelect({
          [this.imgSelectSrcKey]: this.imgDisplaySrc,
        });
      }
    },
    // 点击选择示例图片识别
    handleImgSelect(item, imgSelectCbk) {
      //TODO 图片对比,清空旧值
      if (this.$attrs.imgUrlSet) {
        this.$emit("update:imgUrlSet", "");
      }
      this.$store.commit("setOcrId", 0);
      if (this.scanLoading) return;
      //清空之前画图
      this.clearOcr();
      this.initJsonActiveName();
      // this.imgDisplaySrc = item.remoteUrl || item[this.imgSelectSrcKey] || "";
      this.imgDisplaySrc =
        item[this.imgSelectSrcKey] || this.imgPath + item.algorithmImageUrl;
      if (this.isCanvas) {
        canvasDrawImg(
          "image-canvas",
          this.imgDisplaySrc,
          {},
          (img) => {
            this.shrinkRatio = setDomShrink(this.cvs);
            if (typeof this.apiFn === "function") {
              // 开始请求接口
              this._showScanLoading();
              this.drewImageDom = img;
              // 开启模拟
              if (this.isMockData) {
                this.$emit("ocrSuccess", {
                  shengshiResult: {},
                  baiduResult: {},
                  tengxunResult: {},
                  drewImageDom: img,
                });
                return this._hideScanLoading();
              }
              // 原img添加crossOrigin会导致该回调执行两遍！！！
              const file = imgToFile(img);
              const params = {
                [this.imgSelectSrcKey]: this.imgDisplaySrc,
                [this.tabKey]: this.tabValue,
                type: this.ocrType,
                url: this.imgDisplaySrc,
                cached: 1,
                file,
              };
              this._execApiFn(params, imgSelectCbk);
            }
          },
          false
        );
      } else {
        if (typeof this.apiFn === "function") {
          this._showScanLoading();
          const params = {
            [this.imgSelectSrcKey]: this.imgDisplaySrc,
            [this.tabKey]: this.tabValue,
            type: this.ocrType,
            url: this.imgDisplaySrc,
            cached: 1,
          };
          this._execApiFn(params, imgSelectCbk);
        }
      }
    },
    // 执行接口请求
    _execApiFn(params, _execApiFnCbk) {
      this.apiFn(params)
        .then((res) => {
          if (typeof res !== "object") {
            return this.$emit("ocrSuccess", { noDataMsg: res });
          }
          this.ocrResponse = res.shengshiResult;
          // 开启绘制线框回调，传入坐标点二维数组
          this._addDrawLineFrameCbk(res);
          // 裁剪图像回调
          this._addClipImagesCbk(res);
          // 绘制矩形回调
          this._addDrawCanvasRectCbk(res);
          // 回传获取绘制的图片
          res.drewImageDom = this.drewImageDom;
          this.$emit("ocrSuccess", res);
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: err.message || err,
            type: "error",
            offset: this.messageOffset,
          });
        })
        .finally(() => {
          this._hideScanLoading();
          if (typeof _execApiFnCbk === "function") _execApiFnCbk();
        });
    },
  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
.ocr-demo {
  position: relative;

  .ocr-demo-tab {
    .tab-wrap {
      .tab-item {
        font-size: 16px;
        color: #fff;
        cursor: pointer;

        &:not(:last-child) {
          margin-right: 2%;
        }

        &:not(.tab-item-active) {
          &:hover {
            color: #036fe2;
          }
        }

        &.tab-item-active {
          color: #036fe2;
          font-weight: 700;
          font-size: 20px;
        }
      }
    }
  }

  .ocr-demo-cont {
    position: relative;

    .img-wrap {
      width: 100%;

      .cvs {
        position: absolute;
        top: 50%;
        left: 50%;
      }

      .img-display {
        height: 480px;
        position: relative;
        top: 0;
        bottom: 0;
        overflow: hidden;
        background-color: #f7f7f7;

        & > img {
          display: block;
          margin: 0 auto;
          height: 100%;
          padding: 0 50px;
        }

        &:hover {
          .upload-drag {
            opacity: 1;
          }
        }

        .upload-drag {
          width: 100%;
          height: 100%;
          position: relative;
          transition: all 0.2s;
          opacity: 0;
          display: none;

          /deep/ .el-upload-dragger {
            cursor: default;
            border: 0;
            border-radius: 0;
            padding-top: 20%;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #00000042;

            .el-icon-upload,
            .el-upload__text {
              color: #fff;
            }
          }
        }
      }

      .corner-result-wrap {
        padding: 10px;
        background-color: #0073eb;
        position: absolute;
        right: 0;
        top: 0;

        .corner-result-title {
          color: #ffffff;
        }
      }

      // .img-select {
      // height: 90px;
      // }
    }
    .border-down-box {
      border-bottom: 1px solid #eeeeee;
      border-left: 1px solid #eeeeee;
      border-right: 1px solid #eeeeee;
      padding: 28px 12px;
    }

    .img-input {
      width: 100%;
      padding-left: 30px;

      .img-input-cont {
        display: flex;
        align-items: center;

        .img-el-input {
          width: 70%;

          /deep/ input,
          /deep/ .el-input-group__append {
            border-radius: 0;
            color: #ffffff;
            outline: 0;
          }

          /deep/ input {
            border-right: 0;
          }

          .test-btn {
            width: 116px;
            text-align: center;
            cursor: pointer;
          }
        }

        .upload-btn {
          border: none;
          background-color: #3388ff;
          color: #fff;
          width: 160px;
          height: 42px;
          border-radius: 21px;

          i {
            font-size: 16px;
            margin-right: 6px;
            color: #fff;
          }
        }
      }

      .input-tip {
        margin-top: 10px;
        color: #999999;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        font-family: Microsoft YaHei;
      }
    }

    .result-right {
      flex-grow: 1;
      width: 370px;
    }
  }
}
</style>
