<template>
  <div>
      <div class="outer_wrapper">
          <div class="aside"></div>
          <div class="main">
              <!-- <router-view></router-view> -->
              <div class="content">
                  <div class="logo" @click="$router.push('/homePage')"></div>

                  <div class="toggle">
                      <div class="person">个人注册</div>
                      <div class="company" @click="toCompany">企业注册</div>
                  </div>

                  <div class="mobile">
                      <div class="text">手机号</div>
                      <el-input
                          class="input"
                          @blur="mobileBlur"
                          placeholder="请输入手机号"
                          v-model="form.phone"
                          clearable>
                      </el-input>
                      <div class="info" :class="{warning: promptMessage.mwActive, normal: promptMessage.mnActive}">
                          {{this.promptMessage.mobile}}
                      </div>
                  </div>

                  <div class="verification">
                      <div class="text">短信验证码</div>
                      <el-input
                        @blur="verificationBlur"
                        class="input"
                        placeholder="请输入验证码"
                        v-model="form.phoneCaptcha"
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

                  <div class="password">
                      <div class="text">密码</div>
                      <el-input placeholder="请输入8-20位字母数字字符" @blur="passwordBlur" v-model="form.password" show-password clearable></el-input>
                      <div class="info" :class="{warning: promptMessage.pwActive, normal: promptMessage.pnActive}">
                        {{this.promptMessage.password}}
                      </div>
                  </div>

                  <div class="password">
                      <div class="text">确定密码</div>
                      <el-input placeholder="请输入密码" @blur="passwordBlur2" v-model="form.password2" show-password clearable></el-input>
                      <div class="info" :class="{warning: promptMessage.pwActive2, normal: promptMessage.pnActive2}">
                        {{this.promptMessage.password2}}
                      </div>
                  </div>

                  <div class="check">
                    <el-checkbox @change="checkboxChange" v-model="form.checked">
                    </el-checkbox>
                    &nbsp;我已阅读并同意<span style="color: #CAA14F" @click="toRegisterAgreement">《用户注册协议》</span>、
                    <span @click="toPrivateAgreement" style="color: #CAA14F">《隐私政策》</span>
                  </div>
                  <!-- <div class="enter" :class="{gray: isCheck, yellow: !isCheck}" @click="enter">
                    注册 →
                  </div> -->
                  <div style="margin-top:14px;">
                      <el-button type="primary" @click="enter" :disabled="!canClick" style="width:400px;height:48px;">注册</el-button>
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
            // 是否选中用户协议
            isCheck: false,
            form: {
                loginName: '', //也是手机号,很奇怪
                phone: '', //手机号
                phoneCaptcha: '', //验证码
                password: '', //密码
                password2: '',
                checked: false
            },
            // 表单验证部分
            promptMessage: {
                mobile: '',
                mwActive: false,
                mnActive: true,
                verification: '',
                vwActive: false,
                vnActive: true,
                password: '',
                pwActive: false,
                pnActive: true,
                password2: '',
                pwActive2: false,
                pnActive2: true,
                checked: ''
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
        this.$store.commit("editIndex", {info: "registerPersonal"});
        this.replacePic(); //获取验证码图片
    },
    computed: {
        canClick() {
            return this.form.phone&&this.form.phoneCaptcha&&this.form.password&&this.form.password2&&this.form.checked;
        }
    },
    methods: {
        toCompany () {
            this.$router.push('/registerEnterprise')
        },
        toRegisterAgreement () {
            const { href } = this.$router.resolve({
                path: '/registerAgreement'
            });
            window.open(href, '_blank');
        },
        toPrivateAgreement () {
            const { href } = this.$router.resolve({
                path: '/privateAgreement'
            });
            window.open(href, '_blank');
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
                this.isCheck = false;
            } else {
                this.isCheck = true;
            }
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
        // 手机号验证
        mobileBlur (event) {
            // console.log(this.form.mobile)
            let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
            if (this.form.phone === '') {
                this.promptMessage.mobile = '手机号不能为空'
                this.promptMessage.mwActive = true;
                this.promptMessage.mnActive = false;
            } 
            else {
                if (reg.test(this.form.phone)) {
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
        // 短信验证码校检
        verificationBlur (event) {
            console.log(this.form.phoneCaptcha)
            //只能输入6个数字
            let reg = /^\d{6}$/;
            if (this.form.phoneCaptcha === '') {
                this.promptMessage.verification = '请输入短信验证码'
                this.promptMessage.vwActive = true;
                this.promptMessage.vnActive = false;
            } else {
                // 正则判断
                if (reg.test(this.form.phoneCaptcha)) {
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
        // 密码校检
        passwordBlur (event) {
            // console.log(this.form.password)
            if (this.form.password.length <= 20 && this.form.password.length >= 8) {
                this.promptMessage.password = ''
                this.promptMessage.pwActive = false;
                this.promptMessage.pnActive = true;
            } else {
                this.promptMessage.password = '请输入8至20位数密码'
                this.promptMessage.pwActive = true;
                this.promptMessage.pnActive = false;
            }
        },
        // 确认密码
        passwordBlur2 (event) {
            // console.log(event)
            console.log(this.form.password2)
            if (this.form.password2.length <= 20 && this.form.password2.length >= 8) {
                if (this.form.password !== this.form.password2) {
                    this.promptMessage.password2 = '两次密码不一致'
                    this.promptMessage.pwActive2 = true;
                    this.promptMessage.pnActive2 = false;
                } else { 
                    this.promptMessage.password2 = ''
                    this.promptMessage.pwActive2 = false;
                    this.promptMessage.pnActive2 = true;
                }
            } else {
                this.promptMessage.password2 = '请输入8至20位数密码'
                this.promptMessage.pwActive2 = true;
                this.promptMessage.pnActive2 = false;
            }
        },
        // 提交
        enter () {
            // 没有勾选用户协议,无法注册
            if (this.isCheck) {
                console.log(11111)
                return false;
            }
            this.form.loginName = this.form.phone;
            console.log(this.form)
            // 判断手机号是否为空
            if (this.form.phone === '') {
                this.promptMessage.mobile = '手机号不能为空'
                this.promptMessage.mwActive = true;
                this.promptMessage.mnActive = false;
            } 
            // 判断验证码是否为空
            if (this.form.phoneCaptcha === "") {
                this.promptMessage.verification = '验证码不正确'
                this.promptMessage.vwActive = true;
                this.promptMessage.vnActive = false;
            }
            // 判断密码是否为空
            if (this.form.password === '') {
                this.promptMessage.password = '请输入8至20位数密码'
                this.promptMessage.pwActive = true;
                this.promptMessage.pnActive = false;
            }
            // 判断确认密码是否为空
            if (this.form.password2 === '') {
                this.promptMessage.password2 = '请输入8至20位数密码'
                this.promptMessage.pwActive2 = true;
                this.promptMessage.pnActive2 = false;
            }
            // 当有一项表单验证没有通过, 禁止提交
            if (this.promptMessage.mwActive||this.promptMessage.pwActive||this.promptMessage.pwActive2||this.promptMessage.vwActive) {
                // this.$message({
                //     type: 'warning ',
                //     message: '表单错误,请重新填写'
                // });
            } 
            else {
                axios.personalRegistration(this.form)
                .then(res=>{
                    console.log(res);
                    if (res.code === 200) {
                        this.$message({
                            type: 'success ',
                            message: '注册成功, 请登陆'
                        });
                        this.$router.push('/login');
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
        overflow: auto;
        .content {
            width:400px;
            background:white;
            padding-top: 140px;

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
                &:hover{
                    cursor: pointer;
                }
            }
            .toggle {
                margin-top: 24px;
                overflow: hidden;
                font-size: 20px;
                height: 20px;
                .person {
                    float: left;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(202,161,79,1);
                    line-height:20px;
                    cursor: pointer;
                }
                .company {
                    margin-left: 32px;
                    float: left;
                    font-family:PingFangSC-Light,PingFang SC;
                    font-weight:300;
                    color:rgba(153,153,153,1);
                    line-height:20px;
                    cursor: pointer;
                }
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
            .password {
                margin-top: 20px;
                .text {
                    height: 14px;
                    font-size: 14px;
                    color: #666;
                }
                /deep/.el-input__inner {
                    border:none;//去除边框
                    padding: 0;
                }
            }
            .check {
                font-size: 14px;
                margin-top: 20px;
                span {
                    cursor: pointer;
                }
            }
            .enter {
                margin-top: 14px;
                height: 48px;
                line-height: 48px;
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