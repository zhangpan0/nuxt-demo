<!--  -->
<template>
    <section>
      <div>this is Home</div>
      <nuxt-link :to="{name:'about'}">去about</nuxt-link>
      <p>NewID:{{$route.params.newsId}}</p>
      <ul>
        <li><nuxt-link to="/about/132">About-1</nuxt-link></li>
        <li><nuxt-link to="/about/a">About-2</nuxt-link></li>
      </ul>
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
</style>