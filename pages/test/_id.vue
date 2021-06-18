<!--  -->
<template>
    <section>
     this is id: {{ $route.params.id}}
    </section>
</template>

<script>

export default {
  validate({params}){
    console.log(params);
      // Must be a number
      return /^\d+$/.test(params.id)
  },
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