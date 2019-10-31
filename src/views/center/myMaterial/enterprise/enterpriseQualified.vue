<template>
  <div class="box">
    <div class="top">企业信息</div>
    <el-form ref="form" :model="form" class="form" label-width="110px">
      <el-form-item label="注册类型">
        <div style="padding-left:14px">
          <span v-if="isShow2">我是开发商</span> &nbsp;
          <span v-if="isShow3">我是运营商</span> &nbsp;
          <span v-if="isShow4">我是买家</span> &nbsp;
          <span v-if="isShow5">其他 <span>:{{remark}}</span> </span> 
        </div>
      </el-form-item>

      <el-form-item label="企业名称">
        <el-input v-model="form.enterpriseName" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="企业机构代码">
        <el-input v-model="form.certificate" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="注册手机号">
        <el-input v-model="form.loginName" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="企业简称">
        <el-input v-model="form.shortName" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="成立日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.buildTime" style="width: 100%;" :disabled="true"></el-date-picker>
      </el-form-item>

      <el-form-item label="法人姓名">
        <el-input v-model="form.legalPersonName" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="企业注册地址">
        <el-input v-model="form.address" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="企业联系人">
        <el-input v-model="form.contact" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="企业联系电话">
        <el-input v-model="form.phone" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="法人身份证" class="idCard">
          <img :src="srcFront" alt="">
          <img :src="srcVerso" alt="">
      </el-form-item>

      <el-form-item label="营业执照" class="businessLicense">
         <img :src="srcLicense" alt="">
      </el-form-item>

      <el-form-item label="开户许可证" class="permit">
          <img :src="srcPermit" alt="">
      </el-form-item>

      <el-form-item label="其他" class="other">
          <!-- <img :src="srcOther" alt=""> -->
          <!-- <img :src="srcPermit" alt="">
          <img :src="srcPermit" alt="">
          <img :src="srcPermit" alt=""> -->
          <div v-for="item in srcOther" class="pic">
            <img :src=item.url alt="">
          </div>
      </el-form-item>

      <el-form-item label="" class="check">
          同意并遵守，<span  @click="toDigitalAgreement" style="color: #CAA14F">《数字证书授权协议》</span>
      </el-form-item>

    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "@/api/taotaozi_api.js";
export default {
  data() {
    return {
      form: {
        checkList: ['我是开发商'], //注册类型
        enterpriseName: '上海某某信息技术有限公司',
        certificate: '123', //企业机构代码
        loginName: '18210549786', //注册手机号
        shortName: '某某',
        buildTime: 'Tue Oct 01 2019 00:00:00 GMT+0800 (中国标准时间)',
        legalPersonName: '张三',
        address: '上海市黄浦区龙华东路868号',
        contact: '李甜',
        phone: '15266272727'
      },
      srcFront: '', //身份证正面图片展示
      srcVerso: '', //身份证背面图片展示
      srcPermit: '', //许可证
      srcLicense: '', //营业执照
      srcOther: [], //其他
      isShow2: '', //开发商
      isShow3: '', //...
      isShow4: '',
      isShow5: '', //其他
      remark: '' //其他备注
    }
  },

  created () {
    this.$store.commit("editIndex", {info: "enterpriseQualified"});
    this.getInfo();
  },

  methods: {
    toDigitalAgreement () {
        const { href } = this.$router.resolve({
            path: '/digitalAgreement'
        });
        window.open(href, '_blank');
    },
    getInfo () {
      axios.getCompanyCertificationInfo({})
      .then(res=>{
          console.log(res);
          if (res.code === 200) {
             this.form = res.data;
             // 图片展示赋值
             this.srcFront = res.data.idCardFront.url;
             this.srcVerso = res.data.idCardVerso.url;
             this.srcPermit = res.data.permitId.url;
             this.srcLicense = res.data.licenseId.url;
             this.srcOther = res.data.docOther;
            //  注册类型展示
             this.form.role.forEach(v => {
               switch (v.id) {
                 case 2:
                   this.isShow2 = true;
                   break;
                 case 3:
                   this.isShow3 = true;
                   break;
                 case 4:
                   this.isShow4 = true;
                   break;
                 case 5:
                   this.isShow5 = true;
                   this.remark = v.remark;
                   break;
                 default:
                   break;
               }
             });
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
        .pic {
          float: left;
        }
      }
      img {
        padding-left: 15px;
      }
      .check {
        padding-left: 15px;
          span {
            cursor: pointer;
          }
      }
    }
  }
</style>