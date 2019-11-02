<template>
  <div class="box">
    <div class="top">个人认证</div>
    <el-form ref="form" :model="form" :rules="rules" class="form" label-width="120px">

      <el-form-item label="姓名" prop="realName">
        <el-input v-model="form.realName"></el-input>
      </el-form-item>

      <el-form-item label="身份证号" prop="identity">
        <el-input v-model="form.identity"></el-input>
      </el-form-item>

      <el-form-item label="银行卡号" prop="cardNo">
        <el-input v-model="form.cardNo"></el-input>
      </el-form-item>

      <el-form-item label="银行预留手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="短信验证码" prop="phoneCaptcha" class="verification">
        <el-input v-model="form.phoneCaptcha" >
        </el-input>
        <!-- 点击手机获取验证码 -->
        <div @click="getVerification" class="right" :class="{getting: isgetting, geted: isgeted}">
            {{textInfo}}
        </div>
      </el-form-item>

      <el-form-item label="身份证上传" class="idCard">
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

      <div class="check">
          <el-checkbox @change="checkboxChange" v-model="form.checked">
          </el-checkbox>
            &nbsp;&nbsp;同意并遵守，<span @click="toDigitalAgreement" style="color: #CAA14F">《数字证书服务协议》</span>
      </div>

      <el-form-item>
        <div class="enter" :class="{gray: !isCheck, yellow: isCheck}" @click="enter('form')">
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

              <div class="right" @click="replacePic">
                  <img width="88px" height="40px" :src="codeImage" alt="">
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
import axios from "@/api/taotaozi_api.js";
export default {
  data() {
    // 手机自定义表单验证validator
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
            callback();
            // console.log("验证成功!")
        }
    }
    // dialog图片验证码自定义校检规则
    var validateCode = (rule, value, callback) => {
        if (value === '') {
        callback(new Error('验证码不能为空'));
        } 
        else if (!this.isvalidCode(value)) {
            axios.verificationCheck(
                {
                "imageCaptcha": value,
                "imageRequestId": this.imageRequestId
                }
            )
            .then(res=>{
                // console.log(res);
                if (res.code === 200) {
                    callback();
                } else {
                    callback(new Error(res.message))     
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    };

    return {
      isCheck: false, // 是否选中用户协议
      idCardFrontDialogVisible: false, //身份证正面预览框
      idCardVersoDialogVisible: false, //身份证背面预览框
      idCardFrontImageUrl: '',
      idCardVersoImageUrl: '',
      isFrontUpload: false,// 是否上传身份证正面
      isVersoUpload: false,// 是否上传身份证背面
      form: {
        realName: '', //姓名
        identity: '', //身份证
        cardNo: '', //银行卡号
        phone: '', //手机号
        phoneCaptcha: '', //短信验证am
        photos: [], //身份证系列
        checked: false
      },
      codeImage: '', //验证码图片src
      imageRequestId: '', //接上 本地保存字段  对应请求回来的验证码

      textInfo: '获取验证码', // 获取验证码文本及倒计时
      isgetting: false,
      isgeted: true,

      // 是否展示验证码弹框
      verificationDialogFormVisible: false,
      // 验证码确认表单
      verificationDialogForm: {
          code: ''
      },
      actionUrl: '', //图片上传地址
      rules: {
        realName: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        identity: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { min: 15, max: 18, message: '长度最多18个字符', trigger: 'blur' }
        ],
        cardNo: [
            { required: true, message: '请输入银行卡号', trigger: 'blur' },
            { min: 15, max: 19, message: '长度最多19个字符', trigger: 'blur' }
        ],
        phone: [
            { required: true,  trigger: 'blur', validator: validPhone}
        ],
        phoneCaptcha: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' },
            { min: 6, max: 6, message: '长度在6个字符', trigger: 'blur' }
        ],
        idCardPic: [
            { trigger: 'change', validator: validIdCard },
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
    this.replacePic(); //获取验证码图片
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
    // 验证短信验证码正则
    isvalidCode (str) {
        const reg = /^\d{6}$/
        return reg.test(str)
    },
    // 用户协议是否勾选
    checkboxChange (status) {
        // console.log(status)
        if (status) {
            this.isCheck = true;
        } else {
            this.isCheck = false;
        }
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
      this.form.photos.push(response.data.id);
      // console.log(this.form.photos)
    },
    // 移除已上传图片
    idCardFrontRemove(file, fileList) {
      console.log(file, fileList);
      this.isFrontUpload = false;
      this.form.photos.forEach( (v, i) => {
        if (v === file.response.data.id) {
          this.form.photos.splice(i,1);
        }
      });
      // console.log(this.form.photos)
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
      this.form.photos.push(response.data.id);
      // console.log(this.form.photos)
    },
    // 移除已上传图片
    idCardVersoRemove(file, fileList) {
      console.log(file, fileList);
      this.isVersoUpload = false;
      this.form.photos.forEach( (v, i) => {
        if (v === file.response.data.id) {
          this.form.photos.splice(i,1);
        }
      });
      // console.log(this.form.photos)
    },

    // 点击获取短信验证码
    getVerification () {
        if (this.isgeted) {
            this.replacePic();
            this.verificationDialogFormVisible = true;
            this.verificationDialogForm.code = '';
            this.$refs['ruleForm'].resetFields();
        }
    },
    // 点击获取验证码图片
    replacePic () {
        axios.getVerification({})
        .then(res=>{
            // console.log(res);
            if (res.code === 200) {
                this.codeImage = res.data.image;
                this.imageRequestId = res.data.requestId;
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
    // 验证码弹出框确认按钮
    verificationDialogEnter (formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                axios.requestPhoneVerification({
                    "imageCaptcha": this.verificationDialogForm.code,
                    "imageRequestId": this.imageRequestId,
                    "phone": this.form.phone
                })
                .then(res=>{
                    console.log(res);
                    if (res.code === 200) {
                          let num = 60;
                          let interval = setInterval(() => {
                              if (num>=0) {
                                  this.textInfo = num + '后再次获取';
                                  num--;
                                  this.isgetting = true;
                                  this.isgeted = false;
                              } else {
                                  clearInterval(interval);
                                  this.textInfo = '获取验证码';
                                  this.isgetting = false;
                                  this.isgeted = true;
                              }
                          }, 1000);
                          this.verificationDialogFormVisible = false; 
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: res.message,
                            type: 'warning'
                        });
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            } else {
                return false;
            }
        });
    },
    // 提交表单
    enter (formName) {
        // 没有勾选用户协议,无法注册
        if (!this.isCheck) {
            return false;
        }
        console.log(this.form);
        this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.personalCertification(this.form)
              .then(res=>{
                  console.log(res);
                  if (res.code ===200) {
                    this.$router.push('/personalQualfingStatusForSuccess')
                  } else {
                    // sessionStorage.setItem('personalQualifingForm', JSON.stringify(this.form));
                    this.$router.push({
                      path: '/personalQualifingStatusForFail',
                      query: {
                        text: res.message
                      }
                    })
                  }
              })
              .catch(err=>{
                  console.log(err);
              })
            } else {
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
      // 短信验证码
      .verification {
        position: relative;
        /deep/.el-input-group__append, .el-input-group__prepend {
          background-color: #fff;
          padding: 0 10px;
        }
        // 获取验证码样式
        .right {
          cursor: pointer;
          color:#BFBFBF;
          position: absolute;
          right: 8px;
          top: 0px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
        }
        .getting {
            color:#BFBFBF;
        }
        .geted {
            color:rgba(202,161,79,1);
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
  // 验证码弹出框
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