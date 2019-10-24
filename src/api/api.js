import axios from 'axios';
import qs from 'qs';
import iView from 'iview';
import store from '../store/store';

import router from "../router/index";
import * as types from '../store/types';

import url from './base';

const env = process.env.NODE_ENV;

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.url.baseUrl = `${url.baseUrl}`;
axios.defaults.baseURL = '';
axios.defaults.withCredentials = 'true'
//POST传参序列化
axios.interceptors.request.use((config) => {
  if (store.state.loginToken != "") {
    config.headers.Authorization = `${store.state.loginToken}`;
  }

  if (config.method === 'post') {
    config.data = qs.parse(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
  return res.status == 200 ? res : Promise.reject(res)

}, (error) => {
  switch (error.response.status) {
    case 403:
      // 返回 403 清除token信息并跳转到登录页面
      store.commit(types.SET_LOGIN_TOKEN, "")
      store.commit(types.SET_LOGIN_INFO, {})
      router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
      });
  }
  return Promise.reject(error);
});

//post方法
export function post(url, params) {
  return new Promise((resolve, reject) => {
    iView.LoadingBar.start();
    axios.post(url, params)
      .then(response => {
        resolve(response);
        iView.LoadingBar.finish();
      })
      .catch((error) => {
        reject(error);
      })
  })
}

//get方法
export function get(url, params) {
  return new Promise((resolve, reject) => {
    //console.info(params);
    iView.LoadingBar.start();
    axios.get(url, params)
      .then(response => {
        resolve(response);
        iView.LoadingBar.finish();
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export default {
  //----------------车库操作接口
  postCarbarnAdd(params) {
    //新增车库
    return post(`${url.baseUrl}/garages/add`, params)
  },
  postCarbarnDel(params) {
    //批量删除车库
    return post(`${url.baseUrl}/garages/batch-delete`, params)
  },
  postCarbarnUpChain(params) {
    //车库批量上链
    return post(`${url.baseUrl}/garages/add-chain`, params)
  },

  delCarbarnDel(params) {
    //删除车库
    return get(`${url.baseUrl}/garages/delete/` + params)
  },
  getCarbarn(params) {
    //根据id获取车库信息
    return get(`${url.baseUrl}/garages/get/` + params)
  },
  postCarbarnQuery(params) {
    //条件查询所有车库
    return post(`${url.baseUrl}/garages/query`, params)
  },
  postCarbarnUpdate(params) {
    //更新车库
    return post(`${url.baseUrl}/garages/update`, params)
  },

  //----------------用户操作接口
  login(params) {
    return post(`${url.baseUrl}/user/login`, params)
  },
  postPersonalAdd(params) {
    //新增用户
    return post(`${url.baseUrl}/personal-users/add`, params)
  },
  postPersonalbatch(params) {
    //批量删除用户
    return post(`${url.baseUrl}/personal-users/batch-delete`, params)
  },
  delPersonalDel(params) {
    //删除用户
    return get(`${url.baseUrl}/personal-users/delete/` + params)
  },
  getPersonalInfo(params) {
    //根据id获取用户信息
    return get(`${url.baseUrl}/personal-users/get/` + params)
  },
  postPersonalquery(params) {
    //条件查询所有用户
    return post(`${url.baseUrl}/personal-users/query`, params)
  },
  postPersonalUpdate(params) {
    //更新用户
    return post(`${url.baseUrl}/personal-users/update`, params)
  },

  //----------------企业用户操作接口
  postFirmAdd(params) {
    //新增用户
    return post(`${url.baseUrl}/enterprise-users/add`, params)
  },
  batchFirmDel(params) {
    //批量删除用户
    return post(`${url.baseUrl}/enterprise-users/batch-delete`, params)
  },
  delFirmDel(params) {
    //删除用户
    return get(`${url.baseUrl}/enterprise-users/delete/` + params)
  },
  getFirmInfo(params) {
    //根据id获取用户信息
    return get(`${url.baseUrl}/enterprise-users/get/` + params)
  },
  postFirmsearch(params) {
    //条件查询所有用户
    return post(`${url.baseUrl}/enterprise-users/query`, params)
  },
  postFirmUpdate(params) {
    //更新用户
    return post(`${url.baseUrl}/enterprise-users/update`, params)
  },


  //----------------用户角色操作接口
  postUserRoleAdd(params) {
    //新增用户身份类型
    return post(`${url.baseUrl}/user/role/add`, params)
  },
  getUserRoleList() {
    //获取所有用户身份类型
    return get(`${url.baseUrl}/user/role/all`)
  },
  getUserRole(params) {
    //获取用户身份类型
    return get(`${url.baseUrl}/user/role/get/` + params)
  },
  batchDelUserRole(params) {
    //批量删除用户身份类型
    return post(`${url.baseUrl}/user/role/batch-del`, params)
  },
  delUserRole(params) {
    //删除用户身份类型
    return get(`${url.baseUrl}/user/role/del/` + params)
  },
  postUserRoleUpdate(params) {
    //修改用户身份类型
    return post(`${url.baseUrl}/user/role/update`, params)
  },
  //判断是否有转让权限
  hasTradeRight(params) {
    return post(`${url.baseUrl}/user/has-trade-right`,params)
  },
  hasConfirmRight(params) {
    return post(`${url.baseUrl}/user/has-confirm-right`,params)
  },

  getIdentityStatus(params) {
    //获取所有用户认证状态
    return get(`${url.baseUrl}/params/params-user-status/all` + params)
  },
  getIdentitytype(params) {
    //获取所有用户类型
    return get(`${url.baseUrl}/params/params-user-type/all` + params)
  },
  postUserQuery(params) {
    //条件查询所有用户
    return post(`${url.baseUrl}/params/users`, params)
  },
  getVehicleLayout() {
    //获取车位配置
    return get(`${url.baseUrl}/params/params-vehicle-layout/all`)
  },
  getVehicleType() {
    //获取车位种类
    return get(`${url.baseUrl}/params/params-vehicle-type/all`)
  },

  //----------------文件接口管理
  // delFiles(params) {
  //   //删除资源文件
  //   return get(`${url.baseUrl}/resources/delete/` + params)
  // },
  uploadFiles(params) {
    //上传资源文件
    return get(`${url.baseUrl}/resources/upload` + params)
  },
  carportExport(params) {
    //导出车位
    return post(`${url.baseUrl}/parking/batch-export`, params)
  },
  carbarnExport(params) {
    //导出车位
    return post(`${url.baseUrl}/garages/batch-export`, params)
  },
  //----------------资产包管理
  addProperty(params) {
    //新增资产包
    return post(`${url.baseUrl}/asset/add`, params)
  },
  updateProperty(params) {
    //修改资产包
    return post(`${url.baseUrl}/asset/update`, params)
  },
  getPropertyList(params) {
    //查询获取列表
    return post(`${url.baseUrl}/asset/query`, params)
  },
  bindAssetParking(params) {
    //资产包绑定车位
    return post(`${url.baseUrl}/asset/bind-parking`, params)
  },
  getPropertyInfo(params) {
    //查看资产包详情
    return get(`${url.baseUrl}/asset/get/` + params)
  },

  addAssetChain(params) {
    //查看资产包详情
    return post(`${url.baseUrl}/asset/add-chain`, params)
  },
  batchDeleteProperty(params) {
    //删除资产包
    return post(`${url.baseUrl}/asset/batch-delete`, params);
  },
  getAssetBasic(params) {
    //获取资产包里面的四方列表
    return get(`${url.baseUrl}/assetManager/queryAllAssetSides` + params)
  },
  //----------------车位管理
  addCarport(params) {
    return post(`${url.baseUrl}/parking/add`, params)
  },
  bathcdellCarport(params) {
    return post(`${url.baseUrl}/parking/batch-delete`, params)
  },
  bathcSignatureCarport(params) {
    return post(`${url.baseUrl}/parking/batch-signature`, params)
  },
  searchCarportUser(params) {
    return post(`${url.baseUrl}/parking/conform-users`, params)
  },
  // getCarportList(params) {
  //   return post(`${url.baseUrl}/parking/query`, params)
  // },


  //----------------确权
  // postConfirmationList(params) {
  //   return post(`${url.baseUrl}/parking/query`, params)
  // },
  postRightList(params) {
    return post(`${url.baseUrl}/parking/confirm-query`, params)
  },
  postConirmation(params) {
    return post(`${url.baseUrl}/parking/confirm`, params)
  },
  batchDelCarport(params) {
    return post(`${url.baseUrl}/parking/batch-delete`, params)
  },
  getInfoCarport(params) {
    return get(`${url.baseUrl}/parking/get/` + params)
  },
  updateCarport(params) {
    return post(`${url.baseUrl}/parking/update`, params)
  },
  rightLog(params) {
    return post(`${url.baseUrl}/parking/logs`, params)
  },

  //---------------我的资产包
  postMyAsset(params) {
    return post(`${url.baseUrl}/asset/query`, params)
  },
  getAssetById(params) {
    return get(`${url.baseUrl}/asset/get/` + params)
  },
  postSearch(params) {
    return post(`${url.baseUrl}/parking/public-query`, params)
  },
  getSearchById(params) {
    return get(`${url.baseUrl}/parking/public-get/` + params)
  },
  //--------------验证码
  getImgCode(params) {
    return post(`${url.baseUrl}/captcha/image`, params)
  },
  getPhoneCode(params) {
    return post(`${url.baseUrl}/captcha/phone`, params)
  },
  PhoneCode(params) {
    return post(`${url.baseUrl}/captcha/verify`, params)
  },
  //------------注册
  regist(params) {
    return post(`${url.baseUrl}/user/register`, params)
  },
  //-----------用户
  addUser(params) {
    return post(`${url.baseUrl}/user/add`, params)
  },
  delUser(params) {
    return post(`${url.baseUrl}/user/batch-delete`, params)
  },
  getUserinfo(params) {
    return get(`${url.baseUrl}/user/get/` + params)
  },
  getSelfUserinfo(params) {
    return get(`${url.baseUrl}/user/get-self/`)
  },
  addUserRole(params) {
    return post(`${url.baseUrl}/user/role/add`, params)
  },
  getRoleList(params) {
    return get(`${url.baseUrl}/user/role/all` + params)
  },
  updateUser(params) {
    return post(`${url.baseUrl}/user/update`, params)
  },
  updateRole(params) {
    return post(`${url.baseUrl}/user/role/update`, params)
  },
  updateUserFront(params) {
    return post(`${url.baseUrl}/user/update-front`, params)
  },
  queryUser(params) {
    return post(`${url.baseUrl}/user/query`, params)
  },
  //------------安全中心
  exportKey(params) {
    return post(`${url.baseUrl}/user/export-private-key`, params)
  },
  updatePhone(params) {
    return post(`${url.baseUrl}/user/update-phone`, params)
  },
  changePassword(params) {
    return post(`${url.baseUrl}/user/change-login-password`, params)
  },
  changeTradePassword(params) {
    return post(`${url.baseUrl}/user/change-trade-password`, params)
  },
  applyTradePassword(params) {
    return post(`${url.baseUrl}/user/apply-trade-password`, params)
  },
  resetPassword(params) {
    return post(`${url.baseUrl}/user/reset-login-password`, params)
  },
  resetTradePassword(params) {
    return post(`${url.baseUrl}/user/reset-trade-password`, params)
  },
  updateUserRealFront(params) {
    return post(`${url.baseUrl}/user/update-real-front`, params)
  },
  checkPhone(params) {
    return post(`${url.baseUrl}/user/check-phone-exist`, params)
  },
  checkUserName(params) {
    return post(`${url.baseUrl}/user/check-name-exist`, params)
  },
  updateApplyPersonalAuth(params) {
    return post(`${url.baseUrl}/user/apply-personal-auth`, params)
  },
  updateApplyEnterpriseAuth(params) {
    return post(`${url.baseUrl}/user/apply-enterprise-auth`, params)

  },

  //我的收藏
  getCollections(params) {
    return post(`${url.baseUrl}/parking-favorite/get`, params)
  },
  //增加收藏
  addCollection(params){
    return get(`${url.baseUrl}/parking-favorite/add/` + params)
  },
  //取消收藏
  cancelCollection(params){
    return get(`${url.baseUrl}/parking-favorite/delete/` + params)
  },

  //转让中心首页
  //获取推荐出让资产
  getRecommandParkingSales(params) {
    return post(`${url.baseUrl}/parking-sale/recommend`, params)
  },
  //查询出让资产
  queryParkingSales(params) {
    return post(`${url.baseUrl}/parking-sale/query-wait-trade`, params)
  },
  //获取某个车位资产信息
  getParkingSaleById(params) {
    return get(`${url.baseUrl}/parking-sale/get/` + params)
  },
  // 获取资产转让历史
  queryParkingTradeHistory(params) {
    return post(`${url.baseUrl}/parking-trade-his/query`,  params)
  },
  //受让方下单
  parkingSaleBuyAdd(params) {
    return post(`${url.baseUrl}/parking-order/buy-add`,  params)
  },
  //公寓下单
  apartmentOrder(params){
    return post(`${url.baseUrl}/order/buy-add`,params)
  },

  //获取收藏id
  getCollectionsId(){
    return post(`${url.baseUrl}/parking-favorite/get-list`)
  },

  //------------车位资产
  queryParkingAsset(params) {
    return post(`${url.baseUrl}/parking-asset/query`, params)
  },
  checkAsset(params) {
    return post(`${url.baseUrl}/parking-asset/check`, params)
  },
  batchAddAsset(params) {
    return post(`${url.baseUrl}/parking-sale/batch-add`, params)
  },
  addAsset(params) {
    return post(`${url.baseUrl}/parking-sale/add`, params)
  },
  saleSelfQuery(params) {
    return post(`${url.baseUrl}/parking-sale/query-self`, params)
  },
  cancelSale(params) {
    return get(`${url.baseUrl}/parking-sale/cancel/${params}`)
  },
  recoverSale(params) {
    return get(`${url.baseUrl}/parking-sale/recover/${params}`)
  },
  deleteSale(params) {
    return get(`${url.baseUrl}/parking-sale/delete/${params}`)
  },
  //车位资产订单操作接口
  getSellerCarports(params){
    return post(`${url.baseUrl}/parking-order/seller-query`,params)
  },
  getBuyerCarports(params){
    return post(`${url.baseUrl}/parking-order/buyer-query`,params)
  },
  //获取受让方订单详情
  getBuyerParkingOrder(params) {
    return get(`${url.baseUrl}/parking-order/buyer-get/${params}`)
  },
  //获取出让方订单详情
  getSellerParkingOrder(params) {
    return get(`${url.baseUrl}/parking-order/seller-get/${params}`)
  },
  //出让方确认订单
  sellerConfirm(params) {
    return post(`${url.baseUrl}/parking-order/sell-confirm`,params)
  },
  //出让方取消订单
  sellerCancel(params) {
    return post(`${url.baseUrl}/parking-order/sell-cancel`,params)
  },
  //出让方签订合同
  sellerSignContract(params) {
    return post(`${url.baseUrl}/parking-order/sell-sign`,params)
  },
  //受让方取消订单
  buyerCancel(params) {
    return post(`${url.baseUrl}/parking-order/buy-cancel`,params)
  },
  //受让方签订合同
  buyerSignContract(params) {
    return post(`${url.baseUrl}/parking-order/buy-sign`,params)
  },
  //受让方付款
  buyerPay(params) {
    return post(`${url.baseUrl}/parking-order/buy-pay`,params)
  },
  //出让方同意交割
  sellerDelivery(params) {
    return post(`${url.baseUrl}/parking-order/sell-delivery`,params)
  },
  //受让方同意交割
  buyerDelivery(params) {
    return post(`${url.baseUrl}/parking-order/buy-finish-delivery`,params)
  },
  //--------支付接口
  orderPaySign(params) {
    return post(`${url.baseUrl}/order-pay/sign` , params)
  },
  orderPayDeal(params) {
    return post(`${url.baseUrl}/order-pay/deal` , params)
  },
  //msg-站内信
  getUserMsgCount(){
    return get(`${url.baseUrl}/message/user/count`)
  },
  getUserMsgList(params){
    return post(`${url.baseUrl}/message/user/list/info`,params)
  },
  getUserMsgDetail(params){
    return post(`${url.baseUrl}/message/user/detail/info`,params)
  },
  updateUnreadMsg(params) {
    return post(`${url.baseUrl}/message/user/read` ,params)
  },

  // explorer
  getAccountInfo(params) {
    return get(`${url.explorer}/api/accounts/address/${params}`)
  },
  // explorer
  getAccountTransCount(params) {
    return get(`${url.explorer}/api/transactions/count/account/${params}`)
  },
  getAccountTrans(address,current,pageSize) {
    return get(`${url.explorer}/api/transactions/list/${pageSize}/${current}/account/${address}`)
  },
  // 提交申请确权
  applyInfo(params) {
    return post(`${url.baseUrl}/mail/store` ,params)
  }
}
