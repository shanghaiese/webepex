<template>
    <div style="background:rgba(240,241,247,1); overflow: hidden">
      <div class="box">
          <div class="pic">
          </div>
          <div class="login">
              <div class="form">
                <div class="logo"></div>

                <div class="common">
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
                  
                  <div class="password">
                      <div class="text">密码</div>
                      <el-input placeholder="请输入密码" @blur="passwordBlur" v-model="form.password" show-password clearable></el-input>
                      <div class="info" :class="{warning: promptMessage.pwActive, normal: promptMessage.pnActive}">
                        {{this.promptMessage.password}}
                      </div>
                  </div>

                  <div class="verification">
                      <div class="text">验证码</div>
                      <el-input
                        @blur="verificationBlur"
                        class="input"
                        placeholder="请输入验证码"
                        v-model="form.verification"
                        clearable>
                      </el-input>
                      <div class="info" :class="{warning: promptMessage.vwActive, normal: promptMessage.vnActive}">
                        {{this.promptMessage.verification}}
                      </div>
                  </div>

                  <div class="check">
                    <el-checkbox v-model="form.checked">记住账号密码</el-checkbox>
                  </div>

                  <div class="enter" @click="enter">
                    登录 →
                  </div>

                  <div class="foot">
                    <div class="left" @click="$router.push('/registerPersonal')">免费注册</div>
                    <div class="right" @click="$router.push('/passwordFind')">忘记密码</div>
                  </div>
                </div>

              </div>
          </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      form: {
        mobile: '',
        password: '',
        verification: '',
        checked: false
      },
      promptMessage: {
        mobile: '',
        mwActive: false,
        mnActive: true,
        password: '',
        pwActive: false,
        pnActive: true,
        verification: '',
        vwActive: false,
        vnActive: true,
        checked: ''
      }
    }
  },

  methods: {
    mobileBlur (event) {
      // console.log(event)
      console.log(this.form.mobile)
      if (this.form.mobile === "110") {
        this.promptMessage.mobile = ''
        this.promptMessage.mwActive = false;
        this.promptMessage.mnActive = true;
      } else {
        if (this.form.mobile === '') {
          this.promptMessage.mobile = '请输入手机号'
          this.promptMessage.mwActive = true;
          this.promptMessage.mnActive = false;
        } else {
          this.promptMessage.mobile = '该手机号不存在'
          this.promptMessage.mwActive = true;
          this.promptMessage.mnActive = false;
        }
      }
    },
    passwordBlur (event) {
      // console.log(event)
      console.log(this.form.password)
      if (this.form.password === "110") {
        this.promptMessage.password = ''
        this.promptMessage.pwActive = false;
        this.promptMessage.pnActive = true;
      } else {
        this.promptMessage.password = '请输入密码'
        this.promptMessage.pwActive = true;
        this.promptMessage.pnActive = false;
      }
    },
    verificationBlur (event) {
      // console.log(event)
      console.log(this.form.verification)
      if (this.form.verification === "110") {
        this.promptMessage.verification = ''
        this.promptMessage.vwActive = false;
        this.promptMessage.vnActive = true;
      } else {
        this.promptMessage.verification = '请输入验证码'
        this.promptMessage.vwActive = true;
        this.promptMessage.vnActive = false;
      }
    },
    enter () {
      console.log(this.form)
      if (this.promptMessage.vwActive||this.promptMessage.pwActive||this.promptMessage.mwActive) {
        this.$message({
              type: 'warning ',
              message: '表单错误,请重新填写'
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
    .box {
        width:1088px;
        height:684px;
        margin: 108px auto;
        display: flex;
        .pic {
            width:544px;
            background: url(./../../assets/img/登录页面左侧图.png) no-repeat;
            background-size: contain;
        }
        .login {
            flex: 1;
            background-color: rgba(255,255,255,1);
            .form {
                box-sizing: border-box;
                width: 320px;
                margin-top: 80px;
                margin-left: 112px;
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
                .logo {
                  height: 32px;
                  background: url(./../../assets/img/logo.png) no-repeat;
                  background-size: contain;
                }
                .mobile {
                  margin-top: 64px;
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
                  margin-top: 18px;
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
                .verification {
                  margin-top: 22px;
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
                  overflow: hidden;
                  font-size: 14px;
                  .left{
                    float: left;
                    color: #CAA14F;
                    cursor: pointer;
                  }
                  .right{
                    float: right;
                    color: #999;
                    cursor: pointer;
                  }
                }
            }
        }
    }
</style>