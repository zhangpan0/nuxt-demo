<!--  -->
<template>
    <section>
      <div>id {{$route.params.id}} </div>
    </section>
</template>

<script>

export default {
  validate({params}){
      // Must be a number
      return /^\d+$/.test(params.id)
  },
  async asyncData(context) {
    console.log(context);
      // let newsCode = context.route.params.code.split('-')[0]
      // let newsType = context.route.params.code.split('-')[1]
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