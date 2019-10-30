<template>
  <div>
    <div class="pro_detail_wrapper" style="width:1200px;margin:0 auto;padding-top:58px;">
      <div class="title" style="color:24px;font-size:24px;margin-bottom:16px;">订单详情</div>
      <div class="status">订单状态: 交易成功</div>

      <div class="content" style="border:1px solid #E8E8E8;margin-bottom:25px;">
        <div
          style="padding:18px 32px;color:#333;background:rgba(250,250,250,1);border-bottom:1px solid #E8E8E8;"
        >资产方信息</div>
        <ul class="first">
          <li>
            <div>
              <p class="data_title">资产名称</p>
              <p class="data_item">{{assetData.assetName}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">注册手机号</p>
              <p class="data_item">{{assetData.time}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">用户类型</p>
              <p class="data_item">{{assetData.userType}}</p>
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
              <p class="data_item">{{purchaserData.name}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">注册电话</p>
              <p class="data_item">{{purchaserData.phone}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">用户类型</p>
              <p class="data_item">{{purchaserData.userType}}</p>
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
              <p class="data_item">{{projectData.number}}</p>
            </div>
            <div>
              <p class="data_title">详细地址</p>
              <p class="data_item">{{projectData.address}}</p>
            </div>
            <div>
              <p class="data_title">销售价(¥）</p>
              <p class="data_item">{{projectData.sellingPrice}}</p>
            </div>
            <div>
              <p class="data_title">楼号</p>
              <p class="data_item">{{projectData.floor}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">创建时候</p>
              <p class="data_item">{{projectData.createdTime}}</p>
            </div>
            <div>
              <p class="data_title">户型</p>
              <p class="data_item">{{projectData.houseType}}</p>
            </div>
            <div>
              <p class="data_title">成交价(¥）</p>
              <p class="data_item">{{projectData.finalPrice}}</p>
            </div>
            <div>
              <p class="data_title">房号</p>
              <p class="data_item">{{projectData.roomNo}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">资产方简称</p>
              <p class="data_item">{{projectData.assetSide}}</p>
            </div>
            <div>
              <p class="data_title">建筑面积(平米)</p>
              <p class="data_item">{{projectData.constructionArea}}</p>
            </div>
            <div>
              <p class="data_title">交易时间</p>
              <p class="data_item">{{projectData.transactionTime}}</p>
            </div>
          </li>
        </ul>
      </div>
      
      <div class="agreementDescription">
        电子协议：<span>《协议》，《确权证》</span>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      assetData: {
        id: 1,
        assetName: "青浦国际康养城",
        time: "136******1234",
        userType: "企业"
      },
      purchaserData: {
        id: 1,
        phone: "136******1234",
        name: "唐莉莉",
        userType: "个人"
      },
      projectData: {
        id: 1,
        number: "11100123-01-27", //订单编号
        createdTime: "2019-08-20 10:10:30", //创建时候
        assetSide: "易涟", //资产方简称
        address: "上海市青浦区康工路777弄6-101", //地址
        houseType: "三房两厅两卫", //户型
        constructionArea: "78", //建筑面积
        sellingPrice: "666万元", //销售价
        finalPrice: "555万元", //成交价
        transactionTime: "2019-08-29", //交易时间
        roomNo: '504', //房号 
        floor: '7' //楼号
      }
    };
  },
  methods: {

  },
  created() {
    this.$store.commit("editIndex", {info: "orderDetail"});
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