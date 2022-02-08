import axios from 'axios'
import qs from 'qs' // 引入qs模块，用来序列化post类型的数据，后面会提到

const service = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? host + '' : host,
    baseURL: process.env.BASE_API,
    timeout: 30000
});
export const cancelArr = [];

// 请求拦截器
service.interceptors.request.use((config) => {
    //发送请求之前的操作
    // config.defaults.headers.common['Authorization'] = AUTH_TOKEN; //携带token
    // 请求发出时，添加到cancelArr中
    config.cancelToken = new axios.CancelToken(cancel => {
        cancelArr.push(cancel)
    })
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
}, (err) => {
    console.log(err);
    //对请求错误的操作
    return Promise.reject(err);
});

// 响应拦截器
service.interceptors.response.use(response => {
    const { status, data } = response
    if (status === 200 && data.code === 200) {
        return data.data || data
    }
    return new Promise((resolve, reject) => reject(data))
}, err => {
    if (axios.isCancel(err)) {
        // 中断promise链接
        return new Promise(() => { })
    }
    return Promise.reject(err)
})

export default service