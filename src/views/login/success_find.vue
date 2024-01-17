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

                  <div class="info">
                      <span>√ </span> 您已经成功设置密码，请使用新密码登录
                  </div>

                  <div class="enter" @click="$router.push('/login')">
                    马上登录 →
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
            }
        }
    },

    created () {
        this.$store.commit("editIndex", {info: "successFind"});
    },

    methods: {
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
            padding-top: 324px;
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
            .info {
                margin-top: 53px;
                height:14px;
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height:14px;
                span {
                    display: inline-block;
                    border-radius: 50%;
                    background-color: #66C947;
                    color: white;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                }
            }
            .enter {
                margin-top: 54px;
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
        }
    }
}
</style>