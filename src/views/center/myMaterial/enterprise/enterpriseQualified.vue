<template>
  <div class="box">
    <div class="enterStatus" style="width:600px;text-align:right;margin:30px 0 30px 0;font-weight:bold;font-style:italic;color:gray;">{{message}}</div>
    <div class="top">企业信息</div>
    <el-form ref="form" :model="form" class="form" label-width="110px">
      <el-form-item label="注册类型">
        <div style="padding-left:14px">
          <span v-if="isShow2">开发商</span> &nbsp;
          <span v-if="isShow3">运营商</span> &nbsp;
          <span v-if="isShow4">买家</span> &nbsp;
          <span v-if="isShow5">其他 <span>: {{remark}}</span> </span> 
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
          <img @click="preView('srcFront')" :src="srcFront" alt="">
          <img @click="preView('srcVerso')" :src="srcVerso" alt="">
      </el-form-item>

      <el-form-item label="营业执照" class="businessLicense">
         <img @click="preView('srcLicense')" :src="srcLicense" alt="">
      </el-form-item>

      <el-form-item label="开户许可证" class="permit">
          <img @click="preView('srcPermit')" :src="srcPermit" alt="">
      </el-form-item>

      <el-form-item label="其他" class="other">
          <!-- <img :src="srcOther" alt=""> -->
          <!-- <img :src="srcPermit" alt="">
          <img :src="srcPermit" alt="">
          <img :src="srcPermit" alt=""> -->
          <div v-for="(item, index) in srcOther" class="pic" :key="index">
            <img @click="otherPreView(index)" :src=item.url alt="">
          </div>
      </el-form-item>

      <el-form-item label="" class="check">
          <span  @click="toDigitalAgreement" style="color: #CAA14F">《数字证书服务协议》</span>
      </el-form-item>

    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
import axios from "@/api/taotaozi_api.js";
export default {
  data() {
    return {
      form: {
        checkList: [''], //注册类型
        enterpriseName: '',
        certificate: '', //企业机构代码
        loginName: '', //注册手机号
        shortName: '',
        buildTime: '',
        legalPersonName: '',
        address: '',
        contact: '',
        phone: ''
      },
      srcFront: '', //身份证正面图片展示
      srcVerso: '', //身份证背面图片展示
      srcPermit: '', //许可证
      srcLicense: '', //营业执照
      srcOther: [], //其他

      // 注册类型展示
      isShow2: '', //开发商
      isShow3: '', //...
      isShow4: '',
      isShow5: '', //其他
      remark: '', //其他备注

      // 图片预览框
      dialogVisible: false,
      dialogImageUrl: '',
      enterStatus:3
    }
  },

  created () {
    this.$store.commit("editIndex", {info: "enterpriseQualified"});
    this.getInfo();
  },
  computed:{
    message() {
      if(this.enterStatus===1) {
        return "已认证"
      }else {
        return "认证中"
      }
    }
  },
  methods: {
    toDigitalAgreement () {
        const { href } = this.$router.resolve({
            path: '/digitalAgreement'
        });
        window.open(href, '_blank');
    },
    preView (type) {
      switch (type) {
        case 'srcFront':
          this.dialogVisible = true;
          this.dialogImageUrl = this.srcFront;
          break;
        case 'srcVerso':
          this.dialogVisible = true;
          this.dialogImageUrl = this.srcVerso;
          break;
        case 'srcPermit':
          this.dialogVisible = true;
          this.dialogImageUrl = this.srcPermit;
          break;
        case 'srcLicense':
          this.dialogVisible = true;
          this.dialogImageUrl = this.srcLicense;
          break;
        default:
          break;
      }
    },
    otherPreView(index) {
      // console.log(index);
      this.dialogVisible = true;
      // console.log(this.srcOther[index])
      // console.log(this.srcOther)
      this.dialogImageUrl = this.srcOther[index].url;
    },
    getInfo () {
      axios.getCompanyCertificationInfo({})
      .then(res=>{
          console.log(res);
          if (res.code === 200) {
             this.enterStatus=res.data.status.id;
             this.form = res.data;
             this.remark = res.data.remark;
             // 图片展示赋值
             if (res.data.idCardFront) {
               this.srcFront = res.data.idCardFront.url;
             }
             if (res.data.idCardVerso) {
               this.srcVerso = res.data.idCardVerso.url;
             }
             if (res.data.permitId) {
               this.srcPermit = res.data.permitId.url;
             }
             if (res.data.licenseId) {
                this.srcLicense = res.data.licenseId.url;
             }
             if (res.data.docOther) {
                this.srcOther = res.data.docOther;
             }
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
      // margin-top: 56px;
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
      img {
        padding-left: 15px;
        width: 180px;
        height: 160px;
      }
      // 身份证
      .idCard {
        img {
          width: 178px;
          height: 108px;
        }
      }
      // 许可证
      .permit {
          // 小红点不显示
          /deep/.el-form-item__label:before {
            content: '';
            color: #f56c6c;
            margin-right: 0px;
          }
      }
      // 其他
      .other {
         // 小红点不显示
        /deep/.el-form-item__label:before {
            content: '';
            color: #f56c6c;
            margin-right: 0px;
        }
        margin-bottom: 0;
        .pic {
          float: left;
        }
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