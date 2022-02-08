import request from '@/assets/api/request.js'

// 查询盛视路由接口列表,带tree
export const requestAIList = function () {
    return request({
        method: 'get',
        url: '/route/api/treeList'

    })
}

/*
算法点赞拉黑
@param {Boolean} algorithmEstimateStatus 1：赞；0：踩
@param {String} algorithmId 算法id
@param {String} userId 用户id
*/
export const requestIsLike = function ({ algorithmEstimateStatus, algorithmId, userId }) {
    const data = {
        algorithmEstimateStatus,
        algorithmId
    }
    return request({
        method: 'post',
        url: '/algorithm/estimate/record/add',
        data
    })
}

/*
根据算法ID查询点赞拉黑数
@param {String} algorithmId 算法id
*/
export const requestPraiseCount = function (algorithmId) {
    return request({
        method: 'get',
        url: '/algorithm/estimate/record/count/' + algorithmId,
    })
}

/*
根据算法ID查询用户是否点赞
@param {String} algorithmId 算法id
*/
export const requestIsPraised = function (algorithmId) {
    return request({
        method: 'get',
        url: '/algorithm/estimate/record/check/' + algorithmId,
    })
}

/*
根据算法ID取消用户点赞或拉踩
@param {String} algorithmId 算法id
*/
export const requestCancelPraise = function ({ algorithmId }) {
    const data = {
        algorithmId
    }
    // console.log(data)

    return request({
        method: 'post',
        url: '/algorithm/estimate/record/cancel',
        data
    })
}

/*
反馈算法的识别结果
@param {String} id 算法id
@param {String} status 结果。0：错误；1：正确
*/
export const checkoutOcr = function ({ id, status }) {
    const data = {
        id, status
    }
    return request({
        method: 'post',
        url: '/alg/record/experience/result',
        data
    })
}

export const getBannerList = () => {
    return request({
        method: 'get',
        url: '/banner/webList',
    })
}
// 首页banner列表

// 样图列表
export function getPicList(algorithmMenuId) {
    // const data = {
    //     algorithmMenuId
    // }
    return request({
        method: 'get',
        url: '/alg/image/listInfo?algorithmMenuId=' + algorithmMenuId,
    })
}
