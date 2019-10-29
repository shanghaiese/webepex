<template>
  <div>
      <div class="outer_wrapper">
          <div class="aside"></div>
          <div class="main">
              <!-- <router-view></router-view> -->
              <div class="content">
                  <div class="logo"></div>
                  
                  <div class="title">
                      找回密码
                  </div>

                  <div class="mobile">
                      <div class="text">手机号</div>
                      <el-input
                          placeholder="请输入手机号"
                          v-model="form.mobile"
                          @blur="mobileBlur"
                          clearable>
                      </el-input>
                      <div class="info" :class="{warning: promptMessage.mwActive, normal: promptMessage.mnActive}">
                          {{this.promptMessage.mobile}}
                      </div>
                  </div>

                  <div class="verification">
                      <div class="text">短信验证码</div>
                      <el-input
                        class="input"
                        @blur="verificationBlur"
                        placeholder="请输入验证码"
                        v-model="form.verification"
                        clearable>
                      </el-input>
                      <!-- 点击手机获取验证码 -->
                      <div @click="getVerification" class="right">
                          获取验证码
                      </div>
                      <div class="info" :class="{warning: promptMessage.vwActive, normal: promptMessage.vnActive}">
                        {{this.promptMessage.verification}}
                      </div>
                  </div>

                  <div class="enter" @click="enter">
                    下一步 →
                  </div>

                  <div class="foot">
                    已有账号, <span @click="$router.push('/login')"> 去登录</span>
                  </div>
              </div>

                <!-- 注册验证码弹框 -->
              <el-dialog class="verificationDialog" width="30%" title="输入验证码" :visible.sync="verificationDialogFormVisible">
                <el-form :model="verificationDialogForm" :rules="rules" ref="ruleForm">
                    <div class="bulletBox">
                        <el-form-item label="" label-width="0"  prop="code">
                            <el-input v-model="verificationDialogForm.code" autocomplete="off"></el-input>
                        </el-form-item>

                        <!-- <el-input v-model="verificationDialogForm.code" autocomplete="off"></el-input> -->
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
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "@/api/taotaozi_api.js";
export default {
    data() {
        // 短信验证码自定义校检规则
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
                    console.log(res);
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
            form: {
                mobile: '',
                verification: ''
            },
            // 表单验证部分
            promptMessage: {
                mobile: '',
                mwActive: false,
                mnActive: true,
                verification: '',
                vwActive: false,
                vnActive: true,
            },
            codeImage: '', //验证码图片src
            imageRequestId: '', 
            // 是否展示验证码弹框
            verificationDialogFormVisible: false,
            // 验证码确认表单
            verificationDialogForm: {
                code: ''
            },
            rules: {
                code: [
                    { validator: validateCode, trigger: 'blur' }
                ]
            }
        }
    },

    created () {
        this.$store.commit("editIndex", {info: "passwordFind"});
        this.replacePic(); //获取验证码图片
    },

    methods: {
        // 验证短信验证码正则
        isvalidCode (str) {
            const reg = /^\d{6}$/
            return reg.test(str)
        },
        // 点击获取短信验证码
        getVerification () {
            this.verificationDialogFormVisible = true;
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
        mobileBlur (event) {
            console.log(this.form.mobile)
            let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
            if (this.form.mobile === '') {
                this.promptMessage.mobile = '手机号不能为空'
                this.promptMessage.mwActive = true;
                this.promptMessage.mnActive = false;
            } 
            else {
                if (reg.test(this.form.mobile)) {
                    this.promptMessage.mobile = ''
                    this.promptMessage.mwActive = false;
                    this.promptMessage.mnActive = true;
                } else {
                    this.promptMessage.mobile = '手机号格式不正确'
                    this.promptMessage.mwActive = true;
                    this.promptMessage.mnActive = false;
                }
            }
        },
        verificationBlur (event) {
            console.log(this.form.verification)
            //只能输入6个数字
            let reg = /^\d{6}$/;
            if (this.form.verification === '') {
                this.promptMessage.verification = '请输入短信验证码'
                this.promptMessage.vwActive = true;
                this.promptMessage.vnActive = false;
            } else {
                // 正则判断
                if (reg.test(this.form.verification)) {
                    this.promptMessage.verification = ''
                    this.promptMessage.vwActive = false;
                    this.promptMessage.vnActive = true;
                } else {
                    this.promptMessage.verification = '请输入6位数字验证码'
                    this.promptMessage.vwActive = true;
                    this.promptMessage.vnActive = false;
                }
            }
        },
        enter () {
            console.log(this.form)
            // 判断手机号是否为空
            if (this.form.mobile === '') {
                this.promptMessage.mobile = '手机号不能为空'
                this.promptMessage.mwActive = true;
                this.promptMessage.mnActive = false;
            } 
            // 判断验证码是否为空
            if (this.form.verification === "") {
                this.promptMessage.verification = '验证码不正确'
                this.promptMessage.vwActive = true;
                this.promptMessage.vnActive = false;
            }
            // 当有一项表单验证没有通过, 禁止提交
            if (this.promptMessage.mwActive||this.promptMessage.vwActive) {
                console.log(1111)
                // this.$message({
                //       type: 'warning ',
                //       message: '表单错误,请重新填写'
                // });
            } 
            else {
                this.$router.push(
                    { path:'/passwordFindNext',
                      query:{ 
                          phone:this.mobile,
                          phoneCaptcha: this.verification
                      } 
                    }
                );
            }
        }
    }
};
</script>

<style lang="less" scoped>
.outer_wrapper {
    display: flex;
    height: 100vh;
    .aside {
        flex: 0 0 460px;
        background: url(./../../assets/img/1080x460.jpg) no-repeat;
        background-size: contain;
    }
    .main {
        flex: 1;
        display: flex;
        justify-content: center;
        // align-items: center;
        // background:blue;
        // height: 900px;
        overflow: auto;
        .content {
            width:400px;
            // height: 800px;
            background:white;
            padding-top: 247px;

            // 以下三项是提示信息,公用的类
            .info {
                height: 21px;
                line-height: 21px;
                font-size: 14px;
            }
            .normal {
                border-top: 1px solid #D9D9D9;
            }
            .warning {
                border-top: 1px solid red;
                color: red;
            }
            // 结束

            .logo{
                width: 152px;
                height: 40px;
                background: url(./../../assets/img/logo.png) no-repeat;
                background-size: 100% 100%;
            }
            .title{
                margin-top: 24px;
                height:20px;
                font-size:20px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:20px;
            }
            .mobile {
                margin-top: 48px;
                .text {
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:14px;
                }
                /deep/.el-input__inner {
                    border:none;//去除边框
                    padding: 0;
                }
            }
            .verification {
                margin-top: 19px;
                position: relative;
                .text {
                    height: 14px;
                    font-size: 14px;
                    color: #666;
                }
                .el-input {
                    width: 300px;
                }
                // 获取验证码样式
                .right {
                    height: 40px;
                    line-height: 40px;
                    position: absolute;
                    top: 14px;
                    right: 0px;
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(202,161,79,1);
                    cursor: pointer;
                }
                /deep/.el-input__inner {
                    border:none;//去除边框
                    padding: 0;
                }
            }
            .enter {
                margin-top: 14px;
                height: 48px;
                line-height: 48px;
                background-color: #CAA14F;
                font-size: 14px;
                text-align: center;
                font-family:PingFangSC-Semibold,PingFang SC;
                font-weight:600;
                color:rgba(255,255,255,1);
                border-radius:2px;
            }
            .enter:hover {
                background:rgba(181,144,70,1);
                border-radius:2px;
                cursor: pointer;
            }
            .foot {
                margin-top: 16px;;
                font-size: 14px;
                color: #999999;
                span {
                    color: #CAA14F;
                    cursor: pointer;
                }
            }
        }
        .verificationDialog {
            /deep/.el-dialog {
                margin-left: 724px;
            }
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
    }
}
</style>