/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
// --------------------------------------------------------------登录页
import login from "@/views/login/login";
// --------------------------------------------------------------找回密码页
import passwordFind from "@/views/login/password_find";
// --------------------------------------------------------------密码已找回页
import successFind from "@/views/login/success_find";
// --------------------------------------------------------------个人注册页
import registerPersonal from "@/views/register/register_personal";
// --------------------------------------------------------------企业注册页
import registerEnterprise from "@/views/register/register_enterprise";
import { isatty } from "tty";
Vue.use(Router); // 使用router;
// 判断是否获取到权限菜单；
let isMenuGotten = false;

let router = new Router({
    routes: [
      {
        path: "/",
        redirect: "/registerEnterprise"
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
