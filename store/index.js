import Cookies from "js-cookie";
import fa from "element-ui/src/locale/lang/fa";

export default {
  state() {
    return {
      aiList: null,  // 算法树形菜单
      firstNav: {},  // ,默认第一个算法
      carouselActiveIndex: 0,  // 首页banner索引
      aiId: '',
      aiName: '',
      ocrId: 0,
      intro: '',
      orderCartList: [],
      productPriceList: [],
    }
  },
  mutations: {
    setAiList(state, list) {
      state.aiList = list;
    },
    setFirstNav(state, data) {
      state.firstNav = data;
      Cookies.set('firstNav',JSON.stringify(data));
    },
    setCarouselIndex(state, data) {
      state.carouselActiveIndex = data;
    },
    setAiId(state, id) {
      state.aiId = id;
    },
    setOcrId(state, id) {
      state.ocrId = id;
    },
    setAiName(state, name) {
      state.aiName = name;
    },
    setIntro(state, data) {
      state.intro = data;
    },
    orderCartList(state, data) {
      state.orderCartList = data;
    },
    isDisableStore(state, data) {
      state.productPriceList = data
    },
  }
}
