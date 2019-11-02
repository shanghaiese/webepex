<template>
  <div>
    <div class="pro_wrapper" style="width:1200px;margin:0 auto;">
      <div class="title" style="font-size:24px;color:#333333;margin:58px 0 25px 0;">我的购买</div>
      <div class="table_wrapper" style="border:1px solid #E8E8E8">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(250,250,250)',height:'48px',fontSize:'14px',color:'#333333',fontWeight: 500}"
          :cell-style="{height:'56px',paddingTop:'0',paddingBottom:'0',fontSize:'12px',color:'#333333',fontWeight: 400}"
          :row-style="{padding:'36px'}"
        >
          <el-table-column prop="picture" label="主图">
            <template slot-scope="scope">
              <div v-if="scope.row.smallOrderPhotos" class="bbb" style="width:40px; height:40px; background-color: red;">
                <img width="40px" height="40px" :src="scope.row.smallOrderPhotos[0].url" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderId" label="订单号"></el-table-column>
          <el-table-column prop="assetId" label="资产方"></el-table-column>
          <el-table-column prop="baseInfo.address" label="详细地址"></el-table-column>
          <el-table-column prop="layoutInfo.layout" label="户型"></el-table-column>
          <el-table-column prop="salePrice" label="销售价(¥)"></el-table-column>
          <el-table-column prop="tradePrice" label="成交价(¥)"></el-table-column>
          <el-table-column prop="orderStatus" label="交易状态"></el-table-column>
          <el-table-column prop="payTime" label="交易时间"></el-table-column>
          <el-table-column label="操作" width="190" align="left">
            <template slot-scope="scope">
              <el-button
                @click="goToDetail(scope.row.orderId)"
                type="text"
                style="font-size:12px;"
              >订单详情</el-button>
              <el-button
                @click="isChecked(scope.row)"
                v-if="scope.row.orderStatus === '待买家确认交易'"
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

      <!-- 个人用户dialog -->
      <el-dialog
        title="确认交易"
        :visible.sync="personalDialogVisible"
        :close-on-click-modal='false'
        width="520px"
        :before-close="personalHandleClose">
        <div class="tradingInformation">交付日期：{{payTime}} &nbsp;&nbsp; 付款日期：签约后{{payLimitDay}}个工作日内</div>
        <div class="tradingInformation">付款金额(万元)：{{tradePrice}} &nbsp;&nbsp; 服务费(万元)：{{memberShipPrice}}</div>
        <div class="protocol">
          <el-checkbox v-model="checked"> <span style="color:#333">您已阅读和同意</span> <span>《转让协议》</span></el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="personalDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEnter">确 定</el-button>
        </span>
      </el-dialog>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "@/api/taotaozi_api.js";
export default {
  data() {
    return {
      role: 'personal', // developer 开发商 operator 运营商   personal 个人
      tableData: [

      ],
      rules: {
        date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        paymentDate: [
            { required: true, message: '请输入数字', trigger: 'blur' },
            { min: 1, max: 4, message: '长度在4个字符', trigger: 'blur' }
        ],
        money: [
            { required: true, message: '请输入交易金额', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在8个字符', trigger: 'blur' }
        ],
        serviceMoney: [
            { required: true, message: '请输入交易金额', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在8个字符', trigger: 'blur' }
        ],
      },
      // ----分页
      pageNo: 0,
      pageSize: 10,
      pageSizes: [10,20,50,100],
      total: 10,
      // 个人用户确认dialog
      personalDialogVisible: false,
      payTime: '', //交付日期
      payLimitDay: '', //付款日期
      tradePrice: '', //付款金额
      memberShipPrice: '', //服务费
      orderId : '',

      checked: true
    };
  },
  created() {
    this.$store.commit("editIndex", {info: "myPurchase"});
    this.getList();
  },
  methods: {
    // 分页部分
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNo = val-1;
      this.getList();
    },
    // 个人关闭dialog
    personalHandleClose(done) {
      this.personalDialogVisible = false;
    },
    // 开发商关闭dialog
    developerHandleClose(done) {
      this.developerDialogVisible = false;
    },
    // 运营商关闭dialog
    operatorHandleClose(done) {
      this.operatorDialogVisible = false;
    },
    // 跳转详情页
    goToDetail(orderId) {
      console.log(orderId)
      this.$router.push({
        path: "/orderDetail",
        query: {
          orderId: orderId,
          role: 'buyer'
        }
      });
    },
    getList() {
      axios.myPurchase({
        cond: {
          assetType: 1
        },
        current: this.pageNo,
        pageSize: this.pageSize
      })
      .then(res=>{
          console.log(res);
          if(res.code === 200){
            this.tableData = res.data.content;
          }
      })
      .catch(err=>{
          console.log(err);
      })
    },
    // 确认交易dialog弹框的 确定按钮
    dialogEnter (formName) {
      // 是否已经勾选协议
      if(this.checked) {
        if (this.role === 'personal') {
          axios.buyerEnter({
            orderId: this.orderId
          })
          .then(res=>{
              console.log(res);
              if(res.code === 200){
                this.personalDialogVisible = false;
              }
          })
          .catch(err=>{
              console.log(err);
          })
        } else if (this.role === 'developer') {
          console.log(this.developerDialogForm)
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  // alert('submit!');
                  this.developerDialogVisible = false;
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
        } else if (this.role === 'operator') {
          this.operatorDialogVisible = false;
        }
      }
      // 没勾选协议
      else {
        this.$message({
          type: 'warning',
          message: '请勾选协议!'
        });
      }
    },
    // 确认交易
    isChecked(row) {
      console.log(row);
      // console.log(row);
      if (this.role === 'personal') {
        this.payLimitDay = row.payLimitDay;
        this.payTime = row.payTime;
        this.memberShipPrice = row.memberShipPrice;
        this.tradePrice = row.tradePrice;
        this.orderId = row.orderId;

        this.personalDialogVisible = true;
      } else if (this.role === 'developer') {
        this.developerDialogVisible = true;
      } else if (this.role === 'operator') {
        this.operatorDialogVisible = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .table_wrapper {
    /deep/.el-table-column {
      .bbb {
        width: 40px;
        height: 40px;
        background-color: red;
      }
      img {
          width: 48px;
          height: 48px;
      }
    }
  }

  // 确认交易dialog部分
  // 主题内容
  .tradingInformation {
    // width:352px;
    height:22px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  // 协议
  .protocol {
    margin-top: 16px;
    span {
      color: #CAA14F;
      cursor: pointer;
    }
  }
</style>