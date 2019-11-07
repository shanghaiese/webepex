<template>
  <div>
    <div class="wrapper">
      <div class="phone item item_phone">
        <span class="icon-svg_phone"></span>
        <div>
          <p class="item_phone_number">18964612029</p>
          <p class="item_phone_content"> 服务时间: 工作日 9:00 ~ 17:00</p>
        </div>
      </div>
      <div class="wechat item">
        <span class="icon-svg_wechat"></span>
        <div style="font-weight:bold;">联系客服</div>
      </div>
      <div class="email item item_p_e">
        <span class="icon-svg_email"></span>
        <div>service@e-pex.com</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  position: fixed;
  bottom: 260px;
  right: 18px;
  background: #ffffff;
  width: 64px;
  border: 1px solid rgb(217, 217, 217);
  border-bottom-width: 0;
  color: #4A4A4A;
  z-index: 999;
  .item {
    width: 64px;
    height: 63px;
    text-align: center;
    line-height: 63px;
    border-bottom: 1px solid rgb(217, 217, 217);
    font-size: 24px;
    transition: 0.25s;
    position: relative;
    &:hover {
      background: #caa14f;
      color: #ffffff;
    }
  }
  .phone {
    div {
      height: 61px;
      width: 0px;
      color: #caa14f;
      transition: 0.5s;
      transform-origin: left;
      font-size: 28px;
      text-align: center;
      line-height: 62px;
      position: absolute;
      left: 0px;
      top: 0;
      border: 1px solid #caa14f;
      border-right-width: 0;
      border-left-width: 0;
      overflow: hidden;
    }
    &:hover div {
      left: -201px;
      width: 200px;
      border-left-width: 1px;
    }
  }
  .item_p_e {
    div {
      height: 61px;
      width: 0px;
      color: #caa14f;
      transition: 0.5s;
      transform-origin: left;
      background-color: #ffffff;
      font-size: 20px;
      text-align: center;
      line-height: 62px;
      position: absolute;
      left: 0px;
      top: 0;
      border: 1px solid #caa14f;
      border-right-width: 0;
      border-left-width: 0;
      overflow: hidden;
    }
    &:hover div {
      left: -201px;
      width: 200px;
      border-left-width: 1px;
    }
  }
  .item_phone {
    div {
      height: 61px;
      width: 0px;
      color: #caa14f;
      transition: 0.5s;
      transform-origin: left;
      background-color: #ffffff;
      font-size: 14px;
      text-align: center;
      line-height: 62px;
      position: absolute;
      left: 0px;
      top: 0;
      border: 1px solid #caa14f;
      border-right-width: 0;
      border-left-width: 0;
      overflow: hidden;
    }
    &:hover div {
      left: -201px;
      width: 200px;
      border-left-width: 1px;
    }
  }

  .item_phone_number {
    font-size: 20px;
    margin-top: -15px;
    margin-bottom: 0;
    height: 15px;
  }
  .item_phone_number {
    margin-top: -10px;
    margin-bottom: 0;
    height: 15px;
  }
  .wechat {
      div {
      padding:130px 0 9px;
      width: 0px;
      height: 187px;
      box-sizing: border-box;
      color: #333333;
      transition: 0.5s;
      transform-origin: left;
      font-size: 16px;
      text-align: center;
      position: absolute;
      left: 0px;
      top: 0;
      border: 1px solid #caa14f;
      border-right-width: 0;
      border-left-width: 0;
      background: url(../../assets/img/wechat_code.jpg) center 4px;
      background-size: 146px 146px;
      background-repeat: no-repeat;
      background-color:#ffffff;
      overflow: hidden;
    }
    &:hover div {
      left: -160px;
      width: 160px;
      border-left-width: 1px;
      border-right-width: 1px;
    }
  }
}
</style>
