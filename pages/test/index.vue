<!--  -->
<template>
    <section>
      test
      <button @click="goBack">返回 home</button>
    </section>
</template>

<script>

export default {
  transition:'test',
  data() {
    return {
       
    };
  },
  methods: {
     goBack () {
       this.$router.push('/home');
     }
  },
  created() {
     
  },
}
</script>

<style lang='scss' scoped>
</style>