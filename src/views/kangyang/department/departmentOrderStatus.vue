<template>
  <div>
    <div class="box">
    <div class="icon">
    </div>
    <div class="text">
      提交订单成功
    </div>
    <div class="text2">
      <span>如有疑问或需求，</span>
      <span class="link">联系客服</span>
    </div>
    <div class="button_wrapper">
      <el-button type="primary" @click="$router.push('/homepage')">首页</el-button>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vSideBar from "@/components/sideBar/sideBar";
export default {
  data () {
    return {}
  },
  created () {
    this.$store.commit("editIndex", {info: "departmentOrderStatus"});
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
      width: 48px;
      height: 48px;
      background: url(../../../assets/img/correct.png) no-repeat;
      background-size: contain;
    }
    .text {
      margin: 24px 0 16px 0;
      height:20px;
      font-size:20px;
      font-family:PingFangSC-Light,PingFang SC;
      font-weight:300;
      color:#333333;
      line-height:20px;
    }
    .text2 {
      font-size: 14px;
      color: #333333;
      margin-bottom: 64px;
      .link{
        color: #CAA14F;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .button_wrapper{
      text-align: center;
      .el-button{
        width:160px;
        height: 40px;
      }
    }
    
  }
  </style>