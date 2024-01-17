<template>
  <div>
      <div class="wrapper">
          <div class="title">页面不存在！</div>
          <div class="info">返回<span class="active" @click="$router.push('/homePage')">首页</span></div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    created() {
        this.$store.commit("editIndex", { info: "notFound" });
    }
};
</script>

<style lang="less" scoped>
.wrapper{
    width: 600px;
    height: 250px;
    margin: 152px auto 0;
    background: url(../../assets/img/404.png) no-repeat;
    overflow: hidden;
    padding-left: 220px;
    box-sizing: border-box; 
    .title{
        margin: 88px 0 8px 30px;
        font-size: 20px;
        font-weight: bold;
        color: #333333;
    }
    .info {
        margin-left: 30px;
        font-size: 16px;
        color: #999999;
    }
    .active {
        color: #CAA14F;
        margin-left: 5px;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>