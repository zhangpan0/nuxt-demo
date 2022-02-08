<!--  -->
<template>
    <section>
      <div class="factory-box">
      <div class="factory-box-main">
        <div class="factory-box-title">
          <div>AI产业化    建设智能社会</div>
          <p>20多年的AI系统集成项目落地能力</p>
        </div>
        <div class="f-animat-box">
          <div class="ficon1-1"></div>
          <div class="ficon1-2"></div>
          <div class="ficon1-3"></div>
          <div class="ficon2-1"></div>
          <div class="ficon2-2"></div>
          <div class="ficon2-3"></div>
          <div class="ficon3-1"></div>
          <div class="ficon3-2"></div>
          <div class="ficon3-3"></div>
          <div class="ficon3-4"></div>
          <div class="ficon3-5"></div>
          <!-- 运输包裹 -->
          <div class="roll-start-r"></div>
          <div class="roll-start-l"></div>
          <div class="roll-saas"></div>
          <div class="roll-fuwu"></div>
          <div class="roll-cunchu"></div>
          <div class="roll-xiaofei"></div>
          <div class="roll-qiye"></div>
          <!-- 光电运动 -->
          <div class="bar-run"></div>
        </div>
      </div>
    </div>
    </section>
</template>

<script>

export default {
  data() {
    return {
       
    };
  },
  methods: {
     
  },
  created() {
     
  },
}
</script>

<style lang='scss' scoped>
.factory-box {
  background: url('~@/static/images/home/factory/factory-bg.png') no-repeat center center;
  height: 950px;
  margin-bottom: 120px;
  background-size: cover;
  .factory-box-main {
    width: 1200px;
    margin: 0 auto;
    .factory-box-title {
      text-align: center;
      padding: 80px 0 90px 0;
      >div {
        font-size: 30px;
      }
      >p {
        font-size: 18px;
        line-height: 22px;
        margin-top: 10px;
      }
    }
    .f-animat-box {
      background: url('~@/static/images/home/factory/factory-animate.png') no-repeat center center;
      height: 660px;
      position: relative;
      .ficon1-1 {
        position: absolute;
        background: url('~@/static/images/home/factory/ficon1-1.png') no-repeat center center;
        width: 48px;
        height: 42px;
        left: 300px;
        top: 365px;
        animation: upDown1-1 3s linear infinite alternate;
      }
      @keyframes upDown1-1 {
        0% {
          top: 365px;
        }
        50% {
          top: 375px;
        }
        100% {
          top: 365px;
        }
      }
      .ficon1-2 {
        position: absolute;
        background: url('~@/static/images/home/factory/ficon1-2.png') no-repeat center center;
        width: 42px;
        height: 60px;
        left: 448px;
        top: 440px;
        animation: upDown1-2 2s linear infinite running;
      }
      @keyframes upDown1-2 {
        0% {
          top: 440px;
        }
        50% {
          top: 450px;
        }
        100% {
          top: 440px;
        }
      }
      .ficon1-3 {
        position: absolute;
        background: url('~@/static/images/home/factory/ficon1-3.png') no-repeat center center;
        width: 65px;
        height: 68px;
        left: 580px;
        top: 506px;
        transform-style: preserve-3d;
        animation: upDown1-3 5s linear infinite alternate;
      }
      
      @keyframes upDown1-3 {
        from { transform: rotateY(0); }
        to { transform: rotateY(360deg); }
      }
      .ficon2-1 {
        position: absolute;
        background: url('~@/static/images/home/factory/ficon2-1.png') no-repeat center center;
        width: 70px;
        height: 52px;
        left: 1050px;
        top: 370px;
        animation: upDown2-1 1.5s linear 2s infinite alternate;
      }
      @keyframes upDown2-1 {
        0% {
          top: 370px;
        }
        50% {
          top: 380px;
        }
        100% {
          top: 370px;
        }
      }
      .ficon2-2 {
        position: absolute;
        background: url('~@/static/images/home/factory/ficon2-2.png') no-repeat center center;
        width: 12px;
        height: 14px;
        left: 940px;
        top: 270px;
        animation: upDown2-2 3s linear 2s infinite alternate;
      }
      @keyframes upDown2-2 {
        0% {
          top: 270px;
        }
        50% {
          top: 280px;
        }
        100% {
          top: 270px;
        }
      }
      .ficon2-3 {
        position: absolute;
        background: url('~@/static/images/home/factory/ficon2-3.png') no-repeat center center;
        width: 50px;
        height: 56px;
        left: 738px;
        top: 164px;
        animation: upDown2-3 3s linear 2s infinite alternate;
      }
      @keyframes upDown2-3 {
        0% {
          top: 164px;
        }
        50% {
          top: 174px;
        }
        100% {
          top: 164px;
        }
      }
      .ficon3-1 {
        position: absolute;
        background: url('~@/static/images/home/factory/ficon3-1.png') no-repeat center center;
        width: 26px;
        height: 44px;
        top: 6px;
        left: 630px;
        animation: upDown3-1 3s linear 2s infinite alternate;
      }
      @keyframes upDown3-1 {
        0% {
          top: 6px;
        }
        50% {
          top: 16px;
        }
        100% {
          top: 6px;
        }
      }
      .ficon3-2 {
        position: absolute;
        background: url('~@/static/images/home/factory/ficon3-2.png') no-repeat center center;
        width: 20px;
        height: 40px;
        top: 0px;
        left: 432px;
        animation: upDown3-2 1.5s linear 2s infinite alternate;
      }
      @keyframes upDown3-2 {
        0% {
          top: 0px;
        }
        50% {
          top: 10px;
        }
        100% {
          top: 0px;
        }
      }
      .ficon3-3 {
        position: absolute;
        background: url('~@/static/images/home/factory/ficon3-3.png') no-repeat center center;
        width: 30px;
        height: 50px;
        top: 120px;
        left: 26px;
        animation: upDown3-3 3s linear 2s infinite both;
      }
      @keyframes upDown3-3 {
        0% {
          top: 120px;
        }
        50% {
          top: 130px;
        }
        100% {
          top: 120px;
        }
      }
      .ficon3-4 {
        position: absolute;
        background: url('~@/static/images/home/factory/ficon3-4.png') no-repeat center center;
        width: 30px;
        height: 50px;
        top: 230px;
        left: 42px;
        animation: upDown3-4 1.5s linear 2s infinite alternate;
      }
      @keyframes upDown3-4 {
        0% {
          top: 230px;
        }
        50% {
          top: 240px;
        }
        100% {
          top: 230px;
        }
      }
      .ficon3-5 {
        position: absolute;
        background: url('~@/static/images/home/factory/ficon3-5.png') no-repeat center center;
        width: 30px;
        height: 50px;
        top: 240px;
        left: 192px;
        animation: upDown3-5 3s linear 2s infinite alternate;
      }
      @keyframes upDown3-5 {
        0% {
          top:240px;
        }
        50% {
          top: 250px;
        }
        100% {
          top: 240px;
        }
      }
      .roll-start-r {
        position: absolute;
        background: url('~@/static/images/home/factory/roll-icon.png') no-repeat center center;
        width: 50px;
        height: 50px;
        transform: translate3d(700px, 410px, 0);
        animation: roll-start-r  1.5s linear 0s infinite running;
      }
      @keyframes roll-start-r {
        0% {
          transform: translate3d(700px, 410px, 0);
        }
        50% {
          transform: translate3d(720px, 420px, 0);
        }
        75% {
          opacity: 0.9;
        }
        100% {
          transform: translate3d(855px, 338px, 0);
          opacity: 0;
        }
      }
      
      .roll-start-l {
        position: absolute;
        background: url('~@/static/images/home/factory/roll-icon.png') no-repeat center center;
        width: 50px;
        height: 50px;
        transform: translate3d(500px, 285px, 0);
        animation: roll-start-l  1.5s linear 0s infinite both;
      }
      @keyframes roll-start-l {
        0% {
          transform: translate3d(500px, 285px, 0);
        }
        50% {
          opacity: 0.9;
        }
        100% {
          transform: translate3d(425px, 250px, 0);
          opacity: 0;
        }
      }
      .roll-saas {
        position: absolute;
        background: url('~@/static/images/home/factory/roll-icon.png') no-repeat center center;
        width: 50px;
        height: 50px;
        animation: roll-saas  2s linear 0s infinite running;
      }
      @keyframes roll-saas {
        0% {
          transform: translate3d(960px, 340px, 0);
        }
        50% {
          opacity: 0.9;
        }
        100% {
          transform: translate3d(1020px, 368px, 0);
          opacity: 0;
        }
      }
      .roll-fuwu {
        position: absolute;
        background: url('~@/static/images/home/factory/roll-icon.png') no-repeat center center;
        width: 50px;
        height: 50px;
        animation: roll-fuwu  2s linear 0s infinite running;
      }
      @keyframes roll-fuwu {
        0% {
          transform: translate3d(840px, 265px, 0);
        }
        50% {
          opacity: 0.9;
        }
        100% {
          transform: translate3d(780px, 235px, 0);
          opacity: 0;
        }
      }
      .roll-cunchu {
        position: absolute;
        background: url('~@/static/images/home/factory/roll-icon.png') no-repeat center center;
        width: 50px;
        height: 50px;
        transform: translate3d(998px, 250px, 0);
        animation: roll-cunchu  1s linear 1s infinite running;
      }
      @keyframes roll-cunchu {
        0% {
          transform: translate3d(998px, 250px, 0);
        }
        50% {
          opacity: 0.9;
        }
        100% {
          transform: translate3d(1030px, 230px, 0);
          opacity: 0;
        }
      }
      .roll-xiaofei {
        position: absolute;
        background: url('~@/static/images/home/factory/roll-icon.png') no-repeat center center;
        width: 50px;
        height: 50px;
        transform: translate3d(420px, 150px, 0);
        animation: roll-xiaofei  1s linear 1s infinite running;
      }
      @keyframes roll-xiaofei {
        0% {
          transform: translate3d(420px, 150px, 0);
        }
        50% {
          opacity: 0.9;
        }
        100% {
          transform: translate3d(455px, 130px, 0);
          opacity: 0;
        }
      }
      .roll-qiye {
        position: absolute;
        background: url('~@/static/images/home/factory/roll-icon.png') no-repeat center center;
        width: 50px;
        height: 50px;
        animation: roll-qiye  1s linear 0s infinite both;
      }
      @keyframes roll-qiye {
        0% {
          transform: translate3d(270px, 155px, 0);
        }
        50% {
          transform: translate3d(235px, 140px, 0);
        }
        75% {
          opacity: 0.9;
        }
        100% {
          transform: translate3d(165px, 160px, 0);
          opacity: 0;
        }
      }
      .bar-run {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius:50%;
        background: url('~@/static/images/home/factory/sun-run.gif') no-repeat center center;
        background-size: cover;
        // transform: translate3d(515px, 430px, 0);
        animation: bar-run 1s linear infinite;
        @keyframes bar-run {
          from {
            transform: translate3d(515px, 430px, 0);
            }
          to { 
            transform: translate3d(515px, 430px, 0);
          }
        }
      }
    }
  }
}
</style>