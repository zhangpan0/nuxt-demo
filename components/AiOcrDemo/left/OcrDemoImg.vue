<template>
  <div class="odi-wrap">
    <div :class="wrapCls" :id="uniqId">
      <img class="bg" :src="src" crossorigin="anonymous" @load="initOperate" :class="{'before-img':imgUrlSet && hasImgUrlSet}" :key="src" />
      <!-- 图片对比显示 -->
      <img v-if="imgUrlSet && hasImgUrlSet" :src="imgUrlSet" alt="" id="after-img" ondragstart="return false;" />
      <div id="box-bar" class="box-bar" v-if="imgUrlSet && hasImgUrlSet" ondragstart="return false;">
        <div class="line"></div>
        <div class="round">
          <div class="left-arrow"></div>
          <div class="right-arrow"></div>
        </div>
        <div class="line"></div>
      </div>
      <template v-if="isDrawRect && coords && coords.length">
        <!-- 识别框 -->
        <RectItem
          :class="[clickable && idx === currentRectIdx ? 'active' : '']"
          :keyConfig="drawRectKeyConfig"
          :coord="coord"
          v-for="(coord, idx) in coords"
          :key="idx"
          :data-i="idx"
          :rectColor="coord.rectColor || rectColor"
          :rectColorActive="rectColorActive"
          :style="{ borderWidth }"
        ></RectItem>
      </template>
      <!-- 操作层，区域判断，解决元素完全覆盖问题 -->
      <div :class="layerCls" @click="handleClick" @mousemove="handleMove"></div>
    </div>
    <div :class="labelCls" :style="labelStyle" v-show="showLabel">
      <div class="line"></div>
      <div class="txt">
        <div class="txt-bor">
          <div class="txt-inner">
            <p v-for="(txt, idx) in labelArr" :key="idx">{{ txt.label }}：{{ txt.name }}</p>
          </div>
        </div>
        <BorderCorner size="1px" color="#4A81FF" width="10px"></BorderCorner>
      </div>
    </div>
  </div>
</template>

<script>
import { genID, setDomShrink } from "@/assets/js/utils.js";
import { startClip } from "@/assets/js/mycanvas.js";
import {extendsCompare} from "./compare-extends.js";
import RectItem from "./RectItem.vue";
import BorderCorner from "./BorderCorner.vue";

/* 功能演示--基于image的展示操作区 */
export default {
  props: {
    src: String,
    // 坐标范围列表，含展示属性 [{x,y,w,h, ...}]
    coords: {
      type: Array,
      default: () => [],
    },
    // 绘制矩形key配置
    drawRectKeyConfig: {
      type: Object,
      default: () => ({
        x: "x",
        y: "y",
        w: "width",
        h: "height",
        rotation: "rotation",
      }),
    },
    // 是否绘制矩形
    isDrawRect: Boolean,
    // 显示属性key
    keyCN: {
      type: Object,
      default: () => ({}),
    },
    // 是否矩形可以点击
    clickable: Boolean,
    rectColor: {
      type: String,
      default: "#F00606",
    },
    rectColorActive: String,
  },
  extends:extendsCompare,
  data() {
    return {
      uniqId: "",
      isShow: false,
      currentRectIdx: -1,
      shrinkRatio: 1, // 节点缩放比
      showLabel: false,
      dataInfo: null,
      centerPoints: [], // 存储矩形中心点坐标
      wrapOffsetW: 0,
      wrapOffsetH: 0,
      gapX: 0, // 与父容器的水平间隔
      gapY: 0, // 与父容器的垂直间隔
      directStr: "",
      isHoverInRange: false, // 鼠标是否移入坐标范围
      defaultBorderWidth: 2, // 默认表框宽度
      positionX:'',
      positionY:''
    };
  },
  components:{
    RectItem,
    BorderCorner
  },
  computed: {
    wrapCls() {
      return this.isShow ? "odi" : "odi hide";
    },
    // 找到坐标位置
    labelStyle() {
      if (!this.clickable) return;
      const { x, y } = this.centerPoints[this.currentRectIdx] || {};
      if (!this.hasVal(x) || !this.hasVal(y)) return;
      // let offsetHorizontal = 45;
      // switch (this.directStr) {
      //   case "left":
      //     offsetHorizontal = -offsetHorizontal;
      //     break;
      // }
      return {
        // transform: `scale(${1 - this.shrinkRatio + 1})`,
        left: x + this.gapX + "px",
        top: y + this.gapY + "px",
      };
    },
    labelCls() {
      if (!this.clickable) return "";
      this.directStr = this.getMaxUsableDirection(
        this.coords[this.currentRectIdx],
        this.shrinkRatio
      );
      return ["label", "label-" + this.directStr];
    },
    labelArr() {
      if (!this.clickable) return [];
      let result = [];
      if (Array.isArray(this.dataInfo)) result = this.dataInfo;
      if (typeof this.dataInfo === "object" && this.dataInfo !== null) {
        if (this.keyCN) {
          const arr = [];
          const keyCNKeys = Object.keys(this.keyCN);
          const valueCNKeys = Object.values(this.keyCN);
          keyCNKeys.forEach((item,index) => {
            let val = this.dataInfo[item];
            if (val) {
              arr.push({
                label:valueCNKeys[index],
                name:val
              });
            }
          });
          result = arr;
        }
      }

      if (Array.isArray(result) && result.length > 0) {
        this.showLabel = true;
      }
      return result;
    },
    layerCls() {
      return this.isHoverInRange ? "layer hover" : "layer";
    },
    borderWidth() {
      return this.defaultBorderWidth / this.shrinkRatio + 'px';
    },
  },
  watch: {
    coords(newVal) {
      if (!newVal || !Array.isArray(newVal) || newVal.length === 0) {
        this.clearData();
        this.centerPoints = [];
        return;
      }
      this.initDataInfo();
    },
  },
  methods: {
    initOperate() {
      const $zoneDom = $("#" + this.uniqId);
      if (!$zoneDom) return console.error("容器不存在");
      const zd = $zoneDom.get(0);
      if (!zd) return console.error("图片不存在");
      const $layer = $zoneDom.find(".layer");
      const $img = $zoneDom.find(".bg");
      $zoneDom.css({
        width: $img.width() + "px",
        height: $img.height() + "px",
      });
      $layer.css({
        width: $img.width() + "px",
        height: $img.height() + "px",
      });
      // 是否存在图片对比的算法,
      if (this.hasImgUrlSet) {
        $img.css({
          opacity:0
        })
        if (this.imgUrlSet) { // 识别的图片回调比当前背景渲染快,重新打开渲染图片
          $img.css({
            opacity:1
          })
        }
      }
      this.shrinkRatio = setDomShrink(zd);
      const { width, height } = zd.getBoundingClientRect();
      this.gapX = (this.wrapOffsetW - width) / 2;
      this.gapY = (this.wrapOffsetH - height) / 2;
      this.isShow = true;
    },
    initDataInfo() {
      const coords = this.coords;
      if (this.currentRectIdx !== -1) {
        this.dataInfo = coords[this.currentRectIdx];
        return;
      }
      const drawRectKeyConfig = this.drawRectKeyConfig;
      if (this.centerPoints.length === 0) {
        coords.forEach((co) => {
          this.centerPoints.push(this.calcCenterPoint(co));
        });
      }
      if (!Array.isArray(coords)) return;
      let coord;
      for (let i = 0; i < coords.length; i++) {
        coord = coords[i];
        if (
          coord[drawRectKeyConfig.width] !== 0 &&
          coord[drawRectKeyConfig.height] !== 0
        ) {
          this.dataInfo = coord;
          this.currentRectIdx = i;
          return [coord, i];
        }
      }
    },
    handleClick(ev) {
      if (!this.clickable) return;
      const clickX = ev.offsetX;
      const clickY = ev.offsetY;
      let coordFormat;
      //   点所在范围的面积
      const inRangeRectAreas = [];
      //   点所在范围的索引
      const inRangeIdxs = [];
      // 找出点击所在的范围坐标
      this.coords.forEach((coord, idx) => {
        coordFormat = {
          x: coord[this.drawRectKeyConfig.x],
          y: coord[this.drawRectKeyConfig.y],
          w: coord[this.drawRectKeyConfig.width],
          h: coord[this.drawRectKeyConfig.height],
        };
        if (this.isDotInRange(clickX, clickY, coordFormat)) {
          inRangeIdxs.push(idx);
          inRangeRectAreas.push(this.getRectArea(coordFormat.w, coordFormat.h));
        }
      });
      // 最小面积索引
      const minAreaIdx = inRangeRectAreas.indexOf(
        Math.min(...inRangeRectAreas)
      );
      if (minAreaIdx === -1) return this.clearData();
      // 激活项索引
      this.currentRectIdx = inRangeIdxs[minAreaIdx];
      this.initDataInfo();
      this.showLabel = true;
      this.$emit("handleRectItemClick", this.currentRectIdx);
    },
    handleMove(ev) {
      if (!this.clickable) return;
      const clickX = ev.offsetX;
      const clickY = ev.offsetY;
      let coordFormat;
      let coord;
      // 是否移入坐标范围
      for (let i = 0; i < this.coords.length; i++) {
        coord = this.coords[i];
        coordFormat = {
          x: coord[this.drawRectKeyConfig.x],
          y: coord[this.drawRectKeyConfig.y],
          w: coord[this.drawRectKeyConfig.width],
          h: coord[this.drawRectKeyConfig.height],
        };
        if (this.isDotInRange(clickX, clickY, coordFormat)) {
          return (this.isHoverInRange = true);
        }
      }
      this.isHoverInRange = false;
    },
    // 裁剪图像
    _clip(list) {
      const img = $("#" + this.uniqId + " .bg").get(0);
      if (!Array.isArray(list) || !img) return [];
      let clipImgs;
      let result = [];
      const cvs = document.createElement("canvas");
      const ctx = cvs.getContext("2d");
      cvs.width = img.width;
      cvs.height = img.height;
      ctx.drawImage(img, 0, 0);
      list.forEach((group) => {
        if (!Array.isArray(group)) return;
        clipImgs = [];
        group.forEach((co) => {
          clipImgs.push(
            startClip(
              {
                x: co[this.drawRectKeyConfig.x],
                y: co[this.drawRectKeyConfig.y],
                w: co[this.drawRectKeyConfig.width],
                h: co[this.drawRectKeyConfig.height],
              },
              ctx
            )
          );
        });
        result.push([...clipImgs]);
      });
      return result;
    },
    clearAll() {
      this.isShow = false;
      this.clearData();
    },
    clearData() {
      this.showLabel = false;
      this.currentRectIdx = -1;
      this.dataInfo = null;
    },
    calcCenterPoint(coord) {
      const x = coord[this.drawRectKeyConfig.x];
      const y = coord[this.drawRectKeyConfig.y];
      const w = coord[this.drawRectKeyConfig.width];
      const h = coord[this.drawRectKeyConfig.height];
      return {
        x: (x + w / 2) * this.shrinkRatio,
        y: (y + h / 2) * this.shrinkRatio,
      };
    },
    // 获取目标距离四周距离最大的方向
    getMaxUsableDirection(coord, shrinkRatio = 1) {
      if (!coord) return "";
      const x = Math.round(coord[this.drawRectKeyConfig.x] * shrinkRatio);
      const y = Math.round(coord[this.drawRectKeyConfig.y] * shrinkRatio);
      const w = Math.round(coord[this.drawRectKeyConfig.width] * shrinkRatio);
      const h = Math.round(coord[this.drawRectKeyConfig.height] * shrinkRatio);
      const bottom = this.wrapOffsetH - y - h;
      const right = this.wrapOffsetW - x - w;
      const strArr = ["top", "right", "bottom", "left"];
      const directArr = [y, right, bottom, x];
      return strArr[directArr.indexOf(Math.max(...directArr))];
    },
    getWrapWH() {
      const $wrap = $("#" + this.uniqId);
      this.wrapOffsetW = $wrap.parent().width();
      this.wrapOffsetH = $wrap.parent().height();
    },
    isDotInRange(dotX, dotY, { x, y, w, h }) {
      const minX = x;
      const maxX = minX + w;
      const minY = y;
      const maxY = minY + h;
      return dotX >= minX && dotX <= maxX && dotY >= minY && dotY <= maxY;
    },
    getRectArea(w, h) {
      return w * h;
    },
    getDotPos(coord) {
      const x = coord[this.drawRectKeyConfig.x];
      const y = coord[this.drawRectKeyConfig.y];
      const w = coord[this.drawRectKeyConfig.width];
      const h = coord[this.drawRectKeyConfig.height];
      return [x, y, w, h];
    },
    getDotStyle(coord, shrinkRatio = 1) {
      const x = coord[this.drawRectKeyConfig.x] * shrinkRatio;
      const y = coord[this.drawRectKeyConfig.y] * shrinkRatio;
      const w = coord[this.drawRectKeyConfig.width] * shrinkRatio;
      const h = coord[this.drawRectKeyConfig.height] * shrinkRatio;
      return {
        left: x + "px",
        top: y + "px",
        width: w + "px",
        height: h + "px",
      };
    },
  },
  created() {},
  mounted() {
    this.uniqId = genID();
    this.$nextTick(() => {
      this.getWrapWH();
    });
  },
};
</script>
<style scoped lang='scss'>
.hover {
  cursor: pointer;
}
.odi-wrap {
  width: 100%;
  height: 100%;
  background:url('~@/static/images/ai/leftBg.png') no-repeat;
  background-size: 100% 100%;
}
.odi {
  position: relative;
  top: 50%;
  left: 50%;
  /* 对比图片 */
  .before-img {
    width: 100%;
    height: 100%;
    // object-fit: cover;
    z-index: 100;
    }
  #after-img {
    position: absolute;
    left: 0;
    top: 0;
    clip: rect(auto, auto, auto, 0px);
    width: 100%;
    height: 100%;
    // object-fit: cover;
    z-index: 101;
  }
  .box-bar {
    width: 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 102;
    opacity: 0.7;
    cursor: all-scroll;
    &:hover {
      cursor: move;
    }
    .round {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #0073eb;
      color: #0073eb;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1 0 auto;
      .left-arrow {
        height: 0;
        width: 0;
        border-width: 6px;
        border-style: inset solid inset inset;
        border-color: rgba(0, 0, 0, 0) #0073eb rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
        border-image: initial;
        margin-right: 10px;
      }
      .right-arrow {
        height: 0;
        width: 0;
        border-width: 6px;
        border-style: inset  inset inset solid;
        border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)  rgba(0, 0, 0, 0) #0073eb;
        border-image: initial;
      }
    }
    .line {
      flex: 0 1 auto;
      height: 100%;
      background-color:  #0073eb;
      width: 2px;
    }
  }
}
.hide {
  visibility: hidden;
}
.layer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.label {
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 9;
  height: 0;
  .line {
    /* height: 2px;
    width: 30px;
    background: #ff8989;
    position: relative;
    &::before,
    &::after {
      content: "";
      display: block;
      position: relative;
    }

    &::before {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #ff8989;
      left: 0;
      top: -1px;
    }

    &::after {
      display: none;
      width: 20px;
      height: 1.5px;
      background: #ff8989;
      left: -17px;
      top: -11px;
      transform: rotate(45deg);
    } */
    width: 68px;
    height: 17px;
    background: url("~@/static/images/ai/dot-line.png") no-repeat;
    background-size: contain;
    transform: rotateY(180deg);
  }
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
  .txt {
    overflow: auto;
    padding: 3px;
    text-align: center;
    position: relative;
    .txt-bor {
      border: 1px solid #4A81FF;
      padding: 3px;
    }
    .txt-inner {
      padding: 3px 10px;
      background: rgba(74,129,255, 0.8);
      color: #fff;
      p {
        font-size: 14px;
        line-height: 30px;
        white-space: nowrap;
      }
    }
  }
}
.label-top {
  transform: rotateX(180deg);
  align-items: flex-end;
  .txt {
    transform: translateY(50%) rotateX(-180deg);
  }
}
.label-right,
.label-bottom {
  align-items: flex-start;
  .txt {
    transform: translateY(-50%);
  }
}
.label-left {
  transform: rotateY(180deg);
  transform-origin: left;
  align-items: flex-start;
  .txt {
    transform: translateY(-50%) rotateY(-180deg);
  }
}
</style>
