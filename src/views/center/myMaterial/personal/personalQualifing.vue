<template>
  <div class="box">
    <div class="top">个人认证</div>
    <el-form ref="form" :model="form" :rules="rules" class="form" label-width="120px">

      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="form.idCard"></el-input>
      </el-form-item>

      <el-form-item label="银行卡号" prop="bankCard">
        <el-input v-model="form.bankCard"></el-input>
      </el-form-item>

      <el-form-item label="银行预留手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="短信验证码" prop="verification" class="verification">
        <el-input v-model="form.verification" >
        </el-input>
        <div @click="getVerification" class="right" :class="{getting: verification.getting, complete: verification.complete}">
          {{verification.text}}
        </div>
      </el-form-item>

      <el-form-item label="身份证上传" class="idCard" prop="idCardPic">
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
      form: {
        name: '',
        idCard: '',
        bankCard: '',
        phone: '',
        verification: '',
        idCardLicenseImageUrl: '',
        checked: ''
      },
      // 获取手机验证码
      verification: {
          getting: false,
          complete: true,
          text: '获取验证码',
          isClick: true //是否可以点击
      },
      rules: {
        name: [
            { required: true, message: '请输入法人姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        idCard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { min: 18, max: 18, message: '长度在18个字符', trigger: 'blur' }
        ],
        bankCard: [
            { required: true, message: '请输入银行卡号', trigger: 'blur' },
            { min: 16, max: 16, message: '长度在16个字符', trigger: 'blur' }
        ],
        phone: [
            { required: true, message: '请输入银行预留手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' }
        ],
        verification: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' },
            { min: 6, max: 6, message: '长度在6个字符', trigger: 'blur' }
        ],
        idCardPic: [
            { required: true, message: '请上传法人身份证', trigger: 'change' },
        ]
      }
    }
  },

  created () {
    this.$store.commit("editIndex", {info: "personalQualifing"});
  },

  methods: {
    // 点击获取短信验证码
    getVerification () {
        let num = 60;
        if (this.verification.isClick) {
            this.verification.isClick = false;
            let countdown =  setInterval(() => {
                this.verification.text = num + 's后再次获取';
                this.verification.getting = true;
                this.verification.complete = false;
                num--;
                if(num<0){
                    clearTimeout(countdown);
                    this.verification.isClick = true;
                    this.verification.text = '获取验证码';
                    this.verification.getting = false;
                    this.verification.complete = true;
                }
            }, 1000);
        }
    },
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
      .verification {
        position: relative;
        /deep/.el-input-group__append, .el-input-group__prepend {
          background-color: #fff;
          padding: 0 10px;
        }
        // 获取验证码样式
        .right {
          cursor: pointer;
          position: absolute;
          right: 8px;
          top: 0px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
        }
        .getting {
            color: #ccc;
        }
        .complete {
            color:rgba(202,161,79,1);
        }
      }
      .check {
          font-size: 14px;
          margin-top: 20px;
          padding-left: 120px;
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