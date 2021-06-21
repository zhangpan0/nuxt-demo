<template>
  <div class="container">
    <SwiperCom :list="banners" />
    <IndexCom />
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banners:[
        {src:require('@/assets/image/video/banner1.png'),link:"http://www.baidu.com"},
        {src:require('@/assets/image/video/banner2.png'),link:"http://www.baidu.com"},
      ]
    }
  },
  computed:{
  }
}
</script>

<style lang="scss" scoped>
.container {
  
}
</style>
