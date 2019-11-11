<template>
  <div>
    <div class="pro_detail_wrapper" style="width:1200px;margin:0 auto;padding-top:58px;">
      <div class="title" style="color:24px;font-size:24px;margin-bottom:16px;">订单详情</div>
      <div class="status">订单状态: {{projectData.orderStatus}}</div>

      <div class="content" style="border:1px solid #E8E8E8;margin-bottom:25px;">
        <div
          style="padding:18px 32px;color:#333;background:rgba(250,250,250,1);border-bottom:1px solid #E8E8E8;"
        >资产方信息</div>
        <ul class="first">
          <li>
            <div>
              <p class="data_title">资产名称</p>
              <p class="data_item">{{projectData.enterpriseName}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">注册手机号</p>
              <p class="data_item">{{projectData.enterprisePhone}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">用户类型</p>
              <p class="data_item">{{projectData.enterpriseType}}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="content" style="border:1px solid #E8E8E8;margin-bottom:25px;">
        <div
          style="padding:18px 32px;color:#333;background:rgba(250,250,250,1);border-bottom:1px solid #E8E8E8;"
        >购买方信息</div>
        <ul class="first">
          <li>
            <div>
              <p class="data_title">姓名</p>
              <p class="data_item">{{projectData.buyName}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">注册电话</p>
              <p class="data_item">{{projectData.buyPhone}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">用户类型</p>
              <p class="data_item">{{projectData.buyType}}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="content" style="border:1px solid #E8E8E8;margin-bottom:25px;">
        <div
          style="padding:18px 32px;background:rgba(250,250,250,1);border-bottom:1px solid #E8E8E8;"
        >订单信息</div>
        <ul class="first">
          <li>
            <div>
              <p class="data_title">订单编号</p>
              <p class="data_item">{{projectData.orderId}}</p>
            </div>
            <div>
              <p class="data_title">详细地址</p>
              <p class="data_item" v-if="projectData.baseInfo">{{projectData.baseInfo.address}}</p>
            </div>
            <div>
              <p class="data_title">销售价(万元）</p>
              <p class="data_item">{{projectData.salePrice}}</p>
            </div>
            <div>
              <p class="data_title">楼号</p>
              <p class="data_item">{{projectData.buildingNo}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">创建时间</p>
              <p class="data_item">{{projectData.createTime}}</p>
            </div>
            <div>
              <p class="data_title">户型</p>
              <p class="data_item">{{projectData.layout}}</p>
            </div>
            <div>
              <p class="data_title">成交价(万元）</p>
              <p class="data_item">{{projectData.tradePrice? projectData.tradePrice/1000000: ''}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">资产方简称</p>
              <p class="data_item">{{projectData.enterpriseShortName}}</p>
            </div>
            <div>
              <p class="data_title">建筑面积(平米)</p>
              <p class="data_item" v-if="projectData.layoutInfo">{{projectData.layoutInfo.buildArea}}</p>
            </div>
            <div>
              <p class="data_title">房号</p>
              <p class="data_item">{{projectData.roomNo}}</p>
            </div>
            <!-- <div>
              <p class="data_title">交易时间</p>
              <p class="data_item">{{projectData.payTime}}</p>
            </div> -->
          </li>
        </ul>
      </div>
      
      <!-- v-show="projectData.orderStatus === '交易完成'" -->
      <div class="agreementDescription" v-show="projectData.orderStatus === '交易完成'">
        电子协议：<span @click="toProtocol">《转让协议》</span>,
        <span @click="toCertificate">《资产使用权确认证书》</span>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "@/api/taotaozi_api.js";
export default {
  data() {
    return {
      // 以下字段已失效
      projectData: {
        number: "", //订单编号
        createdTime: "", //创建时候
        assetSide: "", //资产方简称
        address: "", //地址
        houseType: "", //户型
        constructionArea: "", //建筑面积
        sellingPrice: "", //销售价
        finalPrice: "", //成交价
        transactionTime: "", //交易时间
        roomNo: '', //房号 
        floor: '' //楼号
      },
      role: ''
    };
  },
  methods: {

  },
  created() {
    this.$store.commit("editIndex", {info: "orderDetail"});
    
    this.role = this.$route.query.role;
    if (this.role === "buyer") {
      this.getBuyerOrderList();
    } else if (this.role === "developer") {
      this.getSellerOrderList(); //获取开发商数据
    } else if (this.role === "operator") {
      this.getOperatorOrderList() //获取运营商数据
    }
  },
  methods: {
    toProtocol () {
      // console.log(this.projectData.developerProtocol[0].url);
      let url = this.projectData.developerProtocol[0].url;
      window.open(url);
    },
    toCertificate () {
      let url = this.projectData.qualifications[this.projectData.qualifications.length-1].url;
      window.open(url);
    },
    // 买家获取列表数据
    getBuyerOrderList() {
      axios.buyerOrderDetail({
        orderId: this.$route.query.orderId
      })
      .then(res=>{
          console.log(res);
          if(res.code === 200){
            this.projectData = res.data;
            this.projectData.salePrice = res.data.salePrice/1000000; //销售价转为万元
          }
      })
      .catch(err=>{
          console.log(err);
      })
    },
    // 开发商获取数据
    getSellerOrderList() {
      axios.sellerOrderDetail({
        orderId: this.$route.query.orderId
      })
      .then(res=>{
          console.log(res);
          if(res.code === 200){
            this.projectData = res.data;
            this.projectData.salePrice = res.data.salePrice/1000000;  //销售价转为万元
          }
      })
      .catch(err=>{
          console.log(err);
      })
    },
    // 运营商获取数据
    getOperatorOrderList() {
      axios.operatorOrderDetail({
        orderId: this.$route.query.orderId
      })
      .then(res=>{
          console.log(res);
          if(res.code === 200){
            this.projectData = res.data;
            this.projectData.salePrice = res.data.salePrice/1000000; //销售价转为万元
          }
      })
      .catch(err=>{
          console.log(err);
      })
    },
  }
};
</script>

<style lang="less" scoped>
.status {
      margin-bottom: 25px;
      height:24px;
      font-size:16px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:24px;
    }
.data_title {
  color: #666666;
}
.data_item {
  color: #333333;
}
.first {
  display: flex;
  font-size: 14px;
  padding: 0 32px;
  li {
    flex: 1;
    div {
      margin: 24px 0;
      p {
        margin: 0;
        margin-bottom: 5px;
        padding: 0;
        height: 16px;
        line-height: 16px;
      }
    }
  }
}
// 尾部协议说明
.agreementDescription {
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:14px;
  margin-bottom: 40px;
  span {
    color:#CAA14F;
    cursor: pointer;
  }
}
</style>