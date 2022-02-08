<template>
  <div class="bottom-copyright-box">
    <div class="copy-right">
      Copyright Since 1997 盛视科技股份有限公司
    </div>
    <a
      class="copy-right cursor"
      href="https://beian.miit.gov.cn/"
      target="_blank"
    >
      粤ICP备09136412号-1
    </a>
  </div>
</template>

<script>
export default {
  name: "CopyRight",
  data() {
    return {};
  },
  computed: {
  },
  methods: {},
};
</script>

<style scoped>
.bottom-copyright-box {
  display: flex;
  justify-content: center;
}
.copy-right {
  font-size: 14px;
  margin-right: 18px;
  color: #020202;
  padding-top: 20px;
}
.cursor:hover {
  color: #000;
  opacity: 1;
  text-decoration: underline;
}
</style>
