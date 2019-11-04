<template>
  <div class="outer">
    <div class="box">
      <div class="pic"></div>
      <div class="login">
        <div class="form">
          <div class="logo" @click="$router.push('/homePage')"></div>

          <div class="common">
            <div class="mobile">
              <div class="text">手机号</div>
              <el-input
                class="input"
                @blur="mobileBlur"
                placeholder="请输入手机号"
                v-model="form.loginName"
                clearable
              ></el-input>
              <div
                class="info"
                :class="{warning: promptMessage.mwActive, normal: promptMessage.mnActive}"
              >{{this.promptMessage.mobile}}</div>
            </div>

            <div class="password">
              <div class="text">密码</div>
              <el-input
                placeholder="请输入密码"
                @blur="passwordBlur"
                v-model="form.password"
                show-password
                clearable
              ></el-input>
              <div
                class="info"
                :class="{warning: promptMessage.pwActive, normal: promptMessage.pnActive}"
              >{{this.promptMessage.password}}</div>
            </div>

            <div class="verification">
              <div class="text">验证码</div>
              <el-input
                @blur="verificationBlur"
                class="input"
                placeholder="请输入验证码"
                v-model="form.imageCaptcha"
                clearable
              ></el-input>
              <div @click="replacePic" class="image">
                <img :src="codeImage" alt />
              </div>
              <div
                class="info"
                :class="{warning: promptMessage.vwActive, normal: promptMessage.vnActive}"
              >{{this.promptMessage.verification}}</div>
            </div>

            <div class="check">
              <el-checkbox v-model="form.checked">记住账号密码</el-checkbox>
            </div>

            <div class="enter" @click="enter">登录 →</div>

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
import axios from "@/api/taotaozi_api.js";
export default {
  data() {
    return {
      form: {
        loginName: "", //手机号
        password: "",
        imageCaptcha: "", //验证am
        checked: false,
        imageRequestId: "" //获取验证码后端返回的id
      },
      codeImage: "", //验证码图片src
      promptMessage: {
        mobile: "",
        mwActive: false,
        mnActive: true,
        password: "",
        pwActive: false,
        pnActive: true,
        verification: "",
        vwActive: false,
        vnActive: true,
        checked: ""
      }
    };
  },

  created() {
    this.$store.commit("editIndex", { info: "login" });
    this.replacePic(); //获取验证码图片
    this.autoCountPassword();
  },

  methods: {
    // 记住账号密码自动填写
    autoCountPassword() {
      this.form.loginName = localStorage.getItem("accountNumber");
      this.form.password = localStorage.getItem("password");
      if (localStorage.getItem("remember") === "true") {
        this.form.checked = true;
      } else {
        this.form.checked = false;
      }
    },
    // 手机号码验证
    mobileBlur(event) {
      // console.log(this.form.mobile)
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (this.form.loginName === "") {
        this.promptMessage.mobile = "手机号不能为空";
        this.promptMessage.mwActive = true;
        this.promptMessage.mnActive = false;
      } else {
        if (reg.test(this.form.loginName)) {
          this.promptMessage.mobile = "";
          this.promptMessage.mwActive = false;
          this.promptMessage.mnActive = true;
        } else {
          this.promptMessage.mobile = "手机号格式不正确";
          this.promptMessage.mwActive = true;
          this.promptMessage.mnActive = false;
        }
      }
    },
    // 密码验证
    passwordBlur(event) {
      // console.log(this.form.password.length)
      if(!this.form.password){
        this.promptMessage.password = "密码不能为空";
        this.promptMessage.pwActive = true;
        this.promptMessage.pnActive = false;
        return;
      }
      if (this.form.password.length <= 20 && this.form.password.length >= 8) {
        this.promptMessage.password = "";
        this.promptMessage.pwActive = false;
        this.promptMessage.pnActive = true;
      } else {
        this.promptMessage.password = "请输入8至20位数密码";
        this.promptMessage.pwActive = true;
        this.promptMessage.pnActive = false;
      }
    },
    // 图形验证码校检
    verificationBlur(event) {
      // console.log(this.form.verification)
      if(!this.form.imageCaptcha){
        this.promptMessage.verification = "图形验证码不能为空";
        this.promptMessage.vwActive = true;
        this.promptMessage.vnActive = false;
        return;
      }
      axios
        .verificationCheck({
          imageCaptcha: this.form.imageCaptcha,
          imageRequestId: this.form.imageRequestId
        })
        .then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.promptMessage.verification = "";
            this.promptMessage.vwActive = false;
            this.promptMessage.vnActive = true;
          } else {
            this.promptMessage.verification = res.message;
            this.promptMessage.vwActive = true;
            this.promptMessage.vnActive = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击获取验证码图片
    replacePic() {
      axios
        .getVerification({})
        .then(res => {
          // console.log(res);
          this.codeImage = res.data.image;
          this.form.imageRequestId = res.data.requestId;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 登录
    enter() {
      // console.log(this.form)
      // 判断手机号是否为空
      if (this.form.loginName === "") {
        this.promptMessage.mobile = "手机号不能为空";
        this.promptMessage.mwActive = true;
        this.promptMessage.mnActive = false;
      }
      // 判断密码是否为空
      if (this.form.password === "") {
        this.promptMessage.password = "请输入8至20位数密码";
        this.promptMessage.pwActive = true;
        this.promptMessage.pnActive = false;
      }
      // 判断验证码是否为空
      if (this.form.imageCaptcha === "") {
        this.promptMessage.verification = "验证码不正确";
        this.promptMessage.vwActive = true;
        this.promptMessage.vnActive = false;
      }
      // 当有一项表单验证没有通过, 禁止提交
      if (
        this.promptMessage.mwActive ||
        this.promptMessage.pwActive ||
        this.promptMessage.vwActive
      ) {
        // this.$message({
        //       type: 'warning ',
        //       message: '表单错误,请重新填写'
        // });
      } else {
        axios
          .login(this.form)
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              // --------------------------------------------------------squain-sino
              let obj = { loginStatus: "yes", ...res.data };
              let str = JSON.stringify(obj);
              window.sessionStorage.setItem("userInfo", str);
              //---------------------------------------------------------squain-sino
              sessionStorage.setItem("token", res.data.token);
              // 是否记住密码, 存进localstorage
              if (this.form.checked) {
                localStorage.setItem("accountNumber", this.form.loginName);
                localStorage.setItem("password", this.form.password);
                localStorage.setItem("remember", true); //下次进入默认把记住账户密码框勾选
              } else if (!this.form.checked) {
                localStorage.setItem("accountNumber", "");
                localStorage.setItem("password", "");
                localStorage.setItem("remember", false);
              }
              let redirect = decodeURIComponent(
                this.$route.query.redirect || "/"
              );
              console.log(redirect);
              this.$router.push({ path: redirect });
            } else {
              this.$message({
                showClose: true,
                message: res.message,
                type: "error"
              });
              this.replacePic();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.outer {
  background: rgba(240, 241, 247, 1);
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
}
.box {
  width: 1088px;
  height: 684px;
  display: flex;
  .pic {
    width: 544px;
    background: url(./../../assets/img/登录页面左侧图.png) no-repeat;
    background-size: contain;
  }
  .login {
    flex: 1;
    background-color: rgba(255, 255, 255, 1);
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
        border-top: 1px solid #d9d9d9;
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
        &:hover {
          cursor: pointer;
        }
      }
      .mobile {
        margin-top: 64px;
        .text {
          height: 14px;
          font-size: 14px;
          color: #666;
        }
        /deep/.el-input__inner {
          border: none; //去除边框
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
          border: none; //去除边框
          padding: 0;
        }
      }
      .verification {
        margin-top: 22px;
        position: relative;
        .el-input {
          width: 200px;
        }
        .image {
          width: 100px;
          position: absolute;
          top: 14px;
          right: 0px;
          cursor: pointer;
          img {
            width: 100px;
            height: 40px;
          }
        }
        .text {
          height: 14px;
          font-size: 14px;
          color: #666;
        }
        /deep/.el-input__inner {
          border: none; //去除边框
          padding: 0;
        }
      }
      .check {
        font-size: 14px;
        margin-top: 20px;
        /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
          color: #333;
        }
        /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #caa14f;
          border-color: #caa14f;
        }
      }
      .enter {
        margin-top: 14px;
        height: 48px;
        line-height: 48px;
        background-color: #caa14f;
        font-size: 14px;
        text-align: center;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        border-radius: 2px;
      }
      .enter:hover {
        background: rgba(181, 144, 70, 1);
        border-radius: 2px;
        cursor: pointer;
      }
      .foot {
        margin-top: 16px;
        overflow: hidden;
        font-size: 14px;
        .left {
          float: left;
          color: #caa14f;
          cursor: pointer;
        }
        .right {
          float: right;
          color: #999;
          cursor: pointer;
        }
      }
    }
  }
}
</style>