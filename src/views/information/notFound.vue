<template>
  <div>
      <div class="wrapper">
          <div class="title">服务不可用</div>
          <div class="info">请稍候再试或联系<span>本站客服</span></div>
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
    background: url(../../assets/img/error.png) no-repeat;
    background-size: 206px auto;
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
}
</style>