/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
// --------------------------------------------------------------登录页
import login from "@/views/login/login";
// --------------------------------------------------------------找回密码页
import passwordFind from "@/views/login/password_find";
// --------------------------------------------------------------找回密码页
import passwordFind2 from "@/views/login/password_find_2";
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
// ----------------------------------------------------------------首页
import homePage from "@/views/homePage/homePage";
// ---------------------------------------------------------------关于我们
import aboutUs from "@/views/aboutUs/aboutUs";
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
        path: "/passwordFind2",
        name: "passwordFind2",
        component: passwordFind2
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
            }
          ]
        }
      //--------------------------------------------------------------------------------------主菜单及主菜单下所有子页面
    //   {
    //     path: "/background",
    //     name: "background",
    //     component: background,
    //     children: [
    //         // -----------------------------------------------------------------------首页
    //       {
    //         path: "/homePage", 
    //         name: "homePage",
    //         component: homePage
    //       }
    //     ]
    //   },
      // ------------------------------------------------------------------------------错误页面
    //   {
    //     path: "/errorPage",
    //     name: "errorPage",
    //     component: errorPage
    //   }
    ]
  });

/*
// -----------------------------先清除localstorage
window.localStorage.clear();
// -----------------------------模拟权限控制
// 获取权限，是一个延时操作；
let arr = ["homePage"];//存放路由名字；
let menu = []; //存放所有的菜单；
let isAdmin = ""; //是否是管理员1是，0否；
async function getMenu() {
    return new Promise((resolve,reject)=>{
        // setTimeout(() => {
        //     let arr = ['homePage','dataSheetView',"systemArchivingConfig","systemArchivingAdd"];
        //     resolve(arr);
        // }, 1000);
        systemManageInitMenu
          .initMenu({})
          .then((res) => {
            console.log(res);
            if(res.status==="0"&&res.data) {
                // ----------------------------------将权限菜单存放在localStorage里；background读取；
                menu = res.data.menuList||[];
                let str = JSON.stringify(menu);
                window.localStorage.setItem("auth_menu",str);
                // --------------------------------------是否是管理员
                isAdmin = res.data.adminFlag;
                window.localStorage.setItem("auth_adminFlag",isAdmin);
                // ----------------------------------所有的路由名字，存放在arr中
                let routesName = res.data.urlList||[];
                for(let i=0;i<routesName.length;i++) {
                  arr.push(routesName[i].index);
                }
                console.log(arr);
                // 如果没有权限菜单，则arr=["noPermission"];
                // if(arr.length===1) {
                //     arr = ["homePage"];
                // }
                resolve();
            }
          })
          .catch((error) => {
            // resolve();
            arr = ['errorPage'];
            isMenuGotten = true;
            router.push('/errorPage');
            reject();
            console.log(error);
          })
    })
}
router.beforeEach(async(to, from, next)=>{
    if(!isMenuGotten) {
        await getMenu();
        isMenuGotten = true;
    }
    console.log(arr,to.name);
    if(!arr.includes(to.name)&&to.name!=='noPermission'){
        next('/noPermission'); 
    }else{
        next();
    }
});*/
export default router;
