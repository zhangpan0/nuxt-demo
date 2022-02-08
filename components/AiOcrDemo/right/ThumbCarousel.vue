<template>
  <!-- 右侧图片展示swiper -->
  <div>
    <div class="thumb-casousel" v-if="listCompu && listCompu.length > 0">
      <div v-for="(v, i) in listCompu" :key="i" class="item_list">
        <div
          class="img_box"
          :style="`background:url(${v}) no-repeat;background-size: contain;background-position:center;`"
        ></div>
        <ListKeyValue :info="reList[i]" :valKeyConfig="keyCN" dataKey="">
        </ListKeyValue>
      </div>
    </div>
    <div class="thumb-casousel" v-else>
      <div v-for="(v, i) in reList" :key="i">
        <ListKeyValue :info="reList[i]" :valKeyConfig="keyCN" dataKey="">
        </ListKeyValue>
      </div>
    </div>
  </div>
</template>

<script>
import ListKeyValue from "./ListKeyValue.vue";

export default {
  components:{
    ListKeyValue
  },
  props: {
    // 路径数组或含src对象数组
    list: {
      type: Array,
      default: () => [],
    },
    // 数据中文键配置
    keyCN: {
      type: Object,
      default: () => ({}),
    },
    //   [{key:val}]
    info: {
      type: Object | Array,
      default: () => ({}),
    },
    reList: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
  },
  computed: {
    listCompu() {
      this.clearData();
      return this.list || [];
    },
    dataList() {
      return this.reList || [];
    },
  },
  watch: {
    info: {
      handler(newList) {
        // if (newList) {
        //   this.tabs = newList;
        // } else {
        //   this.tabs = [];
        // }
      },
      immediate: true,
      deep: true,
    },
    reList: {
      handler(newList) {
        // if (newList) {
        //   this.tabs = newList;
        // } else {
        //   this.tabs = [];
        // }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      choseIndex: 0,
    };
  },
  methods: {
    clearData() {
      this.choseIndex = 0;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.thumb-casousel {
  scrollbar-width: none;
  overflow: scroll;
  height: 635px;
  height: 98%;
  // max-height: 705px;
  // background: #f8f8f8;
  // border: 1px solid #eeeeee;
  .item_list {
    padding: 8px 0;
    display: flex;
    align-items: center;
    .img_box {
      width: 120px;
      height: 98px;
      margin-right: 10px;
      background-position: center;
    }
  }
}
</style>
