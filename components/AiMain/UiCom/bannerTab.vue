<!--  -->
<template>
  <section>
    <div :class="isfixed == true ? 'fixed' : ''" id="fixedMenu" align="center">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        style="display:flex;width:60%"
      >
        <el-menu-item
          :index="item.id"
          v-for="item in titleList"
          :key="item.id"
          style="flex:1;text-align:center"
        >
          {{ item.title }}
          <!-- <a href="item.title">{{ item.title }}</a> -->
        </el-menu-item>
      </el-menu>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      activeIndex: "1",
      titleList: [
        {
          id: "1",
          title: "产品体验"
        },
        // {
        //   id: "2",
        //   title: "产品优势"
        // },
        // {
        //   id: "3",
        //   title: "应用场景"
        // },
        {
          id: "4",
          title: "产品价格"
        },
        {
          id: "5",
          title: "技术交流"
        },
        {
          id: "6",
          title: "相关推荐"
        }
      ],
      isfixed: false,
    };
  },
  methods: {
     handleSelect(key, keyPath) {
      if (key == "1") {
        const productTest = document.querySelector("#productTest");
        this.todom(productTest);
      } else if (key == "2") {
        const productAdv = document.querySelector("#productAdv");
        this.todom(productAdv);
      } else if (key == "3") {
        const applicationScenario = document.querySelector(
          "#applicationScenario"
        );
        this.todom(applicationScenario);
      } else if (key == "4") {
        const productPrice = document.querySelector("#productPrice");
        this.todom(productPrice);
      } else if (key == "5") {
        const techExchange = document.querySelector("#techExchange");
        this.todom(techExchange);
      } else if (key == "6") {
        const recommend = document.querySelector("#recommend");
        this.todom(recommend);
      }
    },
    // toEl 为指定跳转到该位置的DOM节点
    todom(toEl) {
      let bridge = toEl;
      let body = document.body;
      let height = 0;
      // 计算该 DOM 节点到 body 顶部距离
      do {
        height += bridge.offsetTop - 70;
        bridge = bridge.offsetParent;
      } while (bridge !== body);
      // 滚动到指定位置
      window.scrollTo({
        top: height,
        behavior: "smooth"
      });
    },
  },
  created() {
     
  },
}
</script>

<style lang='scss' scoped>
</style>