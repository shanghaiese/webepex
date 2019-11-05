import { POST, GET } from './api';
export default {
    test(data) {
        const url = 'app/article';
        return POST(url,data);
    },
    // ..................................................登录部分
    // 登录
    login(data) {
        const url = '/greenland/user/login';
        return POST(url,data);
    },
    // 退出
    logout(data) {
        const url = '/greenland/user/logout';
        return GET(url,data);
    },
    // 获取登录图片验证码
    getVerification (data) {
        const url = '/greenland/captcha/image';
        return POST(url,data);
    },
    // 图片验证码后台校检
    verificationCheck (data) {
        const url = '/greenland/captcha/verifyImage';
        return POST(url,data);
    },

    // ...................................................找回密码
    findPassword(data) {
        const url = '/greenland/user/reset-login-password';
        return POST(url,data);
    },
    // 手机号验证是否注册
    mobileCheck (data) {
        const url = '/greenland/user/check-user';
        return POST(url,data);
    },

    // ...................................................注册部分
    // 获取登录图片验证码 同上
    // 图片验证码后台校检 同上
    // 请求手机验证码
    requestPhoneVerification (data) {
        const url = '/greenland/captcha/phone';
        return POST(url,data);
    },
    // 个人注册
    personalRegistration (data) {
        const url = '/greenland/user/userRegister';
        return POST(url,data);
    },
    // 企业注册
    companyRegistration (data) {
        const url = '/greenland/user/enterUserRegister';
        return POST(url,data);
    },

    // ...................................................个人认证
    // 个人认证表单确认
    personalCertification (data) {
        const url = '/greenland/user/apply-personal-auth';
        return POST(url,data); 
    },
    // 个人认证成功展示
    getPersonalCertificationInfo (data) {
        const url = '/greenland/user/get-personal-auth';
        return POST(url,data); 
    },
    // ...................................................企业认证
    // 查看回显信息
    gerEchoInfo (data) {
        const url = '/user/get-enterprise-auth';
        return POST(url,data); 
    },
    companyCertification (data) {
        const url = '/greenland/user/apply-enterprise-auth';
        return POST(url,data); 
    },
    // 企业认证成功展示
    getCompanyCertificationInfo (data) {
        const url = '/greenland/user/get-enterprise-auth';
        return POST(url,data); 
    },

    // .................................................康养公寓项目
    // 列表
    projectList(data) {
        const url = '/greenland/apartment/get-myProject';
        return POST(url,data);
    },
    // // 项目房型信息(列表)
    // houseLayout(data) {
    //     const url = '/greenland/apartment/get-myRoom';
    //     return POST(url,data);
    // },
        
    // 项目详细信息
    projectDetail(data) {
        const url = '/greenland/apartment/get-myProjectDetail';
        return POST(url,data);
    },

    // 项目房型信息(列表 + 房型详情) 
    houseType(data) {
        const url = '/greenland/apartment/get-myLayout';
        return POST(url,data);
    },

    // .................................................我的购买(买家)
    // 买家获取列表
    myPurchase(data) {
        const url = '/greenland/order/buyer/get-order';
        return POST(url,data);
    },
    // 订单详情
    buyerOrderDetail(data) {
        const url = '/greenland/order/buyer/get-orderDetail';
        return POST(url,data);
    },
    // 买家确认交易
    buyerEnter(data) {
        const url = '/greenland/order/buyer-confirm';
        return POST(url,data);
    },
    // ..................................................我的转让(卖家: 运营商+开发商)
    // 开发商获取列表
    myTransfer(data) {
        const url = '/greenland/order/seller/get-order';
        return POST(url,data);
    },
    //开发商订单详情
    sellerOrderDetail(data) {
        const url = '/greenland/order/seller/get-orderDetail';
        return POST(url,data);
    },
    // 开发商确认交易
    developerEnter(data) {
        const url = '/greenland/order/developer-confirm';
        return POST(url,data);
    },
    // 运营商获取列表
    operatorList(data) {
        const url = '/greenland/order/oper/get-order';
        return POST(url,data);
    },
    // 运营商订单详情
    operatorOrderDetail(data) {
        const url = '/greenland/order/oper/get-orderDetail';
        return POST(url,data);
    },
    // 运营商确认交易
    operatorEnter(data) {
        const url = '/greenland/order/oper-confirm';
        return POST(url,data);
    }
}