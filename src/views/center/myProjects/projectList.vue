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
          <el-table-column prop="name" label="项目名称"></el-table-column>
          <el-table-column prop="type" label="项目类型"></el-table-column>
          <el-table-column prop="deadline" label="项目交付日期"></el-table-column>
          <el-table-column prop="date" label="申请日期"></el-table-column>
          <el-table-column prop="status" label="项目状态"></el-table-column>
          <el-table-column label="操作" width="190" align="left">
            <template slot-scope="scope">
              <el-button
                @click="goToProDetail(scope.row.id)"
                type="text"
                style="font-size:12px;"
              >查看项目信息</el-button>
              <el-button
                @click="goToHouseLayout(scope.row.id)"
                type="text"
                style="font-size:12px;"
              >查看房型信息</el-button>
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
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "青浦国际康养城",
          type: "康养",
          deadline: "2019-08-28",
          date: "2019-10-28",
          status: "审核通过"
        },
        {
          id: 1,
          name: "青浦国际康养城",
          type: "康养",
          deadline: "2019-08-28",
          date: "2019-10-28",
          status: "审核通过"
        },
        {
          id: 1,
          name: "青浦国际康养城",
          type: "康养",
          deadline: "2019-08-28",
          date: "2019-10-28",
          status: "审核通过"
        },
        {
          id: 1,
          name: "青浦国际康养城",
          type: "康养",
          deadline: "2019-08-28",
          date: "2019-10-28",
          status: "审核通过"
        },
        {
          id: 1,
          name: "青浦国际康养城",
          type: "康养",
          deadline: "2019-08-28",
          date: "2019-10-28",
          status: "审核通过"
        },
        {
          id: 1,
          name: "青浦国际康养城",
          type: "康养",
          deadline: "2019-08-28",
          date: "2019-10-28",
          status: "审核通过"
        },
        {
          id: 1,
          name: "青浦国际康养城",
          type: "康养",
          deadline: "2019-08-28",
          date: "2019-10-28",
          status: "审核通过"
        },
        {
          id: 1,
          name: "青浦国际康养城",
          type: "康养",
          deadline: "2019-08-28",
          date: "2019-10-28",
          status: "审核通过"
        },
        {
          id: 1,
          name: "青浦国际康养城",
          type: "康养",
          deadline: "2019-08-28",
          date: "2019-10-28",
          status: "审核通过"
        },
        {
          id: 1,
          name: "青浦国际康养城",
          type: "康养",
          deadline: "2019-08-28",
          date: "2019-10-28",
          status: "审核通过"
        }
      ],
      // ----分页
      pageNo: 1,
      pageSize: 10,
      pageSizes: [10,20,50,100],
      total: 10
    };
  },
  created() {
    this.$store.commit("editIndex", {info: "projectList"});
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    goToProDetail(id) {
      this.$router.push("/projectDetail");
    },
    goToHouseLayout(id) {
      this.$router.push("/houseLayout");
    }
  }
};
</script>

<style lang="less" scoped></style>