<template>
  <div class="box">
      <div class="title">【权易宝资产数字化服务平台】</div>
      <div class="title">法律信息</div>
      <div style="text-align: center; margin-top:20px;">版本生效时间：【2019年11月5日</div>
      <div class="info">权易宝平台由上海易涟信息技术有限公司运营，平台包含的全部智力成果包括但不限于数据库、网站设计、文字和图表、软件、照片、录像、音乐、声音及其前述组合，软件编译、相关源代码和软件（包括小应用程序和脚本） 的知识产权权利均归上海易涟信息技术有限公司所有，您在使用权易宝平台的过程中应当尊重以上知识产权，并按《用户注册服务协议》及《隐私政策》的要求使用平台服务。</div>
      <div class="info">如您对平台有任何疑问，可以通过以下方式联系我们</div>
      <div class="info">公司名称：上海易涟信息技术有限公司</div>
      <div class="info">联系邮箱：service@e-pex.com</div>
      <div class="info">联系电话：1360XXXXXXX</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
    this.$store.commit("editIndex", {info: "lawInfo"});
  },
};
</script>

<style lang="less" scoped>
  .box {
    width: 1200px;
    // height: 800px;
    margin: 0 auto;
    padding-top: 56px;
    // border: 1px solid #000;
    .title {
      text-align: center;
      height:36px;
      font-size:24px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:36px;
      font-weight: 700;
    }
    .info {
        margin-top: 10px;
        text-indent:2em;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
    }
    .info_center {
        margin-top: 10px;
        text-align: center;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
    }
  }
</style>
