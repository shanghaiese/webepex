/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
// --------------------------------------------------------------登录页
import login from "@/views/login/login";
// --------------------------------------------------------------找回密码页
import passwordFind from "@/views/login/password_find";
// --------------------------------------------------------------找回密码页
import passwordFindNext from "@/views/login/password_find_next";
// --------------------------------------------------------------密码已找回页
import successFind from "@/views/login/success_find";
// --------------------------------------------------------------个人注册页
import registerPersonal from "@/views/register/register_personal";
// --------------------------------------------------------------企业注册页
import registerEnterprise from "@/views/register/register_enterprise";
// --------------------------------------------------------------导航栏-深色
import navigator_dark from "@/views/navigator/navigator_dark";
// --------------------------------------------------------------导航栏-浅色
import navigator_light from "@/views/navigator/navigator_light";
// --------------------------------------------------------------个人中心--我的资料(认证)
import enterpriseQualfingStatusForSuccess from "@/views/center/myMaterial/enterprise/enterpriseQualfingStatusForSuccess";
import enterpriseQualified from "@/views/center/myMaterial/enterprise/enterpriseQualified";
import enterpriseQualifing from "@/views/center/myMaterial/enterprise/enterpriseQualifing";
import enterpriseQualifingStatusForFail from "@/views/center/myMaterial/enterprise/enterpriseQualifingStatusForFail";
import enterpriseQualifingStatusForWait from "@/views/center/myMaterial/enterprise/enterpriseQualifingStatusForWait";
import personalQualfingStatusForSuccess from "@/views/center/myMaterial/personal/personalQualfingStatusForSuccess";
import personalQualified from "@/views/center/myMaterial/personal/personalQualified";
import personalQualifing from "@/views/center/myMaterial/personal/personalQualifing";
import personalQualifingStatusForFail from "@/views/center/myMaterial/personal/personalQualifingStatusForFail";
import personalQualifingStatusForWait from "@/views/center/myMaterial/personal/personalQualifingStatusForWait";
// -------------我的项目
import projectList from "@/views/center/myProjects/projectList";
import projectDetail from "@/views/center/myProjects/projectDetail";
import houseLayout from "@/views/center/myProjects/houseLayout";
// -------------我的订单
import myPurchase from "@/views/center/myOrder/myPurchase";
import myTransfer from "@/views/center/myOrder/myTransfer";
import orderDetail from "@/views/center/myOrder/orderDetail";
// ----------------------------------------------------------------首页
import homePage from "@/views/homePage/homePage";
// ---------------------------------------------------------------关于我们
import aboutUs from "@/views/aboutUs/aboutUs";
// ---------------------------------------------------------------康养公寓(资产汇)
import departmentList from "@/views/kangyang/department/departmentList";
import departmentDetail from "@/views/kangyang/department/departmentDetail";
import departmentOrder from "@/views/kangyang/department/departmentOrder";
import departmentOrderStatus from "@/views/kangyang/department/departmentOrderStatus";
//----------------------------------------------------------------车位
import parking from "@/views/kangyang/parking/parking";
//----------------------------------------------------------------长租公寓
import longRentalApartment from "@/views/kangyang/longRentalApartment/longRentalApartment";
//----------------------------------------------------------------商铺
import shop from "@/views/kangyang/shop/shop";
// ---------------------------------------------------------------500
import notFound from "@/views/information/notFound";
// ---------------------------------------------------------------404
import noPage from "@/views/information/noPage";
// ---------------------------------------------------------------协议
import digitalAgreement from "@/views/document/digitalAgreement";
import privateAgreement from "@/views/document/privateAgreement";
import registerAgreement from "@/views/document/registerAgreement";
import riskWarning from "@/views/document/riskWarning";
import lawInfo from "@/views/document/lawInfo";
import transferAgreement from "@/views/document/transferAgreement";
// ---------------------------------------------------------------网站地图
import map from "@/views/map/map";
// ---------------------------------------------------------------新纪元
import newEra from "@/views/newEra/newEra";
import { isatty } from "tty";
Vue.use(Router); // 使用router;
// 判断是否获取到权限菜单；
let isMenuGotten = false;
//  ------跳转页面时，滚动条置顶
let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/homePage"
    },
    {
      // 刷新页面
      path: "/redirect/:path*",
      name: "redirect",
      component: () => import('@/views/redirectPage/index.vue')
    },
    // ==================================================================================注册登录部分=================================
    //   ------------------------------------------登录页
    {
      path: "/login",
      name: "login",
      component: login
    },
    //   ------------------------------------------找回密码页
    {
      path: "/passwordFind",
      name: "passwordFind",
      component: passwordFind
    },
    {
      path: "/passwordFindNext",
      name: "passwordFindNext",
      component: passwordFindNext
    },
    //   ------------------------------------------密码已找回页
    {
      path: "/successFind",
      name: "successFind",
      component: successFind
    },
    //   ------------------------------------------个人注册页
    {
      path: "/registerPersonal",
      name: "registerPersonal",
      component: registerPersonal
    },
    //   ------------------------------------------企业注册页
    {
      path: "/registerEnterprise",
      name: "registerEnterprise",
      component: registerEnterprise
    },
    //   ------------------------------------------导航栏-dark
    {
      path: "/navigator_dark",
      name: "navigator_dark",
      component: navigator_dark,
      children: [
        {
          path: "/homePage",
          name: "homePage",
          component: homePage
        }
      ]
    },
    //   ------------------------------------------导航栏-light
    {
      path: "/navigator_light",
      name: "navigator_light",
      component: navigator_light,
      children: [
        // -------------------------关于我们
        {
          path: "/aboutUs",
          name: "aboutUs",
          component: aboutUs
        },
        // -------------------------个人中心-我的资料(认证)
        {
          path: "/enterpriseQualfingStatusForSuccess",
          name: "enterpriseQualfingStatusForSuccess",
          component: enterpriseQualfingStatusForSuccess,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/enterpriseQualified",
          name: "enterpriseQualified",
          component: enterpriseQualified,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/enterpriseQualifing",
          name: "enterpriseQualifing",
          component: enterpriseQualifing,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/enterpriseQualifingStatusForFail",
          name: "enterpriseQualifingStatusForFail",
          component: enterpriseQualifingStatusForFail,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/enterpriseQualifingStatusForWait",
          name: "enterpriseQualifingStatusForWait",
          component: enterpriseQualifingStatusForWait,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/personalQualfingStatusForSuccess",
          name: "personalQualfingStatusForSuccess",
          component: personalQualfingStatusForSuccess,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/personalQualified",
          name: "personalQualified",
          component: personalQualified,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/personalQualifing",
          name: "personalQualifing",
          component: personalQualifing,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/personalQualifingStatusForFail",
          name: "personalQualifingStatusForFail",
          component: personalQualifingStatusForFail,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/personalQualifingStatusForWait",
          name: "personalQualifingStatusForWait",
          component: personalQualifingStatusForWait,
          meta: {
            requireLogin: true
          }
        },
        // --我的资产
        {
          path: "/projectList",
          name: "projectList",
          component: projectList,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/projectDetail",
          name: "projectDetail",
          component: projectDetail,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/houseLayout",
          name: "houseLayout",
          component: houseLayout,
          meta: {
            requireLogin: true
          }
        },
        // --我的订单
        {
          path: "/myPurchase",
          name: "myPurchase",
          component: myPurchase,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/myTransfer",
          name: "myTransfer",
          component: myTransfer,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/orderDetail",
          name: "orderDetail",
          component: orderDetail,
          meta: {
            requireLogin: true
          }
        },
        // -----------------------------------------康养(资产汇)
        // --康养公寓
        {
          path: "/departmentList",
          name: "departmentList",
          component: departmentList
        },
        {
          path: "/departmentDetail",
          name: "departmentDetail",
          component: departmentDetail
        },
        {
          path: "/departmentOrder",
          name: "departmentOrder",
          component: departmentOrder,
          meta: {
            requireLogin: true
          }
        },
        {
          path: "/departmentOrderStatus",
          name: "departmentOrderStatus",
          component: departmentOrderStatus,
          meta: {
            requireLogin: true
          }
        },
        // --车位
        {
          path: "/parking",
          name: "parking",
          component: parking
        },
        // --长租公寓
        {
          path: "/longRentalApartment",
          name: "longRentalApartment",
          component: longRentalApartment
        },
        // --商铺
        {
          path: "/shop",
          name: "shop",
          component: shop
        },
        // -----------------------------------------500页面；
        {
          path: "/notFound",
          name: "notFound",
          component: notFound
        },
        // -----------------------------------------404页面；
        {
          path: "/noPage",
          name: "noPage",
          component: noPage
        },
        // ------------------------------------------服务协议类
        //--数字证书服务协议
        {
          path: "/digitalAgreement",
          name: "digitalAgreement",
          component: digitalAgreement
        },
        //--隐私政策
        {
          path: "/privateAgreement",
          name: "privateAgreement",
          component: privateAgreement
        },
        //--用户注册服务协议
        {
          path: "/registerAgreement",
          name: "registerAgreement",
          component: registerAgreement
        },
        //--风险揭示书
        {
          path: "/riskWarning",
          name: "riskWarning",
          component: riskWarning
        },
        //--法律信息
        {
          path: "/lawInfo",
          name: "lawInfo",
          component: lawInfo
        },
        //--转让协议；
        {
          path: "/transferAgreement",
          name: "transferAgreement",
          component: transferAgreement
        },
        //-----------------------------------------------------网站地图；
        {
          path: "/map",
          name: "map",
          component: map
        },
        //-----------------------------------------------------新纪元
        {
          path: "/newEra",
          name: "newEra",
          component: newEra
        }
      ]
    }
  ],
  // ----本项目暂没用到，记录滚动位置；
  scrollBehavior(to, from, savedPosition) {
    // console.log(savedPosition);
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
let allroutes = [
  'login',
  'passwordFind',
  'passwordFindNext',
  'successFind',
  'registerPersonal',
  'registerEnterprise',
  'navigator_dark',
  'navigator_light',
  'enterpriseQualfingStatusForSuccess',
  'enterpriseQualified',
  'enterpriseQualifing',
  'enterpriseQualifingStatusForFail',
  'enterpriseQualifingStatusForWait',
  'personalQualfingStatusForSuccess',
  'personalQualified',
  'personalQualifing',
  'personalQualifingStatusForFail',
  'personalQualifingStatusForWait',
  'projectList',
  'projectDetail',
  'houseLayout',
  'myPurchase',
  'myTransfer',
  'orderDetail',
  'homePage',
  'aboutUs',
  'departmentList',
  'departmentDetail',
  'departmentOrder',
  'departmentOrderStatus',
  'parking',
  'longRentalApartment',
  'shop',
  'notFound',
  'noPage',
  'digitalAgreement',
  'privateAgreement',
  'registerAgreement',
  'riskWarning',
  'lawInfo',
  'transferAgreement',
  'map',
  'newEra',
  'redirect'
];
router.beforeEach(async (to, from, next) => {
  console.log(to.path);
  if (!allroutes.includes(to.name) && to.name !== 'noPage') {
    console.log(to.name);
    next('/noPage');
  } else {
    // 如果requireLogin,则需要判断是否是登录状态
    let isLogin = "no";
    if(to.meta&&to.meta.requireLogin) {
      let str = window.sessionStorage.getItem("userInfo");
      if(!!str) {
        isLogin = JSON.parse(str).loginStatus;
      }
      if(isLogin==="no") {
        next("/login");
      }
    }
    next();
  }
});
export default router;
