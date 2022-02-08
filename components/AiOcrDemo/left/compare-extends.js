export const extendsCompare = {
  mounted() {
  },
  methods: {
    // 拖动图片事件
    handleMoveImg(e) {
      let boxBar = document.getElementById('box-bar');
      let imgBox = document.getElementsByClassName('odi')[0];
      let afterImg = document.getElementById('after-img');
      let beforeImg = document.getElementsByClassName('before-img')[0];
      afterImg.onmousedown = function(e){
        e.preventDefault()
      };
      beforeImg.onmousedown = function(e){
        e.preventDefault()
      };
      this.InitImgSize(boxBar,afterImg,beforeImg);
      boxBar.onmousedown = function (e) {
        //e是点击事件的e , this是box元素的this     
        //因为当前物体是在文档的（0,0）位置，所以e.clientX(鼠标到文档的左侧距离) - this.offsetLeft(拖拽物left的值)就是鼠标到拖拽物的距离。
        let x = e.clientX - this.offsetLeft;
        imgBox.onmousemove = function (e) {
          // 获取鼠标移动后到文档左侧的距离 - 鼠标到拖拽物的距离 （就是移动后拖拽物的left值）
          let a = e.clientX;
          let l = a - x;
          let maxL = imgBox.offsetWidth - boxBar.offsetWidth; // 右界临界点 +自身20
          if (l >= maxL + 20) {
            l = maxL + 20;
          }
          if (l <= -20) { // 左界临界点 -自身20
            l = -20;
          }
          boxBar.style.left = l + 'px'; //拖拽物赋值
          let b = boxBar.offsetWidth / 2;
          let m = l + b;
          afterImg.style.clip = "rect(auto, auto, auto," + parseInt(m) + "px)"; //图片显示区域赋值
          beforeImg.style.clip = "rect(auto, auto, auto," + parseInt(m) + "px)"; //图片显示区域赋值
        }
        document.onmouseup = function () {
          //清除事件
          imgBox.onmouseup = null;
          imgBox.onmousemove = null;
        }
      }
    },
    // 去掉之前的缩放,初始化图片的宽高比适应
    InitImgSize(boxBar,afterImg,beforeImg) {
      const $zoneDom = $("#" + this.uniqId);
      if (!$zoneDom) return console.error("容器不存在");
      const zd = $zoneDom.get(0);
      if (!zd) return console.error("图片不存在");
      const $img = $zoneDom.find(".bg");
      const imgRatio = 760 / 480;  // 父元素框宽高
      // 图片地址
      let img_url = $img[0].src;  // 选中的图片
      let img = new Image();
      // 改变片的src
      img.src = img_url;
      // 有的的图片较大 重新判断一次加载完成
      img.onload = () => {
        // 原始图片宽高
        const [w, h] = [+img.width, +img.height];
        let maxWidth = 0,flagWidth = 0;
        if (h > 480 ) {  // 宽高比例小于原始的>> 图片宽小于自身高
          maxWidth = (480 / h) * w > 760 ? 760 : (480 / h) * w;  // 根据高比缩放宽度
          flagWidth = 480;
        }else if (w > 760) {
          maxWidth = 760;
          flagWidth = (760 / w) * h;
        }else {
          maxWidth = w;
          flagWidth = h;
        }
        $zoneDom.css({
          width: 'auto',
          height: 'auto',
          maxWidth: maxWidth + 'px',
          maxHeight: flagWidth + 'px',
          transform: 'translate(-50%, -50%) scale(1)'
        });
        // 重新显示图片渲染
        $img.css({
          opacity:1
        })
        boxBar.style.left =  parseInt((maxWidth / 2 - 20)) + 'px'; //拖拽物赋值
        afterImg.style.clip = "rect(auto, auto, auto," + parseInt(maxWidth / 2) + "px)"; //图片显示区域赋值
        boxBar.style.height =  Math.ceil($(beforeImg).height()) + "px"; //和前一张图片保持高度
        afterImg.style.height = Math.ceil($(beforeImg).height()) + "px"; //和前一张图片保持高度
        beforeImg.style.height = Math.ceil($(beforeImg).height()) + "px"; //和前一张图片保持高度
        // console.log('width:'+img.width+',height:'+img.height);
      }
    }
  },
  computed: {
    imgUrlSet() { // 右侧解析图片的地址
      return this.$attrs.imgUrlSet;
    },
    hasImgUrlSet () { //是否存在图片对比的算法为true
      return this.$attrs.hasImgUrlSet;
    },
  },
  watch: {
    imgUrlSet: {
      handler(n, o) {
        if (n && this.hasImgUrlSet) {
          this.$nextTick(() => {
            this.handleMoveImg();
          });
        }
      },
    }
  }
}