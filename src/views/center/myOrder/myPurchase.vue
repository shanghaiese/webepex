<template>
  <div>
    <div class="pro_wrapper" style="width:1200px;margin:0 auto;">
      <div class="title" style="font-size:24px;color:#333333;margin:58px 0 25px 0;">我的购买</div>
      <div class="table_wrapper" style="border:1px solid #E8E8E8">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(250,250,250)',height:'48px',fontSize:'14px'}"
          :cell-style="{height:'48px',paddingTop:'0',paddingBottom:'0',fontSize:'12px',color:'#333333'}"
          :row-style="{padding:'36px'}"
        >
          <el-table-column class="picture" prop="picture" label="主图">
              <template slot-scope="scope">
								<img
									width="40px"
									height="40px"
									src="./../../../assets/img/person.png"
								/>
							</template>
          </el-table-column>
          <el-table-column prop="orderNum" label="订单号"></el-table-column>
          <el-table-column prop="assets" label="资产方"></el-table-column>
          <el-table-column prop="address" label="详细地址"></el-table-column>
          <el-table-column prop="type" label="户型"></el-table-column>
          <el-table-column prop="sellingPrice" label="销售价(¥)"></el-table-column>
          <el-table-column prop="finalPrice" label="成交价(¥)"></el-table-column>
          <el-table-column prop="status" label="交易状态"></el-table-column>
          <el-table-column prop="time" label="交易时间"></el-table-column>
          <el-table-column label="操作" width="190" align="left">
            <template slot-scope="scope">
              <el-button
                @click="goToDetail(scope.row.id)"
                type="text"
                style="font-size:12px;"
              >订单详情</el-button>
              <el-button
                @click="isChecked(scope.row)"
                v-if="scope.row.status === '待买家确认交易'"
                type="text"
                style="font-size:12px;"
              >确认交易</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination_wrapper" style="text-align:right;padding:10px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>

      <el-dialog
        title="确认交易"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div class="tradingInformation">付款日期：{{dialogTime}} &nbsp;&nbsp; 付款金额(¥)：{{dialogMoney}}</div>
        <div class="protocol">您已阅读和同意 <span>《四方协议》</span></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [
        { 
          id: 1,
          picture: "",
          orderNum: '11100123-01-27',
          assets: "绿地国际康养城",
          address: "上海市青浦区康工路777弄6-101",
          type: "三房两厅两卫",
          sellingPrice: "596万元",
          finalPrice: "488万元",
          status: "交易成功",
          time: "2018-07-28 12:23"
        },
        { 
          id: 1,
          picture: "",
          orderNum: '11100123-01-27',
          assets: "绿地国际康养城",
          address: "上海市青浦区康工路777弄6-101",
          type: "三房两厅两卫",
          sellingPrice: "596万元",
          finalPrice: "488万元",
          status: "待买家确认交易",
          time: "2018-07-28 12:23"
        },
        { 
          id: 1,
          picture: "",
          orderNum: '11100123-01-27',
          assets: "绿地国际康养城",
          address: "上海市青浦区康工路777弄6-101",
          type: "三房两厅两卫",
          sellingPrice: "596万元",
          finalPrice: "488万元",
          status: "交易成功",
          time: "2018-07-28 12:23"
        },
        { 
          id: 1,
          picture: "",
          orderNum: '11100123-01-27',
          assets: "绿地国际康养城",
          address: "上海市青浦区康工路777弄6-101",
          type: "三房两厅两卫",
          sellingPrice: "596万元",
          finalPrice: "488万元",
          status: "交易成功",
          time: "2018-07-28 12:23"
        },
        { 
          id: 2,
          picture: "",
          orderNum: '11100123-01-27',
          assets: "绿地国际康养城",
          address: "上海市青浦区康工路777弄6-101",
          type: "三房两厅两卫",
          sellingPrice: "596万元",
          finalPrice: "488万元",
          status: "待买家确认交易",
          time: "2018-07-28 12:23"
        },
        { 
          id: 3,
          picture: "",
          orderNum: '11100123-01-27',
          assets: "绿地国际康养城",
          address: "上海市青浦区康工路777弄6-101",
          type: "三房两厅两卫",
          sellingPrice: "596万元",
          finalPrice: "488万元",
          status: "待开发商确认交易",
          time: "2018-07-28 12:23"
        },
        { 
          id: 4,
          picture: "",
          orderNum: '11100123-01-27',
          assets: "绿地国际康养城",
          address: "上海市青浦区康工路777弄6-101",
          type: "三房两厅两卫",
          sellingPrice: "596万元",
          finalPrice: "488万元",
          status: "交易成功",
          time: "2018-07-28 12:23"
        },
      ],
      // ----分页
      pageNo: 1,
      pageSize: 10,
      pageSizes: [10,20,50,100],
      total: 10,
      dialogVisible: false,
      dialogTime: '',
      dialogMoney: ''
    };
  },
  created() {
    this.$store.commit("editIndex", {info: "myPurchase"});
  },
  methods: {
    // 分页部分
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 关闭dialog
    handleClose(done) {
      this.dialogVisible = false;
    },
    // 跳转详情页
    goToDetail(id) {
      console.log(id)
      this.$router.push("/orderDetail");
    },
    // 确认交易
    isChecked(row) {
      console.log(row);
      // console.log(row.id);
      this.dialogMoney = row.finalPrice;
      this.dialogTime = row.time;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
  .table_wrapper {
    .picture {
      img {
          width: 48px;
          height: 48px;
      }
    }
  }
  .tradingInformation {
    width:352px;
    height:22px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  .protocol {
    margin-top: 16px;
    span {
      color: #CAA14F;
      cursor: pointer;
    }
  }
</style>