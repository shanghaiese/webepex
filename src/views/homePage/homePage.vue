<template>
  <div class="fixed">
    <el-carousel :interval="5000" arrow="never" height="calc(100vh - 72px)" trigger="click">
      <el-carousel-item v-for="(item,key) in imgData" :key="key">
         <div class="car_item" :style="{'backgroundImage': 'url(' + item.url + ')'}"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script type="text/ecmascript-6">
import Te from "@/api/squainApi.js";
export default {
  data() {
    return {
      imgData: [
        {
          url:'/static/img/carousel_item1.jpg'
        },
        {
          url:'/static/img/carousel_item2.jpg'
        },
        {
          url:'/static/img/carousel_item3.jpg'
        },
        {
          url:'/static/img/carousel_item4.jpg'
        },
        {
          url:'/static/img/carousel_item5.jpg'
        }
      ]
    }
  },
  created() {
    this.$store.commit("editIndex", {info: "homePage"});
    // Te.test({accessToken: 'piano_app'})
    //   .then(res=>{
    //       console.log(res);
    //   })
    //   .catch(err=>{
    //       console.log(err);
    //   })
    // alert(window.innerHeight);
  }
};
</script>

<style lang="less" scoped>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.car_item {
  width:100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
