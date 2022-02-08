import routerPath from '@/assets/js/routerPath.js'
import { idcardListModule, idcardBackListModule } from '@/assets/js/apis/mockModule/ocr/idcard.js'
import { basicListModule } from '@/assets/js/apis/mockModule/ocr/basic.js'
import { bankcardListModule } from '@/assets/js/apis/mockModule/ocr/bankcard.js'
import { drivingLicenseListModule } from '@/assets/js/apis/mockModule/ocr/drivingLicense.js'
import { vehicleLicenseListModule } from '@/assets/js/apis/mockModule/ocr/vehicleLicense.js'
import { plateLicenseListModule } from '@/assets/js/apis/mockModule/ocr/plateLicense.js'
import { businessLicenseListModule } from '@/assets/js/apis/mockModule/ocr/businessLicense.js'
import { impressionListModule } from '@/assets/js/apis/mockModule/ocr/impression.js'
import { entryStampListModule } from '@/assets/js/apis/mockModule/ocr/entryStamp.js'
import { containerListModule } from '@/assets/js/apis/mockModule/ocr/container.js'
import { textalignListModule } from '@/assets/js/apis/mockModule/ocr/textalign.js'
import { passportListModule } from '@/assets/js/apis/mockModule/ocr/passport.js'

import { basicListModuleImage } from '@/assets/js/apis/mockModule/img-tech/basic.js'
import { qualityListModuleImage } from '@/assets/js/apis/mockModule/img-tech/quality.js'
import { qualityCredentialListModuleImage } from '@/assets/js/apis/mockModule/img-tech/quality_credential.js'
import { carListModuleImage } from '@/assets/js/apis/mockModule/img-tech/car.js'
import { alignListModuleImage } from '@/assets/js/apis/mockModule/img-tech/align.js'
import { censorListModuleImage } from '@/assets/js/apis/mockModule/img-tech/censor.js'
import { cyclingListModuleImage } from '@/assets/js/apis/mockModule/img-tech/cycling.js'

import { detectListModuleFace } from '@/assets/js/apis/mockModule/face-tech/detect.js'
import { keypointListModuleFace } from '@/assets/js/apis/mockModule/face-tech/keypoint.js'
import { contrastListModuleFace } from '@/assets/js/apis/mockModule/face-tech/compare.js'

import { basicListModuleBody } from '@/assets/js/apis/mockModule/body-tech/basic.js'
import { repeatListModuleBody } from '@/assets/js/apis/mockModule/body-tech/repeat.js'

/* ocr mock data */
export const usetypesList = [
  {
    id: 1,
    title: '云端服务',
    desc: '提供各类文字识别的云端服务接口，用户可直接调用API或使用SDK对图片中的文字进行识别',
    linkText: 'API文档',
    url: '#'
  },
  {
    id: 2,
    title: '离线识别SDK',
    desc: '集成到移动设备中（Android、iOS)，无需网络即可实现身份证、银行卡扫描识别功能',
    linkText: '合作咨询',
    url: '#'
  },
  {
    id: 3,
    title: '私有化部署',
    desc: '部署至客户本地服务器，在客户内网中实现文字识别功能，保障数据私密性，提供一体机和软件部署包两种私有化方案',
    linkText: '立即申请',
    url: '#'
  },
]

export const productList = [
  {
    src: "https://ai.bdstatic.com/file/DDDE1D0E284E4178864E790F8D2EF345",
    title: "身份证识别",
    desc: "对二代居民身份证正反面所有8个字段进行结构化识别",
    url: routerPath.ocr_idcard
  },
  {
    src: "https://ai.bdstatic.com/file/FA3243BDF76F419CA451F31744D62E69",
    title: "银行卡识别",
    desc: "对银行卡的卡号、有效期、发卡行、卡片类型进行结构化识别",
  },
  {
    src: "https://ai.bdstatic.com/file/0D8EC21F50DA46C5BCB0F4F7CBB58975",
    title: "营业执照识别",
    desc: "对营业执照的注册号、社会信用代码、单位名称、法人、地址、有效期进行结构化识别",
  },
  {
    src: "https://ai.bdstatic.com/file/CBB3692CC1D04A7AA455A01DFF443C35",
    title: "护照识别",
    desc: "对中国大陆护照个人资料页所有10个字段进行结构化识别",
  },
]

export const applyNav = [
  {
    name: "远程身份认证",
    cont: {
      title: "远程身份认证",
      desc:
        "结合OCR和人脸识别技术，实现对用户身份证件信息的自动识别和录入，同时通过人脸核身解决方案进行人脸识别和活体检测，完成用户身份验证，应用于金融保险、社保、电商、O2O等行业，有效降低用户输入成本，控制业务风险",
      src:
        "https://ai.bdstatic.com/file/73AC8D6E4987412C9A8DE8163BBF661A",
    },
  },
  {
    name: "金融服务",
    cont: {
      title: "金融服务",
      desc:
        "结合多种卡证识别技术，实现对银行卡、个人信息及企业信息的自动识别和录入，应用于金融场景中的支付绑卡、银行开户、贷款、征信评估等服务，有效降低用户输入成本，大幅度提升用户使用体验",
      src:
        "https://ai.bdstatic.com/file/00CB26DFCC6543FA97DF0FB9F1C63CE5",
    },
  },
  {
    name: "出境旅游、留学",
    cont: {
      title: "出境旅游、留学",
      desc:
        "结合多种卡证识别技术，实现对护照、港澳通行证、台湾通行证等境外常用卡证信息的自动识别和录入，应用于境外旅游产品预定、个人信息登记等场景，有效提升信息录入效率，降低用户输入成本，提升用户使用体验",
      src:
        "https://ai.bdstatic.com/file/08E047D5297946B8A507007515B484A6",
    },
  },
]

export const specialList = [
  {
    title: "种类齐全",
    desc:
      "覆盖所有常用卡片证照类型，能够满足身份认证、金融开户、征信评估、平台商户入驻等高频场景的使用需求",
    src: "https://ai.bdstatic.com/file/D9530E1F06D949E9974E8F6F10C5830C",
  },
  {
    title: "技术领先",
    desc:
      "算法识别准确率高达99%，并提供身份证风险检测、端上质量校验等特色功能，让业务更安全",
    src: "https://ai.bdstatic.com/file/8AE057E68F6F4847978FE4302CDF9B33",
  },
  {
    title: "服务稳定",
    desc:
      "提供高可靠性、弹性可伸缩、高并发承载的文字识别服务，云端服务可用性高达99.99%",
    src: "https://ai.bdstatic.com/file/B6455688C31845D3B4DC3CA7B02D68E5",
  },
]

export const introList = [
  {
    title: "全字段识别",
    desc:
      "覆盖所有常用卡片证照类型，能够满足身份认证、金融开户、征信评估、平台商户入驻等高频场景的使用需求",
    src: "https://ai.bdstatic.com/file/B3C807556DC74823B43EB4FC15C7FD98",
  },
  {
    title: "证件风险检测",
    desc:
      "检测上传的图片是否为身份证复印件、临时身份证、屏幕翻拍身份证或被PS过的身份证，并返回对应的风险类型",
    src: "https://ai.bdstatic.com/file/0740EAB8B65F4E45864E05BB8D5C6333",
  },
  {
    title: "端上质量校验",
    desc:
      "提供移动端SDK，使用时可实时检测取景框中是否包含身份证，是否存在模糊、欠/过曝等情况，并提示用户矫正，提高图片采集质量，提升识别准确率",
    src: "https://ai.bdstatic.com/file/FA0016672AD64AE9B647356ECFE05791",
  },
]

// 产品价格列表
export const priceList = [
  {
    title: '预付费次数包',
    subTitle: '适用于调用量可预估的企业/个人',
    introList: [
      {
        title: '免费调用量',
        desc: '500次/天'
      },
      {
        title: '有效期',
        desc: '12个月'
      },
      {
        title: '并发配置',
        desc: '10 QPS'
      },
      {
        title: '售后响应',
        desc: '5工作日内'
      },
    ],
    linkList: [],
    costSelect: [
      {
        label: '1万次',
        value: '200'
      },
      {
        label: '5万次',
        value: '950'
      },
      {
        label: '10万次',
        value: '1700'
      },
      {
        label: '20万次',
        value: '3000'
      },
    ],
    costUnit: '元',
    btnConfig: {
      type: 'primary',
      url: '',
      label: '立即购买'
    }
  },
  {
    title: '按量后付费',
    subTitle: '适用于需灵活付费的企业/个人',
    introList: [
      {
        title: '免费调用量',
        desc: '500次/天'
      },
      {
        title: '付费调用量',
        desc: '无限'
      },
      {
        title: '并发配置',
        desc: '10 QPS'
      },
      {
        title: '售后响应',
        desc: '7 * 24小时'
      },
    ],
    linkList: [],
    costSelect: [
      {
        label: '价格',
        value: '9-20'
      }
    ],
    costUnit: '元/千次',
    btnConfig: {
      type: 'primary',
      url: '',
      label: '开通付费'
    }
  },
  {
    title: '定制版',
    subTitle: '适用于需要特殊合作模式的大客户',
    introList: [
      {
        title: '享受特殊大客户价格',
        desc: ''
      },
      {
        title: '购买更高QPS',
        desc: ''
      },
      {
        title: '购买离线SDK',
        desc: ''
      }
    ],
    linkList: [],
    costSelect: [
      {
        label: '离线SDK',
        value: '10W +'
      },
      {
        label: '私有化部署',
        value: '8W +'
      }
    ],
    costUnit: '元',
    btnConfig: {
      type: 'primary',
      url: '',
      label: '合作咨询'
    }
  },
  {
    title: '价格说明',
    subTitle: '本产品开通即享免费调用量，使用完毕后可选择次数包预付费或按量后付费两种计费方式，产生的计费调用量优先抵扣次数包额度，超出部分按量阶梯计费',
    introList: [],
    linkList: [
      {
        label: '价格文档',
        url: ''
      }
    ],
    costSelect: [],
    costUnit: '',
    btnConfig: {
      type: 'ghost',
      url: '',
      label: '价格计算器'
    }
  },
]

// 身份证识别-正面样图
export const idcardList = idcardListModule;
// 身份证识别-国徽面样图
export const idcardBackList = idcardBackListModule;
// 通用文字识别样图
export const ocrBasicList = basicListModule;
// 银行卡识别样图
export const ocrSamplesBankCard = bankcardListModule;
// 驾驶证识别样图
export const ocrSamplesDrivingLicense = drivingLicenseListModule;
// 行驶证识别样图
export const ocrSamplesVehicleLicense = vehicleLicenseListModule;
// 车牌识别样图
export const ocrSamplesPlateLicense = plateLicenseListModule;
// 营业执照识别样图
export const ocrSamplesBusinessLicense = businessLicenseListModule;
// 印模识别样图
export const ocrSamplesImpression = impressionListModule;
// 验讫章识别样图
export const ocrSamplesEntryStamp = entryStampListModule;
// 集装箱识别样图
export const ocrSamplesContainer = containerListModule;
// 文本对齐样图
export const ocrSamplesTextalign = textalignListModule;
// 通用票据识别样图
export const ocrSamplesReceipt = [
  {
    src: 'https://ai.bdstatic.com/file/9F55F146FB39417AB7D12168550BB2CA'
  },
  {
    src: 'https://ai.bdstatic.com/file/9E9B92945904429A960D4DD531024C8A'
  },
  {
    src: 'https://ai.bdstatic.com/file/29A55B6128FA42E2918359A1A1161AA3'
  },
]
// 护照识别样图
export const ocrSamplesPassport = passportListModule;

// 图像技术-通用
export const imageDetectBasicSamples = basicListModuleImage;
// 图像技术-质量检测
export const imageDetectQualitySamples = qualityListModuleImage;
// 图像技术-证件照质量检测
export const credentialImageDetectQualitySamples = qualityCredentialListModuleImage;

// 图像技术-汽车识别
export const imageDetectCarSamples = carListModuleImage;
// 图像技术-图像对齐
export const imageDetectAlignSamples = alignListModuleImage;
// 图像技术-图像审核
export const imageDetectCensorSamples = censorListModuleImage;
export const samplesCycling = cyclingListModuleImage;

// 人脸检测样图
export const samplesFace = detectListModuleFace;
// 人脸关键点样图
export const samplesFaceKeypoint = keypointListModuleFace;
// 人脸比对样图
export const samplesFaceContrast = contrastListModuleFace;

// 人体识别样图
export const samplesBodyBasic = basicListModuleBody;
// 行人重识别样图
export const samplesBodyRepeat = repeatListModuleBody;

export const samplesTextcensor = [
  '13mknfokg12ahrsoevw26',
  '你也滚蛋！跟你很熟吗？起个这ID来恶心人？',
  '谁有毒品卖啊，大约多少钱一克',
  '你是不是练法轮功的',
  '☞cherry.然然♛☜ 你被移出了群@☞cherry.然然♛☜ 骗你的😁😁😁😁 ',
  '几个点提一下【配套齐全】，咨询.1.4.7～0.0.0.6～6.3.7.2。'
]

// AI服务列表导航
export const allAIs = [
  {
    title: "OCR文字识别",
    list: [
      {
        title: "护照识别",
        url: routerPath.ocr_passport,
        isPublic: true,
      },
      {
        title: "通用文字识别",
        url: routerPath.ocr_basic,
        isPublic: true,
      },
      /* 出入境证件识别 */
      {
        title: "身份证识别",
        url: routerPath.ocr_idcard,
        isPublic: true,
      },
      /* {
        title: "银行卡识别",
        url: routerPath.ocr_bankcard,
        isPublic: true,
      }, */
      {
        title: "驾驶证识别",
        url: routerPath.ocr_drivingLicense,
        isPublic: true,
      },
      {
        title: "行驶证识别",
        url: routerPath.ocr_vehicleLicense,
        isPublic: true,
      },
      {
        title: "印模识别",
        url: routerPath.ocr_impression,
        isPublic: true,
      },
      {
        title: "验讫章识别",
        url: routerPath.ocr_entryStamp,
        isPublic: true,
      },
      {
        title: "车牌识别",
        url: routerPath.ocr_plateLicense,
        isPublic: true,
      },
      {
        title: "集装箱识别",
        url: routerPath.ocr_container,
        isPublic: true,
      },
      /* {
        title: "营业执照识别",
        url: routerPath.ocr_businessLicense,
        isPublic: true,
      }, */
      /* {
        title: "通用票据识别",
        url: routerPath.ocr_receipt,
        isPublic: true,
      }, */
      /* {
        title: "文本对齐",
        url: routerPath.ocr_textalign,
        isPublic: true,
      }, */
      /* {
        title: "证件类型识别",
        url: routerPath.image_credential_type,
        isPublic: true,
      }, */
    ],
  },
  {
    title: "人脸及人体技术",
    list: [
      {
        title: "人脸检测",
        url: routerPath.face_detect,
        isPublic: true,
      },
      /* {
        title: "人脸质量检测",
        url: routerPath.face_quality,
      }, */
      {
        title: "人脸比对",
        url: routerPath.face_contrast,
        isPublic: true,
      },
      {
        title: "人脸马赛克",
        url: routerPath.face_mosaic,
        isPublic: true,
      },
      {
        title: "人脸关键点检测",
        url: routerPath.face_keypoint,
        isPublic: true,
      },
      {
        title: "人体识别",
        url: routerPath.body_basic,
        isPublic: true,
      },
    ],
  },
  {
    title: "图像技术",
    list: [
      {
        title: "通用目标检测",
        url: routerPath.image_basic,
        isPublic: true,
      },
      {
        title: "车辆识别",
        url: routerPath.image_car,
        isPublic: true,
      },
      {
        title: "图像质量检测",
        url: routerPath.image_quality,
        isPublic: true,
      },
      /* {
        title: "证件照质量检测",
        url: routerPath.image_quality_credential,
        isPublic: true,
      }, */
      /* 图像对齐 */
      {
        title: "图像审核",
        url: routerPath.image_censor,
        isPublic: true,
      },
    ],
  },
  {
    title: "语言处理",
    list: [
      {
        title: "文本审核",
        url: routerPath.lang_textcensor,
        isPublic: true,
      },
    ],
  }
]