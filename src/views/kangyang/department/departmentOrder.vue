<template>
  <div>
    <vSideBar/>
    <div class="wrapper">
      <div class="title">确定订单</div>
      <div class="table_wrap">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(250,250,250)',height:'48px',fontSize:'14px'}"
          :cell-style="{height:'48px',paddingTop:'0',paddingBottom:'0',fontSize:'12px',color:'#333333'}"
          :row-style="{padding:'36px'}"
        >
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <div style="overflow:hidden;">
                <img :src="scope.row.url" alt="" width="40px" height="40px" style="float:left">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="订单号"></el-table-column>
          <el-table-column prop="floor" label="资产方"></el-table-column>
          <el-table-column prop="room" label="项目地址"></el-table-column>
          <el-table-column prop="rate" label="户型"></el-table-column>
          <el-table-column prop="direction" label="销售价(¥)"></el-table-column>
          <el-table-column prop="price" label="建筑面积"></el-table-column>
        </el-table>
      </div>
      <div class="check_wrap">
        <el-checkbox v-model="checked"></el-checkbox>
        <span class="text">同意并遵守</span>
        <span class="agreement_wrapper">
          <span>《风险提示》</span>
          <span>《资产转让协议》</span>
        </span>
      </div>
      <div class="button_wrap">
        <el-button :disabled="!checked" type="primary" @click="goToStatus">确定下单</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vSideBar from "@/components/sideBar/sideBar";
export default {
  data () {
    return {
      tableData: [
        {
          id: 1,
          url: "/static/img/person.png",
          number: "11100123-01-27",
          floor: "绿地国际康养城",
          room: "上海市青浦区康工路777弄6-101",
          rate: "三房两厅两卫",
          direction: "596万元",
          price: "180平米",
          status: "已上架",
          date: "2019-09-18",
          hash:
            "4ba68650585a8b2aae7c2c490f2feaf69a5a25096fc4ff7ad27309c830cb050a"
        }
      ],
      checked: false
    }
  },
  created () {
    this.$store.commit("editIndex", {info: "departmentOrder"});
  },
  components: {
    vSideBar
  },
  methods: {
    goToStatus() {
      this.$router.push("/departmentOrderStatus");
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper{
  width: 1200px;
  margin:0 auto;
  .title{
    margin:55px 0 25px 0;
    font-size: 24px;
    color: #333333;
  }
  .table_wrap {
    border:1px solid #E8E8E8;
    border-bottom-width:0;
    margin-bottom: 25px;
  }
  .check_wrap {
    font-size: 14px;
    .text{
      color: #333333;
      margin-left: 10px;
    }
    .agreement_wrapper {
      color:#CAA14F;
    }
  }
  .button_wrap {
    text-align: right;
    margin-top: 48px;
    .el-button{
      width: 280px;
      height: 48px;
    }
  }
}
</style>