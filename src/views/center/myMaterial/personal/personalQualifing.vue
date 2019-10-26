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
        <!-- 点击手机获取验证码 -->
        <div @click="getVerification" class="right">
            获取验证码
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
          <el-checkbox @change="checkboxChange" v-model="form.checked">
              同意并遵守，<span style="color: #CAA14F">《数字证书授权协议》</span>
          </el-checkbox>
      </div>

      <el-form-item>
        <div class="enter" :class="{gray: isCheck, yellow: !isCheck}" @click="enter('form')">
          提交认证申请
        </div>
      </el-form-item>
    </el-form>

    <!-- 注册验证码弹框 -->
    <el-dialog class="verificationDialog" width="30%" title="输入验证码" :visible.sync="verificationDialogFormVisible">
      <el-form :model="verificationDialogForm" :rules="rules" ref="ruleForm">
          <div class="bulletBox">
              <el-form-item label="" label-width="0"  prop="code">
                  <el-input v-model="verificationDialogForm.code" autocomplete="off"></el-input>
              </el-form-item>

              <div class="right">
                  <img src="../../../../assets/img/验证码.png" alt="">
              </div>
          </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="verificationDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="verificationDialogEnter('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    // 短信验证码自定义校检规则
    var validateCode = (rule, value, callback) => {
        if (value === '') {
        callback(new Error('验证码不能为空'));
        } 
        else if (!this.isvalidCode(value)) {
              callback(new Error('请输入正确的6位验证码'))
        }
        else {
            callback();
        }
    };
    return {
      isCheck: false, // 是否选中用户协议
      idCardLicenseDialogVisible: false, //身份证预览框
      form: {
        name: '',
        idCard: '',
        bankCard: '',
        phone: '',
        verification: '',
        idCardLicenseImageUrl: '',
        checked: true
      },
      // 是否展示验证码弹框
      verificationDialogFormVisible: false,
      // 验证码确认表单
      verificationDialogForm: {
          code: ''
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
        ],
        // 短信验证码弹框内校检
        code: [
            { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.$store.commit("editIndex", {info: "personalQualifing"});
  },

  methods: {
    // 验证短信验证码正则
    isvalidCode (str) {
        const reg = /^\d{6}$/
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
    // 点击获取短信验证码
    getVerification () {
        this.verificationDialogFormVisible = true;
    },
        // 验证码弹出框确认按钮
    verificationDialogEnter (formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.verificationDialogFormVisible = false; 
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    enter (formName) {
        // 没有勾选用户协议,无法注册
        if (this.isCheck) {
            console.log(11111)
            return false;
        }
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
          color:rgba(202,161,79,1);
          position: absolute;
          right: 8px;
          top: 0px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
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
  .verificationDialog {
    .bulletBox {
        position: relative;
        .el-input {
            width: 70%;
        }
        .right {
            position: absolute;
            right: 0px;
            top: 0px;
            width: 88px;
            height: 40px;
            background-color: red;
        }
    }
  }
</style>