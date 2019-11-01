<template>
  <div class="box">
    <div class="top">企业认证</div>
    <el-form ref="form" :model="form" :rules="rules" class="form" label-width="120px">
      <el-form-item label="企业名称" prop="enterpriseName">
        <el-input v-model="form.enterpriseName"></el-input>
      </el-form-item>

      <el-form-item label="企业简称" prop="shortName">
        <el-input v-model="form.shortName"></el-input>
      </el-form-item>

      <el-form-item label="成立日期" prop="buildTime">
          <el-date-picker 
            type="date" 
            placeholder="选择日期" 
            v-model="form.buildTime" 
            value-format="timestamp"
            style="width: 100%;">
          </el-date-picker>
      </el-form-item>

      <el-form-item label="法人姓名" prop="legalPersonName">
        <el-input v-model="form.legalPersonName"></el-input>
      </el-form-item>

      <el-form-item label="企业注册地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>

      <el-form-item label="企业联系人" prop="contact">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>

      <el-form-item label="企业联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="法人身份证" class="idCard" prop="idCard">
        <el-upload
          :action="actionUrl"
          list-type="picture-card"
          :limit= "1"
          :on-preview="idCardFrontPreview"
          :on-success="idCardFrontSuccess"
          :on-remove="idCardFrontRemove">
          <i class="el-icon-plus"></i>
          <span>上传身份证正面</span>
        </el-upload>
        <el-dialog :visible.sync="idCardFrontDialogVisible">
          <img width="100%" :src="idCardFrontImageUrl" alt="">
        </el-dialog>

        <el-upload
          class="background"
          :action="actionUrl"
          list-type="picture-card"
          :limit= "1"
          :on-preview="idCardVersoPreview"
          :on-success="idCardVersoSuccess"
          :on-remove="idCardVersoRemove">
          <i class="el-icon-plus"></i>
          <span>上传身份证背面</span>
        </el-upload>
        <el-dialog :visible.sync="idCardVersoDialogVisible">
          <img width="100%" :src="idCardVersoImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="营业执照" class="businessLicense" prop="businessLicense">
        <el-upload
          :action="actionUrl"
          list-type="picture-card"
          :limit="1"
          :on-preview="businessLicensePreview"
          :on-remove="businessLicenseRemove"
          :on-success="businessLicenseSuccess">
          <i class="el-icon-plus"></i>
          <span>上传图片</span>
        </el-upload>
        <el-dialog :visible.sync="businessLicenseDialogVisible">
          <img width="100%" :src="businessLicenseImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="开户许可证" class="permit">
        <el-upload
          :action="actionUrl"
          list-type="picture-card"
          :limit="1"
          :on-preview="permitPreview"
          :on-success="permitSuccess"
          :on-remove="permitRemove">
          <i class="el-icon-plus"></i>
          <span>上传图片</span>
        </el-upload>
        <el-dialog :visible.sync="permitLicenseDialogVisible">
          <img width="100%" :src="permitLicenseImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="其他" class="other">
        <el-upload
          :action="actionUrl"
          list-type="picture-card"
          multiple
          :limit="10"
          :on-preview="otherPreview"
          :on-success="otherSuccess"
          :on-remove="otherRemove">
          <i class="el-icon-plus"></i>
          <span>上传图片</span>
        </el-upload>
        <el-dialog :visible.sync="otherLicenseDialogVisible">
          <img width="100%" :src="otherLicenseImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <div class="check">
          <el-checkbox @change="checkboxChange" v-model="form.checked">
          </el-checkbox>
              &nbsp;&nbsp;同意并遵守，<span @click="toDigitalAgreement" style="color: #CAA14F">《数字证书服务协议》</span>
      </div>

      <el-form-item>
        <div class="enter" :class="{gray: isCheck, yellow: !isCheck}" @click="enter('form')">
          提交认证申请
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "@/api/taotaozi_api.js";
export default {
  data() {
    // 手机表单验证validator
    var validPhone = (rule, value,callback)=>{
        if (!value){
            callback(new Error('请输入电话号码'))
        }
        else if (!this.isvalidPhone(value)) {
          callback(new Error('请输入正确的11位手机号码'))
        }
        else {
            callback()
        }
    }
    // 身份证自定义表单验证validator
    var validIdCard = (rule, value,callback)=>{
        if (!this.isFrontUpload) {
            callback(new Error('请上传身份证正面'))
        }
        if (!this.isVersoUpload) {
            callback(new Error('请上传身份证背面'))
        }
        else {
            console.log("验证成功!")
            callback();
        }
    }
    // 营业执照自定义表单验证validator
    var validBusiness = (rule, value,callback)=>{
        if (!this.isLicenseIdUpload) {
            callback(new Error('请上传营业执照'))
        }
        else {
            console.log("验证成功!")
            callback();
        }
    }
    return {
      isCheck: false, // 是否选中用户协议
      idCardFrontDialogVisible: false, //身份证正面预览框
      idCardVersoDialogVisible: false, //身份证背面预览框
      businessLicenseDialogVisible: false, //营业执照预览框
      permitLicenseDialogVisible: false, //许可证预览框
      otherLicenseDialogVisible: false, //其他预览框
      idCardFrontImageUrl: '', //预览图url地址系列
      idCardVersoImageUrl: '',
      businessLicenseImageUrl: '',
      permitLicenseImageUrl: '',
      otherLicenseImageUrl: '',
      isFrontUpload: false,// 是否上传身份证正面
      isVersoUpload: false,// 是否上传身份证背面
      isLicenseIdUpload: false,// 是否上传营业执照
      form: {
        enterpriseName: '氨基酸', //企业名称
        shortName: 'sdg水电费',  //企业简称
        buildTime: '',
        legalPersonName: '搜索', //法人姓名
        address: '阿所发生的', //地址
        contact: '是的', //企业联系人
        phone: '18210549786', //企业联系电话
        idCardFront: '',  // 身份证正面
        idCardVerso: '', // 身份证反面
        licenseId: '', //营业执照
        permitId: '', // 许可证
        docOther: [], //其他
        checked: true
      },
      actionUrl: '', //图片上传地址
      rules: {
        enterpriseName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        shortName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        buildTime: [
            { required: true, message: '请选择日期', trigger: 'change' }
        ],
        legalPersonName: [
            { required: true, message: '请输入法人姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        address: [
            { required: true, message: '请输入企业注册地址', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        contact: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        phone: [
            { required: true,  trigger: 'blur', validator: validPhone}
        ],
        idCard: [
            { trigger: 'change', validator: validIdCard },
        ],
        businessLicense: [
            { trigger: 'change', validator: validBusiness },
        ],
      }
    }
  },

  created () {
    this.$store.commit("editIndex", {info: "enterpriseQualifing"});
    this.actionUrl = this.$store.state.states.baseUrl + '/greenland/resources/upload';
  },

  methods: {
    toDigitalAgreement () {
        const { href } = this.$router.resolve({
            path: '/digitalAgreement'
        });
        window.open(href, '_blank');
    },
    // 验证手机正则
    isvalidPhone (str) {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      return reg.test(str)
    },
    // 用户协议是否勾选
    checkboxChange (status) {
        // console.log(status)
        if (status) {
            this.isCheck = false;
        } else {
            this.isCheck = true;
        }
    },
    // 移除已上传图片(可通用方法)
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 身份证正面系列
    // 预览
    idCardFrontPreview(file) {
      this.idCardFrontImageUrl = file.url;
      this.idCardFrontDialogVisible = true;
    },
    // 上传成功钩子
    idCardFrontSuccess (response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.isFrontUpload = true;
      this.form.idCardFront = response.data.id;
    },
    // 移除已上传图片
    idCardFrontRemove(file, fileList) {
      console.log(file, fileList);
      this.isFrontUpload = false;
      this.form.idCardFront = '';
    },
    // 身份证背面系列
    // 预览
    idCardVersoPreview(file) {
      this.idCardVersoImageUrl = file.url;
      this.idCardVersoDialogVisible = true;
    },
    // 上传成功钩子
    idCardVersoSuccess (response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.isVersoUpload = true;
      this.form.idCardVerso = response.data.id;
    },
    // 移除已上传图片
    idCardVersoRemove(file, fileList) {
      console.log(file, fileList);
      this.isVersoUpload = false;
      this.form.idCardVerso = '';
    },
    // 营业执照系列
    //营业执照预览
    businessLicensePreview (file) {
      this.businessLicenseImageUrl = file.url;
      this.businessLicenseDialogVisible = true;
    },
    // 营业执照上传成功钩子
    businessLicenseSuccess (response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.isLicenseIdUpload = true;
      this.form.licenseId = response.data.id;
    },
    // 移除已上传图片
    businessLicenseRemove(file, fileList) {
      console.log(file, fileList);
      this.isLicenseIdUpload = false;
      this.form.licenseId = '';
    },
    //许可证系列
    //许可证预览
    permitPreview (file) {
      this.permitLicenseImageUrl = file.url;
      this.permitLicenseDialogVisible = true;
    },
    // 上传成功钩子
    permitSuccess (response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.form.permitId = response.data.id;
    },
    // 移除已上传图片
    permitRemove(file, fileList) {
      console.log(file, fileList);
      this.form.permitId = '';
    },
    // 其他系列
    //其他预览
    otherPreview (file) {
      this.otherLicenseImageUrl = file.url;
      this.otherLicenseDialogVisible = true;
    },
    // 上传成功钩子
    otherSuccess (response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.form.docOther = []; //先置空
      fileList.forEach(v => {
        // console.log(v.response.data.id)
        this.form.docOther.push(v.response.data.id);
      });
    },
    // 移除已上传图片
    otherRemove(file, fileList) {
      console.log(file, fileList);
      this.form.docOther = []; //先置空
      fileList.forEach(v => {
        this.form.docOther.push(v.response.data.id);
      });
    },
    // 提叫表单
    enter (formName) {
        // 没有勾选用户协议,无法注册
        if (this.isCheck) {
            console.log(11111)
            return false;
        }
        console.log(this.form)
        console.log(222222222222222)
        this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.companyCertification(this.form)
              .then(res=>{
                  console.log(res);
                  if (res.code ===200) {
                    this.$router.push('/enterpriseQualfingStatusForSuccess');
                  } else {
                    // sessionStorage.setItem('enterpriseQualifingForm', JSON.stringify(this.form));
                    this.$message({
                      showClose: true,
                      message: res.message,
                      type: 'error'
                    });
                  }
              })
              .catch(err=>{
                  // console.log(err);
                  console.dir(err);
              })
            } 
            else {
                console.log('valid验证不通过');
                return false;
            }
        });
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
      // 身份证上传框
      .idCard {
        .background {
          margin-top: 20px;
        }
        // 添加小红点
        /deep/.el-form-item__label:before {
          content: '*';
          color: #f56c6c;
          margin-right: 4px;
        }
        // 已经上传图片框
        /deep/.el-upload-list--picture-card .el-upload-list__item {
          width: 180px;
          height: 114px;
        }
        // 未上传图片框
        /deep/.el-upload--picture-card {
          width: 180px;
          height: 114px;
        }
        // 设置说明文本(上传图片)
        /deep/.el-upload {
          position: relative;
          /deep/.el-icon-plus {
            transform: translateY(-20PX)
          }
          span {
            z-index: 1;
            height: 50px;
            position: absolute;
            top: 4px;
            left: 40px;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
          }
        }
      }
      .businessLicense {
        // 添加小红点
        /deep/.el-form-item__label:before {
          content: '*';
          color: #f56c6c;
          margin-right: 4px;
        }
      }
      // 营业执照,开户证明,其他 上传框大小
      .businessLicense, .permit, .other{
        /deep/.el-upload {
          position: relative;
          span {
            z-index: 1;
            height: 50px;
            position: absolute;
            top: 28px;
            left: 47px;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
          }
        }
        /deep/.el-upload--picture-card {
          width: 148px;
          height: 148px;
        }
      }
      .check {
          font-size: 14px;
          margin-top: 20px;
          padding-left: 120px;
          span {
            cursor: pointer;
          }
      }
      .enter {
          text-align: center;
          margin-top: 65px;
          margin-bottom: 71px;
          height: 40px;
          line-height: 40px;
          // background-color: #CAA14F;
          font-size: 14px;
          text-align: center;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(255,255,255,1);
          border-radius:2px;
      }
      .gray {
          background-color: #666;
      }
      .yellow {
          background-color: #CAA14F;
      }
      .yellow:hover {
          background:rgba(181,144,70,1);
          border-radius:2px;
          cursor: pointer;
      }
    }
  }
</style>