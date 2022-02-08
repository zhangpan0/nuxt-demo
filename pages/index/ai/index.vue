<!-- 算法能力页面 -->
<template>
  <section>
    <AiMain ref="aiMain">
      <AiOcrDemo
      ></AiOcrDemo>
    </AiMain>
  </section>
</template>

<script>
import Cookies from "js-cookie";

export default {  
  methods: {
    // 首次进来和刷新页面缓存当前选中算法信息
    saveCurrentAi () {
      let squareActive = this.$route.query.squareActive;
      if (squareActive !== undefined) {
        let hasFirstNav = Cookies.get('firstNav'); // 是否保存过选中的算法菜单
        if (hasFirstNav) {
          console.log(11111111,JSON.parse(hasFirstNav));
          this.$store.commit("setFirstNav", JSON.parse(hasFirstNav));  // 默认第一个显示的算法菜单
        }else {
          // 默认跳到第一个算法路由参数
          let firstNavSecond = this.aiList[0].children?.[0] || {}; // 一共有三级菜单,此处是二级
          let firstNavThird = firstNavSecond.children?.[0] || {};  // 此处是三级菜单
          let currentAi = {
            title: firstNavThird.title,
            desc: firstNavThird.description,
            id: firstNavThird.id,
            bgUrl: firstNavSecond.backgroupImageUrl ?  process.env.API_IMG_URL + firstNavSecond.backgroupImageUrl : '', // 此处显示场景背景图此处是二级
            pid:firstNavSecond.pid,
            name:firstNavThird.name
          };
          // TODO: 后期会默认显示第一个场景算法(就是二级菜单的第一个)
          let query = {
            ...this.aesEncrypt({
              i: currentAi.id,
              n: currentAi.title
            }),
            ...{
              squareActive: 0,
              pid:currentAi.pid,
              name:currentAi.name
            }
          }
          this.$router.push({
            path: '/ai',
            query,
          });
          this.$store.commit("setFirstNav", currentAi);  // 默认第一个显示的算法菜单
        }
        // 根据算法菜单获取套餐列表
        this.$refs.aiMain.$refs.ProductPrice.getAlgSetMeal();
      }
    }
    // 处理各种算法显示的类型
  },
  computed:{
    aiList () {
      return this.$store.state.aiList;
    },
  },
  watch:{
    
  },
  mounted() {
    this.saveCurrentAi();
  },
}
</script>

<style lang='scss' scoped>
</style>