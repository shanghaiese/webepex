<template>
  <div class="stickyWrapper">
    <vSideBar />
    <div class="container clearFixed">
      <div class="fixed">
        <ul class="nav_left">
          <li @click="goToHomepage" :class="{'active':menuIndex==='homePage'}">首页</li>
          <li @click="goToKangyang" :class="{'active':menuIndex==='departmentList'}">康养公寓</li>
          <li @click="goToParking" :class="{'active':menuIndex==='parking'}">车位</li>
          <li @click="goToRent" :class="{'active':menuIndex==='longRentalApartment'}">长租公寓</li>
          <li @click="goToshop" :class="{'active':menuIndex==='shop'}">商铺</li>
          <li @click="goToAboutUs" :class="{'active':menuIndex==='aboutUs'}">关于我们</li>
        </ul>
        <ul class="nav_right">
          <li class="right_item clearFixed">
            <div v-if="isLogin==='no'" class="unlogin_status clearFixed">
              <div class="register" @click="goToRegister">
                <i class="el-icon-user" style="margin-right:8px;"></i>注册
              </div>
              <div class="login" @click="goToLogin">
                <i class="el-icon-chat-line-round" style="margin-right:8px;"></i>登录
              </div>
            </div>
            <div
              v-if="isLogin==='yes'"
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
                  <ul v-if="show_cutDeveloper||show_cutOperator">
                    <li v-if="!show_cutDeveloper" @click="changeRole(3)">切换为运营商</li>
                    <li v-if="!show_cutOperator" @click="changeRole(2)">切换为开发商</li>
                  </ul>
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
    <div class="showBox" id="showBox">
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
import http from "@/api/squainApi";
export default {
  data() {
    return {
      showDropmenu: false,
      // ----------------------是否显示内页菜单
      show_MyMaterial: true,
      show_MyProject: true,
      show_MyTransfer: true,
      show_MyPurchase: true,
      show_cutDeveloper:false,
      show_cutOperator: false,
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
      this.show_MyPurchase=data.menuList[0].myBuyOrder;
      this.show_cutDeveloper=data.menuList[0].cutDeveloper;
      this.show_cutOperator=data.menuList[0].cutOperator;
      this.userId = data.type.id;
      this.qualifyStatus = data.status.id;
    }
  },
  methods: {
    goToParking() {
      if (this.menuIndex === "parking") {
        return;
      }
      this.$router.push("/parking");
    },
    goToRent() {
      if (this.menuIndex === "longRentalApartment") {
        return;
      }
      this.$router.push("/longRentalApartment");
    },
    goToshop() {
      if (this.menuIndex === "shop") {
        return;
      }
      this.$router.push("/shop");
    },
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
    //----------------------------------跳转到注册页
    goToRegister() {
      this.$router.push("/registerPersonal");
    },
    //----------------------------------跳转到登录页
    goToLogin() {
      this.$router.replace({
        path: "/login",
        query: { redirect: this.$router.currentRoute.fullPath}
      });
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
            window.sessionStorage.clear();
            this.$router.replace({ path: `/redirect/homePage`});
            // this.$router.push("/homePage");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // -------------------------------切换角色
    changeRole(num) {
      http
        .changeRole({
          defaultRole: num
        })
        .then(res => {
          console.log(res);
          if(res.code===200) {
            let obj = {loginStatus:"yes",...res.data};
            let str = JSON.stringify(obj);
            window.sessionStorage.setItem("userInfo",str);
            this.$router.replace({ path: `/redirect${this.$route.fullPath}`});
          }
        });
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
        font-weight: bold;
        font-size: 16px;
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
