<template>
  <div>
    <vSideBar />
    <div class="wrapper">
      <div class="top">您的养老之所</div>
      <ul class="list">
        <li class="list-item" v-for="(item,key) in departmentData" :key="key">
          <div class="left">
            <el-carousel :interval="2000" arrow="never" height="400px" trigger="click">
              <el-carousel-item v-for="(url,index) in item.imgurl" :key="index">
                <div class="car_item" :style="{'backgroundImage': 'url(' + url + ')'}"></div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="right">
            <div class="title">绿地国际康养城·颐尚居</div>
            <ul class="content">
              <li class="data_item_left">
                <div>户型</div>
                <div>朝向</div>
                <div>房型</div>
                <div>装修情况</div>
                <div>开发商</div>
                <div>项目地址</div>
              </li>
              <li class="data_item_right">
                <div>{{item.type}}</div>
                <div>{{item.direction}}</div>
                <div>{{item.type2}}</div>
                <div>{{item.decoration}}</div>
                <div>{{item.company}}</div>
                <div>{{item.address}}</div>
              </li>
            </ul>
            <div class="button_wrap">
              <el-button type="primary" @click="goToDetail(item)">查看详情</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vSideBar from "@/components/sideBar/sideBar";
export default {
  data() {
    return {
      departmentData: [
        {
          id: 1,
          type: "A",
          direction: "朝南",
          type2: "三室一厅",
          decoration: "精装修",
          company: "上海圣维物业管理有限公司",
          address: "上海市青浦区康工路777弄6",
          imgurl: [
            "/static/img/correct.png",
            "/static/img/person.png",
            "/static/img/test.png"
          ]
        },
        {
          id: 2,
          imgurl: [
            "/static/img/correct.png",
            "/static/img/person.png",
            "/static/img/test.png"
          ]
        }
      ]
    };
  },
  created() {
    this.$store.commit("editIndex", { info: "departmentList" });
  },
  methods: {
    goToDetail(item) {
      //---跳转到详情页
      console.log(item.id);
      this.$router.push("/departmentDetail");
    }
  },
  components: {
    vSideBar
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  // ---轮播图样式;
  .car_item {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .top {
    height: 398px;
    background: url(../../../assets/img/department_top.jpg) no-repeat;
    background-size: cover;
    color: #ffffff;
    font-size: 56px;
    text-align: center;
    min-width: 1200px;
    line-height: 398px;
    margin-bottom: 72px;
  }
  .list {
    width: 1200px;
    margin: 0 auto;
    .list-item {
      display: flex;
      height: 400px;
      margin-bottom: 48px;
      .left {
        flex: 0 0 800px;
      }
      .right {
        flex: 0 0 400px;
        padding: 40px;
        box-sizing: border-box;
        background: #f7eedbff;
        .title {
          color: #333333;
          font-size: 20px;
          font-weight: bolder;
          margin-bottom: 32px;
        }
        .content {
          margin-bottom: 32px;
          display: flex;
          .data_item_left {
            color: #666666;
            font-size: 14px;
            margin-right: 16px;
          }
          .data_item_right {
            color: #333333;
            font-size: 14px;
          }
          .data_item_left div,.data_item_right div{
            margin-bottom: 16px;
          }
        }
        .button_wrap{
          width: 320px;
          height: 40px;
          .el-button{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>