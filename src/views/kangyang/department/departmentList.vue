<template>
  <div>
    <div class="wrapper">
      <div class="top"></div>
      <ul class="list">
        <li class="list-item" v-for="(item,key) in departmentData" :key="key">
          <div class="left">
            <el-carousel :interval="2000" arrow="never" height="400px" trigger="click">
              <el-carousel-item v-for="(url,index) in item.photos" :key="index">
                <div class="car_item" :style="{'backgroundImage': 'url(' + url.url + ')'}"></div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="right">
            <div class="title">{{item.apartmentBaseInfo.projetName}}</div>
            <ul class="content">
              <li class="data_item">
                <div>
                  <span class="label">户型</span>
                  <span class="value">{{item.layout}}</span>
                </div>
                <div>
                  <span class="label">朝向</span>
                  <span class="value">朝南</span>
                </div>
                <div>
                  <span class="label">房型</span>
                  <span class="value">{{item.layoutType}}</span>
                </div>
                <div>
                  <span class="label">装修情况</span>
                  <span class="value">{{item.apartmentBaseInfo.decoration}}</span>
                </div>
                <div>
                  <span class="label">开发商</span>
                  <span class="value">{{item.developerInfo.name}}</span>
                </div>
                <div>
                  <span class="label">项目地址</span>
                  <span class="value">{{item.apartmentBaseInfo.address}}</span>
                </div>
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
import http from "@/api/squainApi";
export default {
  data() {
    return {
      departmentData: []
    };
  },
  created() {
    this.$store.commit("editIndex", { info: "departmentList" });
    this.getlist();
  },
  methods: {
    goToDetail(item) {
      //---跳转到详情页
      console.log(item.id);
      this.$router.push("/departmentDetail");
    },
    // ------------------------------------------api
    getlist() {
      http
        .queryLayout({
          cond: {
            apartmentId: 17,
            assetType: 1,
            buildArea: 0,
            developerId: 0,
            id: 0,
            layout: "string",
            layoutType: 0,
            memberShipPrice: "string",
            memberShipType: 0,
            operatorId: 0,
            realArea: 0,
            roomNum: 0,
            showArea: 0
          },
          current: 0,
          pageSize: 20
        })
        .then(res => {
          console.log(res);
          if(res.code===200) {
            this.departmentData = res.data.content;
          }
        });
    }
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
    background: url(https://uat-api.e-pex.com/upload/apartment/1.jpg) no-repeat;
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
          margin-bottom: 15px;
        }
        .content {
          margin-bottom: 10px;
          display: flex;
          .data_item{
            .label {
              color: #666666;
              font-size: 14px;
              margin-right: 16px;
            }
            .value{
              color: #333333;
              font-size: 14px;
            }
          }
          .data_item div{
            margin-bottom: 16px;
          }
        }
        .button_wrap {
          width: 320px;
          height: 40px;
          .el-button {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>