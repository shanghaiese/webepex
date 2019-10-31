<template>
  <div>
    <div class="pro_wrapper" style="width:1200px;margin:0 auto;">
      <div class="title" style="font-size:24px;color:#333333;margin:58px 0 25px 0;">康养公寓项目</div>
      <div class="table_wrapper" style="border:1px solid #E8E8E8">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(250,250,250)',height:'48px',fontSize:'14px'}"
          :cell-style="{height:'48px',paddingTop:'0',paddingBottom:'0',fontSize:'12px',color:'#333333'}"
          :row-style="{padding:'36px'}"
        >
          <!-- <el-table-column prop="number" label="项目编号"></el-table-column> -->
          <el-table-column prop="projetName" label="项目名称"></el-table-column>
          <el-table-column prop="assetType" label="项目类型"></el-table-column>
          <el-table-column prop="deliveryTime" label="项目交付日期"></el-table-column>
          <el-table-column prop="createTime" label="申请日期"></el-table-column>
          <el-table-column prop="auditStatus" label="项目状态"></el-table-column>
          <el-table-column label="操作" width="350" align="left">
            <template slot-scope="scope">
              <el-button
                @click="goToProDetail(scope.row)"
                type="text"
                style="font-size:12px;"
              >查看项目信息</el-button>
              <el-button
                @click="goToHouseLayout(scope.row.id, layOutId='2')"
                type="text"
                style="font-size:12px;"
              >查看70平房型信息</el-button>
              <el-button
                @click="goToHouseLayout(scope.row.id, layOutId='1')"
                type="text"
                style="font-size:12px;"
              >查看80平房型信息</el-button>
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
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import http from "@/api/taotaozi_api.js";
export default {
  data() {
    return {
      tableData: [],
      // ----分页
      pageNo:0,
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      total: 10
    };
  },
  created() {
    this.$store.commit("editIndex", { info: "projectList" });
    this.getList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNo = val-1;
      this.getList();
    },
    goToProDetail(row) {
      window.sessionStorage.setItem("projectId",row.id);
      this.$router.push("/projectDetail");
    },
    goToHouseLayout(id, layOutId) {
        // console.log(layOutId);
       window.sessionStorage.setItem("projectId",id);
       window.sessionStorage.setItem("layOutId",layOutId);
      this.$router.push("/houseLayout");
    },
    // --------------------------------------api
    getList() {
      http
        .projectList({
          cond: {
            assetType: 1,
            developerId: 0,
            operatorId: 0
          },
          current: this.pageNo,
          pageSize: this.pageSize
        })
        .then(res => {
          console.log(res);
          if(res.code===200) {
            this.total = res.data.totalElements;
            this.tableData = res.data.content;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped></style>