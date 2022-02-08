import {
    getMinScaleRatio,
    getZipImageWidthHeight,
    maxImageWidth,
    maxImageHeight,
    getBlob,
    readBlobAsDataURL,
    randomHexColor
} from '@/assets/js/utils.js'

export const getCanvas = function (canvasId) {
    if (typeof canvasId !== 'string') return;
    canvasId = canvasId[0] === '#' ? canvasId : `#${canvasId}`;
    return document.querySelector(canvasId);
}

// 绘制图片
export const canvasDrawImg = function (canvasId, imgSrc, { rotate }, canvasDrawImgCbk, isZipWidthHeight) {
    const cvs = getCanvas(canvasId);
    if (!cvs) return;
    // const parentW = cvs.parentElement.clientWidth;
    // const parentH = cvs.parentElement.clientHeight;
    const context = cvs.getContext("2d");
    // 清空画布
    context.clearRect(0, 0, cvs.width, cvs.height);
    const img = new Image();
    img.crossOrigin = 'anonymous'; // 不加该属性，裁剪报跨域错误
    img.src = imgSrc;
    img.onload = function () {
        let targetWidth = this.width, targetHeight = this.height;
        // 是否开启压缩宽高
        if (isZipWidthHeight) {
            const [w, h] = getZipImageWidthHeight(this, maxImageWidth, maxImageHeight);
            targetWidth = w;
            targetHeight = h;
        }
        // 中心旋转
        if (rotate) {
            const centerX = this.width / 2;
            const centerY = this.height / 2;
            context.translate(centerX, centerY);
            context.rotate(rotate * Math.PI / 180);
            context.translate(-centerX, -centerY);
        }
        cvs.width = targetWidth;
        cvs.height = targetHeight;
        context.drawImage(this, 0, 0, targetWidth, targetHeight);
        if (typeof canvasDrawImgCbk === 'function') canvasDrawImgCbk(this);
    }
}

/* 
根据坐标点数组画线框
coordinates：二维数组，多个区块点坐标
*/
export const canvasDrawLinesByCoordinates = function ({ canvasId, coordinates = [], xyKeys = [], lineColor = 'red', lineWidth = 1 } = {}) {
    const cvs = getCanvas(canvasId);
    if (!cvs) return;
    const [xKey = 'x', yKey = 'y'] = xyKeys
    const context = cvs.getContext("2d");
    let dotArr, coordinate;
    for (let i = 0; i < coordinates.length; i++) {
        dotArr = coordinates[i];
        context.beginPath();
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
        for (let j = 0; j < dotArr.length; j++) {
            coordinate = dotArr[j]
            if (j === 0) {
                context.moveTo(coordinate[xKey], coordinate[yKey]);
                continue;
            }
            if (j === dotArr.length - 1) {
                context.lineTo(coordinate[xKey], coordinate[yKey]);
                context.closePath();
                context.stroke();
                continue;
            }
            context.lineTo(coordinate[xKey], coordinate[yKey]);
        }
    }
}

/* 
绘制矩形
@param: x {Number} 水平坐标
@param: y {Number} 垂直坐标
@param: width {Number} 宽度
@param: height {Number} 高度
@param: rotation {Number} 旋转角度 转为弧度：rotation*Math.PI/180
@param: type {Number} 1：线框矩形；2：填充矩形
@param: color {String} ：线框或填充颜色
@param: lineWidth {Number} ：线宽
*/
export const canvasDrawRect = function ({ context, x, y, width, height, rotation, lineWidth = 2, type = 1, color = "red", randomColor } = {}) {
    // const cvs = getCanvas(canvasId);
    // if (!cvs) return
    // const context = cvs.getContext('2d');
    if (typeof context !== 'object' || context.toString() !== '[object CanvasRenderingContext2D]') return;
    context.save();
    // context.rotate(rotation*Math.PI/180);
    color = randomColor ? randomHexColor() : color;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(x, y);
    switch (type) {
        case 1:
            context.strokeRect(x, y, width, height);
            break;
        case 2:
            context.fillRect(x, y, width, height);
            break;
    }
    context.restore();
}

/* 
裁剪指定canvas，返回dataUrl
@param: area: { x：x坐标, y：y坐标, w：宽度, h：高度 }
@param: clipCtx：context of canvas
*/
export const startClip = ({ x = 0, y = 0, w = 0, h = 0, rotation = 0 }, context) => {
    if (typeof context !== 'object' || context.toString() !== '[object CanvasRenderingContext2D]') return;
    context.save();
    // context.rotate(-rotation * Math.PI / 180);
    const innerCanvas = document.createElement("canvas");
    innerCanvas.width = w;
    innerCanvas.height = h;

    try {
        let data = context.getImageData(x, y, w, h);
        let innerCtx = innerCanvas.getContext("2d");
        innerCtx.putImageData(data, 0, 0);
        context.restore();
        return innerCanvas.toDataURL("image/png");
    } catch (err) {
        console.log(err);
    }
}

// 绘制箭头
export const drawArrow = function (ctx, fromX, fromY, toX, toY, width, color, theta, headlen) {
    theta = typeof (theta) != 'undefined' ? theta : 30;
    headlen = typeof (headlen) != 'undefined' ? headlen : 10;
    width = typeof (width) != 'undefined' ? width : 1;
    color = typeof (color) != 'color' ? color : '#000';
    // 计算各角度和对应的P2,P3坐标
    let angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);

    ctx.save();
    ctx.beginPath();

    let arrowX = fromX - topX,
        arrowY = fromY - topY;

    ctx.moveTo(arrowX, arrowY);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
}


// 设置画布居中、缩放比，画布需position:absolute，top:50%，left:50%
export const setCanvasShrink = function (cvs) {
    if (cvs && cvs.parentElement) {
        const cW = cvs.width;
        const cH = cvs.height;
        const parentW = cvs.parentElement.clientWidth;
        const parentH = cvs.parentElement.clientHeight;
        cvs.style.transform = `translate(-50%, -50%) scale(${getMinScaleRatio(
            { width: cW, height: cH, parentWidth: parentW, parentHeight: parentH }
        )})`;
    }
}

export const drawPoints = function (canvasId, data, { size = 5, color = 'red' }) {
    /*获取元素*/
    let myCanvas = getCanvas(canvasId);
    /*获取绘图工具*/
    let ctx = myCanvas.getContext('2d');

    /*
    1. 设置坐标点的中心圆点位置（x0，y0）
    2. 设置坐标点的大小  dotSize
    3. 计算坐标点的上下左右四角的点坐标
    */

    // 设置坐标点的大小  dotSize
    let dotSize = size;

    // 4.遍历点的坐标,以及绘画点
    data.forEach(function (item, i) {
        // 1. 设置坐标点的中心圆点位置（x0，y0）
        if (Array.isArray(item)) {
            drawPoints(canvasId, item, { size, color });
        } else {
            let x0 = item.x || item.X;
            let y0 = item.y || item.Y;

            // 2.计算坐标点的上下左右四角的点坐标: 左上(x1,y1) 左下(x2,y2) 右上(x3,y3) 右下(x4,y4)

            let x1 = Math.floor(x0 - dotSize / 2);
            let y1 = Math.floor(y0 - dotSize / 2);

            let x2 = Math.floor(x0 - dotSize / 2);
            let y2 = Math.floor(y0 + dotSize / 2);

            let x3 = Math.floor(x0 + dotSize / 2);
            let y3 = Math.floor(y0 - dotSize / 2);

            let x4 = Math.floor(x0 + dotSize / 2);
            let y4 = Math.floor(y0 + dotSize / 2);

            // 3.绘画坐标点
            ctx.beginPath();
            ctx.moveTo(x1, y1); // 左上点
            ctx.lineTo(x2, y2); // 左下点
            ctx.lineTo(x4, y4); // 右下点
            ctx.lineTo(x3, y3); // 右上点
            ctx.closePath();

            // 4.填充以及描边y轴
            ctx.fillStyle = color;
            ctx.fill();
        }
    });

}

// 复制canvas内容
export const cloneCanvasCont = function (oldCanvasId, newCanvasId, { rotate, angle = 0 } = {}) {
    let oldCanvas = document.getElementById(oldCanvasId);
    let newCanvas = document.getElementById(newCanvasId);
    let context = newCanvas.getContext('2d');
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    const centerX = newCanvas.width / 2;
    const centerY = newCanvas.height / 2;
    // 中心旋转
    if (rotate) {
        context.translate(centerX, centerY);
        context.rotate(angle * Math.PI / 180)
        context.translate(-centerX, -centerY);
    };
    context.drawImage(oldCanvas, 0, 0);
}

/* 
绘制马赛克
@param targetCanvas 目标Canvas
@param img 图片节点
@param x 马赛克左上角x坐标
@param y 马赛克左上角y坐标
@param width 马赛克宽
@param height 马赛克高
@param size 马赛克模糊度，默认20，值越大，越模糊
*/
export const drawCanvasMosaic = function (targetCanvas, img, x, y, width, height, size = 20) {
    targetCanvas.width = img.width;
    targetCanvas.height = img.height;
    const targetCanvasCtx = targetCanvas.getContext('2d');
    //  把图片写入画布
    targetCanvasCtx.drawImage(img, 0, 0, img.width, img.height);
    // 马赛克区域默认图片宽高
    width = width || img.width;
    height = height || img.height;
    //  获取马赛克区域的图片数据
    let mosaicImageData = targetCanvasCtx.getImageData(x, y, width, height);
    //  马赛克区域生成n个矩形
    for (let i = 0; i < mosaicImageData.width / size; i++) {
        for (let j = 0; j < mosaicImageData.height / size; j++) {
            //  从马赛克矩形中抽出对应像素点信息
            let color = getPxColor(mosaicImageData, i * size, j * size);
            //  把当前马赛克矩形中的所有像素点统一成随机选出的像素点:开始
            for (let a = 0; a < size; a++) {
                for (let b = 0; b < size; b++) {
                    setPxColor(mosaicImageData, i * size + a, j * size + b, color);
                }
            }
        }
    }
    //  每次写入新的imagedata，先清空画布
    // targetCanvasCtx.clearRect(x, y, width, height);
    //把新的imagedata写入画布；
    targetCanvasCtx.putImageData(mosaicImageData, x, y);
}

/* 
获取某个像素点的rgba
imgdata：canvas context.getImageData
*/
function getPxColor(imgdata, x, y) {
    let color = [];
    let data = imgdata.data;
    let w = imgdata.width;
    const firstIndex = (y * w + x) * 4;
    color[0] = data[firstIndex];
    color[1] = data[firstIndex + 1];
    color[2] = data[firstIndex + 2];
    color[3] = data[firstIndex + 3];
    return color;
}
//  设置某个像素点的rgba
function setPxColor(imgdata, x, y, color) {
    let data = imgdata.data;
    let w = imgdata.width;
    const firstIndex = (y * w + x) * 4;
    data[firstIndex] = color[0];
    data[firstIndex + 1] = color[1];
    data[firstIndex + 2] = color[2];
    data[firstIndex + 3] = color[3];
}