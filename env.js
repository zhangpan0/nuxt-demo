/* 环境变量配置 */
module.exports = {
  // 开发环境
  dev: {
    NODE_ENV: 'development',
    // API_URL_BROWSER: 'https://ai.maxvision.com.cn', //域名地址
    // API_URL_BROWSER: 'http://192.168.103.135',     //域名地址

    // API_URL_BROWSER: 'http://192.168.103.135:8082',            //API地址
    // BASE_API: 'http://192.168.103.135:8082',
    // BASE_API: 'https://ai.maxvision.com.cn/open', //API地址
    // API_IMG_URL: 'https://file.maxvision.cn',

    // API_URL_BROWSER: 'http://192.168.30.103:8082',
    // BASE_API: 'http://192.168.30.103:8082/',
    // API_IMG_URL: 'http://192.168.103.227:9000'
    API_URL_BROWSER: 'https://ai.maxvision.com.cn',
    BASE_API: 'https://ai.maxvision.com.cn/open', //API地址
    API_IMG_URL: 'https://file.maxvision.cn'
  },
  // 测试环境
  test: {
    NODE_ENV: 'test',
    API_URL_BROWSER: 'http://192.168.103.227:82',
    BASE_API: 'http://192.168.103.227:82/open', //API地址
    API_IMG_URL: 'http://192.168.103.227:9000'
  },
  // 生产环境
  prod: {
    NODE_ENV: 'production',
    API_URL_BROWSER: 'https://ai.maxvision.com.cn',
    BASE_API: 'https://ai.maxvision.com.cn/open', //API地址
    API_IMG_URL: 'https://file.maxvision.cn'
  }
}
