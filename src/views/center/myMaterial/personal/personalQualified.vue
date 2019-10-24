<template>
  <div class="box">
    <div class="top">个人认证</div>
    <el-form ref="form" :model="form" class="form" label-width="110px">

      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="form.idCard" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="银行卡号" prop="bankCard">
        <el-input v-model="form.bankCard" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="银行预留手机号" prop="phone">
        <el-input v-model="form.phone" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="身份证上传" class="idCard" prop="businessName">
        <img src="../../../../assets/img/idcard1.png" alt="">
      </el-form-item>

      <!-- <el-form-item label="" class="check">
          同意并遵守，<span style="color: #CAA14F">《数字证书授权协议》</span>
      </el-form-item> -->

    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      form: {
        name: '李甜甜',
        idCard: '310097626262626262626262',
        bankCard: '6202202929227',
        phone: '15921280380',
        idCardLicenseImageUrl: '',
      }
    }
  },

  created () {
    this.$store.commit("editIndex", {info: "personalQualified"});
  },

  methods: {
  }
};
</script>

<style lang="less" scoped>
  .box {
    width: 500px;
    margin: 0 auto;
    .top {
      text-align: center;
      margin-top: 56px;
      margin-bottom: 24px;
      height:36px;
      font-size:24px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:36px;
    }
    .form {
      // input边框隐藏
      /deep/.el-input__inner {
        border: none;
      }
      // input边框禁用时样式颜色修改
      /deep/.el-input.is-disabled .el-input__inner {
        color: #333;
        background-color: #fff;
      }
      // input边框禁用时样式curosr修改
      /deep/.el-input.is-disabled .el-input__inner {
        cursor: default;
      }
      // 时间选择器禁用时样式curosr修改
      /deep/.el-input.is-disabled .el-input__icon {
        cursor: default;
      }
      .other {
        margin-bottom: 0;
      }
      img {
        padding-left: 15px;
      }
      .check {
        padding-left: 15px;
      }
    }
  }
</style>