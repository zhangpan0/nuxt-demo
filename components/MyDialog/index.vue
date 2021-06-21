<template>
  <div
    :class="['g-bg-color_dialog my-dialog', isShowInner ? 'show' : '']"
    @click="handleMaskClose($event)"
  >
    <div class="my-dialog-main" :class="wrapCls" :id="uniqId">
      <div class="dialog-main-cont">
        <slot name="cont"></slot>
        <div
          class="el-icon-error close-btn"
          v-if="isShowClose"
          @click="handleCloseBtnClick"
        ></div>
        <div class="g-mg-t-sm dialog-main-footer" v-if="isShowFooter">
          <slot name="footer">
            <el-button @click="handleCloseBtnClick">取 消</el-button>
            <el-button type="primary" @click="handleConfirm">确 定</el-button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { genID } from "@/assets/js/utils.js";
/* 基于anime.js */
export default {
  props: {
    closeOnMask: Boolean,
    isCenter: Boolean,
    isShow: Boolean,
    isShowClose: Boolean,
    isShowFooter: Boolean,
    /* contWidth: {
      type: String,
      default: () => '500px'
    },
    contHeight: {
      type: String,
      default: () => '300px'
    } */
  },
  computed: {
    wrapCls() {
      return [this.isCenter ? "my-dialog__center" : ""];
    },
    dialogMainContCls() {
      return [
        this.isShowClose
          ? "dialog-main-cont dialog-main-cont__close"
          : "dialog-main-cont",
      ];
    },
  },
  watch: {
    isShow(newVal) {
      if (!this.isAnimeDone) return; // 动画进行中
      // 不应反向动画
      if (!this.beginReverse) {
        this.isShowInner = true;
        return this.startAnime(this.contWidth, this.contHeight);
      }
      this.endAnime();
    },
  },
  data() {
    return {
      isShowInner: false,
      currentAnime: null,
      isAnimeDone: true, // 动画是否完成
      beginReverse: false, // 是否应该反向动画
      contWidth: -1,
      contHeight: -1,
      uniqId: "",
    };
  },
  methods: {
    init() {
      const $contDom = $("#" + this.uniqId + " .dialog-main-cont");
      const contDom = $contDom.get(0);
      if (contDom) {
        this.contWidth = contDom.offsetWidth;
        this.contHeight = contDom.offsetHeight;
      }
    },
    handleClose() {
      this.$emit("handleClose");
    },
    handleMaskClose(ev) {
      if (!this.isAnimeDone) return;
      if (this.closeOnMask && ev.target === ev.currentTarget) {
        this.handleClose();
      }
    },
    handleCloseBtnClick() {
      this.$emit("handleClose");
    },
    handleConfirm() {
      this.$emit("handleConfirm", () => {
        this.$emit("handleClose");
      });
    },
    startAnime(width = 0, height = 0) {
      if (!this.currentAnime) {
        this.currentAnime = this.anime({
          targets: ".my-dialog-main",
          keyframes: [
            { height, duration: 400 },
            { width, duration: 600 },
          ],
          easing: "easeOutExpo",
          changeBegin: () => {
            this.isAnimeDone = false;
          },
          changeComplete: (anim) => {
            this.isAnimeDone = true;
            if (anim.reversed) {
              this.isShowInner = false;
              this.beginReverse = false;
              this.$emit("handleClose");
            } else {
              this.beginReverse = true;
              $(".dialog-main-cont").css({ visibility: "visible" });
            }
          },
        });
        return;
      }
      this.currentAnime.reverse();
      this.currentAnime.play();
    },
    endAnime() {
      if (!this.isAnimeDone) return;
      $(".dialog-main-cont").css({ visibility: "hidden" });
      this.currentAnime.reverse();
      this.currentAnime.play();
    },
  },
  created() {},
  mounted() {
    this.uniqId = genID();
    this.$nextTick(() => {
      this.init();
    });
  },
};
</script>
<style scoped lang='scss'>
.my-dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -999;
  visibility: hidden;
  &.show {
    z-index: 99;
    visibility: visible;
  }
  .my-dialog-main {
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%, 0);
    width: 2px;
    height: 0;
    overflow: hidden;
    background: #002464;
    .dialog-main-cont {
      visibility: hidden;
      padding: 20px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .dialog-main-cont__close {
      padding-top: 42px;
    }
  }
  .my-dialog__center {
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .close-btn {
    position: absolute;
    right: 6px;
    top: 6px;
    font-size: 26px;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
      transform: rotate(90deg);
    }
  }
  .dialog-main-footer {
    text-align: right;
  }
}
</style>