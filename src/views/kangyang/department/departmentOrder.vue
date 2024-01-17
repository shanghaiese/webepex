<template>
  <div>
    <div class="wrapper">
      <div class="title">确定订单</div>
      <div class="table_wrap" v-if="tableData.length">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(250,250,250)',height:'48px',fontSize:'14px'}"
          :cell-style="{height:'48px',paddingTop:'0',paddingBottom:'0',fontSize:'12px',color:'#333333'}"
          :row-style="{padding:'36px'}"
        >
          <el-table-column label="主图" align="left">
            <template slot-scope="scope">
              <div style="overflow:hidden;" v-if="scope.row.smallOrderPhotos">
                <img
                  :src="scope.row.smallOrderPhotos[0].url"
                  alt
                  width="40px"
                  height="40px"
                  style="float:left"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="developerInfo.name" label="资产方"></el-table-column>
          <el-table-column prop="apartmentBaseInfo.projetName" label="项目名称"></el-table-column>
          <el-table-column prop="apartmentBaseInfo.address" label="项目地址"></el-table-column>
          <el-table-column label="资产信息">
            <template slot-scope="scope">
              <div>
                <div>
                  <span>{{scope.row.buildingNo}}号楼</span>
                  <span>{{scope.row.roomNo}}室</span>
                </div>
                <div>
                  <span>{{scope.row.apartmentLayoutInfo.layout}}</span>
                  <span>{{scope.row.apartmentLayoutInfo.layoutType}}</span>
                </div>
                <div>
                  <span>{{scope.row.apartmentLayoutInfo.buildArea}}平方米</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="销售价(¥)">
            <template slot-scope="scope">
              <div>
                <div>{{scope.row.price.slice(0,-6)}}万元</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="check_wrap">
        <el-checkbox v-model="checked"></el-checkbox>
        <span class="text">同意并遵守</span>
        <span class="agreement_wrapper">
          <span class="toOtherPage" @click="goToPage('/riskWarning')">《风险提示》</span>
          <span class="toOtherPage" @click="goToPage('/transferAgreement')">《资产转让协议》</span>
        </span>
      </div>
      <div class="button_wrap">
        <el-button :disabled="!checked" type="primary" @click="goToStatus">确定下单</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import http from "@/api/squainApi";
export default {
  data() {
    return {
      tableData: [],
      checked: false,
      assetId: null,
      assetType: null,
      fromId: null,
      salePrice: null,
      toId: null
    };
  },
  created() {
    this.$store.commit("editIndex", { info: "departmentOrder" });
    let str = window.sessionStorage.getItem("squain_assetId");
    let str3 = window.sessionStorage.getItem("squain_assetType");
    let str4 = window.sessionStorage.getItem("squain_fromId");
    let str5 = window.sessionStorage.getItem("squain_salePrice");
    let str2 = window.sessionStorage.getItem("userInfo");
    let str6 = window.sessionStorage.getItem("squain_selectedRoom");
    if (!!str2) {
      this.toId = parseInt(JSON.parse(str2).id);
    }
    this.assetId = parseInt(str);
    this.assetType = parseInt(str3);
    this.fromId = parseInt(str4);
    this.salePrice = str5;
    if (!!str6) {
      let arr = [];
      arr.push(JSON.parse(str6));
      this.tableData = arr;
      console.log(this.tableData);
    }
    // this.getOrder();
  },
  methods: {
    goToStatus() {
      this.getOrder();
    },
    goToPage(pa) {
      const { href } = this.$router.resolve({
        path: pa
      });
      window.open(href, "_blank");
    },
    // ------------------------api;
    getOrder() {
      http
        .order({
          assetId: this.assetId,
          toId: this.toId,
          assetType: this.assetType,
          fromId: this.fromId,
          salePrice: this.salePrice
        })
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$router.push("/departmentOrderStatus");
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 1200px;
  margin: 0 auto;
  .title {
    margin: 55px 0 25px 0;
    font-size: 24px;
    color: #333333;
  }
  .table_wrap {
    border: 1px solid #e8e8e8;
    border-bottom-width: 0;
    margin-bottom: 25px;
  }
  .check_wrap {
    font-size: 14px;
    .text {
      color: #333333;
      margin-left: 10px;
    }
    .agreement_wrapper {
      color: #caa14f;
      .toOtherPage:hover {
        cursor: pointer;
      }
    }
  }
  .button_wrap {
    text-align: right;
    margin-top: 48px;
    .el-button {
      width: 280px;
      height: 48px;
    }
  }
}
</style>