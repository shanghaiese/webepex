<template>
  <div class="fixed">
    <el-carousel :interval="5000" arrow="hover" height="calc(100vh - 72px)" trigger="hover">
      <el-carousel-item v-for="(item,key) in imgData" :key="key">
         <div class="car_item" :style="{'backgroundImage': 'url(' + item.url + ')'}" @click="goOn(key)"></div>
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
          url: require('@/assets/img/carousel_item6.jpg')
        },
        {
          url: require('@/assets/img/carousel_item1.jpg')
        },
        {
          url:require('@/assets/img/carousel_item2.jpg')
        },
        {
          url:require('@/assets/img/carousel_item3.jpg')
        },
        {
          url:require('@/assets/img/carousel_item4.jpg')
        },
        {
          url:require('@/assets/img/carousel_item5.jpg')
        }
      ]
    }
  },
  created() {
    this.$store.commit("editIndex", {info: "homePage"});
  },
  methods: {
    goOn(index) {
      // return true;
      switch (index) {
        case 0:
          this.$router.push("/aboutUs");
          break;
        case 1:
          this.$router.push("/departmentList");
          break;
        case 2:
          // 70平详情 锚点到配套服务
          window.sessionStorage.setItem("squain_apartmentId",1);
          window.sessionStorage.setItem("squain_layoutId",2);
          this.$router.push({ name: 'departmentDetail', params: { index: 'second',position:830 }});
          break;
        case 3:
           // 70平详情页
          window.sessionStorage.setItem("squain_apartmentId",1);
          window.sessionStorage.setItem("squain_layoutId",2);
           this.$router.push({ name: 'departmentDetail', params: { index: 'first',position:830 }});
          break;
        case 4:
          // 80平详情页
          window.sessionStorage.setItem("squain_apartmentId",1);
          window.sessionStorage.setItem("squain_layoutId",1);
           this.$router.push({ name: 'departmentDetail', params: { index: 'first',position:830 }});
          break;
        case 5:
           // 80平详情页 锚点到配套服务；
          window.sessionStorage.setItem("squain_apartmentId",1);
          window.sessionStorage.setItem("squain_layoutId",1);   
           this.$router.push({ name: 'departmentDetail', params: { index: 'second',position:830 }});
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /deep/.el-carousel__button {
    width:8px;
    height: 8px;
    border-radius: 50%;
  }
}
.car_item {
  width:100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  &:hover{
    cursor: pointer;
  }
}
</style>
