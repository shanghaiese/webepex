<template>
  <div>
    <div class="pro_wrapper" style="width:1200px;margin:0 auto;">
      <div class="title" style="font-size:24px;color:#333333;margin:58px 0 25px 0;">我的转让</div>
      <div class="table_wrapper" style="border:1px solid #E8E8E8">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(250,250,250)',height:'48px',fontSize:'14px'}"
          :cell-style="{height:'56px',paddingTop:'0',paddingBottom:'0',fontSize:'12px',color:'#333333',fontWeight: '400'}"
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
          <el-table-column prop="baseInfo.brief" label="资产方"></el-table-column>
          <el-table-column prop="baseInfo.address" label="详细地址"></el-table-column>
          <el-table-column prop="layout" label="户型"></el-table-column>
          <el-table-column prop="salePrice" :formatter="formatSalePrice" label="销售价(万元)"></el-table-column>
          <el-table-column prop="tradePrice" :formatter="formatTradePrice" label="成交价(万元)" width="100"></el-table-column>
          <el-table-column prop="orderStatus" label="交易状态"></el-table-column>
          <el-table-column prop="createTime" label="创建日期"></el-table-column>
          <el-table-column label="操作" width="190" align="left">
            <template slot-scope="scope">
              <el-button
                @click="goToDetail(scope.row.orderId)"
                type="text"
                style="font-size:12px;"
              >订单详情</el-button>
              <el-button
                @click="isChecked(scope.row)"
                v-if="(scope.row.orderStatus === '待开发商确认交易' && role === 'developer') || (scope.row.orderStatus === '待运营商确认交易' && role === 'operator')"
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
        <div class="tradingInformation">交付日期：{{dialogPaymentDate1}} &nbsp;&nbsp; 付款日期：签约后{{dialogPaymentDate2}}个工作日内</div>
        <div class="tradingInformation">付款金额(万元)：{{dialogMoney}} &nbsp;&nbsp; 服务费(万元)：{{dialogServiceMoney}}</div>
        <div class="protocol">
          <el-checkbox v-model="checked"></el-checkbox>
          &nbsp;&nbsp;<span style="color:#333">您已阅读和同意</span> <span @click="toProtocol">《转让协议》</span>
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
        :close-on-click-modal='false'
        width="30%"
        :before-close="operatorHandleClose">
        <!-- <div class="tradingInformation">交付日期：{{dialogPaymentDate1}} </div>
        <div class="tradingInformation">付款日期：签约后{{dialogPaymentDate2}}个工作日内</div>
        <div class="tradingInformation">付款金额(万元)：{{dialogMoney}}</div> -->
        <div class="protocol">
          <el-checkbox v-model="checked"></el-checkbox>
          &nbsp;&nbsp;<span style="color:#333">您已阅读和同意</span> <span @click="toProtocol">《转让协议》</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="operatorDialogVisible = false">取 消</el-button>
          <el-button :type="btnType" @click="dialogEnter">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 开发商dialog -->
      <el-dialog
        title="确认交易"
        :visible.sync="developerDialogVisible"
        :close-on-click-modal='false'
        width="520px"
        :before-close="developerHandleClose">
        <el-form label-position="top" ref="form" :rules="rules" label-width="80px" :model="developerDialogForm">
          <el-form-item label="付款日期" prop="payLimitDay">
            签约后
              <el-input style="width:60px;" v-model="developerDialogForm.payLimitDay"></el-input>
            个工作日内
          </el-form-item>
          <el-form-item label="付款金额(万元)" prop="tradePrice">
            <el-input @change="tradePriceChange" v-model="developerDialogForm.tradePrice"></el-input>
          </el-form-item>
          <el-form-item label="服务费(万元, 包含在付款金额内)" prop="memberShipPrice">
            <el-input v-model="developerDialogForm.memberShipPrice"></el-input>
          </el-form-item>
          <el-form-item label="交付日期" prop="payTime">
            <el-date-picker type="date" placeholder="选择日期" value-format="timestamp" v-model="developerDialogForm.payTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form>
        <div class="description">平台分成金额为成交金额的0.5%，即 {{developerDialogForm.shareAmount}} 元</div>
        <div class="protocol">
          <el-checkbox v-model="checked"></el-checkbox>
          &nbsp;&nbsp;<span style="color:#333">您已阅读和同意</span> <span @click="toProtocol">《转让协议》</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="developerDialogVisible = false">取 消</el-button>
          <el-button :type="btnType" @click="dialogEnter('form')">确 定</el-button>
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
    // 确认交易付款日期 自定义表单验证validator
    var validPayLimitDay = (rule, value,callback)=>{
        if (!value){
            callback(new Error('请输入天数'))
        }
        else if (!this.isvalidPayLimitDay(value)) {
          callback(new Error('请输入1-4位数字'))
        }
        else {
            callback()
        }
    }
    // 确认交易付款金额 自定义表单验证validator
    var validTradePrice = (rule, value,callback)=>{
        if (!value){
            callback(new Error('请输入付款金额(万元)'))
        }
        else if (!this.isvalidTradePrice(value)) {
          callback(new Error('请输入1-8位数字'))
        }
        else {
            callback()
        }
    }
    // 确认交易服务费 自定义表单验证validator
    var validMemberShipPrice = (rule, value,callback)=>{
        if (!value){
            callback(new Error('请输入服务费(万元)'))
        }
        else if (!this.isvalidMemberShipPrice(value)) {
          callback(new Error('请输入1-8位数字'))
        }
        else {
            callback()
        }
    }
    return {
      role: '', // developer 开发商 personal 个人  operator 运营商
      tableData: [],
      rules: {
        // 付款日期
        payLimitDay: [
          { required: true,  trigger: 'blur', validator: validPayLimitDay}
        ],
        // 付款金额
        tradePrice: [
          { required: true,  trigger: 'blur', validator: validTradePrice}
        ],
        // 服务费
        memberShipPrice: [
          { required: true,  trigger: 'blur', validator: validMemberShipPrice}
        ],
        // 交付日期
        payTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
      },
      // ----分页
      pageNo: 1,
      pageSize: 10,
      pageSizes: [10,20,50,100],
      total: 10,

      btnType: 'primary',
      isClick: true,

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
          tradePrice: '', //付款金额
          memberShipPrice: '', //服务费
          shareAmount: '' //分成金额(动态计算)
      },
      submitDialogForm: {
          orderId: '', //订单id
          payLimitDay: '', //付款日期
          payTime: '', //交付日期
          tradePrice: '', //付款金额
          memberShipPrice: '' //服务费
      },

      // 运营商确认dialog
      operatorDialogVisible: false,
      operatorOrderId: '',  //订单id

      checked: false, //是否勾选协议
      isShowTransactionBtn: false
    };
  },
  created() {
    this.$store.commit("editIndex", {info: "myTransfer"});

    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(userInfo.defaultRole.name);
    if (userInfo.defaultRole.name == "运营商") {
      this.role = 'operator';
      this.getOperatorList();
    } else if (userInfo.defaultRole.name === "开发商") {
      this.role = "developer";
      this.getDeveloperList();
    }
  },
  methods: {
    // 表格销售价格式化
    formatSalePrice (row, column) {
      return row.salePrice? row.salePrice/1000000: '';
    },
    // 表格成交价格式化
    formatTradePrice (row, column) {
      return row.tradePrice? row.tradePrice/1000000: '';
    },
    // 查看协议
    toProtocol () {
      const { href } = this.$router.resolve({
          path: '/transferAgreement'
      });
      window.open(href, '_blank');
    },

    // 验证天数正则(1-4个数字)
    isvalidPayLimitDay (str) {
      const reg = /^\d{1,4}$/
      return reg.test(str)
    },
    // 验证付款金额(1-8个数字)
    isvalidTradePrice (str) {
      const reg = /^\d{1,8}$/
      return reg.test(str)
    },
    // 验证服务费(1-8个数字)
    isvalidMemberShipPrice (str) {
      const reg = /^\d{1,8}$/
      return reg.test(str)
    },

    // 分页部分
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.role === "developer") {
        this.getDeveloperList();
      } else if (this.role === "operator") {
        this.getOperatorList();
      }
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      if (this.role === "developer") {
        this.getDeveloperList();
      } else if (this.role === "operator") {
        this.getOperatorList();
      }
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
    tradePriceChange (value) {
      console.log(value);
      this.developerDialogForm.shareAmount = value*10000*0.005;
    },
    // 开发商获取列表信息
    getDeveloperList() {
      axios.myTransfer({
        cond: {
          assetType: 1
        },
        current: this.pageNo-1,
        pageSize: this.pageSize
      })
      .then(res=>{
          console.log(res);
          if(res.code === 200){
            this.tableData = res.data.content;
            this.total = res.data.totalElements;
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
        current: this.pageNo-1,
        pageSize: this.pageSize
      })
      .then(res=>{
          console.log(res);
          if(res.code === 200){
            this.tableData = res.data.content;
            this.total = res.data.totalElements;
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
          
          // form表单数据转存 => 提交表单
          this.submitDialogForm.tradePrice = this.developerDialogForm.tradePrice*1000000;
          this.submitDialogForm.memberShipPrice = this.developerDialogForm.memberShipPrice*1000000;
          this.submitDialogForm.orderId = this.developerDialogForm.orderId;
          this.submitDialogForm.payLimitDay = this.developerDialogForm.payLimitDay;
          this.submitDialogForm.payTime = this.developerDialogForm.payTime;
          // console.log(this.developerDialogForm);
          console.log(this.submitDialogForm);
          if (this.isClick) {
              this.$refs[formName].validate((valid) => {
              // 第三层判断:
              if (valid) {
                  this.btnType = 'info';
                  this.isClick = false;
                  axios.developerEnter(this.submitDialogForm)
                  .then(res=>{
                      console.log(res);
                      this.btnType = 'primary';
                      this.isClick = true;
                      if(res.code === 200){
                        this.developerDialogVisible = false;
                        this.getDeveloperList();
                      } else {
                          this.$message({
                          type: 'error',
                          message: res.message
                        });
                      }
                  })
                  .catch(err=>{
                      console.log(err);
                      this.btnType = 'primary';
                      this.isClick = true;
                      this.$message({
                        type: 'error',
                        message: err.message
                      });
                  })
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
          }
        } 
        else if (this.role === 'operator') {
            if (this.isClick) {
                this.isClick = false;
                this.btnType = 'info';
                console.log(1111111)
                axios.operatorEnter({
                    orderId: this.operatorOrderId
                })
                .then(res=>{
                    console.log(res);
                    this.btnType = 'primary';
                    this.isClick = true;
                    if(res.code === 200){
                      this.getOperatorList();
                      this.operatorDialogVisible = false;
                    } else {
                      this.$message({
                        type: 'error',
                        message: res.message
                      });
                    }
                })
                .catch(err=>{
                    console.log(err);
                    this.btnType = 'primary';
                    this.isClick = true;
                    this.$message({
                      type: 'error',
                      message: err.message
                    });
                })
            }
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
    // 外层列表的确认交易操作
    isChecked(row) {
      this.checked = false;
      // console.log(row);
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
        this.developerDialogForm = {
          orderId: '', //订单id
          payLimitDay: '', //付款日期
          payTime: '', //交付日期
          tradePrice: '', //付款金额
          memberShipPrice: '', //服务费
          shareAmount: '' //分成金额(动态计算)
        }
      } 
      // 用户为运营商
      else if (this.role === 'operator') {
        this.dialogPaymentDate2 = row.payLimitDay;
        this.dialogPaymentDate1 = row.payTime;;
        this.dialogMoney = row.tradePrice/1000000;
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