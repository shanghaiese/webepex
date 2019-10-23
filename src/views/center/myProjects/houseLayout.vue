<template>
  <div>
    <div class="pro_detail_wrapper" style="width:1200px;margin:0 auto;padding-top:58px;">
      <div class="title" style="color:24px;font-size:24px;margin-bottom:36px;">房型信息</div>
      <div class="content" style="border:1px solid #E8E8E8;margin-bottom:25px;">
        <div
          style="padding:18px 32px;background:rgba(250,250,250,1);border-bottom:1px solid #E8E8E8;"
        >项目内容</div>
        <ul class="first">
          <li>
            <div>
              <p class="data_title">项目名称</p>
              <p class="data_item">青浦国际康养城</p>
            </div>
            <div>
              <p class="data_title">项目地址</p>
              <p class="data_item">上海市青浦区北青路9138号</p>
            </div>
            <div>
              <p class="data_title">项目交付日期</p>
              <p class="data_item">2019-08-19</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">项目类型</p>
              <p class="data_item">康养</p>
            </div>
            <div>
              <p class="data_title">经度/纬度</p>
              <p class="data_item">115.8566°/37.78722°</p>
            </div>
            <div>
              <p class="data_title">申请日期</p>
              <p class="data_item">2019-08-19</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">项目状态</p>
              <p class="data_item">审核通过</p>
            </div>
            <div>
              <p class="data_title">装修情况</p>
              <p class="data_item">精装</p>
            </div>
            <div>
              <p class="data_title">资产运营商</p>
              <p class="data_item">上海圣维物业管理有限公司</p>
            </div>
          </li>
        </ul>
        <div class="intro" style="font-size:14px;padding:0 32px;">
          <p class="data_title data_comm">项目介绍</p>
          <p
            class="data_item data_comm"
          >项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍</p>
        </div>
      </div>
      <div class="content" style="border:1px solid #E8E8E8;margin-bottom:25px;">
        <div
          style="padding:18px 32px;background:rgba(250,250,250,1);border-bottom:1px solid #E8E8E8;"
        >项目内容</div>
        <ul class="first">
          <li>
            <div>
              <p class="data_title">户型</p>
              <p class="data_item">A</p>
            </div>
            <div>
              <p class="data_title">使用面积（平米）</p>
              <p class="data_item">138</p>
            </div>
            <div>
              <p class="data_title">房型图</p>
              <div class="bg"></div>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">房型类型</p>
              <p class="data_item">三房两厅两卫</p>
            </div>
            <div>
              <p class="data_title">房屋数量</p>
              <p class="data_item">5</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">建筑面积（平米）</p>
              <p class="data_item">150</p>
            </div>
            <div>
              <p class="data_title">资产使用年限</p>
              <p class="data_item">15</p>
            </div>
          </li>
        </ul>
      </div>
      <div
        class="table_wrapper"
        style="border:1px solid #E8E8E8;border-bottom-width:0;margin-bottom:162px;"
      >
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(250,250,250)',height:'48px',fontSize:'14px'}"
          :cell-style="{height:'48px',paddingTop:'0',paddingBottom:'0',fontSize:'12px',color:'#333333'}"
          :row-style="{padding:'36px'}"
        >
          <el-table-column prop="number" label="楼号"></el-table-column>
          <el-table-column prop="floor" label="楼层"></el-table-column>
          <el-table-column prop="room" label="房号"></el-table-column>
          <el-table-column prop="rate" label="梯户比例"></el-table-column>
          <el-table-column prop="direction" label="朝向"></el-table-column>
          <el-table-column prop="price" label="销售价(¥)"></el-table-column>
          <el-table-column prop="status" label="资产状态"></el-table-column>
          <el-table-column prop="date" label="更新时间"></el-table-column>
          <el-table-column prop="hash" label="哈希码" width="225"></el-table-column>
        </el-table>
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
          number: "2号楼",
          floor: "9层",
          room: "901",
          rate: "一梯两户",
          direction: "朝南",
          price: "500.86万元",
          status: "已上架",
          date: "2019-09-18",
          hash: "4ba68650585a8b2aae7c2c490f2feaf69a5a25096fc4ff7ad27309c830cb050a"
        },
        {
          id: 1,
          number: "2号楼",
          floor: "9层",
          room: "901",
          rate: "一梯两户",
          direction: "朝南",
          price: "500.86万元",
          status: "已上架",
          date: "2019-09-18",
          hash: "4ba68650585a8b2aae7c2c490f2feaf69a5a25096fc4ff7ad27309c830cb050a"
        },
        {
          id: 1,
          number: "2号楼",
          floor: "9层",
          room: "901",
          rate: "一梯两户",
          direction: "朝南",
          price: "500.86万元",
          status: "已上架",
          date: "2019-09-18",
          hash: "4ba68650585a8b2aae7c2c490f2feaf69a5a25096fc4ff7ad27309c830cb050a"
        },
        {
          id: 1,
          number: "2号楼",
          floor: "9层",
          room: "901",
          rate: "一梯两户",
          direction: "朝南",
          price: "500.86万元",
          status: "已上架",
          date: "2019-09-18",
          hash: "4ba68650585a8b2aae7c2c490f2feaf69a5a25096fc4ff7ad27309c830cb050a"
        },
        {
          id: 1,
          number: "2号楼",
          floor: "9层",
          room: "901",
          rate: "一梯两户",
          direction: "朝南",
          price: "500.86万元",
          status: "已上架",
          date: "2019-09-18",
          hash: "4ba68650585a8b2aae7c2c490f2feaf69a5a25096fc4ff7ad27309c830cb050a"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.data_title {
  color: #666666;
}
.data_item {
  color: #333333;
}
.data_comm {
  margin: 0;
  margin-bottom: 5px;
  padding: 0;
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
    .bg {
      width: 120px;
      height: 120px;
      background: green;
      margin: 0;
    }
  }
}
</style>