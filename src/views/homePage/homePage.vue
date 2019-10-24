<template>
  <div>
    <el-carousel :interval="5000" arrow="never" height="calc(100vh - 142px)" trigger="click">
      <el-carousel-item v-for="(item,key) in imgData" :key="key">
         <div class="car_item" :style="{'backgroundImage': 'url(' + item.url + ')'}"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      imgData: [
        {
          url:'/static/img/correct.png'
        },
        {
          url:'/static/img/person.png'
        },
        {
          url:'/static/img/test.png'
        }
      ]
    }
  },
  created() {
    this.$store.commit("editIndex", {info: "homePage"});
  }
};
</script>

<style lang="less" scoped>
.car_item {
  width:100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
