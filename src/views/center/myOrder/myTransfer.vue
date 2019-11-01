<template>
  <div>
    <div class="pro_wrapper" style="width:1200px;margin:0 auto;">
      <div class="title" style="font-size:24px;color:#333333;margin:58px 0 25px 0;">我的转让</div>
      <div class="table_wrapper" style="border:1px solid #E8E8E8">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(250,250,250)',height:'48px',fontSize:'14px'}"
          :cell-style="{height:'56px',paddingTop:'0',paddingBottom:'0',fontSize:'12px',color:'#333333',fontWeight: 400}"
          :row-style="{padding:'36px'}"
        >
          <el-table-column class="picture" prop="picture" label="主图">
            <template slot-scope="scope">
              <div class="bbb" style="width:40px; height:40px; background-color: red;">
                <img width="40px" height="40px" :src="scope.row.smallOrderPhotos[0].url" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderId" label="订单号"></el-table-column>
          <el-table-column prop="assetId" label="资产方"></el-table-column>
          <el-table-column prop="address" label="详细地址"></el-table-column>
          <el-table-column prop="layout" label="户型"></el-table-column>
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
                v-if="scope.row.orderStatus === '待开发商确认交易' && role === 'developer'"
                v-show="scope.row.orderStatus === '待运营商确认交易' && role === 'operator'"
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
        width="520px"
        :before-close="personalHandleClose">
        <div class="tradingInformation">交付日期：{{dialogPaymentDate1}} &nbsp;&nbsp; 付款日期：签约后{{dialogPaymentDate2}}个工作日内</div>
        <div class="tradingInformation">付款金额(万元)：{{dialogMoney}} &nbsp;&nbsp; 服务费(万元)：{{dialogServiceMoney}}</div>
        <div class="protocol">
          <el-checkbox v-model="checked"> <span style="color:#333">您已阅读和同意</span> <span>《转让协议》</span></el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="personalDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEnter">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 运营商dialog -->
      <el-dialog
        title="确认交易"
        :visible.sync="operatorDialogVisible"
        width="30%"
        :before-close="operatorHandleClose">
        <div class="protocol">
          <el-checkbox v-model="checked"> <span style="color:#333">您已阅读和同意</span> <span>《转让协议》</span></el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="operatorDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEnter">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 开发商dialog -->
      <el-dialog
        title="确认交易"
        :visible.sync="developerDialogVisible"
        width="520px"
        :before-close="developerHandleClose">
        <el-form label-position="top" ref="form" :rules="rules" label-width="80px" :model="developerDialogForm">
          <el-form-item label="付款日期" prop="payLimitDay">
            签约后
              <el-input style="width:60px;" v-model="developerDialogForm.payLimitDay"></el-input>
            个工作日内
          </el-form-item>
          <el-form-item label="付款金额(万元)" prop="tradePrice">
            <el-input v-model="developerDialogForm.tradePrice"></el-input>
          </el-form-item>
          <el-form-item label="服务费(万元, 包含在付款金额内)" prop="memberShipPrice">
            <el-input v-model="developerDialogForm.memberShipPrice"></el-input>
          </el-form-item>
          <el-form-item label="交付日期" prop="payTime">
            <el-date-picker type="date" placeholder="选择日期" value-format="timestamp" v-model="developerDialogForm.payTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form>
        <div class="description">平台分成金额为成交金额的X%，即 10000 元</div>
        <div class="protocol">
          <el-checkbox v-model="checked"> <span style="color:#333">您已阅读和同意</span> <span>《转让协议》</span></el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="developerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEnter('form')">确 定</el-button>
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
      role: 'developer', // developer 开发商 personal 个人  operator 运营商
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
      rules: {
        payTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        payLimitDay: [
            { required: true, message: '时间不能为空', trigger: 'blur' },
            { min: 1, max: 4, message: '最多4个字符', trigger: 'blur' }
        ],
        tradePrice: [
            { required: true, message: '请输入交易金额', trigger: 'blur' },
            { min: 1, max: 8, message: '长度最多在8个字符', trigger: 'blur' }
        ],
        memberShipPrice: [
            { required: true, message: '请输入服务费', trigger: 'blur' },
            { min: 1, max: 8, message: '长度最多在8个字符', trigger: 'blur' }
        ],
      },
      // ----分页
      pageNo: 0,
      pageSize: 10,
      pageSizes: [10,20,50,100],
      total: 10,

      // 个人用户确认dialog
      personalDialogVisible: false,
      dialogPaymentDate1: '', //交付日期
      dialogPaymentDate2: '', //付款日期
      dialogMoney: '', //付款金额
      dialogServiceMoney: '', //服务费

      // 开发商确认dialog
      developerDialogVisible: false,
      developerDialogForm: {
          orderId: '', //订单id
          payLimitDay: '', //付款日期
          payTime: '', //交付日期
          tradePrice: '', //成交价
          memberShipPrice: '' //服务费
      },

      // 运营商确认dialog
      operatorDialogVisible: false,
      operatorOrderId: '',  //订单id

      checked: true, //是否勾选协议
      isShowTransactionBtn: false
    };
  },
  created() {
    this.$store.commit("editIndex", {info: "myTransfer"});
    this.getDeveloperList();

    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    // console.log(userInfo.defaultRole.name);
    if (userInfo.defaultRole.name == "运营商") {
      this.role = 'operator';
      this.getOperatorList();
    } else if (userInfo.defaultRole.name === "开发商") {
      this.role = "developer";
      this.getDeveloperList();
    }
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
      this.$router.push({
        path: "/orderDetail",
        query: {
          orderId: orderId,
          role: this.role
        }
      });
    },
    // 开发商获取列表信息
    getDeveloperList() {
      axios.myTransfer({
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
    // 运营获取列表信息
    getOperatorList() {
      console.log("运营商");
      axios.operatorList({
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
      // 第一层判断:是否已经勾选协议
      if(this.checked) {
        // 第二层判断:
        if (this.role === 'personal') {
          this.personalDialogVisible = false;
        } 
        else if (this.role === 'developer') {
          console.log(this.developerDialogForm)
          this.$refs[formName].validate((valid) => {
              // 第三层判断:
              if (valid) {
                  console.log(111111)
                  axios.developerEnter(this.developerDialogForm)
                  .then(res=>{
                      console.log(res);
                      if(res.code === 200){
                        this.developerDialogVisible = false;
                        this.getDeveloperList();
                      }
                  })
                  .catch(err=>{
                      console.log(err);
                  })
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
        } 
        else if (this.role === 'operator') {
          this.operatorDialogVisible = false;
          axios.operatorEnter({
            orderId: this.operatorOrderId
          })
          .then(res=>{
              console.log(res);
              if(res.code === 200){
                this.getOperatorList();
                this.operatorDialogVisible = false;
              }
          })
          .catch(err=>{
              console.log(err);
          })
        }
      }
      // 第一层判断:没勾选协议
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
      // console.log(row.id);
      // 当用户为个人时
      if (this.role === 'personal') {
        this.dialogPaymentDate1 = row.time;
        this.dialogPaymentDate2 = 8;
        this.dialogMoney = row.finalPrice;
        this.dialogServiceMoney = row.finalPrice;
        this.personalDialogVisible = true;
      } 
      // 用户为开发商
      else if (this.role === 'developer') {
        this.developerDialogForm.orderId = row.orderId
        this.developerDialogVisible = true;
      } 
      // 用户为运营商
      else if (this.role === 'operator') {
        this.operatorOrderId = row.orderId;
        this.operatorDialogVisible = true;
      }
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
  // 个人用户dialog主体交易信息
  .tradingInformation {
    // width:352px;
    height:22px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:22px;
  }
  // 开发商dialog底部文字说明
  .description {
    margin-top: 16px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  // dialog用户协议
  .protocol {
    margin-top: 16px;
    span {
      color: #CAA14F;
      cursor: pointer;
    }
  }
</style>