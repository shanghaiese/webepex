<template>
  <div class="box">
    <div class="icon">
    </div>
    <div class="text">
      认证失败
    </div>
    <div class="info">
      {{text}}，<span>联系客服</span>
    </div>
    <div class="foot">
      <div class="homepage" @click="$router.push('/homepage')">首页</div>
      <div class="modify" @click="modify">立即修改</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  created () {
    this.$store.commit("editIndex", {info: "personalQualifingStatusForFail"});
    this.text = this.$route.params.text;
    console.log(this.$route)
  },

  data() {
    return {
      text: '失败原因：因为证件不清晰，请上传清晰证件'
    }
  },

  methods: {
    modify () {
      // this.$router.push('/personalQualifing')
      this.$router.push({
        name: 'personalQualifing',
        params: {
          realName: this.$route.params.realName, //姓名
          identity: this.$route.params.identity, //身份证
          cardNo: this.$route.params.cardNo, //银行卡号
          phone: this.$route.params.phone, //手机号
          phoneCaptcha: this.$route.params.phoneCaptcha, //短信验证am
          checked: this.$route.params.checked
        }
      })
    }
  }
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
      background: url(./../../../../assets/img/fail.png) no-repeat;
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
        // cursor: pointer;
      }
    }
    .foot {
        margin-top: 64px;
        overflow: hidden;
        .homepage {
          margin-left: 24px;
          cursor: pointer;
          box-sizing: border-box;
          height: 40px;
          line-height: 40px;
          border: 1px solid #CAA14F;
          float: left;
          width: 160px;
          font-size:14px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(202,161,79,1);
        }
        .modify {
          margin-right: 24px;
          cursor: pointer;
          box-sizing: border-box;
          height: 40px;
          line-height: 40px;
          background:rgba(202,161,79,1);
          float: right;
          width: 160px;
          font-size:14px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
    }
  }
</style>