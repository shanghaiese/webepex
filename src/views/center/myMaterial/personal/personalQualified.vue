<template>
  <div class="box">
    <div class="top">个人认证</div>
    <el-form ref="form" :model="form" class="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.realName" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="身份证号">
        <el-input v-model="form.identity" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="银行卡号">
        <el-input v-model="form.cardNo" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="银行预留手机号">
        <el-input v-model="form.phone" :disabled="true"></el-input>
      </el-form-item>

      <!-- <el-form-item label="身份证上传" class="idCard">
        <img :src="srcFront" alt="">
        <img :src="srcVerso" alt="">
      </el-form-item> -->

      <!-- <el-form-item label="" class="check">
          同意并遵守，<span style="color: #CAA14F">《数字证书服务协议》</span>
      </el-form-item> -->

    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "@/api/taotaozi_api.js";
export default {
  data() {
    return {
      form: {
        realName: '',
        identity: '',
        cardNo: '',
        phone: '',
        idCardLicenseImageUrl: '',
        photos: [] //身份证图片正反面信息
      },
      srcFront: '', //身份证正面图片展示
      srcVerso: '' //身份证背面图片展示
    }
  },

  created () {
    this.$store.commit("editIndex", {info: "personalQualified"});
    this.getInfo();
  },

  methods: {
    getInfo () {
      axios.getPersonalCertificationInfo({})
      .then(res=>{
          console.log(res);
          if (res.code === 200) {
             this.form = res.data;
             this.srcFront = res.data.photos[0].url;
             this.srcVerso = res.data.photos[1].url;
          }
      })
      .catch(err=>{
          console.log(err);
      })
    }
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
      // 添加小红点
      /deep/.el-form-item__label:before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
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