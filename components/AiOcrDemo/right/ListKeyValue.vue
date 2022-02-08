<template>
  <table class="list-key-value" v-show="infoKeys.length > 0">
    <thead v-if="showHead">
      <th>
        <td class="kv-head" v-for="(hk, hkidx) in headKeyConfig" :key="hkidx">{{hk}}</td>
      </th>
    </thead>
    <tbody>
      <template v-for="(k, idx) in dataKeys">
        <tr :key="`ls${idx}`" v-if="hasData(info, k, dataKey)">
          <td class="kv-title">{{ sort ? Number(idx) + 1 : valKeyConfig[k] }}</td>
          <td class="kv-val">{{ typeof info[k] === "object" ? info[k][dataKey] : info[k] }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    //   [{key:val}]
    info: {
      type: Object | Array,
      default: () => ({}),
    },
    // [String]
    headKeyConfig: {
      type: Array,
      default: () => [],
    },
    // 数据中文键配置
    valKeyConfig: {
      type: Object,
      default: () => ({}),
    },
    dataKey: String,
    showHead: Boolean,
    sort: Boolean,
  },
  computed: {
    dataKeys() {
      if (!this.valKeyConfig) return [];
      return Object.keys(this.valKeyConfig);
    },
    infoKeys() {
      if (!this.info) return [];
      return Object.keys(this.info);
    },
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    hasData(info, firstKey, secondKey) {
      // console.log(info, firstKey, secondKey, info[firstKey]);
      if (this.sort) return true;
      if (!info || typeof info !== "object") return false;
      if (info[firstKey] == null || info[firstKey] == "") {
        return (info[firstKey] = "无");
      }
      if (typeof info[firstKey] === "object") {
        return (
          info[firstKey][secondKey] || info[firstKey][secondKey] !== "null"
        );
      } else {
        return info[firstKey] || "无";
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang='scss'>
.list-key-value {
  display: block;

  td {
    font-size: 14px;
    line-height: 30px;
    color: #858585;
    //border: 1px solid red ;
  }

  .kv-title {
    text-align: left;
    white-space: nowrap;
    margin-right: 20px;
    display: block;
  }

  .kv-val {
    color: #242527;
  }
}
</style>
