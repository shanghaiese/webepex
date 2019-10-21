<template>
    <div class="box">
        <div class="pic">
          这是图片
        </div>
        <div class="login">
            <div class="form">
              <div class="logo"></div>
              <div class="mobile">
                <div class="text">手机号</div>
                <el-input
                  class="input"
                  placeholder="请输入手机号"
                  v-model="form.mobile"
                  clearable>
                </el-input>
              </div>
              <div class="password">
                  <!-- <div class="text">手机号</div>
                  <el-input
                    class="input"
                    placeholder="请输入手机号"
                    v-model="form.mobile"
                    clearable>
                  </el-input> -->
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
        mobile: ''
      }
    }
  },

  methods: {

  }
};
</script>

<style lang="less" scope>
    .box {
        width:1088px;
        height:684px;
        margin: 108px auto;
        display: flex;
        .pic {
            width:544px;
            background-color: blue;
        }
        .login {
            flex: 1;
            background-color: yellow;
            .form {
                box-sizing: border-box;
                width: 320px;
                margin-top: 80px;
                margin-left: 112px;
                border: 1px solid #000;
                .logo {
                  height: 32px;
                  background-color: blue;
                }
                .mobile {
                  margin-top: 64px;
                  .text {
                    height: 14px;
                    font-size: 14px;
                    color: #666;
                  }
                  .el-input__inner {
                    border:none;//去除边框
                    padding: 0;
                  }
                }
                .password {
                  margin-top: 40px;
                }
            }
        }
    }
</style>