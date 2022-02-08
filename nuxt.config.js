import env from './env' // 环境配置文件


export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '盛视AI开放平台',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: '盛视AI开放平台'
      },
      {
        hid: 'keyswords',
        name: 'keyswords',
        content: '盛视AI开放平台'
      },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/mv-logo-ico.png'
    }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // 'element-ui/lib/theme-chalk/index.css', // 已从babel按需引入加载了
    // 'animate.css/animate.css',
    // 'swiper/dist/css/swiper.min.css',
    // '@/assets/css/font-awesome.min.css',
    '@/assets/css/global.scss',
    // '@/assets/less/animateClass.less',
    // '~assets/css/main.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{
      src: '@/plugins/element-ui',
      ssr: true
    },
    // '@/plugins/router',
    // '@/plugins/minigrid-plugin',
    // '@/plugins/mock-plugin',
    // '@/assets/js/custom-directive.js',
    {
      src: '@/plugins/jquery-plugin',
      ssr: false
    },
    // {src: '@/plugins/three-plugin.js', ssr: false},
    // '@/plugins/three-plugin.js',
    '@/plugins/main.js',
    // '@/plugins/echarts.js',
    // '@/plugins/my-loading.js',
    // {
    //   src: '@/plugins/swiper.js',
    //   ssr: false
    // },
    // { src: '@/plugins/babel-polyfill.js', ssr: true }, // 将es6转换为es5 兼容ie9
    // { src: '@/plugins/utils.js' }, // 将es6转换为es5 兼容ie9
  ],

  // 自定义加载中
  // loading: '@/components/loading.vue',

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv'
  ],
  env: {
    BASE_API: env[process.env.NODE_ENV_FLAG].BASE_API,
    NODE_ENV: env[process.env.NODE_ENV_FLAG].NODE_ENV,
    API_URL_BROWSER: env[process.env.NODE_ENV_FLAG].API_URL_BROWSER,
    API_IMG_URL: env[process.env.NODE_ENV_FLAG].API_IMG_URL,
    EXTERNAL_LINK_URL: env[process.env.NODE_ENV_FLAG].EXTERNAL_LINK_URL
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    // vendor: ["axios"],
    filename: {
      video: ({
        isDev
      }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]',
      css: ({
        isDev
      }) => isDev ? '[name].css' : 'css/[contenthash:7].css',
      img: ({
        isDev
      }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
    },
    // vendor:['element-ui'],
    babel: {
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ],
    },
    analyze: false,
    productionSourceMap: false,
    productionGzip: true,
    maxChunkSize: 300000,
    productionGzipExtensions: ['js', 'css', 'svg'],
    postcss: {
      preset: {
        autoprefixer: {
          // grid: true
        }
      }
    },
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   const vueLoader = config.module.rules.find((loader) => loader.loader === 'vue-loader');
    //  /* 把audio标签在编译时转成src属性 */
    //   vueLoader.options.transformToRequire = {
    //     audio: 'src'
    //   };
    //   config.module.rules.push({
    //     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    //     loader: 'url-loader',
    //     options: {
    //       limit: 10000,
    //       name: 'videos/[name].[hash:7].[ext]'

    //     }
    //   });
    // }
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000
    }
  },
  cache: true,
  uglifyOptions: {
    compress: true
  },
  parallel: true,
  hardSource: true,
  resourceHints:true,
  server:{
    host: "0.0.0.0",
    port: 1919
  },
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/open', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/open': {
      target: env[process.env.NODE_ENV_FLAG].API_URL_BROWSER,
      // target: 'http://192.168.103.31',
      changeOrigin: true,
      pathRewrite: {
        '^/open': ''
      }
    }
  },
}
