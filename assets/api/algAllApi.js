/* ai演示页通用逻辑 */

import request from '@/assets/api/request.js'

import {getBlobType} from '@/assets/js/utils.js'
import CryptoJS from '@/assets/js/crypto-js'

function getAesString(data, key, iv) {
  key = CryptoJS.enc.Utf8.parse(key);
  iv = CryptoJS.enc.Utf8.parse(iv);
  let encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  return encrypted.toString(); //返回的是base64格式的密文
}


/* 图像技术接口相关*/
export const cityTypeConfig = {
  strayPets: '1', //通用识别
  garbage: '2', //图像质量
  garbageFull: '3', // 人脸质量
  gathering: '4', // 证件照质量
  jeeves: '5', //车辆识别
  outShop: '6', //文本对齐
  illegalStop: '7', // 人骑车属性分析
  muck: '8', // 宠物属性分析
  firework: '9', // 人脸属性分析
  manhole: '10', // 人脸属性分析
  water: '11', // 人脸属性分析
  environmental: '2,3,13,14,35',
  outlineShop: '12',
  floater: '13',
  fallLeave: '14',
  climbRailings: '15',//攀爬翻越
  trafficAccident: '16', //交通事故
  greenbeltBare: '22',//绿化带破坏
  greenbeltBare:'35',//绿化带破坏
}

export const cityApiUrl = {
  requestCityApi: '/scan/scm',
}

// 识别接口
export const requestCityApi = function ({side = '', type = '', file = null, src = '', cached = null}) {
  if (src) {
    let url = `${cityApiUrl.requestCityApi}` + ',' + 0; // 获取token
    let timer = new Date().getTime(); // 获取当前时间戳
    let mvTime = 'mv-' + timer; //获取带'mv'时间戳
    url = getAesString(url, 'OpenAI@maxvision', mvTime); //加密
    console.log(url);
    console.log(timer);
    return request({
      headers: {
        'Scan-Token': url,
        t: timer
      },
      method: 'post',
      url: `${cityApiUrl.requestCityApi}?side=${side}&type=${type}&url=${src}&cached=${cached}`
    })
  }

  if (!file) return new Promise((resolve, reject) => reject('识别文件不存在！'))
  const formData = new FormData();
  // formData.append('image', file, `blob.${getBlobType(file)}`);
  formData.append('image', file.blob, file.fileName);
  let url = `${cityApiUrl.requestCityApi}` + ',' + 1; // 获取token
  let timer = new Date().getTime(); // 获取当前时间戳
  let mvTime = 'mv-' + timer; //获取带'mv'时间戳
  url = getAesString(url, 'OpenAI@maxvision', mvTime); //加密
  return request({
    method: 'post',
    headers: {
      'Scan-Token': url,
      t: timer
    },
    url: `${cityApiUrl.requestCityApi}?side=${side}&type=${type}`,
    data: formData
  })
}
