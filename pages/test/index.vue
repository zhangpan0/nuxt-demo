<template>
  <div class="videobox">
    <div class="videolist">
      <div class="search">
        <ul>
          <li
            v-for="(item, index) in rtsplist"
            :key="index"
            @click="clickhandleitem(item, index)"
          >
            <i class="el-icon-video-camera-solid"></i>
            列表{{index}}
          </li>
        </ul>
      </div>
    </div>
    <div class="video">
      <video
        autoplay
        muted
        width="400px"
        height="300px"
        v-for="(i,index) in 4"
        :id="'videoElement' + i"
        :key="index"
      ></video>
    </div>
  </div>
</template>


<script>



export default {
  data() {
    return {
       rtsplist: [
        {
          rtsp: "http://1011.hlsplay.aodianyun.com/demo/game.flv",
          player: null
        },
        {
          rtsp: "http://1011.hlsplay.aodianyun.com/demo/game.flv",
          player: null
        },
        
        {
          rtsp: "http://1011.hlsplay.aodianyun.com/demo/game.flv",
          player: null
        },
        {
          rtsp: "http://1011.hlsplay.aodianyun.com/demo/game.flv",
          player: null
        },
        {
          rtsp: "http://1011.hlsplay.aodianyun.com/demo/game.flv",
          player: null
        },
        {
          rtsp: "http://1011.hlsplay.aodianyun.com/demo/game.flv",
          player: null
        },
        
        {
          rtsp: "http://1011.hlsplay.aodianyun.com/demo/game.flv",
          player: null
        },
        {
          rtsp: "http://1011.hlsplay.aodianyun.com/demo/game.flv",
          player: null
        },
        
      ],
      flvPlayer: null,
      inputvalue: "",
      devicename: "60",
      url: "",
      list: [],
      count: 1, // 当前点击标识
      flvPlayerList: [],
      datalist:[]
    };
  },
  methods: {
    clickhandleitem(data, index) {
      let ip = data.ipAddress;
      let admin = data.videoname;
      let password = data.videopas;

      this.url =this.rtsplist[index].rtsp
      console.log(this.flvPlayerList,'flvPlayerList')
      if (this.flvPlayerList.length > 3) {
        this.destoryVideo(this.flvPlayerList[0]);
        this.flvPlayerList.shift();
      }
      this.createVideo();
      console.log(index)
      this.count > 3 ? (this.count = 1) : this.count++;
      console.log(this.count)
    },
    createVideo() {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoElement" + this.count);
        this.flvPlayer = flvjs.createPlayer(
          {
            type: "flv",
            isLive: true,
            hasAudio: false,
            url: this.url
          },
          {
            enableWorker: false, //不启用分离线程
            enableStashBuffer: false, //关闭IO隐藏缓冲区
            reuseRedirectedURL: true, //重用301/302重定向url，用于随后的请求，如查找、重新连接等。
            autoCleanupSourceBuffer: true //自动清除缓存
          }
        );

        this.flvPlayer.attachMediaElement(videoElement);
        // this.flvPlayer.load();

        if (this.url !== "" && this.url !== null) {
          this.flvPlayer.load();
          this.flvPlayer.play();
        }
      }

      //定时方法是为了用户离开页面视频是实时播放的,暂停按钮无用
      setInterval(function() {
        // console.log(videoElement.buffered,"idididid");
        if (videoElement.buffered.length > 0) {
          const end = videoElement.buffered.end(0); // 视频结尾时间
          const current = videoElement.currentTime; //  视频当前时间
          const diff = end - current; // 相差时间
          // console.log(diff);
          const diffCritical = 4; // 这里设定了超过4秒以上就进行跳转
          const diffSpeedUp = 1; // 这里设置了超过1秒以上则进行视频加速播放
          const maxPlaybackRate = 4; // 自定义设置允许的最大播放速度
          let playbackRate = 1.0; // 播放速度
          if (diff > diffCritical) {
            //  this.flvPlayer.load();
            // console.log("相差超过4秒，进行跳转");
            videoElement.currentTime = end - 1.5;
            playbackRate = Math.max(1, Math.min(diffCritical, 16));
          } else if (diff > diffSpeedUp) {
            // console.log("相差超过1秒，进行加速");
            playbackRate = Math.max(1, Math.min(diff, maxPlaybackRate, 16));
          }
          videoElement.playbackRate = playbackRate;
          if (videoElement.paused) {
            videoElement.play();
          }
        }
        //  if (videoElement.buffered.length) {
        //   let end = this.flvPlayer.buffered.end(0);//获取当前buffered值
        //   let diff = end - this.flvPlayer.currentTime;//获取buffered与currentTime的差值
        //   if (diff >= 0.5) {//如果差值大于等于0.5 手动跳帧 这里可根据自身需求来定
        //     this.flvPlayer.currentTime = this.flvPlayer.buffered.end(0);//手动跳帧
        //  }
        // }
      }, 1000);

      this.flvPlayer.on(flvjs.Events.ERROR, (errType, errDetail) => {
        // alert("网络波动,正在尝试连接中...");
        if (this.flvPlayer) {
          this.reloadVideo(this.flvPlayer);
        }
        // errType是 NetworkError时，对应errDetail有：Exception、HttpStatusCodeInvalid、ConnectingTimeout、EarlyEof、UnrecoverableEarlyEof
        // errType是 MediaError时，对应errDetail是MediaMSEError   或MEDIA_SOURCE_ENDED
      });
      this.flvPlayerList.push(this.flvPlayer);
    },

    reloadVideo(flvPlayer) {
      this.destoryVideo(flvPlayer);
      this.createVideo();
    },
    destoryVideo(flvPlayer) {
      flvPlayer.pause();
      flvPlayer.unload();
      flvPlayer.detachMediaElement();
      flvPlayer.destroy();
      flvPlayer = null;
    },
  }
};
</script>


<style lang="scss" scoped>
.videobox {
  display: flex;
  /* justify-content: space-between; */
  /* flex-wrap: wrap; */
}
.videolist {
  width: 550px;
  height: 906px;
  display: flex;
  .search {
    margin-left: 50px;
    .el-input {
      width: 300px;
      margin-top: 20px;
    }
    ul {
      width: 100%;
      height: 777px;
      overflow: hidden;
      overflow-y: auto;
      list-style: none;
      li {
        padding: 7px;
        margin: 1px 0;
        text-decoration: none;
        white-space: nowrap;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          background: #fff;
        }
        .el-icon-video-camera-solid {
          font-size: 16px;
          color: #67c23a;
        }
      }
    }
  }
}
.video {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
  video {
    object-fit: contain;
    width: 600px;
    height: 390px;
  }
}
</style>