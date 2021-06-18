<template>
 <div>
  <h2 v-if="error.statusCode === 404">页面不存在</h2>
  <h2 v-else>页面发生了一个错误</h2>
  
  <nuxt-link to="/">返回首页</nuxt-link>
 </div>
</template>

<script>
export default {
 props: ["error"],
 layout: "err-page" // 可以为错误页面指定自定义的布局
}
</script>