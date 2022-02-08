import { getObjKeys, filterObjByKey, clearStorage } from "@/assets/js/utils.js";

/* 功能演示mixin */
export default {
    data() {
        return {
            compareList: [],
            showCompareCompo: false, // 显示隐藏算法对比组件
            // 识别数据结果key
            ocrResultKeys: [],
            baiduResultKeys: [],
            tencentResultKeys: [],
            // 返回结果-盛视
            ocrResultData: null,
            // 返回结果-百度
            jsonBaidu: null,
            // 返回结果-腾讯
            jsonTencent: null,
            returnTimes: [], // 算法时间数组
            maxvisionResultKey: '', // 获取盛视数据的key，自定义
            baiduResultKey: '', // 获取百度数据的key，自定义
            tencentResultKey: '', // 获取腾讯数据的key，自定义
            maxvisionDataKey: 'data', // 盛视数据子对象key
            baiduDataKey: 'words', // 百度数据子对象key
            tencentDataKey: 'DetectedText', // 腾讯数据子对象key
            drewImageDom: null,
            // 错误信息
            maxvisionErrorInfo: '',
            baiduErrorInfo: '',
            tencentErrorInfo: '',
            // 提示信息
            maxvisionTipInfo: '',
            baiduTipInfo: '',
            tencentTipInfo: '',
            tabsToggleReset: false, // 数据展示标签状态切换重置
            //算法id
            ocrId: ''
        }
    },
    methods: {
        // 识别成功回调
        handleOcrSuccess({ id, shengshiResult, baiduResult, tencentResult, drewImageDom, drawLineFrameCbk, drawCanvasRectCbk, clipImagesCbk }) {
            // 各接口是否有返回数据 [盛视，百度，腾讯]
            const hasResults = [false, false, false];
            const tempReturnTimes = [];
            if (id) {
                this.$store.commit("setOcrId", id);
            }
            if (shengshiResult) {
                hasResults[0] = true;
                tempReturnTimes.push({
                    label: '盛视',
                    time: shengshiResult.castTime || 0
                });
                this.ocrResultData = filterObjByKey(shengshiResult, this.maxvisionResultKey);
                this.ocrResultKeys = getObjKeys(this.maxvisionKeyCN);

                if (this.isError(shengshiResult)) {
                    this.maxvisionErrorInfo = shengshiResult.error_msg || shengshiResult.msg || shengshiResult.errorMsg;
                    if (shengshiResult.data && shengshiResult.data.length == 0) {
                        this.maxvisionErrorInfo = '暂无识别数据'
                    }
                    // console.log("error", this.maxvisionErrorInfo)

                } else if (this.isTip(shengshiResult, this.maxvisionResultKey)) {
                    this.maxvisionTipInfo = shengshiResult.msg || shengshiResult.errorMsg || shengshiResult.error_msg;
                    // console.log('this.maxvisionTipInfo',this.maxvisionTipInfo);
                    if (shengshiResult.data && shengshiResult.data.length == 0) {
                        this.maxvisionTipInfo = '暂无识别数据'
                    }
                }
            }
            if (baiduResult) {
                hasResults[1] = true;
                tempReturnTimes.push({
                    label: '百度',
                    time: baiduResult.castTime
                });
                this.jsonBaidu = filterObjByKey(baiduResult, this.baiduResultKey);
                this.baiduResultKeys = getObjKeys(this.baiduKeyCN);
                this.baiduErrorInfo = baiduResult.error_msg || baiduResult.errorMsg;
                this.baiduTipInfo = this.baiduErrorInfo;
            }
            if (tencentResult) {
                hasResults[2] = true;
                tempReturnTimes.push({
                    label: '腾讯',
                    time: tencentResult.castTime
                });
                this.jsonTencent = filterObjByKey(tencentResult, this.tencentResultKey);
                this.tencentResultKeys = getObjKeys(this.tencentKeyCN);
                this.tencentErrorInfo = tencentResult.error_msg || tencentResult.errorMsg;
                this.tencentTipInfo = this.tencentErrorInfo;
            }
            this.returnTimes = tempReturnTimes;
            this.drewImageDom = drewImageDom; // canvas绘制的图片节点
            // 数据处理
            // if (typeof this.dataOcrId === 'function') this.dataOcrId(this.ocrId)
            if (typeof this.dataProcessMaxvision === 'function') this.dataProcessMaxvision(this.ocrResultData)
            if (typeof this.dataProcessBaidu === 'function') this.dataProcessBaidu(this.jsonBaidu)
            if (typeof this.dataProcessTencent === 'function') this.dataProcessTencent(this.jsonTencent)
            // 裁剪图像
            if (typeof this.handleClipImagesCbk === 'function') this.handleClipImagesCbk(clipImagesCbk);
            // 画线框
            if (typeof this.handleDrawLineFrameCbk === 'function') this.handleDrawLineFrameCbk(drawLineFrameCbk);
            // 画矩形
            if (typeof this.handleDrawCanvasRectCbk === 'function') this.handleDrawCanvasRectCbk(drawCanvasRectCbk);
            // 自定义成功回调
            if (typeof this.handleOcrSuccessInMixin === 'function') this.handleOcrSuccessInMixin(hasResults);
            this.handleAlgorithmCompareShow(hasResults);
        },
        // 显示算法对比组件
        handleAlgorithmCompareShow(hasResults) {
            const timeMaxvision = this.returnTimes[0];
            const timeBaidu = this.returnTimes[1];
            const timeTencent = this.returnTimes[2];
            const tempArr = [];
            const filterArr = [
                {
                    title: '盛视',
                    keys: this.ocrResultKeys,
                    keyCN: this.maxvisionKeyCN,
                    dataKey: this.maxvisionDataKey, // 获取数据key
                    listKey: this.maxvisionListKey, // 列表数据key
                    data: this.ocrResultData,
                    isChineseKey: this.maxvisionIsChineseKey,
                    error_msg: this.maxvisionErrorInfo,
                    tip_info: this.maxvisionTipInfo,
                    isShowItemRight: timeMaxvision && timeMaxvision.time !== 0,
                    itemRight: timeMaxvision && timeMaxvision.time + '"'
                }
            ];
            filterArr.forEach((item, index) => {
                if (hasResults[index]) {
                    tempArr.push(item);
                }
            })
            this.compareList = tempArr;
            // 获取到的三类数据
            this.showCompareCompo = true;
        },
        clearOcrResult() {
            this.ocrResultKeys = [];
            this.baiduResultKeys = [];
            this.tencentResultKeys = [];
            this.ocrResultData = null;
            this.jsonBaidu = null;
            this.jsonTencent = null;
            this.returnTimes = [];
            this.compareList = [];
            this.showCompareCompo = false;
            this.maxvisionErrorInfo = '';
            this.maxvisionTipInfo = '';
            this.baiduErrorInfo = '';
            this.baiduTipInfo = '';
            this.tencentErrorInfo = '';
            this.tencentTipInfo = '';
            this.tabsToggleReset = !this.tabsToggleReset
            // 自定义清除结果回调
            if (typeof this.clearOcrResultInMixin === 'function') this.clearOcrResultInMixin();
        },
        isError(data) {
            return data.code !== 200 && data.code !== 0
        },
        isTip(data, key) {
            return !data[key] || (Array.isArray(data[key]) && data[key].length === 0)
        },
    }
}
