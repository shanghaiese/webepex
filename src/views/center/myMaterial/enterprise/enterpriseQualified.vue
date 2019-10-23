<template>
  <div class="box">
    <div class="top">企业信息</div>
    <el-form ref="form" :model="form" class="form" label-width="110px">
      <el-form-item label="企业名称">
        <el-input v-model="form.businessName" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="企业简称">
        <el-input v-model="form.businessAbbreviation" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="选择日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;" :disabled="true"></el-date-picker>
      </el-form-item>

      <el-form-item label="法人姓名">
        <el-input v-model="form.name" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="企业注册地址">
        <el-input v-model="form.address" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="企业联系人">
        <el-input v-model="form.Contact" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="企业联系电话">
        <el-input v-model="form.phone" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="法人身份证" class="idCard">
        <img src="../../../../assets/img/idcard1.png" alt="">
      </el-form-item>

      <el-form-item label="营业执照" class="businessLicense">
        <img src="../../../../assets/img/person.png" alt="">
      </el-form-item>

      <el-form-item label="开户许可证" class="permit">
          <img src="../../../../assets/img/person.png" alt="">
      </el-form-item>

      <el-form-item label="其他" class="other">
          <img src="../../../../assets/img/person.png" alt="">
      </el-form-item>

      <el-form-item label="" class="check">
          同意并遵守，<span style="color: #CAA14F">《数字证书授权协议》</span>
      </el-form-item>

    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      form: {
        businessName: '上海某某信息技术有限公司',
        businessAbbreviation: '某某',
        date: 'Tue Oct 01 2019 00:00:00 GMT+0800 (中国标准时间)',
        name: '张三',
        address: '上海市黄浦区龙华东路868号',
        Contact: '李甜',
        phone: '15266272727',
        idCardLicenseImageUrl: '',
        businessLicenseImageUrl: '',
        permitLicenseImageUrl: '',
        otherLicenseImageUrl: '',
        checked: ''
      },
    }
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