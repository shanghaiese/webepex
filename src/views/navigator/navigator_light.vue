<template>
  <div class="stickyWrapper">
    <vSideBar />
    <div class="container clearFixed">
      <div class="fixed">
        <ul class="nav_left">
          <li @click="goToHomepage()" :class="{'active':menuIndex==='homePage'}">首页</li>
          <li @click="goToKangyang()" :class="{'active':menuIndex==='departmentList'}">康养公寓</li>
          <li @click="goToAboutUs()" :class="{'active':menuIndex==='aboutUs'}">关于我们</li>
        </ul>
        <ul class="nav_right">
          <li class="right_item">
            <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
              prefix-icon="el-icon-search"
            ></el-autocomplete>
          </li>
          <li class="right_item clearFixed">
            <div v-show="false" class="unlogin_status clearFixed">
              <div class="register" @click="goToRegister">
                <i class="el-icon-user" style="margin-right:8px;"></i>注册
              </div>
              <div class="login" @click="goToLogin">
                <i class="el-icon-chat-line-round" style="margin-right:8px;"></i>登录
              </div>
            </div>
            <div
              v-show="true"
              class="login_status"
              @mouseenter="showDropmenu=true"
              @mouseleave="showDropmenu=false"
            >
              <span class="el-dropdown-link">
                <i class="el-icon-user"></i>
                {{loginName}}
              </span>
              <transition name="fade">
                <div class="dropmenu" v-show="showDropmenu">
                  <!-- <ul v-for="(item,key) in loginMenu" :key="key">
                                        <li v-for="(menu,k) in item" :key="k" @click="gotoInnerPage(menu)">{{menu.label}}</li>
                  </ul>-->
                  <ul v-if="show_MyMaterial">
                    <li v-if="show_MyMaterial" @click="goToMyMaterial">我的资料</li>
                  </ul>
                  <ul v-if="show_MyProject||show_MyTransfer||show_MyPurchase">
                    <li v-if="show_MyProject" @click="goToMyProject">康养公寓项目</li>
                    <li v-if="show_MyTransfer" @click="goToMyTransfer">我的转让</li>
                    <li v-if="show_MyPurchase" @click="goToMyPurchase">我的购买</li>
                  </ul>
                  <ul>
                    <li @click="loginOut">退出</li>
                  </ul>
                </div>
              </transition>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="showBox">
      <router-view></router-view>
    </div>
    <vfooter />
  </div>
</template>

<script type="text/ecmascript-6">
import vfooter from "@/components/footer/footer";
import dealMenu from "@/utils/dealMenu";
import vSideBar from "@/components/sideBar/sideBar";
import axios from "@/api/taotaozi_api.js";
export default {
  data() {
    return {
      restaurants: [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        }
      ],
      state1: "",
      showDropmenu: false,
      // ----------------------是否显示内页菜单
      show_MyMaterial: true,
      show_MyProject: true,
      show_MyTransfer: true,
      show_MyPurchase: true,
      isLogin:'no',
      loginName: '',
      userId:0, // 0是个人，1是企业；
      qualifyStatus:1 //0待实名认证，1实名认证成功，2实名认证失败，3实名认证中；
    };
  },
  created() {
    let str = window.sessionStorage.getItem("userInfo");
    if(!!str) {
      let data = JSON.parse(str);
      console.log(data);
      this.isLogin = data.loginStatus;
      this.loginName  = data.loginName;
      this.show_MyMaterial=data.menuList[0].myInfo;
      this.show_MyProject=data.menuList[0].apartmentProjet;
      this.show_MyTransfer=data.menuList[0].myTransOrder;
      this.show_MyPurchase=data.menuList[0].myTransOrder;
      this.userId = data.type.id;
      this.qualifyStatus = data.status.id;
    }
  },
  methods: {
    goToHomepage() {
      if (this.menuIndex === "homePage") {
        return;
      }
      this.$router.push("/homePage");
    },
    goToKangyang() {
      if (this.menuIndex === "departmentList") {
        return;
      }
      this.$router.push("/departmentList");
    },
    goToAboutUs() {
      if (this.menuIndex === "aboutUs") {
        return;
      }
      this.$router.push("/aboutUs");
    },
    // --------------------------------搜索下拉部分
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    //----------------------------------跳转到注册页
    goToRegister() {
      this.$router.push("/registerPersonal");
    },
    //----------------------------------跳转到登录页
    goToLogin() {
      this.$router.push("/login");
    },
    // ---------------------------------跳转内
    // --------------------------------跳转至内页
    goToMyMaterial() {
      //跳转至我的资料，分10种情况；
      this.showDropmenu = false;
      if (
        this.menuIndex === "enterpriseQualfingStatusForSuccess" ||
        this.menuIndex === "enterpriseQualified" ||
        this.menuIndex === "enterpriseQualifing" ||
        this.menuIndex === "enterpriseQualifingStatusForFail" ||
        this.menuIndex === "enterpriseQualifingStatusForWait" ||
        this.menuIndex === "personalQualfingStatusForSuccess" ||
        this.menuIndex === "personalQualified" ||
        this.menuIndex === "personalQualifing" ||
        this.menuIndex === "personalQualifingStatusForFail" ||
        this.menuIndex === "personalQualifingStatusForWait"
      ) {
        return;
      }
      if(this.userId===1) {
        //企业用户
        if(this.qualifyStatus===0) {
          // 待实名认证
          this.$router.push("/enterpriseQualifing");
        }else if(this.qualifyStatus===1) {
          // 实名认证成功
          this.$router.push("/enterpriseQualified");
        }else if(this.qualifyStatus===2) {
          // 实名认证失败
          this.$router.push("/enterpriseQualifingStatusForFail");
        }else if(this.qualifyStatus===3) {
          // 实名认证审核中
          this.$router.push("/enterpriseQualifingStatusForWait");
        }
      }else if(this.userId===0) {
        // 个人用户；
        if(this.qualifyStatus===0) {
          // 待实名认证
          this.$router.push("/personalQualifing");
        }else if(this.qualifyStatus===1) {
          // 实名认证成功
          this.$router.push("/personalQualified");
        }else if(this.qualifyStatus===2) {
          // 实名认证失败
          this.$router.push("/personalQualifingStatusForFail");
        }else if(this.qualifyStatus===3) {
          // 实名认证审核中
          this.$router.push("/personalQualifingStatusForWait");
        }
      }
    },
    goToMyProject() {
      // ----跳转到我的资产
      this.showDropmenu = false;
      if (this.menuIndex === "projectList") {
        return;
      }
      this.$router.push("/projectList");
    },
    goToMyTransfer() {
      // ----跳转到我的转让
      this.showDropmenu = false;
      if (this.menuIndex === "myTransfer") {
        return;
      }
      this.$router.push("/myTransfer");
    },
    goToMyPurchase() {
      // ----跳转到我的购买
      this.showDropmenu = false;
      if (this.menuIndex === "myPurchase") {
        return;
      }
      this.$router.push("/myPurchase");
    },
    loginOut() {
      // ----跳转到我的购买
      this.showDropmenu = false;
      if (this.menuIndex === "login") {
        return;
      }
      axios
        .logout({})
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotoInnerPage(item) {
      this.showDropmenu = false;
      // if(this.menuIndex===item.menuIndex) {return;}
      // console.log(this.menuIndex);
      dealMenu(item);
      console.log("a");
    }
  },
  components: {
    vfooter,
    vSideBar
  },
  computed: {
    menuIndex() {
      let index = this.$store.state.states.menuIndex;
      return index;
    }
  }
};
</script>

<style lang="less" scoped>
.stickyWrapper {
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 72px;
  position: relative;
  .showBox {
    height: calc(100vh - 142px);
    overflow: auto;
  }
}
.container {
  height: 70px;
  background: #ffffff;
  opacity: 0.92;
  position: relative;
  z-index: 100;
  box-shadow: 1px 1px 3px rgba(210, 210, 210, 0.5);
  .fixed {
    width: 1200px;
    margin: 0 auto;
    background-image: url(./../../assets/img/nav_logo_dark.png);
    background-repeat: no-repeat;
    background-position: 0 center;
    background-size: 112px 30px;
    // background:red;
    padding-left: 220px;
    box-sizing: border-box;
    .nav_left {
      float: left;
      color: #333333;
      height: 70px;
      line-height: 70px;
      li {
        float: left;
        &:hover {
          color: #caa14f;
          cursor: pointer;
        }
      }
      li + li {
        margin-left: 56px;
      }
      .active {
        color: #caa14f;
      }
    }
    .nav_right {
      float: right;
      color: #333333;
      height: 70px;
      .right_item {
        float: left;
        line-height: 70px;
        height: 70px;
        /deep/.el-input__inner {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 0;
          color: #333333;
        }
        .unlogin_status {
          div {
            float: left;
            &:hover {
              color: #caa14f;
              cursor: pointer;
            }
          }
          .login {
            margin-left: 30px;
          }
        }
        .login_status {
          float: left;
          color: #333333;
          height: 70px;
          padding: 0 8px;
          position: relative;
          z-index: 1000;
          &:hover {
            background: #caa14f;
            color: white;
          }
          .dropmenu {
            position: absolute;
            z-index: 1000;
            color: black;
            top: 70px;
            right: 0;
            width: 200px;
            background: #ffffff;
            box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
            ul {
              padding: 7px 0;
              border-bottom: #e8e8e8 1px solid;
              li {
                padding: 9px 0 9px 16px;
                line-height: 1;
                color: #333333;
                font-size: 14px;
                &:hover {
                  background: #f5f5f5;
                }
              }
            }
            ul:last-child {
              border-bottom: #e8e8e8 0px solid;
            }
          }
          .fade-enter-active,
          .fade-leave-active {
            transition: opacity 0.5s;
          }
          .fade-enter,
          .fade-leave-active {
            opacity: 0;
          }
        }
      }
      .right_item + .right_item {
        margin-left: 30px;
      }
    }
  }
}
</style>
