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
                      <div @click="getVerification" class="right" :class="{getting: verification.getting, complete: verification.complete}">
                          {{verification.text}}
                      </div>
                      <div class="info" :class="{warning: promptMessage.vwActive, normal: promptMessage.vnActive}">
                        {{this.promptMessage.verification}}
                      </div>
                  </div>

                  <div class="enter" @click="$router.push('/passwordFind2')">
                    下一步 →
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
            form: {
                mobile: '',
                verification: ''
            },
            promptMessage: {
                mobile: '',
                mwActive: false,
                mnActive: true,
                verification: '',
                vwActive: false,
                vnActive: true,
            },
            // 获取手机验证码
            verification: {
                getting: false,
                complete: true,
                text: '获取验证码',
                isClick: true //是否可以点击
            }
        }
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
                    // color:rgba(202,161,79,1);
                    cursor: pointer;
                }
                .getting {
                    color: #ccc;
                }
                .complete {
                    color:rgba(202,161,79,1);
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
    }
}
</style>