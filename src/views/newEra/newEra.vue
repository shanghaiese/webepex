<template>
  <div class="fixed">
    <div class="wrapper">
      <el-carousel :interval="4000" height="calc(100vh - 142px)" trigger="click" indicator-position="none">
        <el-carousel-item v-for="(item,key) in imgData" :key="key">
          <div class="car_item" :style="{'backgroundImage': 'url(' + item.url + ')'}"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Te from "@/api/squainApi.js";
export default {
  data() {
    return {
      imgData: [
        {
          url: require("@/assets/img/newEra/1.jpg")
        },
        {
          url: require("@/assets/img/newEra/2.jpg")
        },
        {
          url: require("@/assets/img/newEra/3.jpg")
        },
        {
          url: require("@/assets/img/newEra/4.jpg")
        },
        {
          url: require("@/assets/img/newEra/5.jpg")
        },
        {
          url: require("@/assets/img/newEra/6.jpg")
        },
        {
          url: require("@/assets/img/newEra/7.jpg")
        },
        {
          url: require("@/assets/img/newEra/8.jpg")
        },
        {
          url: require("@/assets/img/newEra/9.jpg")
        },
        {
          url: require("@/assets/img/newEra/10.jpg")
        },
        {
          url: require("@/assets/img/newEra/11.jpg")
        },
        {
          url: require("@/assets/img/newEra/12.jpg")
        },
        {
          url: require("@/assets/img/newEra/13.jpg")
        },
        {
          url: require("@/assets/img/newEra/14.jpg")
        }
      ]
    };
  },
  created() {
    this.$store.commit("editIndex", { info: "newEra" });
  }
};
</script>

<style lang="less" scoped>
.fixed {
  width: 100%;
  height: calc(100vh - 142px);
  overflow: hidden;
  background: #f7f5e9;
  .wrapper {
      width:1440px;
      margin: 0 auto;
  }
}
.car_item {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
