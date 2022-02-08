<template>
  <div>
    <LoadingBox v-if="loading"></LoadingBox>
    <div v-else class="container">
      <div class="container-wrapper">
        <ComHeader ></ComHeader>
        <div class="container-cont">
          <nuxt-child></nuxt-child>
        </div>
        <ComFooter></ComFooter>
      </div>
    </div>
  </div>
</template>

<script>
import ComHeader from "@/components/ComHeader/index";
import ComFooter from "@/components/ComFooter/index";
import LoadingBox from "@/components/LoadingBox/index";
import {requestAIList} from "@/assets/api/index.js";
export default {
  data() {
    return {
      loading: false,
    };
  },
  async asyncData({app, params, store, route}) {
    try {
      const allAIs = store.state.aiList
        ? store.state.aiList
        : await requestAIList();
      if (!store.state.aiList) {
        // 防止刷新算法头部信息改变 获取第一个显示的算法信息
        store.commit("setAiList", allAIs);  // 存放菜单列表
        // console.log(allAIs)
      }
      return {allAIs}
    } catch (err) {
      console.log(err,'err');
    }
  },
  components:{
    ComHeader,
    ComFooter,
    LoadingBox
  },
  methods:{
    
  },
  mounted () {
    this.loading = false;
  },
};
</script>

<style scoped lang="scss">
.container {
  .container-wrapper {
    display: flex;
    flex-direction: column;
  }
  .container-cont {
    width: 100%;
    min-width: 1200px;
    min-height: calc(100vh - 72px);
  }
}

</style>
