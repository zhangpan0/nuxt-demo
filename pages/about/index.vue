<!-- 页面不能有注释 -->
<template>
    <section>
      about
      <div>
        <nuxt-link :to="{path:'/test/details', query:{id:10}}">go test id : path</nuxt-link>
      </div>
      <div>
        <nuxt-link :to="{name:'test-id', params:{id:11}}">go test id : name</nuxt-link>
      </div>
        <div @click="goTestId">go test id: name</div>
        <div @click="goTestId(1)">go test id: path</div>
    </section>
</template>

<script>

export default {
  data() {
    return {
       
    };
  },
  methods: {
     goTestId (msg) {
       if (msg) {
         this.$router.push({path:'/test/details',query:{id:11}});
       }else {
        this.$router.push({name:'test-id',params:{id:10}});
       }
     }
  },
  created() {
     
  },
}
</script>

<style lang='scss' scoped>
</style>