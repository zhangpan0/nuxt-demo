import request from '@/assets/api/request.js'
import {getBlobType} from '@/assets/js/utils.js'

/* 图像技术接口相关*/

export const imageDetectTypeConfig = {
  basic: 'basicImage', //通用识别
  quality: 'imageQuality', //图像质量
  faceQuality: 'faceQuality', // 人脸质量
  IDPhotoQuality: 'IDPhotoQuality', // 证件照质量
  car: 'carImage', //车辆识别
  align: 'textAlignment', //文本对齐
  xray: 'xRayMachine',//x光识别物体
  follow: 'following',//尾随
  // 属性
  cycling: 'riderAttribute', // 人骑车属性分析
  pet: 'petAttribute', // 宠物属性分析
  face: 'faceAttribute', // 人脸属性分析
  carAttribute: 'carAttribute', // 车辆属性分析
  humanAttribute: 'humanAttribute', //人类体征分析
  facialExpression: 'facialExpression', // 人脸表情分析
  dressCode: 'dressCode',  //工人着装规范
  agePredict: 'agePredict',// 人脸年龄预测
  irisDetect: 'irisDetect',//虹膜检测
  humanSkeleton: 'humanSkeleton',//人体骨架检测
  groundSegment: 'groundSegment', //道路分割
  plamVeinSegment: 'plamVeinSegment',//掌静脉分割
  daytimeTranslation: 'daytimeTranslation',//高清场景时移风格转换
  imageMatting: 'imageMatting',//人像抠图
  imageEnhance: 'imageEnhance',//低光照图片增强
  photo2cartoon: 'photo2cartoon',//人像卡通化
  imageDeblur: 'imageDeblur',//图像去模糊
  pencilSketch: 'pencilSketch',//图像素描
  superResolution: 'superResolution',//图像超分辨率


  // climbRailings:climbRailings
  trafficAccident: '16', //交通事故
  roadsideDrying: '17',//路边晾晒
  largeUmbrella: '18', //违规撑伞
  buildingMaterials: '19', //乱堆物料
  roadCrack: '20',//道路裂缝
  roadSag: '21',//道路凹陷
  greenbeltBare:'35',//绿化带破坏 22=>35
  loessBare: '36',//黄土裸露
  blowdownConnect:'37',//识别垃圾中转站排污管是否连接
  reflectiveVest: '38',//反光衣检测

  greenbeltBare: '35',//绿化带破坏 22=>35
  loessBare: '36',//黄土裸露
  blowdownConnect: '37',//识别垃圾中转站排污管是否连接
  reflectiveVest: '38',//反光衣检测

  //新算法:2022-01-06
  //*表示缺失相应数据
  //√表示已经对接
  fishing: '41',//禁止垂钓 √
  slogan: '42',//检测横幅标语 √
  mask: '43',//检测口罩 *
  glove: '44',//检测手套 *
  advertisement: '45',//检测乱贴广告 √
  landslide: '46',   //检测山体滑坡 √
  electromobile: '47', //检测电瓶车  √
  highclim: '48',  //检测高空攀爬 √
  rat: '49',  //检测老鼠觅食 √
  helmet: '50', //检测安全帽 *
  offlimits: '51',//区域内禁入 *
  sewage: '55',//检测污水排放 √
  highvoltageline_fire: '56',//高压线冒烟起火*
  highvoltageline_foreign: '57' //高压线异物*

}

export const imageKeyCNConfig = {
  color: "色彩",
  limpid: "清晰度",
  bright: "亮度",
  cover: "遮挡",
  font: "正脸度",
  tilt: "倾斜度",
}

export const imageDetectApiUrl = {
  requestImageDetectApi: '/scan/image',
}
export const attrApiUrl = {
  requestAttrApi: '/scan/attribute',
}
export const faceApiUrlConfig = {
  requestFaceApi: '/scan/face',
  requestContrastApi: '/scan/contrast',
}
export const cityApiUrl = {
  requestCityApi: '/scan/scm',
}
export const humanSkeletonRecognitionApi = {
  requestHumanSkeletonRecognitionApi: '/scan/humanSkeletonRecognition',
}
export const ocrApiUrl = {
  requestOcrApi: '/scan/ocr',
}

// 识别接口
export const requestImageDetectApi = function ({side = '', type = '', file = null, src = '', cached = null}) {
  if (src) {
    return request({
      method: 'post',
      url: `${imageDetectApiUrl.requestImageDetectApi}?side=${side}&type=${type}&url=${src}&cached=${cached}`
    })
  }

  if (!file) return new Promise((resolve, reject) => reject('识别文件不存在！'))
  const formData = new FormData();
  // formData.append('image', file, `blob.${getBlobType(file)}`);
  formData.append('image', file.blob, file.fileName);
  return request({
    method: 'post',
    url: `${imageDetectApiUrl.requestImageDetectApi}?side=${side}&type=${type}`,
    data: formData
  })
}

// 识别接口-属性
export const requestAttrApi = function ({side = '', type = '', file = null, src = '', cached = null}) {
  if (src) {
    return request({
      method: 'post',
      url: `${attrApiUrl.requestAttrApi}?side=${side}&type=${type}&url=${src}&cached=${cached}`
    })
  }

  if (!file) return new Promise((resolve, reject) => reject('识别文件不存在！'))
  const formData = new FormData();
  // formData.append('image', file, `blob.${getBlobType(file)}`);
  formData.append('image', file.blob, file.fileName);
  return request({
    method: 'post',
    url: `${attrApiUrl.requestAttrApi}?side=${side}&type=${type}`,
    data: formData
  })
}
// 识别接口-城市
export const requestCityApi = function ({side = '', type = '', file = null, src = '', cached = null}) {
  if (src) {
    return request({
      method: 'post',
      url: `${cityApiUrl.requestCityApi}?side=${side}&type=${type}&url=${src}&cached=${cached}`
    })
  }

  if (!file) return new Promise((resolve, reject) => reject('识别文件不存在！'))
  const formData = new FormData();
  // formData.append('image', file, `blob.${getBlobType(file)}`);
  formData.append('image', file.blob, file.fileName);
  return request({
    method: 'post',
    url: `${cityApiUrl.requestCityApi}?side=${side}&type=${type}`,
    data: formData
  })
}

// 识别接口-虹膜
export const requestFaceApi = function ({side = '', type = '', file = null, src = '', cached = null}) {
  const url = `${faceApiUrlConfig.requestFaceApi}?side=${side}&type=${type}&url=${src}&cached=${cached}`;
  const method = 'post';
  if (src) {
    return request({
      method,
      url
    })
  }
  if (!file) return new Promise((resolve, reject) => reject('识别文件不存在！'));
  const formData = new FormData();
  // formData.append('image', file, `blob.${getBlobType(file)}`);
  formData.append('image', file.blob, file.fileName);
  return request({
    method,
    url,
    data: formData
  })
}

// 识别接口-人体骨架
export const requestHumanSkeletonApi = function ({
                                                   side = '',
                                                   type = '',
                                                   file = null,
                                                   src = '',
                                                   cached = null,
                                                   multiPerson = 1
                                                 }) {
  const url = `${humanSkeletonRecognitionApi.requestHumanSkeletonRecognitionApi}?side=${side}&type=${type}&url=${src}&cached=${cached}&multiPerson=${multiPerson}`;
  const method = 'post';
  if (src) {
    return request({
      method,
      url
    })
  }
  if (!file) return new Promise((resolve, reject) => reject('识别文件不存在！'));
  const formData = new FormData();
  // formData.append('image', file, `blob.${getBlobType(file)}`);
  formData.append('image', file.blob, file.fileName);
  return request({
    method,
    url,
    data: formData
  })
}


