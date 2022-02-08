<template>
  <div class="list-sort" v-if="Array.isArray(list) && list.length > 0">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in list"
        class="timeline"
        :key="index"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
      >
        <div class="dot" slot="dot">{{ index + 1 }}</div>
        <div class="g-flex word">
          <p class="word" v-if="typeof item === 'string'">{{ item }}</p>
          <template class="word" v-else-if="typeof item === 'object'">{{
            item.text
          }}</template>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    keyCN: {
      type: Object,
      default: () => ({}),
    },
    dataKey: {
      type: String,
      default: () => "",
    },
    color: {
      type: String,
      default: () => "#0bbd87",
    },
  },
  data() {
    return {
      activity: {
        size: "large",
        type: "primary",
        color: "#4a81ff",
      },
    };
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
/deep/ .el-timeline-item__tail {
  height: 0px;
}
/deep/ .el-timeline-item {
  padding-top: 12px;
  padding-bottom: 0px;
}
.list-sort {
  width: 100%;
  padding-left: 6px;
}
.dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
  right: 4px;
  background-color: #4a81ff;
}
.timeline {
  color: #fff;
  border-left: #fff;
}
.word{
  font-size: 14px;
}
</style>