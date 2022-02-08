import Vue from 'vue'
import * as CommonUI from '@/components/ui-compoments.js'

// import routerPath from '@/assets/js/routerPath.js'
// import { host } from '@/assets/js/constConfig.js'
// import anime from 'animejs'
import { aesEncrypt, aesDecrypt } from './encript.js'
// import _ from 'lodash'
// import { hasVal } from '@/assets/js/utils.js'

// Vue.prototype.routerPath = routerPath;
// Vue.prototype.host = host;
// Vue.prototype.centerWidth = '1200px';
// Vue.prototype.anime = anime;
Vue.prototype.aesEncrypt = aesEncrypt;
Vue.prototype.aesDecrypt = aesDecrypt;
// Vue.prototype.lodash_ = _;
// Vue.prototype.hasVal = hasVal;
// 获取算法信息路由参数
// Vue.prototype.getAiInfo = function () {
//     const aiInfo = aesDecrypt(this.$route.query);
//     if (aiInfo) {
//         const { i, n } = aiInfo;
//         this.$store.commit("setAiId", i);
//         this.$store.commit("setAiName", n);
//     } else {
//         this.$router.push({
//             path: routerPath.home_ai
//         })
//     }
// }


// 注册自定义的公共组件
Object.keys(CommonUI).forEach(key => {
  Vue.component(key,CommonUI[key])
})