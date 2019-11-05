<template>
  <div>
    <div class="outer_wrapper">
      <div class="aside"></div>
      <div class="main">
        <!-- <router-view></router-view> -->
        <div class="content">
          <div class="logo" @click="$router.push('/homePage')"></div>

          <div class="toggle">
            <div class="person" @click="toPerson">个人注册</div>
            <div class="company">企业注册</div>
          </div>

          <div class="registType">
            <div class="type">注册类型</div>
            <el-checkbox-group @change="registTypeChange" v-model="checkList">
              <el-checkbox label="我是开发商"></el-checkbox>
              <el-checkbox label="我是运营商"></el-checkbox>
              <el-checkbox label="我是买家"></el-checkbox>
              <el-checkbox label="其他"></el-checkbox>
            </el-checkbox-group>
            <div class="registOther" v-show="isShowRegistOther">
              <input v-model="form.remark" @blur="otherInfoInput" type="text" />
            </div>
            <div
              class="registInfo"
              style="margin-top:10px;"
              :class="{registWarning: promptMessage.rwActive, registNormal: promptMessage.rnActive}"
            >{{this.promptMessage.type}}</div>
          </div>

          <div class="corporateInformation">
            <div class="info">企业信息</div>
            <div class="text">企业名称</div>
            <el-input
              class="input"
              @blur="nameBlur"
              placeholder="请输入企业名称"
              v-model="form.enterpriseName"
              clearable
            ></el-input>
            <div
              class="info"
              :class="{warning: promptMessage.namewActive, normal: promptMessage.namenActive}"
            >{{this.promptMessage.name}}</div>

            <div class="text">企业机构代码</div>
            <el-input
              class="input"
              @blur="codeBlur"
              placeholder="请输入企业机构代码"
              v-model="form.certificate"
              clearable
            ></el-input>
            <div
              class="info"
              :class="{warning: promptMessage.cwActive, normal: promptMessage.cnActive}"
            >{{this.promptMessage.code}}</div>
          </div>

          <div class="administratorInfo">
            <div class="admin">企业管理员信息</div>
          </div>

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

          <div class="verification">
            <div class="text">短信验证码</div>
            <el-input
              class="input"
              @blur="verificationBlur"
              placeholder="请输入验证码"
              v-model="form.phoneCaptcha"
              clearable
            ></el-input>
            <!-- 点击手机获取验证码 -->
            <div
              @click="getVerification"
              class="right"
              :class="{getting: isgetting.vwActive, geted: isgeted}"
            >{{textInfo}}</div>
            <div
              class="info"
              :class="{warning: promptMessage.vwActive, normal: promptMessage.vnActive}"
            >{{this.promptMessage.verification}}</div>
          </div>

          <div class="password">
            <div class="text">密码</div>
            <el-input
              @blur="passwordBlur"
              placeholder="请输入8-20位字母数字字符"
              v-model="form.password"
              show-password
              clearable
            ></el-input>
            <div
              class="info"
              :class="{warning: promptMessage.pwActive, normal: promptMessage.pnActive}"
            >{{this.promptMessage.password}}</div>
          </div>

          <div class="password">
            <div class="text">确定密码</div>
            <el-input
              @blur="passwordBlur2"
              placeholder="请输入密码"
              v-model="form.password2"
              show-password
              clearable
            ></el-input>
            <div
              class="info"
              :class="{warning: promptMessage.pwActive2, normal: promptMessage.pnActive2}"
            >{{this.promptMessage.password2}}</div>
          </div>

          <div class="check">
            <el-checkbox @change="checkboxChange" v-model="form.checked"></el-checkbox>&nbsp;我已阅读并同意
            <span @click="toRegisterAgreement" style="color: #CAA14F">《用户注册协议》</span>、
            <span @click="toPrivateAgreement" style="color: #CAA14F;">《隐私政策》</span>
          </div>

          <!-- <div class="enter" :class="{gray: isCheck, yellow: !isCheck}" @click="enter">
                    注册 →
          </div>-->
          <div style="margin-top:14px;">
            <el-button
              type="primary"
              @click="enter"
              :disabled="!canClick"
              style="width:400px;height:48px;"
            >注册</el-button>
          </div>
          <div class="foot">
            已有账号,
            <span @click="$router.push('/login')">去登录</span>
          </div>
        </div>

        <!-- 注册验证码弹框 -->
        <el-dialog
          class="verificationDialog"
          width="30%"
          title="输入验证码"
          :close-on-click-modal="false"
          :visible.sync="verificationDialogFormVisible"
        >
          <el-form :model="verificationDialogForm" :rules="rules" ref="ruleForm">
            <div class="bulletBox">
              <el-form-item label label-width="0" prop="code">
                <el-input v-model="verificationDialogForm.code" autocomplete="off"></el-input>
              </el-form-item>

              <!-- <el-input v-model="verificationDialogForm.code" autocomplete="off"></el-input> -->
              <div class="right" @click="replacePic">
                <img width="88px" height="40px" :src="codeImage" alt />
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
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (!this.isvalidCode(value)) {
        axios
          .verificationCheck({
            imageCaptcha: value,
            imageRequestId: this.imageRequestId
          })
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              callback();
            } else {
              callback(new Error(res.message));
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    };

    return {
      // 是否选中用户协议
      isCheck: false,
      isShowRegistOther: false, //是否展示注册类型其他项输入框
      checkList: [],
      form: {
        role: [], //注册类型
        remark: "", //注册类型其他项文本
        enterpriseName: "", //企业名称
        certificate: "", //企业机构代码
        loginName: "", //手机号
        phone: "", //也是手机号
        phoneCaptcha: "", //短信验证码
        password: "", //密码
        password2: "", //确认密码
        checked: false
      },
      // 表单验证样式控制
      promptMessage: {
        type: "",
        rwActive: false,
        rnActive: true,
        name: "",
        namewActive: false,
        namenActive: true,
        code: "",
        cwActive: false,
        cnActive: true,
        mobile: "",
        mwActive: false,
        mnActive: true,
        verification: "",
        vwActive: false,
        vnActive: true,
        password: "",
        pwActive: false,
        pnActive: true,
        password2: "",
        pwActive2: false,
        pnActive2: true,
        checked: ""
      },
      codeImage: "", //验证码图片src
      imageRequestId: "",

      textInfo: "获取验证码", // 获取验证码文本及倒计时
      isgetting: false,
      isgeted: true,

      // 是否展示验证码弹框
      verificationDialogFormVisible: false,
      // 验证码确认表单
      verificationDialogForm: {
        code: ""
      },
      rules: {
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },

  created() {
    this.$store.commit("editIndex", { info: "registerEnterprise" });
    this.replacePic(); //获取验证码图片
  },
  computed: {
    canClick() {
      return (
        this.checkList.length &&
        this.form.enterpriseName &&
        this.form.certificate &&
        this.form.loginName &&
        this.form.phoneCaptcha &&
        this.form.password &&
        this.form.password2 &&
        this.form.checked
      );
    }
  },
  methods: {
    toPerson() {
      this.$router.push("/registerPersonal");
    },
    toRegisterAgreement() {
      const { href } = this.$router.resolve({
        path: "/registerAgreement"
      });
      window.open(href, "_blank");
    },
    toPrivateAgreement() {
      const { href } = this.$router.resolve({
        path: "/privateAgreement"
      });
      window.open(href, "_blank");
    },
    // 验证短信验证码正则
    isvalidCode(str) {
      const reg = /^\d{6}$/;
      return reg.test(str);
    },
    // 用户协议是否勾选
    checkboxChange(status) {
      console.log(status);
      if (status) {
        this.isCheck = false;
      } else {
        this.isCheck = true;
      }
    },
    // 点击获取短信验证码 跳出弹框
    getVerification() {
      if (this.isgeted) {
        this.replacePic();
        this.verificationDialogFormVisible = true;
        this.verificationDialogForm.code = "";
        this.$refs["ruleForm"].resetFields();
      }
    },
    // 获取验证码图片
    replacePic() {
      axios
        .getVerification({})
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.codeImage = res.data.image;
            this.imageRequestId = res.data.requestId;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 验证码弹出框确认按钮
    verificationDialogEnter(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .requestPhoneVerification({
              imageCaptcha: this.verificationDialogForm.code,
              imageRequestId: this.imageRequestId,
              phone: this.form.loginName
            })
            .then(res => {
              console.log(res);
              if (res.code === 200) {
                let num = 60;
                let interval = setInterval(() => {
                  if (num >= 0) {
                    this.textInfo = num + "s后再次获取";
                    num--;
                    this.isgetting = true;
                    this.isgeted = false;
                  } else {
                    clearInterval(interval);
                    this.textInfo = "获取验证码";
                    this.isgetting = false;
                    this.isgeted = true;
                  }
                }, 1000);
                this.verificationDialogFormVisible = false;
              } else {
                this.$notify.error({
                  title: "错误",
                  message: res.message,
                  type: "warning"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 注册类型选中其他时展示文本框
    // 以及注册类型表单验证
    registTypeChange(value) {
      console.log(value);
      if (value.length === 0) {
        this.promptMessage.type = "请选择注册类型";
        this.promptMessage.rwActive = true;
        this.promptMessage.rnActive = false;
      } else {
        this.promptMessage.type = "";
        this.promptMessage.rwActive = false;
        this.promptMessage.rnActive = true;
      }
      this.isShowRegistOther = false;
      for (let index = 0; index < value.length; index++) {
        const e = value[index];
        if (e === "其他") {
          this.isShowRegistOther = true;
        }
      }
    },
    // 选择其他时，输入框的失焦事件
    otherInfoInput() {
        if (!this.form.remark) {
            this.promptMessage.type = "请输入类型";
            this.promptMessage.rwActive = true;
            this.promptMessage.rnActive = false;
            this.isShowRegistOther = true;
          }else{
              this.promptMessage.type = "";
            this.promptMessage.rwActive = false;
            this.promptMessage.rnActive = true;
            this.isShowRegistOther = true;
          }
    },
    // 企业名称表单验证
    nameBlur(event) {
      console.log(this.form.enterpriseName);
      // 非空判断
      if (this.form.enterpriseName === "") {
        this.promptMessage.name = "请输入企业名称";
        this.promptMessage.namewActive = true;
        this.promptMessage.namenActive = false;
      } else {
        // 长度判断
        if (this.form.enterpriseName.length > 30) {
          this.promptMessage.name = "请输入不超过30字";
          this.promptMessage.namewActive = true;
          this.promptMessage.namenActive = false;
        } else {
          this.promptMessage.name = "";
          this.promptMessage.namewActive = false;
          this.promptMessage.namenActive = true;
        }
      }
    },
    // 企业代码表单验证
    codeBlur(event) {
      console.log(this.form.certificate);
      // 非空判断
      if (this.form.certificate === "") {
        this.promptMessage.code = "请输入企业机构代码";
        this.promptMessage.cwActive = true;
        this.promptMessage.cnActive = false;
      } else {
        // 长度判断
        if (this.form.certificate.length > 18) {
          this.promptMessage.code = "请输入不超过18个字符";
          this.promptMessage.cwActive = true;
          this.promptMessage.cnActive = false;
        } else {
          this.promptMessage.code = "";
          this.promptMessage.cwActive = false;
          this.promptMessage.cnActive = true;
        }
      }
    },
    // 手机验证
    mobileBlur(event) {
      console.log(this.form.loginName);
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
    // 短信验证码验证
    verificationBlur(event) {
      console.log(this.form.phoneCaptcha);
      //只能输入6个数字
      let reg = /^\d{6}$/;
      if (this.form.phoneCaptcha === "") {
        this.promptMessage.verification = "请输入短信验证码";
        this.promptMessage.vwActive = true;
        this.promptMessage.vnActive = false;
      } else {
        // 正则判断
        if (reg.test(this.form.phoneCaptcha)) {
          this.promptMessage.verification = "";
          this.promptMessage.vwActive = false;
          this.promptMessage.vnActive = true;
        } else {
          this.promptMessage.verification = "请输入6位数字验证码";
          this.promptMessage.vwActive = true;
          this.promptMessage.vnActive = false;
        }
      }
    },
    // 密码验证
    passwordBlur(event) {
      let reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,20}$/;
      // console.log(this.form.password)
      // 密码长度判断
      if (this.form.password.length <= 20 && this.form.password.length >= 8) {
        // 正则判断
        if (reg.test(this.form.password)) {
          // 密码与确认密码一致性判断
          if (this.form.password2.length !== 0) {
            if (this.form.password !== this.form.password2) {
              this.promptMessage.password = "两次密码不一致";
              this.promptMessage.pwActive = true;
              this.promptMessage.pnActive = false;
            } else {
              this.promptMessage.password = "";
              this.promptMessage.pwActive = false;
              this.promptMessage.pnActive = true;
            }
          }
          // 密码与确认密码一致性判断
          else {
            this.promptMessage.password = "";
            this.promptMessage.pwActive = false;
            this.promptMessage.pnActive = true;
          }
        }
        // 正则判断
        else {
          this.promptMessage.password =
            "请输入8至20位数密码, 不能为纯数字、纯字母、纯英文符号";
          this.promptMessage.pwActive = true;
          this.promptMessage.pnActive = false;
        }
      }
      // 密码长度判断
      else {
        this.promptMessage.password =
          "请输入8至20位数密码, 不能为纯数字、纯字母、纯英文符号";
        this.promptMessage.pwActive = true;
        this.promptMessage.pnActive = false;
      }
    },
    // 确认密码验证
    passwordBlur2(event) {
      // console.log(event)
      console.log(this.form.password2);
      if (this.form.password2.length <= 20 && this.form.password2.length >= 8) {
        if (this.form.password !== this.form.password2) {
          this.promptMessage.password2 = "两次密码不一致";
          this.promptMessage.pwActive2 = true;
          this.promptMessage.pnActive2 = false;
        } else {
          this.promptMessage.password2 = "";
          this.promptMessage.pwActive2 = false;
          this.promptMessage.pnActive2 = true;
        }
      } else {
        this.promptMessage.password2 = "请输入8至20位数密码";
        this.promptMessage.pwActive2 = true;
        this.promptMessage.pnActive2 = false;
      }
    },
    enter() {
      // 没有勾选用户协议,无法注册
      if (this.isCheck) {
        console.log(11111);
        return false;
      }
      this.form.phone = this.form.loginName;
      console.log(this.form);
      // console.log(this.checkList)
      this.form.role = []; //每次提交先置空,在push
      // 判断注册类型是否为空
      if (this.checkList.length === 0) {
        this.promptMessage.type = "请选择注册类型";
        this.promptMessage.rwActive = true;
        this.promptMessage.rnActive = false;
      } else if (this.checkList.length > 0) {
        for (let index = 0; index < this.checkList.length; index++) {
          const element = this.checkList[index];
          if (element === "我是开发商") {
            this.form.role.push(2);
          } else if (element === "我是运营商") {
            this.form.role.push(3);
          } else if (element === "我是买家") {
            this.form.role.push(4);
          } else if (element === "其他") {
              if (!this.form.remark) {
            this.promptMessage.type = "请输入类型";
            this.promptMessage.rwActive = true;
            this.promptMessage.rnActive = false;
            this.isShowRegistOther = true;
            return;
          }else{
            this.promptMessage.type = "";
            this.promptMessage.rwActive = false;
            this.promptMessage.rnActive = true;
            this.isShowRegistOther = true;
          }
            this.form.role.push(5);
          }
        }
      }
      // 判断企业名称是否为空
      if (this.form.enterpriseName === "") {
        this.promptMessage.name = "请输入企业名称";
        this.promptMessage.namewActive = true;
        this.promptMessage.namenActive = false;
      }
      // 判断企业机构代码是否为空
      if (this.form.certificate === "") {
        this.promptMessage.certificate = "请输入企业机构代码";
        this.promptMessage.cwActive = true;
        this.promptMessage.cnActive = false;
      }
      // 判断手机号是否为空
      if (this.form.loginName === "") {
        this.promptMessage.mobile = "手机号不能为空";
        this.promptMessage.mwActive = true;
        this.promptMessage.mnActive = false;
      }
      // 判断验证码是否为空
      if (this.form.phoneCaptcha === "") {
        this.promptMessage.verification = "验证码不正确";
        this.promptMessage.vwActive = true;
        this.promptMessage.vnActive = false;
      }
      // 判断密码是否为空
      if (this.form.password === "") {
        this.promptMessage.password = "请输入8至20位数密码";
        this.promptMessage.pwActive = true;
        this.promptMessage.pnActive = false;
      }
      // 判断确认密码是否为空
      if (this.form.password2 === "") {
        this.promptMessage.password2 = "请输入8至20位数密码";
        this.promptMessage.pwActive2 = true;
        this.promptMessage.pnActive2 = false;
      }
      // 当有一项表单验证没有通过, 禁止提交
      if (
        this.promptMessage.rwActive ||
        this.promptMessage.namewActive ||
        this.promptMessage.cwActive ||
        this.promptMessage.mwActive ||
        this.promptMessage.vwActive ||
        this.promptMessage.pwActive ||
        this.promptMessage.pwActive2
      ) {
        // this.$message({
        //     type: 'warning ',
        //     message: '表单错误,请重新填写'
        // });
      } else {
        axios
          .companyRegistration(this.form)
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              this.$message({
                type: "success ",
                message: "注册成功"
              });
              // --------------------------------------------------------squain-sino
              // let obj = { loginStatus: "yes", ...res.data };
              // let str = JSON.stringify(obj);
              // window.sessionStorage.setItem("userInfo", str);
              //---------------------------------------------------------squain-sino
              this.$router.push("/login");
            } else {
              this.$notify.error({
                title: "错误",
                message: res.message,
                type: "warning"
              });
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
      width: 400px;
      // height: 800px;
      background: white;
      padding-top: 140px;

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
        width: 152px;
        height: 40px;
        background: url(./../../assets/img/logo.png) no-repeat;
        background-size: 100% 100%;
        &:hover {
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
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
          cursor: pointer;
        }
        .company {
          margin-left: 32px;
          float: left;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(202, 161, 79, 1);
          line-height: 20px;
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
          font-family: PingFangSC-Medium, PingFang SC;
        }
        .registOther {
          position: absolute;
          height: 20px;
          line-height: 20px;
          top: 57px;
          left: 60px;
          input {
            font-size: 14px;
            color: #666;
            outline: none; //获取焦点时轮廓隐藏
            border: none;
            height: 18px;
            border: none; //去除边框
            border-radius: 0;
            background-color: transparent;
            border-bottom: #d9d9d9 1px solid;
            box-shadow: 0px 0px 0px 0px; //去除阴影
          }
        }
        .registInfo {
          height: 21px;
          line-height: 21px;
          font-size: 14px;
        }
        .registNormal {
          // border-top: 1px solid #D9D9D9;
        }
        .registWarning {
          border-top: 1px solid red;
          color: red;
        }

        .el-checkbox-group {
          margin-top: 17px;
          /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: rgba(202, 161, 79, 1);
            border-color: rgba(202, 161, 79, 1);
          }
          /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
            color: #333;
            font-size: 14px;
          }
        }
      }
      .corporateInformation {
        margin-top: 18px;
        .info {
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
        }
        .text {
          margin-top: 16px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 14px;
        }
        /deep/.el-input__inner {
          border: none; //去除边框
          padding: 0;
        }
      }
      .administratorInfo {
        margin-top: 18px;
        .admin {
          height: 22px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
        }
      }
      .mobile {
        margin-top: 16px;
        .text {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 14px;
        }
        /deep/.el-input__inner {
          border: none; //去除边框
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
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #bfbfbf;
          cursor: pointer;
        }
        .getting {
          color: blue; //无效
        }
        .geted {
          color: rgba(202, 161, 79, 1);
        }
        /deep/.el-input__inner {
          border: none; //去除边框
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
          border: none; //去除边框
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
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        border-radius: 2px;
      }
      .gray {
        background-color: #666;
      }
      .yellow {
        background-color: #caa14f;
      }
      .yellow:hover {
        background: rgba(181, 144, 70, 1);
        border-radius: 2px;
        cursor: pointer;
      }
      .foot {
        margin-top: 16px;
        margin-bottom: 38px;
        font-size: 14px;
        color: #999999;
        span {
          color: #caa14f;
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