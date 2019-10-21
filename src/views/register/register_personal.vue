<template>
  <div>
      <div class="outer_wrapper">
          <div class="aside"></div>
          <div class="main">
              <!-- <router-view></router-view> -->
              <div class="content">
                  <div class="logo"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
        }
    }
};
</script>

<style lang="less" scope>
.outer_wrapper {
    display: flex;
    height: 900px;
    .aside {
        flex: 0 0 460px;
        background: url(./../../assets/img/login_background.png) no-repeat;
        background-size: contain;
    }
    .main {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background:blue;
        height: 900px;
        overflow: auto;
        .content {
            width:320px;
            height: 800px;
            background:red;
            padding-top: 100px;
            .logo{
                width: 152px;
                height: 40px;
                background: url(./../../assets/img/logo.png) no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}
</style>