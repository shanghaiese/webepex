<template>
  <div>
    <div class="wrapper">
      <div class="top">
        <img src="../../../assets/img/departmentListHeader.jpg" alt="">
      </div>
      <div class="addButtonWrapper">
        <span class="item item1" @click="goToOutPage"></span>
        <span class="item item2" @click="goToNewEra"></span>
      </div>
      <ul class="list">
        <li class="list-item" v-for="(item,key) in departmentData" :key="key">
          <div class="left">
            <el-carousel :interval="4000" arrow="never" height="400px" trigger="click">
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
                  <span class="value">{{item.buildArea}}&nbsp;㎡</span>
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
      console.log(item);
      window.sessionStorage.setItem("squain_apartmentId",item.apartmentId);
      window.sessionStorage.setItem("squain_layoutId",item.id);
      this.$router.push("/departmentDetail");
    },
    goToOutPage() {
      window.open("http://www.shousuo.tech/vrproject/item/greenland/index.html","_blank");
    },
    goToNewEra() {
      console.log(1);
      const { href } = this.$router.resolve({
        path: "/newEra"
      });
      console.log(href);
      window.open(href, "_blank");
    },
    // ------------------------------------------api
    getlist() {
      http
        .queryLayout({
          cond: {
            apartmentId: 1,
            layoutId:0
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
    overflow: hidden;
    min-width: 1200px;
    img{
      width: 100%;
      float: left;
    }
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
        /deep/.el-carousel__button {
          width:8px;
          height: 8px;
          border-radius: 50%;
        }
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
  .addButtonWrapper{
    width: 1200px;
    margin:41px auto;
    .item1{
      width: 150px;
      height: 40px;
      background: url(../../../assets/img/newEra/btn1.jpg) no-repeat center;
      background-size: contain;
      display: inline-block;
      margin-right: 20px;
    }
    .item2{
      width: 112px;
      height: 38px;
      background: url(../../../assets/img/newEra/btn2.jpg) no-repeat center -2px;
      background-size: contain;
      display: inline-block;
    }
    .item:hover {
      cursor: pointer;
    }
  }
}
</style>