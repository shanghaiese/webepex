<template>
  <div>
      <div class="outer_wrapper">
          <div class="aside"></div>
          <div class="main">
              <!-- <router-view></router-view> -->
              <div class="content">
                  <div class="logo"></div>

                  <div class="toggle">
                      <div class="person" @click="toPerson">个人注册</div>
                      <div class="company" >企业注册</div>
                  </div>

                  <div class="registType">
                      <div class="type">注册类型</div>
                      <el-checkbox-group @change="registTypeChange" v-model="form.checkList">
                        <el-checkbox label="我是开发商"></el-checkbox>
                        <el-checkbox label="我是运营商"></el-checkbox>
                        <el-checkbox label="我是买家"></el-checkbox>
                        <el-checkbox label="其他"></el-checkbox>
                      </el-checkbox-group>
                      <div class="registOther" v-show="isShowRegistOther">
                          <input v-model="form.registOther" type="text">
                      </div>
                  </div>
                  
                  <div class="corporateInformation">
                      <div class="info">企业信息</div>
                      <div class="text">企业名称</div>
                      <el-input
                          class="input"
                          @blur="nameBlur"
                          placeholder="请输入企业名称"
                          v-model="form.name"
                          clearable>
                      </el-input>
                      <div class="info" :class="{warning: promptMessage.namewActive, normal: promptMessage.namenActive}">
                          {{this.promptMessage.name}}
                      </div>

                      <div class="text">企业机构代码</div>
                      <el-input
                          class="input"
                          @blur="codeBlur"
                          placeholder="请输入企业机构代码"
                          v-model="form.code"
                          clearable>
                      </el-input>
                      <div class="info" :class="{warning: promptMessage.cwActive, normal: promptMessage.cnActive}">
                          {{this.promptMessage.code}}
                      </div>
                  </div>
                  
                  <div class="administratorInfo">
                      <div class="admin">
                          企业管理员信息
                      </div>
                  </div>

                  <div class="mobile">
                      <div class="text">手机号</div>
                      <el-input
                          class="input"
                          @blur="mobileBlur"
                          placeholder="请输入手机号"
                          v-model="form.mobile"
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
                      <div class="info" :class="{warning: promptMessage.vwActive, normal: promptMessage.vnActive}">
                        {{this.promptMessage.verification}}
                      </div>
                  </div>

                  <div class="password">
                      <div class="text">密码</div>
                      <el-input @blur="passwordBlur" placeholder="请输入8-20位字母数字字符" v-model="form.password" show-password clearable></el-input>
                      <div class="info" :class="{warning: promptMessage.pwActive, normal: promptMessage.pnActive}">
                        {{this.promptMessage.password}}
                      </div>
                  </div>

                  <div class="password">
                      <div class="text">确定密码</div>
                      <el-input @blur="passwordBlur2" placeholder="请输入密码" v-model="form.password2" show-password clearable></el-input>
                      <div class="info" :class="{warning: promptMessage.pwActive2, normal: promptMessage.pnActive2}">
                        {{this.promptMessage.password2}}
                      </div>
                  </div>

                  <div class="check">
                    <el-checkbox v-model="form.checked">
                        我已阅读并同意<span style="color: #CAA14F">《用户注册协议》</span>、<span style="color: #CAA14F">《权易宝隐私政策》</span>
                    </el-checkbox>
                  </div>

                  <div class="enter" @click="enter">
                    注册 →
                  </div>

                  <div class="foot">
                    已有账号, <span @click="$router.push('/login')"> 去登录</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            isShowRegistOther: false, //是否展示注册类型其他项输入框
            form: {
                checkList: ['我是开发商'],
                registOther: '', //注册类型其他项文本
                name: '',
                code: '',
                mobile: '',
                verification: '', //短信验证码
                password: '',
                password2: ''
            },
            // 表单验证样式控制
            promptMessage: {
                name: '',
                namewActive: false,
                namenActive: true,
                code: '',
                cwActive: false,
                cnActive: true,
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
            }
        }
    },
    methods: {
        toPerson () {
            this.$router.push('/registerPersonal')
        },
        // 注册类型选中其他时展示文本框
        registTypeChange (value) {
            console.log(value)
            this.isShowRegistOther = false;
            for (let index = 0; index < value.length; index++) {
                const e = value[index];
                if (e === '其他') {
                    this.isShowRegistOther = true;
                }
            }
        },
        nameBlur (event) {
            console.log(this.form.name)
            // 非空判断
            if (this.form.name === "") {
                this.promptMessage.name = '请输入企业名称'
                this.promptMessage.namewActive = true;
                this.promptMessage.namenActive = false;
            } 
            else {
                // 长度判断
                if (this.form.name.length >= 30) {
                    this.promptMessage.name = '请输入不超过30字'
                    this.promptMessage.namewActive = true;
                    this.promptMessage.namenActive = false;
                } else {
                    this.promptMessage.name = ''
                    this.promptMessage.namewActive = false;
                    this.promptMessage.namenActive = true;
                }
            }
        },
        codeBlur (event) {
            console.log(this.form.code)
            // 非空判断
            if (this.form.code === "") {
                this.promptMessage.code = '请输入企业机构代码'
                this.promptMessage.cwActive = true;
                this.promptMessage.cnActive = false;
            } 
            else {
                // 长度判断
                if (this.form.code.length >= 18) {
                    this.promptMessage.code = '请输入不超过18个字符'
                    this.promptMessage.cwActive = true;
                    this.promptMessage.cnActive = false;
                } else {
                    this.promptMessage.code = ''
                    this.promptMessage.cwActive = false;
                    this.promptMessage.cnActive = true;
                }
            }
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
        passwordBlur2 (event) {
            // console.log(event)
            console.log(this.form.password2)
            if (this.form.password2.length <= 20 && this.form.password2.length >= 8) {
                this.promptMessage.password2 = ''
                this.promptMessage.pwActive2 = false;
                this.promptMessage.pnActive2 = true;
            } else {
                this.promptMessage.password2 = '请输入8至20位数密码'
                this.promptMessage.pwActive2 = true;
                this.promptMessage.pnActive2 = false;
            }
        },
        enter () {
            console.log(this.form)
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
        // background:blue;
        // height: 900px;
        overflow: auto;
        .content {
            width:400px;
            // height: 800px;
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
            }
            .toggle {
                margin-top: 24px;
                overflow: hidden;
                font-size: 20px;
                height: 20px;
                .person {
                    float: left;
                    font-family:PingFangSC-Light,PingFang SC;
                    font-weight:300;
                    color:rgba(153,153,153,1);
                    line-height:20px;
                    cursor: pointer;
                }
                .company {
                    margin-left: 32px;
                    float: left;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(202,161,79,1);
                    line-height:20px;
                    cursor: pointer;
                }
            }
            .registType {
                margin-top: 38px;
                position: relative;
                .type {
                    height: 22px;
                    line-height: 22px;
                    font-size: 14px;
                    color: #333;
                    font-family:PingFangSC-Medium,PingFang SC;
                }
                .registOther {
                    position: absolute;
                    height: 20px;
                    line-height: 20px;
                    bottom: 0px;
                    left: 60px;
                    input {
                        font-size: 14px;
                        color: #666;
                        outline: none;  //获取焦点时轮廓隐藏
                        border: none;
                        height: 18px;
                        border:none;//去除边框
                        border-radius:0;
                        background-color:transparent;
                        border-bottom:#D9D9D9 1px solid;
                        box-shadow: 0px 0px 0px 0px;//去除阴影
                    }
                }
                .el-checkbox-group {
                    margin-top: 17px;
                    /deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        background-color: rgba(202,161,79,1);
                        border-color: rgba(202,161,79,1);
                    }
                    /deep/.el-checkbox__input.is-checked+.el-checkbox__label {
                        color: #333;
                        font-size: 14px;
                    }
                }
            }
            .corporateInformation {
                margin-top: 40px;
                .info {
                    height: 22px;
                    line-height: 22px;
                    font-size: 14px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                }
                .text {
                    margin-top: 16px;
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
            .administratorInfo {
                margin-top: 18px;
                .admin {
                    height:22px;
                    font-size:14px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    line-height:22px;
                }
            }
            .mobile {
                margin-top: 16px;
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
                    /deep/.el-checkbox__input.is-checked+.el-checkbox__label {
                color: #333;
                }
                    /deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                background-color: #CAA14F;
                border-color: #CAA14F;
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
                margin-top: 16px;
                margin-bottom: 38px;
                font-size: 14px;
                color: #999999;
                span {
                    color: #CAA14F;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>