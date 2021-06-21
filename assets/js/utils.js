export const maxImageWidth = 800;
export const maxImageHeight = 500;

// 页面滚动到指定位置固定于顶部
export const scrollFixPosition = function (id, comparePosId) {
    if (!id) throw new Error('id不存在')
    var bignav = document.getElementById(id);//获取到导航栏id
    var compareDom = document.getElementById(comparePosId);//以此的滚动高度为参照
    var topScroll = document.body.scrollTop || document.documentElement.scrollTop;//滚动的距离,距离顶部的距离
    if (!bignav && !compareDom) return
    var spaceOffsetHeight = compareDom.offsetTop
    if (topScroll > spaceOffsetHeight) {
        bignav.style.position = 'fixed';
        bignav.style.top = '0';
        bignav.style.zIndex = '9999';
    } else {
        bignav.style.position = 'static';
    }
}

// 根据节点id经过time时间滚动到该节点位置
export const pageMoveTo = function (toId, time) {
    $('html,body').animate({ scrollTop: $(toId).offset().top }, time)
}

// 判断是否Json对象
export const isJsonObj = function (obj) {
    var type = Object.prototype.toString.call(obj);
    if (type == '[object Object]') return true;
    return false
}

// 获取对象keys数组
export const getObjKeys = function (obj) {
    if (!isJsonObj(obj)) return []
    return Object.keys(obj)
}

// File对象转base64
export const readBlobAsDataURL = (blob, callback) => {
    var a = new FileReader();
    a.onload = function (e) { callback(e.target.result); };
    a.readAsDataURL(blob);
}

// html显示json数据
export const jsonToHtml = (json) => {
    /* if (!json.match("^\{(.+:.+,*){1,}\}$")) {
        return json //判断是否是json数据，不是直接返回
    } */

    if (!json) return ''
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

// 是否网络链接
export const isHttpOrHttps = function (url) {
    if (!url || typeof url !== 'string') return false
    const urlReg = new RegExp('(http|https)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
    return urlReg.test(url)
}

// 获取宽高最小缩放比，缩放比大于1则直接返回1，保持原样
export const getMinScaleRatio = function ({ width, height, parentWidth, parentHeight }) {
    if (typeof width !== 'number' || typeof height !== 'number' || typeof parentWidth !== 'number' || typeof parentHeight !== 'number') return 1
    const minRatio = Math.min(parentWidth / width, parentHeight / height)
    return minRatio > 1 ? 1 : minRatio
}

// 下划线转驼峰
export const toCamel = function (str) {
    return str.replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
        return $1 + $2.toUpperCase();
    });
}

// 获取对象键值
export const filterObjByKey = function (obj, key) {
    if (!obj || typeof obj === 'string' || Array.isArray(obj)) return obj
    return obj[key] || obj
}

// 获取image压缩后宽高，返回 [宽, 高]
export const getZipImageWidthHeight = function (img, maxWidth, maxHeight) {
    //图片的原始尺寸，最大尺度的尺寸限制在 maxWidth*maxHeight
    let originWidth = img.width;
    let originHeight = img.height;
    //目标尺寸
    let targetWidth = originWidth, targetHeight = originHeight;
    if (originWidth > maxWidth || originHeight > maxHeight) {//如果原始尺寸大于了设定的最大尺寸
        if (originWidth / originHeight > maxWidth / maxHeight) {//图片原本的宽高比例大于了设定的宽高比例
            //大于规定的比例 证明 原始宽度大于高度 -》所以按照高度除以宽度的比例去缩放高度
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
            //小于则表明 原始高度大于原始宽度 -》所以按照宽度除以高度的比例去缩放宽度
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
    }
    return [targetWidth, targetHeight]
}

// image节点转File对象
export const imgToFile = function (img, maxWidth = maxImageWidth, maxHeight = maxImageHeight) {
    if (!img || img.toString() !== "[object HTMLImageElement]") return;
    let cvs = document.createElement("canvas");
    let ctx = cvs.getContext("2d");
    /* const [targetWidth, targetHeight] = getZipImageWidthHeight(img, maxWidth, maxHeight);
    cvs.width = targetWidth;
    cvs.height = targetHeight; */
    cvs.width = img.width;
    cvs.height = img.height;
    const imgClone = img.cloneNode();
    imgClone.crossOrigin = 'anonymous';
    const imgNameMatch = getImgName(imgClone.src)[0];
    const fileSuffix = imgNameMatch ? imgNameMatch.split('.')[1] : '';
    const toDataURLType = fileSuffix === 'jpg' ? "image/jpeg" : "image/" + fileSuffix;
    ctx.drawImage(imgClone, 0, 0, imgClone.width, imgClone.height);
    let arr = cvs.toDataURL(toDataURLType).split(",");
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: toDataURLType });
    return { blob, fileName: imgNameMatch }
    // return new File([blob], fileName, { type: mime, lastModified: Date.now() })
}

// ID生成
export const genID = function () {
    return 'i' + (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
}

export const getBlobType = function ({ type } = {}) {
    if (typeof type !== 'string') return ''
    return type.split('/')[1]
}

// 字符串单词首字母大写
export const firstLetterUpperCase = function (str, spliter = ' ') {
    if (!str || typeof str !== 'string') return '';
    const strArr = str.split(spliter);
    const strBuffer = [];
    strArr.forEach(word => {
        strBuffer.push(word.slice(0, 1).toUpperCase() + word.slice(1))
    })
    return strBuffer.join(spliter);
}

export const setStorage = function (k, v) {
    if (typeof v === 'object') return sessionStorage.setItem(k, JSON.stringify(v));
    sessionStorage.setItem(k, v);
}
export const getStorage = function (k) {
    return sessionStorage.getItem(k);
}
export const clearStorage = function (k) {
    return sessionStorage.clear(k);
}

// 请求网络图片blob
export const getBlob = function (imgUrl, cbk) {
    window.URL = window.URL || window.webkitURL;
    var xhr = new XMLHttpRequest();
    xhr.open("get", imgUrl, true);
    // 至关重要
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200) {
            //得到一个blob对象
            var blob = this.response;
            // 获取 base64
            let oFileReader = new FileReader();
            oFileReader.onloadend = function (e) {
                // 此处拿到的已经是 base64的图片了
                let base64 = e.target.result;
                let arr = base64.split(",");
                let mime = arr[0].match(/:(.*?);/)[1];
                if (cbk) cbk(blob, base64)
            };
            oFileReader.readAsDataURL(blob);
        }
    }
    xhr.send();
}

export const getImgName = function (src) {
    if (!src || typeof src !== "string") return []
    return src.match(/[^\/\\]+$/)
}

/* 
瀑布流布局
@param containerSelector 父容器选择器
@param itemSelector 列表项选择器
@param marginRight 列表项右外边距
@param marginBottom 列表项下外边距
*/
export const waterfallLayout = function (containerSelector = '', itemSelector = '', marginRight = 0, marginBottom = 0) {
    const container = document.querySelector(containerSelector);
    const items = container.querySelectorAll(itemSelector);
    const wfColCls = 'wf-col';
    const wfCols = container.querySelectorAll("." + wfColCls);
    if (wfCols && wfCols.length > 0) {
        Array.from(wfCols).forEach(col => {
            container.removeChild(col);
        })
    }
    if (!container || !items || items.length === 0) return;
    const conWidth = container.clientWidth;
    const itemWidth = items[0].clientWidth;
    const colWidth = itemWidth + marginRight // 列宽：节点宽 + 右外边距
    const colNum = Math.floor(conWidth / colWidth);
    const colHeightArr = [] // 列高数组
    const colDomArr = [] // 列节点数组
    // 初始化每列
    for (let i = 0; i < colNum; i++) {
        if (i >= items.length) return;
        let parentDom = document.createElement('div')
        parentDom.className = wfColCls
        parentDom.style.float = 'left'
        parentDom.appendChild(items[i])
        colDomArr.push(parentDom)
        container.appendChild(parentDom)
        colHeightArr.push(parentDom.clientHeight)
    }
    // 从第二排开始计算布局
    let otherDom;
    for (let j = colNum; j < items.length; j++) {
        otherDom = items[j]
        const [minColIndex, minHeight] = getMinHeightColIndexAndHeight()
        startRender(minColIndex, otherDom)
    }
    function startRender(colIndex, cdom) {
        let minColDom = colDomArr[colIndex]
        minColDom.appendChild(cdom)
        updateMinHeightArr(colIndex, minColDom.clientHeight)
    }
    // 获取当前最小高度列的下标，及高度
    function getMinHeightColIndexAndHeight() {
        const minHeight = Math.min.apply(null, colHeightArr)
        return [colHeightArr.indexOf(minHeight), minHeight]
    }
    // 更新最小高度数组
    function updateMinHeightArr(index, height) {
        colHeightArr[index] = height
    }
}

//随机生成十六进制颜色
export const randomHexColor = function () {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}

// 设置节点居中、缩放比，节点需定位，top:50%，left:50%
export const setDomShrink = function (dom) {
    if (dom && dom.parentElement) {
        const dW = dom.clientWidth;
        const dH = dom.clientHeight;
        const pW = dom.parentElement.clientWidth;
        const pH = dom.parentElement.clientHeight;
        const ratio = getMinScaleRatio(
            { width: dW, height: dH, parentWidth: pW, parentHeight: pH }
        )
        dom.style.transform = `translate(-50%, -50%) scale(${ratio})`;
        return ratio
    }
    return 1
}

// 基本数据类型是否有值
export const hasVal = function (data) {
    return data !== undefined && data !== null && data !== '';
}

// 小圆定位于大圆上布局
export const circleLayout = function (selector, rBig = 0, rSmall = 0, rotate = 0) {
    const items = document.querySelectorAll(selector);
    if (!items || items.length === 0) return;
    const len = items.length;
    const angle = 360 / len; // 等分角度
    const x0 = rBig; // 大圆圆心坐标
    const y0 = rBig; // 大圆圆心坐标
    const r = rBig; // 大圆半径
    const a = Math.PI / 180;
    const rotateAngle = rotate > 0 ? -rotate : Math.abs(rotate);
    Array.from(items).forEach((item, index) => {
        const radian = angle * a * index;
        item.style.position = "absolute";
        item.style.left = x0 + r * Math.cos(radian) - rSmall + "px"; // 减去宽高的一半即为圆心点位置
        item.style.top = y0 + r * Math.sin(radian) - rSmall + "px";
        item.style.display = "block";
        item.style.transform = `rotate(${rotateAngle}deg)`;
    });
}