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
// ---------------------------------------------------------------404
import notFound from "@/views/information/notFound";
import { isatty } from "tty";
Vue.use(Router); // 使用router;
// 判断是否获取到权限菜单；
let isMenuGotten = false;

let router = new Router({
    routes: [
      {
        path: "/",
        redirect: "/homePage"
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
              component: enterpriseQualfingStatusForSuccess
            },
            {
              path: "/enterpriseQualified",
              name: "enterpriseQualified",
              component: enterpriseQualified
            },
            {
              path: "/enterpriseQualifing",
              name: "enterpriseQualifing",
              component: enterpriseQualifing
            },
            {
              path: "/enterpriseQualifingStatusForFail",
              name: "enterpriseQualifingStatusForFail",
              component: enterpriseQualifingStatusForFail
            },
            {
              path: "/enterpriseQualifingStatusForWait",
              name: "enterpriseQualifingStatusForWait",
              component: enterpriseQualifingStatusForWait
            },
            {
              path: "/personalQualfingStatusForSuccess",
              name: "personalQualfingStatusForSuccess",
              component: personalQualfingStatusForSuccess
            },
            {
              path: "/personalQualified",
              name: "personalQualified",
              component: personalQualified
            },
            {
              path: "/personalQualifing",
              name: "personalQualifing",
              component: personalQualifing
            },
            {
              path: "/personalQualifingStatusForFail",
              name: "personalQualifingStatusForFail",
              component: personalQualifingStatusForFail
            },
            {
              path: "/personalQualifingStatusForWait",
              name: "personalQualifingStatusForWait",
              component: personalQualifingStatusForWait
            },
            // --我的资产
            {
                path: "/projectList",
                name: "projectList",
                component: projectList
              },
              {
                path: "/projectDetail",
                name: "projectDetail",
                component: projectDetail
              },
              {
                path: "/houseLayout",
                name: "houseLayout",
                component: houseLayout
              },
              // --我的订单
              {
                path: "/myPurchase",
                name: "myPurchase",
                component: myPurchase
              },
              {
                path: "/myTransfer",
                name: "myTransfer",
                component: myTransfer
              },
              {
                path: "/orderDetail",
                name: "orderDetail",
                component: orderDetail
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
                component: departmentOrder
              },
              {
                path: "/departmentOrderStatus",
                name: "departmentOrderStatus",
                component: departmentOrderStatus
              },
              // -----------------------------------------404页面；
              {
                path: "/notFound",
                name: "notFound",
                component: notFound
              }
          ]
        }
    ]
  });
export default router;
