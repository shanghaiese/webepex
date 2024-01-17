<template>
  <div>
    <div class="wrapper">
      <div class="product_wrap">
        <div class="left">
          <div class="bigPic">
            <img :src="currentSrc" alt />
          </div>
          <div class="smallPics">
            <img
              :class="{'activeImg':imgIndex===key}"
              v-for="(item,key) in productData.imgurl"
              :key="key"
              :src="item"
              alt
              @click="showCurrent(item,key)"
            />
          </div>
        </div>
        <div class="right">
          <div class="title_wrap">
            <div class="title">{{productData.title}}</div>
            <div class="price">
              <span class="price_value">¥{{productData.price}}</span>
              <span class="price_label">万元</span>
            </div>
          </div>
          <div class="seller_wrap">
            <div class="item">
              <span class="item_label">开发商</span>
              <span class="item_value">{{productData.developer}}</span>
            </div>
            <div class="item">
              <span class="item_label">运营商</span>
              <span class="item_value">{{productData.operator}}</span>
            </div>
          </div>
          <div class="choose_wrap">
            <div class="type_title">户型房型</div>
            <div class="types">
              <span :class="{'active_house_type':houseType}" @click="chooseHouseType">A 两房一厅两卫</span>
              <span :class="{'active_house_type':!houseType}" @click="chooseHouseType">B 三房两厅两卫</span>
            </div>
            <div class="info_title">楼号/楼层/房号</div>
            <div class="cascader_wrapper">
              <el-cascader
                :props="{ expandTrigger: 'hover' }"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
              ></el-cascader>
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
                    <span>项目名称</span>
                    <span class="val">{{productData.name}}</span>
                  </div>
                  <div>
                    <span>建成日期</span>
                    <span class="val">{{productData.foundDate}}</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>项目类型</span>
                    <span class="val">{{productData.projetType}}</span>
                  </div>
                  <div>
                    <span>装修情况</span>
                    <span class="val">{{productData.decoration}}</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>项目地址</span>
                    <span class="val">{{productData.address}}</span>
                  </div>
                  <div>
                    <span>项目介绍</span>
                    <span class="val val1">{{productData.intro}}</span>
                  </div>
                </li>
              </ul>
              <div class="title">房型信息</div>
              <ul class="item">
                <li>
                  <div>
                    <span>户型</span>
                    <span class="val">{{productData.type}}</span>
                  </div>
                  <div>
                    <span>建筑面积</span>
                    <span class="val">{{productData.houseSize}}</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>房型类型</span>
                    <span class="val">{{productData.type2}}</span>
                  </div>
                  <div>
                    <span>使用面积</span>
                    <span class="val">{{productData.houseUseSize}}</span>
                  </div>
                </li>
                <li>
                  <div>
                    <span>资产使用年限</span>
                    <span class="val">{{productData.useTime}}</span>
                  </div>
                </li>
              </ul>
              <div class="imgWrap">
                <img v-for="(item,key) in productData.imgurl" :key="key" :src="item" alt="">
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="配套服务" name="second">
            <div class="imgWrap">
                <img v-for="(item,key) in productData.imgurl" :key="key" :src="item" alt="">
              </div>
          </el-tab-pane>
          <el-tab-pane label="确认证书" name="third">
            <div class="imgWrap">
                <img v-for="(item,key) in productData.imgurl" :key="key" :src="item" alt="">
              </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      activeName: "first",
      productData: {
        id: 1,
        type: "A",
        type2: "三室一厅",
        decoration: "精装修",
        direction: "朝南",
        company: "上海圣维物业管理有限公司",
        address: "上海市青浦区康工路777弄6",
        imgurl: [
          "/static/img/correct.png",
          "/static/img/person.png",
          "/static/img/test.png",
          "/static/img/test.png",
          "/static/img/test.png"
        ],
        title: "绿地国际康养城·颐尚居绿地国际康养城·颐尚居居",
        price: "299",
        developer: "上海圣维物业管理有限公司",
        operator: "上海市青浦区康工路777弄6-101",
        name: "项目名称",
        foundDate: "2019-08-08",
        projetType: "康养",
        intro: "项目介绍内容项目介绍内容项目介绍内容项目介…",
        houseSize: "160平米",
        houseUseSize: "130平米",
        useTime: "30年"


      },
      currentSrc: "",
      imgIndex: 0,
      houseType: true,// 选择几室几厅
      // -------------------联级选择
      options: [
        {
          value: "zhinan",
          label: "1号楼",
          children: [
            {
              value: "shejiyuanze",
              label: "1层",
              children: [
                {
                  value: "yizhi",
                  label: "101"
                },
                {
                  value: "fankui",
                  label: "102"
                },
                {
                  value: "xiaolv",
                  label: "103"
                },
                {
                  value: "kekong",
                  label: "104"
                }
              ]
            },
            {
              value: "daohang",
              label: "2层",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "201"
                },
                {
                  value: "dingbudaohang",
                  label: "202"
                }
              ]
            }
          ]
        }
      ],
      selectedOptions: []
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    showCurrent(url, index) {
      this.currentSrc = url;
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
      this.$router.push("/departmentOrder");
    }
  },
  created() {
    this.$store.commit("editIndex", { info: "departmentDetail" });
    this.currentSrc = this.productData.imgurl[0];
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
      .seller_wrap {
        padding: 32px 0 16px 0;
        font-size: 16px;
        color: #666666;
        border-bottom: 1px solid #E8E8E8;
        margin-bottom: 32px;
        .item {
          margin-bottom: 16px;
          .item_value {
            color: #333333;
            margin-left: 16px;
          }
        }
      }
      .choose_wrap {
        .type_title{
          font-size: 14px;
          color: #666666;
          margin-bottom: 5px;
        }
        .types{ 
          margin-bottom: 24px;
          span{
            display: inline-block;
            border: 1px solid #D9D9D9;
            padding: 8px 8px;
            font-size: 14px;
            &:hover {
              cursor: pointer;
            }
          }
          span+span {
            margin-left: 16px;
          }
          .active_house_type{
              color: #caa14f;
              border: 1px solid #caa14f;
          }
        }
        .info_title{
          font-size: 14px;
          color: #666666;
          margin-bottom: 5px;
        }
        .cascader_wrapper {
          width: 280px;
          height: 32px;
          /deep/.el-input__inner {
            height: 32px;
            width: 250px;
          }
        }
        .button_wrapper{
          width: 280px;
          height: 40px;
          margin-top: 48px;
          .el-button {
            width: 100%;
            height: 100%;
          }
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
      }
      .item{
        overflow: hidden;
        width: 1200px;
        li {
          float: left;
          width: calc(33.3% - 140px);
          overflow: hidden;
            div { 
              margin:16px 0;
              span{
                color: #666666;
                display: inline-block;
                vertical-align: bottom;
              }
              .val {
                color: #333333;
                margin-left: 16px;
              }
              .val1{
                max-width: 180px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
        }
        li+li {
          margin-left: 210px;
        }
      }
    }
    .imgWrap {
        margin-top: 40px;
        img{
          width: 800px;
          margin-bottom: 30px;
        }
      }
  }
}
</style>