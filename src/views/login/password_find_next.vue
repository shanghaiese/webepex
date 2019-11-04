<template>
  <div>
      <div class="outer_wrapper">
          <div class="aside"></div>
          <div class="main">
              <!-- <router-view></router-view> -->
              <div class="content">
                  <div class="logo" @click="$router.push('/homePage')"></div>
                  
                  <div class="title">
                      找回密码
                  </div>

                  <div class="password">
                      <div class="text">密码</div>
                      <el-input @blur="passwordBlur" placeholder="请输入8-20位字母数字字符" v-model="form.newPassword" show-password clearable></el-input>
                      <div class="info" :class="{warning: promptMessage.pwActive, normal: promptMessage.pnActive}">
                        {{this.promptMessage.password}}
                      </div>
                  </div>

                  <div class="password2">
                      <div class="text">确定密码</div>
                      <el-input @blur="passwordBlur2" placeholder="请输入密码" v-model="form.password2" show-password clearable></el-input>
                      <div class="info" :class="{warning: promptMessage.pwActive2, normal: promptMessage.pnActive2}">
                        {{this.promptMessage.password2}}
                      </div>
                  </div>

                  <div class="enter" @click="enter">
                    重置密码
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
import axios from "@/api/taotaozi_api.js";
export default {
    data() {
        return {
            form: {
                phone: this.$route.query.phone,
                phoneCaptcha: this.$route.query.phoneCaptcha,
                newPassword: '',
                password2: ''
            },
            promptMessage: {
                password: '',
                pwActive: false,
                pnActive: true,
                password2: '',
                pwActive2: false,
                pnActive2: true,
            }
        }
    },

    created () {
        this.$store.commit("editIndex", {info: "passwordFindNext"});
        console.log(this.$route.query)
    },

    methods: {
        // 密码验证
        passwordBlur (event) {
            // // console.log(this.form.password)
            // if (this.form.newPassword.length <= 20 && this.form.newPassword.length >= 8) {
            //     this.promptMessage.password = ''
            //     this.promptMessage.pwActive = false;
            //     this.promptMessage.pnActive = true;
            // } else {
            //     this.promptMessage.password = '请输入8至20位数密码'
            //     this.promptMessage.pwActive = true;
            //     this.promptMessage.pnActive = false;
            // }
             let reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,20}$/;
            // 密码长度判断
            if (this.form.newPassword.length <= 20 && this.form.newPassword.length >= 8) {
                // 正则判断
                if (reg.test(this.form.newPassword)) {
                    // 密码与确认密码一致性判断
                    if(this.form.password2.length !== 0){
                        if (this.form.newPassword !== this.form.password2) {
                            this.promptMessage.password = '两次密码不一致'
                            this.promptMessage.pwActive = true;
                            this.promptMessage.pnActive = false;
                        } else {
                            this.promptMessage.password = ''
                            this.promptMessage.pwActive = false;
                            this.promptMessage.pnActive = true;
                        }
                    } 
                    // 密码与确认密码一致性判断
                    else  {
                        this.promptMessage.password = ''
                        this.promptMessage.pwActive = false;
                        this.promptMessage.pnActive = true;
                    }
                } 
                // 正则判断
                else{
                    this.promptMessage.password = '请输入8至20位数密码, 不能为纯数字、纯字母、纯英文符号'
                    this.promptMessage.pwActive = true;
                    this.promptMessage.pnActive = false;
                }
            } 
            // 密码长度判断
            else {
                this.promptMessage.password = '请输入8至20位数密码, 不能为纯数字、纯字母、纯英文符号'
                this.promptMessage.pwActive = true;
                this.promptMessage.pnActive = false;
            }
        },
        // 确认密码验证
        passwordBlur2 (event) {
            // console.log(this.form.password2)
            // if (this.form.password2.length <= 20 && this.form.password2.length >= 8) {
            //     if (this.form.newPassword !== this.form.password2) {
            //         this.promptMessage.password2 = '两次密码不一致'
            //         this.promptMessage.pwActive2 = true;
            //         this.promptMessage.pnActive2 = false;
            //     } else { 
            //         this.promptMessage.password2 = ''
            //         this.promptMessage.pwActive2 = false;
            //         this.promptMessage.pnActive2 = true;
            //     }
            // } else {
            //     this.promptMessage.password2 = '请输入8至20位数密码'
            //     this.promptMessage.pwActive2 = true;
            //     this.promptMessage.pnActive2 = false;
            // }
            if (this.form.password2.length <= 20 && this.form.password2.length >= 8) {
                if (this.form.newPassword !== this.form.password2) {
                    this.promptMessage.password2 = '两次密码不一致';
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
        enter () {
            // 判断密码是否为空
            if (this.form.newPassword === '') {
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
            if (this.promptMessage.pwActive||this.promptMessage.pwActive2) {
                // this.$message({
                //     type: 'warning ',
                //     message: '表单错误,请重新填写'
                // });
            } 
            else {
                console.log(this.form);
                axios.findPassword(this.form)
                .then(res=>{
                    console.log(res);
                    if(res.code === 200){
                        this.$router.push('/successFind')
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
                &:hover{
                    cursor: pointer;
                }
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
            .password {
                margin-top: 48px;
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
            .password2 {
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