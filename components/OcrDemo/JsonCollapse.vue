<template>
  <div class="json-collapse" :style="wrapStyle">
    <el-collapse
      v-model="activeJsonName"
      accordion
      @change="handleJsonCollapseChange"
    >
      <el-collapse-item title="识别结果" name="1" v-if="isShowOcrJsonResult">
        <div class="collapse-item-wrap ocr-result-data" :style="itemStyle">
          <slot name="result"></slot>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Request" name="2">
        <div class="collapse-item-wrap" :style="itemStyle">
          <slot name="request"></slot>
          <div>
            <div class="req-title">Params</div>
            <p class="req-val">{{ requestConfig.params }}</p>
          </div>
          <div>
            <div class="req-title">{{ requestConfig.method }}</div>
            <p class="req-val">{{ requestConfig.url }}</p>
          </div>
          <div>
            <div class="req-title">Header</div>
            <p class="req-val">{{ requestConfig.header }}</p>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Response" name="3">
        <div class="collapse-item-wrap" :style="itemStyle">
          <!-- <p><nuxt-link to="">查看接口文档 ></nuxt-link></p> -->
          <pre v-html="ocrResponseComputed"></pre>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { jsonToHtml } from "@/assets/js/utils.js";

export default {
  props: {
    // 是否显示折叠面板识别结果
    isShowOcrJsonResult: {
      type: Boolean,
      default: () => false,
    },
    requestConfig: {
      type: Object,
      default: () => ({
        params: "",
        method: "",
        url: "",
        header: "",
      }),
    },
    ocrResponse: {
      type: Object,
      default: () => null,
    },
    itemMaxHeight: {
      type: String,
      default: () => ''
    },
    width: {
      type: String,
      default: () => '100%'
    },
    height: {
      type: String,
      default: () => '100%'
    },
  },
  computed: {
    ocrResponseComputed() {
      return this.ocrResponse ? jsonToHtml(this.ocrResponse) : '';
    },
    wrapStyle() {
      return {
        width: this.width,
        height: this.height,
      }
    },
    itemStyle() {
      return {
        maxHeight: this.itemMaxHeight
      }
    }
  },
  data() {
    return {
      activeJsonName: "1",
    };
  },
  methods: {
    handleJsonCollapseChange(activeNames) {
      if (!activeNames) {
        this.initJsonActiveName();
      }
    },
    // json折叠面板默认激活项
    initJsonActiveName() {
      this.isShowOcrJsonResult
        ? (this.activeJsonName = "1")
        : (this.activeJsonName = "3");
    },
  },
  created() {},
  mounted() {
    this.initJsonActiveName();
  },
};
</script>
<style scoped lang='scss'>
.json-collapse {
  background: #fafafa;
  overflow: hidden;
  /deep/ .el-collapse-item__header,
  /deep/ .el-collapse-item__wrap {
    padding: 10px;
    background: transparent;
  }
  /deep/ .el-collapse-item__header {
    font-size: 16px;
  }
  .collapse-item-wrap {
    max-height: 438px;
    width: 100%;
    overflow: auto;
    a {
      font-size: 12px;
    }
    pre {
      font-size: 14px;
      /deep/ span {
        font-size: 14px;
      }
    }
    .req-title{
      text-align: left;
    }
  }
}
</style>