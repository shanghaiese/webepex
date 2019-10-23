<template>
  <div>
    <el-carousel :interval="5000" arrow="never" height="calc(100vh - 142px)" trigger="click">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {}
  },
  created() {
    this.$store.commit("editIndex", {info: 1});
  }
};
</script>

<style lang="less" scoped>

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 30px;
    margin: 0;
    text-align: center;
    line-height: 100%;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
