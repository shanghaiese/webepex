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
              <p class="data_item">{{projectData.projetName}}</p>
            </div>
            <div>
              <p class="data_title">项目地址</p>
              <p class="data_item">{{projectData.address}}</p>
            </div>
            <div>
              <p class="data_title">项目交付日期</p>
              <p class="data_item">{{projectData.deliveryTime}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">项目类型</p>
              <p class="data_item" v-if="projectData.assetType !== undefined">{{projectData.assetType.name}}</p>
            </div>
            <div>
              <p class="data_title">经度/纬度</p>
              <p class="data_item">{{projectData.lon}}/{{projectData.lat}}</p>
            </div>
            <div>
              <p class="data_title">申请日期</p>
              <p class="data_item">{{projectData.createTime}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">项目状态</p>
              <p class="data_item" v-if="projectData.auditStatus !== undefined">{{projectData.auditStatus.name}}</p>
            </div>
            <div>
              <p class="data_title">装修情况</p>
              <p class="data_item">{{projectData.decoration}}</p>
            </div>
            <!-- <div>
              <p class="data_title">项目建成日期</p>
              <p class="data_item">{{projectData.completeTime}}</p>
            </div> -->
            <div>
              <p class="data_title">资产运营商</p>
              <p class="data_item">{{projectData.assignOperator}}</p>
            </div>
          </li>
        </ul>
        <!-- <div class="intro" style="font-size:14px;padding:0 32px;">
          <p class="data_title data_comm">项目介绍</p>
          <p
            class="data_item data_comm"
          >{{projectData.description}}</p>
        </div> -->
      </div>

      <div class="content" style="border:1px solid #E8E8E8;margin-bottom:25px;">
        <div
          style="padding:18px 32px;background:rgba(250,250,250,1);border-bottom:1px solid #E8E8E8;"
        >房型信息</div>
        <ul class="first">
          <li>
            <div>
              <p class="data_title">户型</p>
              <p class="data_item">{{roomTypeData.layout}}</p>
            </div>
            <div>
              <p class="data_title">使用面积（平米）</p>
              <p class="data_item">{{roomTypeData.realArea}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">房型类型</p>
              <p class="data_item">{{roomTypeData.layoutType}}</p>
            </div>
            <div>
              <p class="data_title">房屋数量</p>
              <p class="data_item">{{roomTypeData.roomNum}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="data_title">建筑面积（平米）</p>
              <p class="data_item">{{roomTypeData.buildArea}}</p>
            </div>
            <div>
              <p class="data_title">资产使用权截止日期</p>
              <p class="data_item">{{roomTypeData.limitPeriod}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div
        class="table_wrapper"
        style="border:1px solid #E8E8E8;border-bottom-width:0;margin-bottom:20px;"
      >
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(250,250,250)',height:'48px',fontSize:'14px'}"
          :cell-style="{height:'48px',paddingTop:'0',paddingBottom:'0',fontSize:'12px',color:'#333333'}"
          :row-style="{padding:'36px'}"
        >
          <el-table-column prop="buildingNo" label="楼号"></el-table-column>
          <el-table-column prop="floorNo" label="楼层"></el-table-column>
          <el-table-column prop="roomNo" label="房号"></el-table-column>
          <el-table-column prop="roomRatio" label="梯户比例"></el-table-column>
          <el-table-column prop="faceTo" label="朝向"></el-table-column>
          <el-table-column prop="price" label="销售价(¥)"></el-table-column>
          <el-table-column prop="status" label="资产状态"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column prop="qualificationsHash[0]" label="哈希码" width="225"></el-table-column>
        </el-table>
      </div>

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

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import http from "@/api/taotaozi_api.js";
export default {
  data() {
    return {
      projectData: {
        id: 1,
        name: "",
        type: "",
        status: "",
        address: "",
        position: "",
        decoration: "",
        deadline: "",
        date: "",
        seller: "",
        desc: "" 
      },
      roomTypeData: {
        layout: '', //户型
        layoutType: '', //房型
        buildArea: '', //建筑面积
        realArea: '', //真实面积
        roomNum: '', //房屋数量
        limitPeriod: '' //使用年限
      },
      tableData: [
        {
          id: 1,
          number: "",
          floor: "",
          roomNum: "",
          rate: "",
          direction: "",
          price: "",
          status: "",
          updateTime: "",
          hash:
            ""
        }
      ],
      dialogVisible: false,
      dialogImageUrl: '/static/img/person.png',
      projectId: null,
      layOutId: null,
      // ----分页
      pageNo:0,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      total: 10
    };
  },
  created() {
    this.$store.commit("editIndex", {info: "houseLayout"});
    let id = window.sessionStorage.getItem("projectId");
    this.layOutId = window.sessionStorage.getItem("layOutId");
    if(!!id) {
      this.projectId = id;
      this.getTableData();
      this.getData();
    }

    this.getHouseType();
  },
  methods:{
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.pageNo = val-1;
      this.getTableData();
    },
    // 获取项目内容
    getData() {
      http.projectDetail({
        id:this.projectId
      })
      .then(res=>{
        console.log(res);
        if(res.code===200) {
          this.projectData = res.data;
        }
      })
    },
    // 获取房型信息
    getHouseType() {
      http.houseType({
        cond: {
          apartmentId: this.projectId,
          // developerId: 0,
          layOutId: this.layOutId

        },
        current: this.pageNo,
        pageSize: this.pageSize
      })
      .then(res=>{
        console.log(res);
        if(res.code===200) {
          this.roomTypeData = res.data.content[0];
        }
      })
    },
    // 获取页面下方列表
    getTableData() {
      http.houseLayout({
        cond: {
          layoutId: '1'
        },
        current: this.pageNo,
        pageSize: this.pageSize
      })
      .then(res=>{
        console.log(res);
        if(res.code===200) {
          this.tableData = res.data.content;
          this.total = res.data.totalElements;
        }
      })
    }
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
        height: 16px;
        line-height: 16px;
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