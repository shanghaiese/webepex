// <!-- 数据存储状态 -->
const state = {
    menuIndex:"homePage", // 激活的导航菜单；
    // baseUrl: 'http://192.168.19.53:8080', //基础路径(主要用于图片)
    baseUrl: 'https://uat-api.e-pex.com', //基础路径(主要用于图片)
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
