<template>
  <div>
    <div class="wrapper">
      <div class="product_wrap">
        <div class="left">
          <div class="bigPic" v-if="treeData.selectedRoom.detailPhotosHead">
            <img :src="currentSrc" alt v-if="treeData.selectedRoom.detailPhotosHead" />
          </div>
          <div class="smallPics" v-if="treeData.selectedRoom.detailPhotosHead">
            <img
              :class="{'activeImg':imgIndex===key}"
              v-for="(item,key) in treeData.selectedRoom.detailPhotosHead"
              :key="key"
              :src="item.url"
              alt
              @click="showCurrent(item,key)"
            />
          </div>
        </div>
        <div class="right">
          <div class="title_wrap">
            <div
              class="title"
              v-if="treeData.selectedRoom.apartmentBaseInfo"
            >{{treeData.selectedRoom.apartmentBaseInfo.projetName}}</div>
            <div class="price">
              <span class="price_value">¥{{dealedPrice}}</span>
              <span class="price_label">万元</span>
            </div>
          </div>
          <div class="choose_wrap">
            <div class="buildingNo">
              <div class="label">楼号</div>
              <div class="building_wrapper">
                <span
                  v-for="(item,key) in treeData.buildings"
                  :key="key"
                  class="list_common"
                  :class="{'active_house':item.active==='yes','sold_house':item.status==='DOWN'}"
                  @click="chooseBuilding(item)"
                >{{item.num}}号楼</span>
              </div>
            </div>
            <div class="buildingFloor">
              <div class="label">楼层</div>
              <div class="building_wrapper">
                <span
                  v-for="(item,key) in treeData.floors"
                  :key="key"
                  class="list_common"
                  :class="{'active_house':item.active==='yes','sold_house':item.status==='DOWN'}"
                  @click="chooseFloor(item)"
                >{{item.num}}层</span>
              </div>
            </div>
            <div class="roomNo">
              <div class="label">房号</div>
              <div class="building_wrapper">
                <span
                  v-for="(item,key) in treeData.rooms"
                  :key="key"
                  class="list_common"
                  :class="{'active_house':item.active==='yes','sold_house':item.status==='DOWN' }"
                  @click="chooseRoom(item)"
                >{{item.roomNo}}室</span>
              </div>
            </div>
            <div class="seller_wrap">
              <div class="item">
                <span class="item_label">开发商</span>
                <span
                  class="item_value"
                  v-if="treeData.selectedRoom.developerInfo"
                >{{treeData.selectedRoom.developerInfo.name}}</span>
              </div>
              <div class="item">
                <span class="item_label">运营商</span>
                <span
                  class="item_value"
                  v-if="treeData.selectedRoom.apartmentBaseInfo"
                >{{treeData.selectedRoom.apartmentBaseInfo.assignOperator}}</span>
              </div>
            </div>
            <div class="button_wrapper">
              <el-button type="primary" @click="goToOrderList">立即下单</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="tab_wrapper">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="资产详情" name="first">
            <div class="property_wrapper">
              <div class="title">项目信息</div>
              <ul class="item">
                <li>
                  <div>
                    <span style="display:inline-block;vertical-align:top;">项目名称</span>
                    <span
                      v-if="treeData.selectedRoom.apartmentBaseInfo"
                      class="val"
                      style="max-width:180px;display:inline-block;vertical-align:top;"
                    >{{treeData.selectedRoom.apartmentBaseInfo.projetName}}</span>
                  </div>
                  <div>
                    <span>交付日期</span>
                    <span
                      class="val"
                      v-if="treeData.selectedRoom.apartmentBaseInfo"
                    >{{treeData.selectedRoom.apartmentBaseInfo.deliveryTime}}</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>项目类型</span>
                    <span
                      class="val"
                      v-if="treeData.selectedRoom.apartmentBaseInfo"
                    >{{treeData.selectedRoom.apartmentBaseInfo.assetType.name}}</span>
                  </div>
                  <div>
                    <span>装修情况</span>
                    <span
                      class="val"
                      v-if="treeData.selectedRoom.apartmentBaseInfo"
                    >{{treeData.selectedRoom.apartmentBaseInfo.decoration}}</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>项目地址</span>
                    <span
                      class="val"
                      v-if="treeData.selectedRoom.apartmentBaseInfo"
                    >{{treeData.selectedRoom.apartmentBaseInfo.address}}</span>
                  </div>
                  <!-- <div>
                    <span>项目介绍</span>
                    <span
                      class="val val1"
                      v-if="treeData.selectedRoom.apartmentBaseInfo"
                    >{{treeData.selectedRoom.apartmentBaseInfo.description}}</span>
                  </div>-->
                </li>
              </ul>
              <div class="title">房型信息</div>
              <ul class="item">
                <li>
                  <div>
                    <span>户型</span>
                    <span
                      class="val"
                      v-if="treeData.selectedRoom.apartmentLayoutInfo"
                    >{{treeData.selectedRoom.apartmentLayoutInfo.layout}}</span>
                  </div>
                  <div>
                    <span>建筑面积</span>
                    <span
                      class="val"
                      v-if="treeData.selectedRoom.apartmentLayoutInfo"
                    >{{treeData.selectedRoom.apartmentLayoutInfo.buildArea}}平米</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>房型类型</span>
                    <span
                      class="val"
                      v-if="treeData.selectedRoom.apartmentLayoutInfo"
                    >{{treeData.selectedRoom.apartmentLayoutInfo.layoutType}}</span>
                  </div>
                  <div>
                    <span>使用面积</span>
                    <span
                      class="val"
                      v-if="treeData.selectedRoom.apartmentLayoutInfo"
                    >{{treeData.selectedRoom.apartmentLayoutInfo.realArea}}平米</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>资产使用权截止日期</span>
                    <span class="val">{{treeData.selectedRoom.propertyEndTime}}</span>
                  </div>
                </li>
              </ul>
              <div class="imgWrap" v-if="treeData.selectedRoom.detailPhotosBottom">
                <img
                  v-for="(item,key) in treeData.selectedRoom.detailPhotosBottom"
                  :key="key"
                  :src="item.url"
                  alt
                />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="配套服务" name="second">
            <div class="imgWrap" v-if="treeData.selectedRoom.services">
              <img
                v-for="(item,key) in treeData.selectedRoom.services"
                :key="key"
                :src="item.url"
                alt
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="确认证书" name="third">
            <!-- <div class="imgWrap" v-if="treeData.selectedRoom.qualifications">
              <img
                v-for="(item,key) in treeData.selectedRoom.qualifications"
                :key="key"
                :src="item.url"
                alt
                style="width:800px;"
              />
            </div>-->
            <div class="imgWrap" v-if="treeData.selectedRoom.qualifications">
              <img :src="treeData.selectedRoom.qualifications.url" alt style="width:800px;" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  addKey,
  initData,
  chooseBuilding,
  chooseFloor,
  chooseRoom
} from "@/utils/dealHouseData";
import http from "@/api/squainApi";
export default {
  data() {
    return {
      activeName: "first",
      currentSrc: "",
      imgIndex: 0,
      houseNo_activeIndex: 1,
      houseFloor_activeIndex: 1,
      roomNo_activeIndex: "01",
      treeData: {
        buildings: [],
        floors: [],
        rooms: [],
        selectedRoom: {
          apartmentBaseInfo: {
            assetType: {},
            projetName: ""
          },
          developerInfo: {},
          apartmentLayoutInfo: {}
        },
        selectedBuilding: {},
        selectedFloor: {}
      },
      apartmentId: null,
      layoutId: null,
      islogin: "no",
      qualifyStatus: 0,
      assetId: null,
      toId: null,
      position: 0
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    showCurrent(item, index) {
      this.currentSrc = item.url;
      this.imgIndex = index;
    },
    // -----------联级选择
    handleChange(value) {
      console.log(value);
    },
    // -------选择房型
    chooseHouseType() {
      this.houseType = !this.houseType;
    },
    // ------下单
    goToOrderList() {
      if (this.islogin != "yes") {
        // 未登陆
        this.$router.push({
          path: "/login",
          query: { redirect: this.$router.currentRoute.fullPath }
        });
        return;
      }
      // ------------判断认证状态，认证才可以下单；
      if (this.qualifyStatus !== 1) {
        this.$message({
          message: "您尚未认证或者认证未通过，详情请查看'我的资料'",
          type: "error"
        });
        return;
      }
      this.assetId = this.treeData.selectedRoom.id;
      // 调用verify接口判断库存状态
      this.verify();
    },
    // ----------------点击楼号；
    chooseBuilding(item) {
      if (item.status === "DOWN") {
        console.log("已选/售光");
        return;
      }
      let treeData = chooseBuilding(this.treeData.buildings, item);
      this.treeData.buildings = treeData.buildings;
      this.treeData.floors = treeData.floors;
      this.treeData.rooms = treeData.rooms;
      this.treeData.selectedRoom = treeData.selectedRoom;
      this.treeData.selectedBuilding = treeData.selectedBuilding;
      this.treeData.selectedFloor = treeData.selectedFloor;
      console.log(this.treeData);
    },
    // ----------------点击楼层
    chooseFloor(item) {
      if (item.status === "DOWN") {
        console.log("已选/售光");
        return;
      }
      let treeData = chooseFloor(
        this.treeData.buildings,
        this.treeData.selectedBuilding,
        item
      );
      this.treeData.buildings = treeData.buildings;
      this.treeData.floors = treeData.floors;
      this.treeData.rooms = treeData.rooms;
      this.treeData.selectedRoom = treeData.selectedRoom;
      this.treeData.selectedFloor = treeData.selectedFloor;
      console.log(this.treeData);
    },
    // ----------------点击房号
    chooseRoom(item) {
      if (item.status === "DOWN") {
        console.log("已选/售光");
        return;
      }
      let treeData = chooseRoom(
        this.treeData.buildings,
        this.treeData.selectedBuilding,
        this.treeData.selectedFloor,
        item
      );
      this.treeData.buildings = treeData.buildings;
      this.treeData.floors = treeData.floors;
      this.treeData.rooms = treeData.rooms;
      this.treeData.selectedRoom = treeData.selectedRoom;
      console.log(this.treeData);
    },
    // -------------------------------------------api
    getDetail() {
      http
        .getMyLayoutDetail({
          apartmentId: this.apartmentId,
          layOutId: this.layoutId
        })
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            let data = res.data;
            let treeData = initData(data);
            this.treeData.buildings = treeData.buildings;
            this.treeData.floors = treeData.floors;
            this.treeData.rooms = treeData.rooms;
            this.treeData.selectedRoom = treeData.selectedRoom;
            this.treeData.selectedBuilding = treeData.selectedBuilding;
            this.treeData.selectedFloor = treeData.selectedFloor;
            this.currentSrc = this.treeData.selectedRoom.detailPhotosHead[
              this.imgIndex
            ].url;
            let str = JSON.stringify(res.data);
            window.sessionStorage.setItem("squain_treeData", str);
            console.log(this.treeData);
          }
        });
    },
    // ---验证库存
    verify() {
      http
        .verify({
          assetId: this.assetId,
          toId: this.toId
        })
        .then(res => {
          if (res.code === 200) {
            if (res.data) {
              // 有库存；跳转页面；
              window.sessionStorage.setItem(
                "squain_assetId",
                this.treeData.selectedRoom.id
              );
              window.sessionStorage.setItem(
                "squain_assetType",
                this.treeData.selectedRoom.apartmentBaseInfo.assetType.id
              );
              window.sessionStorage.setItem(
                "squain_fromId",
                this.treeData.selectedRoom.developerInfo.id
              );
              window.sessionStorage.setItem(
                "squain_salePrice",
                this.treeData.selectedRoom.price
              );
              let str = JSON.stringify(this.treeData.selectedRoom);
              window.sessionStorage.setItem("squain_selectedRoom", str);
              this.$router.push("/departmentOrder");
            } else {
              this.$message({
                message: "该房间已售空，请您选择其他房间",
                type: "error"
              });
              this.getDetail();
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.$store.commit("editIndex", { info: "departmentDetail" });
    // -----------------------------赋值apartmentId,layoutId;
    let str1 = window.sessionStorage.getItem("squain_apartmentId");
    let str2 = window.sessionStorage.getItem("squain_layoutId");
    this.apartmentId = parseInt(str1);
    this.layoutId = parseInt(str2);
    let str4 = window.sessionStorage.getItem("userInfo");
    if (!!str4) {
      this.islogin = JSON.parse(str4).loginStatus;
      this.qualifyStatus = JSON.parse(str4).status.id;
      this.toId = parseInt(JSON.parse(str4).id);
    }
    // -----------------------------赋值apartmentId,layoutId;
    /*let str3 = window.sessionStorage.getItem("squain_treeData");
    if (!!str3) {
      let data = JSON.parse(str3);
      let treeData = initData(data);
      this.treeData.buildings = treeData.buildings;
      this.treeData.floors = treeData.floors;
      this.treeData.rooms = treeData.rooms;
      this.treeData.selectedRoom = treeData.selectedRoom;
      this.treeData.selectedBuilding = treeData.selectedBuilding;
      this.treeData.selectedFloor = treeData.selectedFloor;
      console.log(this.treeData);
      this.currentSrc = this.treeData.selectedRoom.detailPhotosHead[
        this.imgIndex
      ].url;
    } else {
      this.getDetail();
    }*/
    this.getDetail();
    // -----------------------------------------楼号，楼层，房间号初始赋值；
    let data = [
      {
        id: "0001",
        num: 1, //楼号
        children: [
          {
            id: "000test1",
            num: 1, // 楼层；
            children: [
              {
                id: "000111",
                num: "01", //房间号
                status: "down"
              },
              {
                id: "000112",
                num: "02",
                status: "down"
              },
              {
                id: "000113",
                num: "03",
                status: "up"
              },
              {
                id: "000114",
                num: "04",
                status: "up"
              },
              {
                id: "000115",
                num: "05",
                status: "up"
              }
            ]
          },
          {
            id: "00012",
            num: 2,
            children: [
              {
                id: "000121",
                num: "01",
                status: "up"
              },
              {
                id: "000122",
                num: "02",
                status: "down"
              }
            ]
          }
        ]
      },
      {
        id: "0002",
        num: 2,
        children: [
          {
            id: "000test1",
            num: 4,
            children: [
              {
                id: "000241",
                num: "01",
                status: "down"
              },
              {
                id: "000242",
                num: "02",
                status: "down"
              }
            ]
          },
          {
            id: "00025",
            num: 5,
            children: [
              {
                id: "000251",
                num: "01",
                status: "up"
              },
              {
                id: "000252",
                num: "02",
                status: "up"
              }
            ]
          }
        ]
      },
      {
        id: "0003",
        num: 3, //楼号
        children: [
          {
            id: "000test1",
            num: 1, // 楼层；
            children: [
              {
                id: "000111",
                num: "01", //房间号
                status: "down"
              },
              {
                id: "000112",
                num: "02",
                status: "down"
              },
              {
                id: "000113",
                num: "03",
                status: "down"
              },
              {
                id: "000114",
                num: "04",
                status: "down"
              }
            ]
          },
          {
            id: "00012",
            num: 2,
            children: [
              {
                id: "3-1-01",
                num: "01",
                status: "down"
              },
              {
                id: "000122",
                num: "02",
                status: "down"
              }
            ]
          }
        ]
      }
    ];
    console.log(this.$route.params);
    if (this.$route.params && this.$route.params.index) {
      this.activeName = this.$route.params.index;
      this.position = this.$route.params.position;
    }
  },
  mounted() {
    if (this.position === 0) {
      this.$nextTick(() => {
          let div = document.getElementById("showBox");
          div.scrollTop = this.position;
          console.log(div.scrollTop, this.position);
        });
    } else {
      setTimeout(() => {
        this.$nextTick(() => {
          let div = document.getElementById("showBox");
          div.scrollTop = this.position;
          console.log(div.scrollTop, this.position);
        });
      }, 1000);
    }
  },
  computed: {
    dealedPrice() {
      if (this.treeData.selectedRoom.price) {
        return this.treeData.selectedRoom.price/1000000;
      } else {
        return 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  padding-top: 56px;
  width: 1200px;
  margin: 0 auto;
  .product_wrap {
    display: flex;
    margin-bottom: 80px;
    .left {
      flex: 0 0 600px;
      .bigPic {
        width: 600px;
        height: 600px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .smallPics {
        margin: 13px auto 0;
        height: 80px;
        width: 540px;
        overflow: hidden;
        padding: 2px;
        img {
          width: 80px;
          height: 80px;
          float: left;
          margin-right: 24px;
        }
        .activeImg {
          outline: 2px solid #caa14f;
        }
      }
    }
    .right {
      height: 693px;
      flex: 0 0 600px;
      box-sizing: border-box;
      padding-left: 56px;
      .title_wrap {
        padding-bottom: 34px;
        border-bottom: 1px solid #e8e8e8;
        .title {
          color: #333333;
          font-size: 24px;
          font-weight: bolder;
          margin-bottom: 24px;
        }
        .price {
          color: #ed4040;
          .price_value {
            font-size: 24px;
          }
          .price_label {
            font-size: 16px;
          }
        }
      }
      .choose_wrap {
        .info_title {
          font-size: 14px;
          color: #666666;
          margin-bottom: 5px;
        }
        .seller_wrap {
          padding: 24px 0 0 0;
          font-size: 14px;
          color: #666666;
          border-top: 1px solid #e8e8e8;
          margin-top: 16px;
          .item {
            margin-bottom: 16px;
            .item_value {
              color: #333333;
              margin-left: 16px;
            }
          }
        }
        .button_wrapper {
          width: 280px;
          height: 40px;
          margin-top: 48px;
          .el-button {
            width: 100%;
            height: 100%;
            font-size: 16px;
          }
        }
        .label {
          font-size: 14px;
          color: #666666;
          margin-bottom: 8px;
          border-radius: 2px;
        }
        .list_common {
          display: inline-block;
          border: 1px solid #d9d9d9;
          padding: 8px 16px;
          font-size: 14px;
          color: #333333;
          margin: 0 16px 16px 0;
          &:hover {
            cursor: pointer;
          }
        }
        .active_house {
          color: #caa14f;
          border: 1px solid #caa14f;
        }
        .sold_house {
          color: #333333;
          border: 1px solid #d9d9d9;
          background: #d9d9d9;
          cursor: default;
          &:hover {
            cursor: default;
          }
        }
        .buildingNo {
          margin-top: 24px;
        }
      }
    }
  }
  .tab_wrapper {
    width: 1200px;
    .property_wrapper {
      color: #333333;
      font-size: 14px;
      .title {
        padding: 24px 0 8px 0;
        font-weight: bolder;
      }
      .item {
        overflow: hidden;
        width: 1200px;
        li {
          float: left;
          width: calc(33.3% - 80px);
          overflow: hidden;
          div {
            margin: 16px 0;
            span {
              color: #666666;
              display: inline-block;
              vertical-align: bottom;
            }
            .val {
              color: #333333;
              margin-left: 16px;
            }
            .val1 {
              max-width: 180px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        li + li {
          margin-left: 120px;
        }
      }
    }
    .imgWrap {
      margin-top: 40px;
      overflow: hidden;
      img {
        width: 1200px;
        float: left;
      }
    }
  }
}
</style>