<template>
  <div class="box">
      <div class="title">风险揭示书</div>
      
      <div class="info">转让方和受让方（以下统称“双方”）知晓并完全同意，通过上海易涟信息技术有限公司运营管理的【权易宝资产数字化服务平台】（网址：https://www.e-pex.com/index，以下简称“平台”）转让【绿地国际康养城·颐尚居】的会籍（该转让行为以下简称“康养公寓会籍交易”，具体转让交易约定参见《康养公寓会籍转让协议》），受让方从转让方处受让康养公寓会籍。为了保证双方进行康养公寓会籍交易的安全，对双方进行如下风险提示。双方承诺，双方已经详细阅读并完全理解本风险揭示书的全部含义，双方有能力并愿意承担因双方参与康养公寓会籍交易产生的全部风险。前述康养公寓会籍交易具体可能产生的风险包括但不限于以下几项： </div>
      <div class="info">1.提前终止风险：若市场发生重大变动或突发性事件或其他平台认为需要提前终止康养公寓会籍交易的情形时，双方之间的康养公寓会籍交易可能被提前终止。</div>
      <div class="info">2.信息失实风险：平台作为康养公寓会籍交易的技术服务方，并非康养公寓产权人以及双方在康养公寓会籍交易中的代理人，尽管已采取文件核查等多种措施以证实资产原始持有方或转让方拥有合法的处分权利，囿于平台通过第三方取得的康养公寓权属资料可能存在虚假等情况，仍存在资产原始持有方或转让方对康养公寓会籍不享有相应权利、不属于适格权利主体的风险。平台因重大过失未采取核实康养公寓权属情况导致双方在交易中遭受损失的，由平台承担相应责任，除此之外，平台不对双方之间进行的康养公寓会籍交易承担任何责任。平台公示的权利证明仅作为平台对康养公寓会籍交易的确认，不属于行政机关出具的权利登记证明，不具有法定公示效力，可能无法对抗善意第三人。</div>
      <div class="info">3.政策变化及运营风险：平台面临的监管政策环境变化、平台本身的运营风险等均可能导致康养公寓会籍交易被限制、终止等，导致受让方向转让方支付的交易款项以及转让方向受让方转让的康养公寓会籍存在发生争议纠纷的风险。目前平台提供的是康养公寓会籍交易的创新服务，与康养公寓会籍交易运作相关的法律制度还不完善，包括公寓在内的房地产政策、货币政策、产业政策、区域发展政策等国家宏观政策会发生变化，可能会对康养公寓会籍交易产生影响乃至终止该交易。</div>
      <div class="info">4.税收风险：康养公寓会籍交易有关的税费按照法律法规规定由双方自行缴纳。如果未来中国税法或相关税收管理条例等监管规则发生变化，税务部门向双方征收任何额外的税负，易涟信息（平台）及其他康养公寓会籍交易服务提供方等均不承担任何补偿责任。</div>
      <div class="info">5.康养公寓权属转移风险：上述康养公寓会籍交易内容包含康养公寓特定房屋的居住权利，转让因合同内容客观上无法办理租赁登记，在会籍对应的房屋被转让或设置抵押，或受到第三方司法查封和拍卖的情况下，受让方可能因资产对应标的物发生所有权转让、被执行的情形而无法继续使用康养公寓。</div>
      <div class="info">6.不可抗力风险：指由于自然灾害、战争等不可抗力因素的出现，将严重影响康养公寓会籍交易合同的签署、款项支付、对应康养公寓会籍的交割、康养公寓会籍的转让等的正常进行，甚至导致康养公寓会籍交易失败乃至受让方向转让方支付的交易款项或转让方向受让方转让的康养公寓会籍无法收回。对于由不可抗力风险所导致的任何损失，由双方自行承担。</div>

      <div class="info" style="text-align:right; margin: 30px 0;">风险揭示方：上海易涟信息技术有限公司</div>

      <div class="info">双方确认，已经阅读并知晓前述全部风险，并自愿承担康养公寓会籍转让所产生的全部后果。本确认一经作出，不可撤销，对确认方产生约束力。</div>

      <div class="check">转让方（盖章）：</div>
      <div class="check">受让方（签字）：</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
    this.$store.commit("editIndex", {info: "riskWarning"});
  },
};
</script>

<style lang="less" scoped>
  .box {
    width: 1200px;
    // height: 800px;
    margin: 0 auto;
    padding-top: 56px;
    // border: 1px solid #000;
    .title {
      text-align: center;
      height:36px;
      font-size:24px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:36px;
      font-weight: 700;
    }
    .paragraph {
      .firstTitle {
        height:28px;
        font-size:20px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:28px;
        font-weight: 700;
      }
      .normal {
        text-indent:2em;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        span {
          font-weight: 700;
        }
      }
    }

    .info {
        margin-top: 10px;
        text-indent:2em;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
    }

    .check {
        padding-right: 50px;
        margin-top: 30px;
        margin-bottom: 50px;
        text-align: right;
        text-indent:2em;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
    }
  }
</style>

