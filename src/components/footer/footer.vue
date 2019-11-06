<template>
  <div class="footer_container">
    <div class="inner">
      <div class="inner_left clearFixed">
        <span>上海易涟信息技术有限公司©版权所有</span>
        <span>沪ICP备19013751号</span>
        <span class="outerLink" @click="goToOuter">
          <img src="../../assets/img/police.png" alt /> 沪公网安备 31010102005690号
        </span>
      </div>
      <div class="inner_right">
        <span @click="goToPage('/privateAgreement')">隐私政策</span>
        <span @click="goToPage('/lawInfo')">法律信息</span>
        <span @click="goToPage('/map')">网站地图</span>
        <el-tooltip class="item" effect="light" content="18964612029" placement="top">
          <span>客服专线</span>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    goToPage(pa) {
      const { href } = this.$router.resolve({
        path: pa
      });
      window.open(href, "_blank");
    },
    goToOuter() {
      // const href = "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010102005690www.beian.miit.gov.cn";
      const href = "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010102005690";
      window.open(href, "_blank");
    }
  }
};
</script>

<style lang="less" scoped>
.footer_container {
  height: 72px;
  background: rgba(0, 0, 0, 1);
  line-height: 72px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  .inner {
    width: 1200px;
    margin: 0 auto;
    font-size: 16px;
    color: #ffffff;
    .inner_left {
      float: left;
      span {
        float: left;
        img {
          transform: translateY(5px);
        }
      }
      span + span {
        margin-left: 16px;
      }
      .outerLink:hover {
        cursor: pointer;
      }
    }
    .inner_right {
      float: right;
      span {
        display: inline;
        padding: 0 8px;
        &:hover {
          cursor: pointer;
        }
      }
      span + span {
        border-left: 1px solid #ffffff;
      }
    }
  }
  /deep/.el-tooltip__popper.is-light {
      border-width: 0;
  }
}
</style>
