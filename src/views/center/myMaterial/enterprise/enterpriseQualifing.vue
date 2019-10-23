<template>
  <div class="box">
    <div class="top">企业认证</div>
    <el-form ref="form" :model="form" :rules="rules" class="form" label-width="110px">
      <el-form-item label="企业名称" prop="businessName">
        <el-input v-model="form.businessName"></el-input>
      </el-form-item>

      <el-form-item label="企业简称" prop="businessAbbreviation">
        <el-input v-model="form.businessAbbreviation"></el-input>
      </el-form-item>

      <el-form-item label="选择日期" prop="date">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item label="法人姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="企业注册地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>

      <el-form-item label="企业联系人" prop="Contact">
        <el-input v-model="form.Contact"></el-input>
      </el-form-item>

      <el-form-item label="企业联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="法人身份证" class="idCard" prop="idCard">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="idCardLicenseDialogVisible">
          <img width="100%" :src="form.idCardLicenseImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="营业执照" class="businessLicense" prop="businessLicense">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="businessLicenseDialogVisible">
          <img width="100%" :src="form.businessLicenseImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="开户许可证" class="permit">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="permitLicenseDialogVisible">
          <img width="100%" :src="form.permitLicenseImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="其他" class="other">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="otherLicenseDialogVisible">
          <img width="100%" :src="form.otherLicenseImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <div class="check">
          <el-checkbox v-model="form.checked">
              同意并遵守，<span style="color: #CAA14F">《数字证书授权协议》</span>
          </el-checkbox>
      </div>

      <el-form-item>
        <div class="enter" @click="enter('form')">
          提交认证申请
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      idCardLicenseDialogVisible: false, //身份证预览框
      businessLicenseDialogVisible: false, //营业执照预览框
      permitLicenseDialogVisible: false, //许可证预览框
      otherLicenseDialogVisible: false, //其他预览框
      form: {
        businessName: '',
        businessAbbreviation: '',
        date: '',
        name: '',
        address: '',
        Contact: '',
        phone: '',
        idCardLicenseImageUrl: '',
        businessLicenseImageUrl: '',
        permitLicenseImageUrl: '',
        otherLicenseImageUrl: '',
        checked: ''
      },
      rules: {
        businessName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        businessAbbreviation: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        name: [
            { required: true, message: '请输入法人姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        address: [
            { required: true, message: '请输入企业注册地址', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        Contact: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在11字符', trigger: 'blur' }
        ],
        idCard: [
            { required: true, message: '请上传法人身份证', trigger: 'change' },
        ],
        businessLicense: [
            { required: true, message: '请上传营业执照', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    enter (formName) {
        console.log(this.form)
        this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
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
      .businessLicense, .permit, .other{
        /deep/.el-upload--picture-card {
          width: 148px;
          height: 148px;
        }
      }
      .check {
          font-size: 14px;
          margin-top: 20px;
          padding-left: 100px;
              /deep/.el-checkbox__input.is-checked+.el-checkbox__label {
          color: #333;
          }
              /deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #CAA14F;
          border-color: #CAA14F;
          }
      }
      .enter {
          text-align: center;
          margin-top: 65px;
          margin-bottom: 71px;
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
  }
</style>