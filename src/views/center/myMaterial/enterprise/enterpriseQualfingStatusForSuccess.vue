<template>
  <div class="box">
    <div class="icon">
    </div>
    <div class="text">
      提交成功，等待审核
    </div>
    <div class="info">
      审核结果将在3个工作日内，通过客服联系通知，<span style="color: #CAA14F">联系客服</span>
    </div>
    <div class="enter" @click="$router.push('/homepage')">
      首页
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  created () {
    this.$store.commit("editIndex", {info: "enterpriseQualfingStatusForSuccess"});
  },

};
</script>

<style lang="less" scoped>
  .box {
    width: 400px;
    margin: 0 auto;
    padding-top: 165px;
    text-align: center;
    .icon {
      margin: 0 auto;
      width: 46px;
      height: 46px;
      background: url(./../../../../assets/img/correct.png) no-repeat;
      background-size: contain;
    }
    .text {
      margin-top: 28px;
      height:20px;
      font-size:20px;
      font-family:PingFangSC-Light,PingFang SC;
      font-weight:300;
      color:rgba(51,51,51,1);
      line-height:20px;
    }
    .info {
      margin-top: 16px;
      height:14px;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:14px;
      span{
        cursor: pointer;
      }
    }
    .enter {
        text-align: center;
        margin: 64px auto 0;
        width: 160px;
        height: 40px;
        line-height: 40px;
        background-color: #CAA14F;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
    .enter:hover {
        background:rgba(181,144,70,1);
        border-radius:2px;
        cursor: pointer;
    }
  }
</style>