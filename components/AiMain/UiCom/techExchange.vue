<!--  -->
<template>
  <section>
    <div class="g-center productAdvBox" id="techExchange">
      <div class="flex-center move-top">
        <h2 class="title g-mg-b-sm">技术交流</h2>
      </div>
      <div class="techExchangeBox">
        <div class="techExchangeContent" @click="goTechDoc">
          <img src="@/static/images/ai/dev-doc.png"/>
          <div>开发文档</div>
        </div>
        <div class="techExchangeContent" @click="goCommonQuestionLink">
          <img src="@/static/images/ai/common-problem.png"/>
          <div>常见问题</div>
        </div>
        <div class="techExchangeContent mask">
          <img src="@/static/images/ai/community.png"/>
          <div class="rightBox">
            <div>社区</div>
            <div>暂未开放，敬请期待</div>
          </div>
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
     // 跳转开发文档
    goTechDoc() {
      window.open(jump.techDocLink);
    },
    // 跳转常见问题
    goCommonQuestionLink() {
      window.open(jump.commonQuestionLink);
    },
  },
  created() {
     
  },
}
</script>

<style lang='scss' scoped>
.productAdvBox {
  height: 520px;
  margin-top: 30px;
}
.techExchangeBox {
  display: flex;
  flex-direction: row;

  .techExchangeContent {
    width: 386px;
    height: 204px;
    background: #ffffff;
    border: 1px solid #ebf0f7;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    &:first-child {
      &:hover {
        cursor: pointer;
      }
    }

    &:nth-child(2) {
      &:hover {
        cursor: pointer;
      }
    }

    &:last-child {
      &:hover {
        cursor: not-allowed;
      }
    }

    img {
      width: 80px;
    }

    div {
      font-size: 24px;
      color: #1d7bff;
    }

    .tips {
      text-align: center;
      font-size: 36px;
    }
  }
}
// 遮罩层
.mask {
  background-color: #f5f7fa !important;
  color: #c0c4cc;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  text-align: center;
}
</style>