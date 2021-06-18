<!--  -->
<template>
  <section>
    <div class="login-head">
      <div class="login-head-box">
        <img src="~@/assets/image/logo.png" alt="">
        <div class="logo-title">智慧视频分析平台</div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name:'MyHeader',
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
.login-head {
    height: 70px;
    background-color: #ffffff;
    .login-head-box {
      display: flex;
      width: 1200px;
      margin: 0 auto;
      height: 70px;
      align-items: center;
      .logo-title {
        color: #666666;
        font-size: 14px;
        padding-left: 20px;
        margin-left: 20px;
        border-left: 1px solid #666666;
      }
    }
  }
</style>