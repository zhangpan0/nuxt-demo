import request from '@/assets/api/request.js'

// 查询算法关联套餐接口

export const getAlgSetMeal = function (query) {
  return request({
    method: 'get',
    url: `/setmeal/algorithm/detail/list/${query}`
  })
}

// 新增免费订单接口
export const addAlgorithmOrderInfoFree = function (data) {
  return request({
    method: 'post',
    url: '/algorithmorder/info/addAlgorithmOrderInfoFree',
    isUseToken: true,
    data
  })
}

// 新增订单
export const addAlgorithmOrderInfo = function (data) {
  return request({
    method: 'post',
    url: '/algorithmorder/info/addAlgorithmOrderInfo',
    isUseToken: true,
    data
  })
}

// 查询订单
export const getAlgorithmOrderInfo = function (query) {
  return request({
    method: 'get',
    url: `/algorithmorder/info/getInfo/${query}`,
    isUseToken: true,
  })
}

//获取余额
export const getUserWalletInfo = function () {
  return request({
    method: 'get',
    url: '/userwallet/info/getUserWalletInfo',
    isUseToken: true,
  })
}

// 新增算法订单购物车
export const addOrderCartList = function (data) {
  return request({
    method: 'post',
    url: '/algorithmorder/cart/addOrderCartList',
    isUseToken: true,
    data
  })
}
// 查询算法订单购物车列表
export const getOrderCartList = function () {
  return request({
    method: 'get',
    url: '/algorithmorder/cart/getInfo',
    isUseToken: true,
  })
}

// 钱包支付
export const payUserWallet = function (data) {
  return request({
    method: 'post',
    url: `/userwallet/info/payUserWallet/${data}`,
    isUseToken: true
  })
}

// 在线支付
export const payOnlineId = function (data) {
  return request({
    method: 'post',
    url: `/algorithmorder/info/pay/${data}`,
    isUseToken: true
  })
}
