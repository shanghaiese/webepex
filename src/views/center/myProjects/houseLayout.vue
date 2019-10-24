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
              <p class="data_item">{{projectData.name}}</p>
            </div>
            <div>
              <p class="data_title">项目地址</p>
              <p class="data_item">{{projectData.address}}</p>
            </div>
            <div>
              <p class="data_title">项目交付日期</p>
              <p class="data_item">{{projectData.deadline}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">项目类型</p>
              <p class="data_item">{{projectData.type}}</p>
            </div>
            <div>
              <p class="data_title">经度/纬度</p>
              <p class="data_item">{{projectData.position}}</p>
            </div>
            <div>
              <p class="data_title">申请日期</p>
              <p class="data_item">{{projectData.date}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">项目状态</p>
              <p class="data_item">{{projectData.status}}</p>
            </div>
            <div>
              <p class="data_title">装修情况</p>
              <p class="data_item">{{projectData.decoration}}</p>
            </div>
            <div>
              <p class="data_title">资产运营商</p>
              <p class="data_item">{{projectData.seller}}</p>
            </div>
          </li>
        </ul>
        <div class="intro" style="font-size:14px;padding:0 32px;">
          <p class="data_title data_comm">项目介绍</p>
          <p
            class="data_item data_comm"
          >{{projectData.desc}}</p>
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
              <div class="bg" :style="{'backgroundImage': 'url(' + dialogImageUrl + ')'}">
                <div class="tip"><i  @click="dialogVisible=true" class="el-icon-circle-plus-outline"></i></div>
              </div>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
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
        style="border:1px solid #E8E8E8;border-bottom-width:0;margin-bottom:90px;"
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
      projectData: {
        id: 1,
        name: "青浦国际康养城",
        type: "康养",
        status: "审核通过",
        address: "上海市青浦区北青路9138号",
        position: "115.8566°/37.78722°",
        decoration: "精装",
        deadline: "2019-08-28",
        date: "2019-10-28",
        seller: "资产运营商",
        desc: "项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍内容项目介绍" 
      },
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
          hash:
            "4ba68650585a8b2aae7c2c490f2feaf69a5a25096fc4ff7ad27309c830cb050a"
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
          hash:
            "4ba68650585a8b2aae7c2c490f2feaf69a5a25096fc4ff7ad27309c830cb050a"
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
          hash:
            "4ba68650585a8b2aae7c2c490f2feaf69a5a25096fc4ff7ad27309c830cb050a"
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
          hash:
            "4ba68650585a8b2aae7c2c490f2feaf69a5a25096fc4ff7ad27309c830cb050a"
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
          hash:
            "4ba68650585a8b2aae7c2c490f2feaf69a5a25096fc4ff7ad27309c830cb050a"
        }
        
      ],
      dialogVisible: false,
      dialogImageUrl: '/static/img/person.png'
    };
  },
  created() {
    this.$store.commit("editIndex", {info: "houseLayout"});
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
      margin: 0;
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      .tip {
        color:white;
        background:rgba(0, 0, 0, 0.5);
        font-size: 24px;
        width:100%;
        height: 0px;
        line-height: 32px;
        text-align: center;
        position:absolute;
        bottom: 0px;
        left: 0;
        overflow: hidden;
        transition: 0.5s;
        margin: 0;
      }
      &:hover .tip {
        height: 32px;
      }
    }
  }
}
</style>