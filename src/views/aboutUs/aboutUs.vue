<template>
  <div class="main">
    <div class="top">关于我们</div>
    <div class="content">
      <div class="text">
        <div class="title">
          关于权易宝
        </div>
        <div class="background">
        </div>
        <div class="info">
          <p>权易宝平台（www.e-pex.com）（以下简称权易宝）隶属于上海易涟信息技术有限公司，是易涟公司推出的针对房地产使用权的数字化服务平台。</p>
          <p>权易宝注重于强调不动产的使用功能，采用权属分离，并整合多种技术手段重构了房地产使用权数字化、多层级转让的房地产使用权数字化生态。根据房地产特性，按照权属分离、空间分离、时间分离三维度特有的创新型设计，让不可分割变为分割、让空置变为使用、让固化变为灵活、让复杂变为便捷。</p>
          <p>权易宝采用三大核心技术确保房地产使用权确权的合法合规流转。主要以物联网技术辅助线下勘测，确保使用权的真实性；以电子签章技术保障各类合同合法合规，便捷签署；基于区块链底层技术进行存证，并采用多法律主体共同维护的共识机制，完整实现了B2B2C的资产使用权合法、高效的流通与服务。</p>
          <p>权易宝将致力于建设成为房地产开发商、运营商、服务机构、金融机构等围绕房地产使用属性的完整生态，成为行业盘活存量资产的利器，开创使用权流通市场进入新时代。</p>
        </div>
      </div>
      <div class="picture">
        <div class="image">
          <img src="../../assets/img/aboutUs.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  },

  created() {
    this.$store.commit("editIndex", {info: "aboutUs"});
  },

};
</script>

<style lang="less" scoped>
  .main {
    .top {
      height: 398px;
      background: url(../../assets/img/aboutUsHead.jpg) no-repeat;
      background-size: cover;
      color: #ffffff;
      font-size: 56px;
      text-align: center;
      min-width: 1200px;
      line-height: 398px;
    }
    .content {
      margin: 0 auto;
      margin-top: 64px;
      margin-bottom: 60px;
      width: 1223px;
      overflow: hidden;
      .text {
        box-sizing: border-box;
        width: 492px;
        float: left;
        .title {
          height: 32px;
          line-height: 32px;
          font-size: 32px;
          margin-bottom: 16px;
        }
        .background {
          width: 196px;
          height: 6px;
          background: url(../../assets/img/line.png) no-repeat;
          background-size: 100% 100%;
          margin-bottom: 46px;
        }
        .info {
          font-size:16px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:24px;
          span {
            color:#CAA14F;
          }
        }
      }
      .picture {
        box-sizing: border-box;
        float: right;
        width: 670px;
        height: 514px;
        // border: 1px dashed #ccc;
        .image {
          padding: 86px 31px 52px 43px;
          overflow: hidden;
          img {
            width: 100%;
            float: left;
          }
        }
      }
    }
  }
</style>
