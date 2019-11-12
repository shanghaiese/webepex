import url from '@/api/base';
console.log(url);
// <!-- 数据存储状态 -->
const state = {
    menuIndex:"homePage", // 激活的导航菜单；
    // baseUrl: 'https://uat-api.e-pex.com', //基础路径(主要用于图片)
    // baseUrl: 'https://api.e-pex.com', //生产基础路径(主要用于图片)
    baseUrl: url.baseUrl,
    loginToken: "", //token
    loginInfo: {} //登录者信息
};
const mutations = {
	editIndex(state, payload) {
		state.menuIndex = payload.info;
    },
    setLoginToken(state, payload) {
        state.loginToken = payload.token;
    },
    setLoginInfo(state,payload) {
        state.loginInfo = payload;
    }
};
export default {
	state,
	mutations
};
