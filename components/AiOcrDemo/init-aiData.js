
import * as algAllApi from "@/assets/api/algAllApi.js";  //所有算法配置文件
export const initAiData = {
  data() {
    return {
      propsObj:{
        
      }
    };
  },
  computed:{
    firstNav () {
      return this.$store.state.firstNav;
    }
  },
  methods: {
    initAiData() {
      // console.log('ai22222',this.firstNav.pid,algAllApi);
    },
  },
  watch:{
    firstNav:{
      handler (n,o) {
        this.initAiData();
      }
    }
  }
}