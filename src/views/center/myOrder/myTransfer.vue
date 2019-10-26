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
            <template>
              <div class="bbb" style="width:40px; height:40px; background-color: red;">
                <img width="40px" height="40px" src="./../../../assets/img/person.png" alt="">
              </div>
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

      <!-- 个人用户dialog -->
      <el-dialog
        title="确认交易"
        :visible.sync="personalDialogVisible"
        width="30%"
        :before-close="personalHandleClose">
        <div class="tradingInformation">付款日期：{{dialogPaymentDate}} &nbsp;&nbsp; 付款金额(¥)：{{dialogMoney}}</div>
        <div class="protocol">
          <el-checkbox v-model="checked"> <span style="color:#333">您已阅读和同意</span> <span>《四方协议》</span></el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="personalDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEnter">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 开发商dialog -->
      <el-dialog
        title="确认交易"
        :visible.sync="developerDialogVisible"
        width="30%"
        :before-close="developerHandleClose">
        <el-form label-position="top" ref="form" :rules="rules" label-width="80px" :model="developerDialogForm">
          <el-form-item label="交付日期" prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="developerDialogForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="到付日期" prop="date2">
            <el-date-picker type="date" placeholder="选择日期" v-model="developerDialogForm.date2" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="付款金额(¥)" prop="money">
            <el-input v-model="developerDialogForm.money"></el-input>
          </el-form-item>
        </el-form>
        <div class="description">平台分成金额为成交金额的X%，即 10000 元</div>
        <div class="protocol">
          <el-checkbox v-model="checked"> <span style="color:#333">您已阅读和同意</span> <span>《四方协议》</span></el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="developerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEnter('form')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 运营商dialog -->
      <el-dialog
        title="确认交易"
        :visible.sync="operatorDialogVisible"
        width="30%"
        :before-close="operatorHandleClose">
        <div class="protocol">
          <el-checkbox v-model="checked"> <span style="color:#333">您已阅读和同意</span> <span>《四方协议》</span></el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="operatorDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogEnter">确 定</el-button>
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
      role: 'developer', // developer 开发商  operator 运营商  personal 个人
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
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        money: [
            { required: true, message: '请输入交易金额', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在8个字符', trigger: 'blur' }
        ],
      },
      // ----分页
      pageNo: 1,
      pageSize: 10,
      pageSizes: [10,20,50,100],
      total: 10,

      // 个人用户确认dialog
      personalDialogVisible: false,
      dialogPaymentDate: '', //付款日期
      dialogMoney: '', //付款金额

      // 开发商确认dialog
      developerDialogVisible: false,
      developerDialogForm: {
          date1: '',
          date2: '',
          money: ''
      },

      // 运营商确认dialog
      operatorDialogVisible: false,
      checked: true
    };
  },
  created() {
    this.$store.commit("editIndex", {info: "myTransfer"});
  },
  methods: {
    // 分页部分
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
    goToDetail(id) {
      console.log(id)
      this.$router.push("/orderDetail");
    },
    // 确认交易dialog弹框的 确定按钮
    dialogEnter (formName) {
      // 是否已经勾选协议
      if(this.checked) {
        if (this.role === 'personal') {
          this.personalDialogVisible = false;
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
      // console.log(row.id);
      if (this.role === 'personal') {
        this.dialogMoney = row.finalPrice;
        this.dialogPaymentDate = row.time;
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
    .picture {
      img {
          width: 48px;
          height: 48px;
      }
    }
  }
  // 个人用户dialog主体交易信息
  .tradingInformation {
    width:352px;
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