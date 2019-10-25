<template>
  <div>
    <div class="wrapper">
      <div class="product_wrap">
        <div class="left">
          <div class="bigPic">
              <img :src="currentSrc" alt="">
          </div>
          <div class="smallPics">
              <img v-for="(item,key) in productData.imgurl" :key="key" :src="item" alt="" @click="showCurrent(item)">
          </div>
        </div>
        <div class="right"></div>
      </div>
      <div class="tab_wrapper">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="资产详情" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配套服务" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="确认证书" name="third">角色管理</el-tab-pane>
          </el-tabs>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      activeName: "second",
      productData: {
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
            "/static/img/test.png",
            "/static/img/test.png",
            "/static/img/test.png"
          ]
        },
        currentSrc: ''
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    showCurrent(url) {
      this.currentSrc = url;
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
    .left{
      flex: 0 0 600px;
      .bigPic{
        width: 600px;
        height: 600px;
        overflow: hidden;
        img {
          width:100%;
          height: 100%;
        }
      }
      .smallPics {
        margin: 13px auto 0;
        height: 80px;
        width: 540px;
        overflow: hidden;
        img{
          width: 80px;
          height: 80px;
          float: left;
          margin-right: 24px;
        }
      }
    }
    .right{
      height: 693px;
      flex: 0 0 600px;
      background: green;
    }
  }
}
</style>